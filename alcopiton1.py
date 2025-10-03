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
import traceback

# Определяем характеристики для использования
characteristic_fields = [
    'LHV', 'density', 'Autoignition', 'Saturatedvaporpressure', 'visc',
    'emmisonindex', 'thermodestructionspeed'
]

# Подключение к MongoDB
connection_string = "mongodb://localhost:27017"
try:
    print("Attempting to connect to MongoDB...")
    client = MongoClient(connection_string, serverSelectionTimeoutMS=5000)
    db = client['alco']
    collection = db['alcoch']
    client.admin.command('ping')
    print("MongoDB connection successful.")
except Exception as e:
    print(f"Ошибка подключения к MongoDB: {e}")
    messagebox.showerror("MongoDB Error", f"Failed to connect to MongoDB: {e}")
    exit(1)

# Загрузка данных из MongoDB
try:
    print("Loading data from MongoDB...")
    data = list(collection.find())
    if not data:
        print("Коллекция пуста или не найдена.")
        messagebox.showerror("Data Error", "MongoDB collection is empty or not found.")
        exit(1)
    df = pd.DataFrame(data)
    print("Data summary:\n", df[characteristic_fields].describe())
except Exception as e:
    print(f"Ошибка загрузки данных из MongoDB: {e}")
    messagebox.showerror("Data Error", f"Failed to load data from MongoDB: {e}")
    exit(1)

# Проверка наличия обязательных полей
required_fields = ['name']
if not all(field in df.columns for field in required_fields):
    print("В данных отсутствует обязательное поле: 'name'.")
    messagebox.showerror("Data Error", "Missing required field: 'name'.")
    exit(1)

if not all(field in df.columns for field in characteristic_fields):
    print("В данных отсутствуют некоторые характеристики.")
    messagebox.showerror("Data Error", "Missing some characteristic fields.")
    exit(1)

# Преобразуем данные в numpy для ускорения
data_np = df[characteristic_fields].values.astype(np.float32)
original_data_np = data_np.copy()  # Копия с возможными NaN
names = df['name'].values

# Маска для NaN
nan_mask = np.isnan(data_np)

# Обработка пропусков: Заполняем NaN средними значениями (для обучения)
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
try:
    print("Initializing neural network...")
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

    # Заполнение пропусков только в позициях NaN
    with torch.no_grad():
        imputation_input = data_tensor.clone()
        imputation_input[torch.tensor(nan_mask)] = 0
        reconstructed = model(imputation_input)
        original_tensor = torch.tensor(original_data_np, dtype=torch.float32)
        data_tensor = torch.where(torch.isnan(original_tensor), reconstructed, original_tensor)
        print("Imputed data sample:", data_tensor[0])
except Exception as e:
    print(f"Ошибка в нейросетевой обработке: {e}")
    messagebox.showerror("Neural Network Error", f"Failed in neural network processing: {e}")
    exit(1)

# Функция для отображения реконструированных данных
def show_reconstructed_data():
    try:
        print("Attempting to display reconstructed data window...")
        recon_window = tk.Tk()  # Use Tk instead of Toplevel to ensure a root window
        recon_window.title("Reconstructed Data")
        
        # Создаем Treeview для отображения данных в таблице
        tree = ttk.Treeview(recon_window, columns=['Name'] + characteristic_fields, show='headings')
        tree.heading('Name', text='Component Name')
        for field in characteristic_fields:
            tree.heading(field, text=field)
        tree.column('Name', width=150)
        for field in characteristic_fields:
            tree.column(field, width=100)
        
        # Заполняем таблицу данными
        for i, (name, row) in enumerate(zip(names, data_tensor.numpy())):
            values = [name] + [f"{val:.6f}" for val in row]
            tree.insert('', tk.END, values=values)
        
        tree.pack(fill=tk.BOTH, expand=True, padx=10, pady=10)
        
        # Кнопка для продолжения
        tk.Button(recon_window, text="Continue to Optimization", 
                 command=lambda: [recon_window.destroy(), create_main_gui()]).pack(pady=10)
        
        print("Reconstructed data window created, starting mainloop...")
        recon_window.mainloop()
    except Exception as e:
        print(f"Ошибка при отображении реконструированных данных: {traceback.format_exc()}")
        messagebox.showerror("GUI Error", f"Failed to display reconstructed data: {e}\nProceeding to main GUI...")
        create_main_gui()  # Fallback to main GUI

# Функция расчета характеристик смеси
def calculate_mixture(indices, ratios):
    mixture_data = sum(r * data_tensor[i] for i, r in zip(indices, ratios))
    return mixture_data

# Оптимизация смеси
def optimize_mixture():
    try:
        num_components = int(num_components_var.get())
        primary_component = primary_component_var.get()
        min_concentration = float(min_concentration_var.get()) / 100.0

        if num_components < 2 or num_components > len(names):
            messagebox.showerror("Error", "Invalid number of components.")
            return
        if not primary_component:
            messagebox.showerror("Error", "Please select a primary component.")
            return
        if min_concentration < 0 or min_concentration > 100:
            messagebox.showerror("Error", "Minimum concentration must be between 0 and 100%.")
            return

        user_target = torch.tensor([float(e.get()) for e in entries], dtype=torch.float32)
        boundary_values = torch.tensor([float(e.get()) for e in min_entries], dtype=torch.float32)
        comparison_type = [entry.get() for entry in comparison_entries]
        best_mixtures = []

        primary_index = np.where(names == primary_component)[0]
        if len(primary_index) == 0:
            messagebox.showerror("Error", f"Primary component '{primary_component}' not found.")
            return
        primary_index = primary_index[0]

        max_combinations = 5000
        other_indices = [i for i in range(len(names)) if i != primary_index]
        component_combos = []
        for combo in itertools.combinations(other_indices, num_components - 1):
            component_combos.append([primary_index] + list(combo))

        if len(component_combos) > max_combinations:
            np.random.shuffle(component_combos)
            component_combos = component_combos[:max_combinations]

        for combo_indices in component_combos:
            component_names = names[list(combo_indices)]

            def objective(ratios_raw):
                ratios = np.zeros(num_components)
                ratios[0] = max(min_concentration, ratios_raw[0])
                remaining_sum = 1 - ratios[0]
                if len(ratios_raw) > 1:
                    raw_sum = np.sum(ratios_raw[1:])
                    if raw_sum > 0:
                        ratios[1:] = (ratios_raw[1:] / raw_sum) * remaining_sum
                    else:
                        ratios[1:] = remaining_sum / (num_components - 1)
                else:
                    ratios[1] = remaining_sum

                if np.any(ratios < 0) or np.sum(ratios) > 1.0001 or np.sum(ratios) < 0.9999:
                    return 1e10
                mixture_data = calculate_mixture(combo_indices, ratios)
                loss = torch.sum((mixture_data - user_target) ** 2).item()
                return loss

            bounds = [(min_concentration, 1.0)] + [(0.0, 1.0)] * (num_components - 2)
            result = differential_evolution(objective, bounds, maxiter=100, popsize=15, tol=1e-5)

            if result.success and result.fun < 1e9:
                ratios_raw = result.x
                ratios = np.zeros(num_components)
                ratios[0] = max(min_concentration, ratios_raw[0])
                remaining_sum = 1 - ratios[0]
                if len(ratios_raw) > 1:
                    raw_sum = np.sum(ratios_raw[1:])
                    if raw_sum > 0:
                        ratios[1:] = (ratios_raw[1:] / raw_sum) * remaining_sum
                    else:
                        ratios[1:] = remaining_sum / (num_components - 1)
                else:
                    ratios[1] = remaining_sum
                mixture_data = calculate_mixture(combo_indices, ratios)
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
        print(f"Ошибка в оптимизации: {traceback.format_exc()}")
        messagebox.showerror("Optimization Error", f"Optimization failed: {e}")

# Создание основного GUI
def create_main_gui():
    try:
        print("Creating main GUI...")
        global root, num_components_var, primary_component_var, min_concentration_var, entries, min_entries, comparison_entries
        
        root = tk.Tk()
        root.title("Blend optimization")

        tk.Label(root, text="Number of components:").grid(row=0, column=0)
        num_components_var = tk.StringVar(value="2")
        num_components_combobox = ttk.Combobox(
            root, textvariable=num_components_var, values=list(range(2, min(len(names) + 1, 6))), state="readonly"
        )
        num_components_combobox.grid(row=0, column=1)

        tk.Label(root, text="Primary component:").grid(row=1, column=0)
        primary_component_var = tk.StringVar()
        primary_component_combobox = ttk.Combobox(
            root, textvariable=primary_component_var, values=list(names), state="readonly"
        )
        primary_component_combobox.grid(row=1, column=1)

        tk.Label(root, text="Min concentration (%):").grid(row=2, column=0)
        min_concentration_var = tk.StringVar(value="10")
        min_concentration_entry = tk.Entry(root, textvariable=min_concentration_var)
        min_concentration_entry.grid(row=2, column=1)

        tk.Label(root, text="Enter the target characteristics:").grid(row=3, column=0, columnspan=3)
        entries = []
        min_entries = []
        comparison_entries = []

        for i, field in enumerate(characteristic_fields):
            tk.Label(root, text=field).grid(row=i+4, column=0)
            entry = tk.Entry(root)
            entry.grid(row=i+4, column=1)
            entries.append(entry)
            
            min_entry = tk.Entry(root)
            min_entry.grid(row=i+4, column=2)
            min_entries.append(min_entry)
            
            comparison_var = tk.StringVar(value="min")
            comparison_radio_min = tk.Radiobutton(root, text="Min", variable=comparison_var, value="min")
            comparison_radio_min.grid(row=i+4, column=3)
            comparison_radio_max = tk.Radiobutton(root, text="Max", variable=comparison_var, value="max")
            comparison_radio_max.grid(row=i+4, column=4)
            comparison_entries.append(comparison_var)

        tk.Button(root, text="Optimize", command=optimize_mixture).grid(row=len(entries)+4, column=0, columnspan=5)
        print("Main GUI created, starting mainloop...")
        root.mainloop()
    except Exception as e:
        print(f"Ошибка при создании основного GUI: {traceback.format_exc()}")
        messagebox.showerror("GUI Error", f"Failed to create main GUI: {e}")

# Запуск программы
if __name__ == "__main__":
    try:
        print("Starting application...")
        show_reconstructed_data()
    except Exception as e:
        print(f"Критическая ошибка при запуске программы: {traceback.format_exc()}")
        messagebox.showerror("Startup Error", f"Application failed to start: {e}")