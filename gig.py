import pandas as pd
import torch
import torch.nn as nn
import torch.optim as optim
import itertools
import tkinter as tk
from tkinter import messagebox, ttk
from pymongo import MongoClient
import numpy as np
from scipy.optimize import differential_evolution

# Определяем характеристики для использования
characteristic_fields = [
    'freezingTemp', 'density', 'viscosity', 'combustionHeat', 'coolingResource',
    'thermalConductivity', 'heatCapacity', 'inductionPeriod', 'burningRate',
    'vaporPressure', 'oxygenContent', 'boilingPoint', 'cetaneNumber', 'lowerHeatingValue'
]

# Подключение к MongoDB
connection_string = "mongodb://localhost:27017"
try:
    client = MongoClient(connection_string)
    db = client['fuelch']
    collection = db['ch']
except Exception as e:
    print(f"Ошибка подключения к MongoDB: {e}")
    exit(1)

# Загрузка данных из MongoDB
try:
    data = list(collection.find())
    if not data:
        print("Коллекция пуста или не найдена.")
        exit(1)
    df = pd.DataFrame(data)
    print("Data summary:\n", df[characteristic_fields].describe())
except Exception as e:
    print(f"Ошибка загрузки данных из MongoDB: {e}")
    exit(1)

# Проверка наличия обязательных полей
required_fields = ['name']
if not all(field in df.columns for field in required_fields):
    print("В данных отсутствует обязательное поле: 'name'.")
    exit(1)

if not all(field in df.columns for field in characteristic_fields):
    print("В данных отсутствуют некоторые характеристики.")
    exit(1)

# Преобразуем данные в numpy для ускорения
data_np = df[characteristic_fields].values.astype(np.float32)
names = df['name'].values

# Обработка пропусков: Заполняем NaN средними значениями
means = np.nanmean(data_np, axis=0)
for i in range(data_np.shape[1]):
    data_np[np.isnan(data_np[:, i]), i] = means[i]

# Определяем нейросетевую модель (автоэнкодер)
class MixtureModel(nn.Module):
    def __init__(self, input_size):
        super(MixtureModel, self).__init__()
        self.encoder = nn.Sequential(
            nn.Linear(input_size, 64),
            nn.ReLU(),
            nn.Linear(64, 32),
            nn.ReLU()
        )
        self.decoder = nn.Sequential(
            nn.Linear(32, 64),
            nn.ReLU(),
            nn.Linear(64, input_size)
        )

    def forward(self, x):
        encoded = self.encoder(x)
        decoded = self.decoder(encoded)
        return decoded

# Инициализация и обучение модели
input_size = len(characteristic_fields)
model = MixtureModel(input_size)
optimizer = optim.Adam(model.parameters(), lr=0.001)
criterion = nn.MSELoss()

data_tensor = torch.tensor(data_np, dtype=torch.float32)

num_epochs = 1000
mask_prob = 0.2

for epoch in range(num_epochs):
    optimizer.zero_grad()
    noisy_data = data_tensor.clone()
    mask = torch.rand_like(noisy_data) < mask_prob
    noisy_data[mask] = 0
    reconstructed = model(noisy_data)
    loss = criterion(reconstructed, data_tensor)
    loss.backward()
    optimizer.step()
    if (epoch + 1) % 100 == 0:
        print(f'Epoch {epoch+1}/{num_epochs}, Loss: {loss.item():.6f}')

# Заполнение пропусков
with torch.no_grad():
    reconstructed = model(data_tensor)
    print("Reconstructed data sample:", reconstructed[0])
    data_tensor = reconstructed

# Функция расчета характеристик смеси
def calculate_mixture(indices, ratios):
    mixture_data = sum(r * data_tensor[i] for i, r in zip(indices, ratios))
    return mixture_data

# Оптимизация смеси
def optimize_mixture():
    try:
        num_components = int(num_components_var.get())
        if num_components < 2 or num_components > len(names):
            messagebox.showerror("Error", "Invalid number of components.")
            return

        user_target = torch.tensor([float(e.get()) for e in entries], dtype=torch.float32)
        boundary_values = torch.tensor([float(e.get()) for e in min_entries], dtype=torch.float32)
        comparison_type = [entry.get() for entry in comparison_entries]
        best_mixtures = []

        max_combinations = 5000
        component_combos = list(itertools.combinations(range(len(names)), num_components))
        if len(component_combos) > max_combinations:
            np.random.shuffle(component_combos)
            component_combos = component_combos[:max_combinations]

        for combo_indices in component_combos:
            component_names = names[list(combo_indices)]

            def objective(ratios_raw):
                ratios = np.append(ratios_raw, 1 - np.sum(ratios_raw))
                print(f"Ratios: {ratios}, Sum: {np.sum(ratios)}")
                if np.any(ratios < 0) or np.sum(ratios) > 1.0001 or np.sum(ratios) < 0.9999:
                    print("Penalty: Invalid ratios")
                    return 1e10
                mixture_data = calculate_mixture(combo_indices, ratios)
                print(f"Mixture data: {mixture_data}")
                loss = torch.sum((mixture_data - user_target) ** 2).item()
                print(f"Loss: {loss}")
                return loss

            bounds = [(0.0, 1.0)] * (num_components - 1)
            result = differential_evolution(objective, bounds, maxiter=100, popsize=15, tol=1e-5)

            if result.success and result.fun < 1e9:
                ratios_raw = result.x
                ratios = np.append(ratios_raw, 1 - np.sum(ratios_raw))
                mixture_data = calculate_mixture(combo_indices, ratios)
                # Пост-обработка: проверка соответствия границам
                valid = True
                error_reasons = []
                for i, (val, comp_type, bound) in enumerate(zip(mixture_data, comparison_type, boundary_values)):
                    if comp_type == "min" and val < bound:
                        valid = False
                        error_reasons.append(f"{characteristic_fields[i]}: {val:.8f} < {bound} (min)")
                    elif comp_type == "max" and val > bound:
                        valid = False
                        error_reasons.append(f"{characteristic_fields[i]}: {val:.8f} > {bound} (max)")
                if valid:
                    best_mixtures.append((component_names, ratios, result.fun, mixture_data.numpy().tolist()))

        if not best_mixtures:
            error_text = "No valid mixtures found due to the following reasons:\n"
            if error_reasons:
                unique_errors = set(error_reasons)
                for error in unique_errors:
                    error_text += f"{error}\n"
            else:
                error_text += "No mixtures meet the target values within acceptable loss.\n"
            messagebox.showinfo("Result", error_text)
            return

        best_mixtures.sort(key=lambda x: x[2])
        best_mixtures = best_mixtures[:6]

        result_text = ""
        for idx, (components, ratios, loss, mixture_data) in enumerate(best_mixtures):
            result_text += f"Optimal blend {idx+1}:\n"
            for i, comp in enumerate(components):
                result_text += f"Component {i+1}: {comp} ({ratios[i]*100:.0f}%)\n"
            for i, value in enumerate(mixture_data):
                result_text += f"{characteristic_fields[i]}: {value:.8f}\n"
            result_text += "\n"

        messagebox.showinfo("Result", result_text)

    except Exception as e:
        messagebox.showerror("Error", str(e))

# Создание GUI
root = tk.Tk()
root.title("Blend optimization")

# Выбор количества компонентов
tk.Label(root, text="Number of components:").grid(row=0, column=0)
num_components_var = tk.StringVar(value="2")
num_components_combobox = ttk.Combobox(
    root, textvariable=num_components_var, values=list(range(2, min(len(names) + 1, 6))), state="readonly"
)
num_components_combobox.grid(row=0, column=1)

tk.Label(root, text="Enter the target characteristics:").grid(row=1, column=0, columnspan=3)
entries = []
min_entries = []
comparison_entries = []

for i, field in enumerate(characteristic_fields):
    tk.Label(root, text=field).grid(row=i+2, column=0)
    entry = tk.Entry(root)
    entry.grid(row=i+2, column=1)
    entries.append(entry)
    
    min_entry = tk.Entry(root)
    min_entry.grid(row=i+2, column=2)
    min_entries.append(min_entry)
    
    comparison_var = tk.StringVar(value="min")
    comparison_radio_min = tk.Radiobutton(root, text="Min", variable=comparison_var, value="min")
    comparison_radio_min.grid(row=i+2, column=3)
    comparison_radio_max = tk.Radiobutton(root, text="Max", variable=comparison_var, value="max")
    comparison_radio_max.grid(row=i+2, column=4)
    comparison_entries.append(comparison_var)

tk.Button(root, text="Optimize", command=optimize_mixture).grid(row=len(entries)+2, column=0, columnspan=5)
root.mainloop()