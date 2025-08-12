import { useState } from "react";
// import "./data-conteiner__select--engine.css";

const CustomSelect = ({ formData, handleInputChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const options = [
    { value: "", label: "Выберите тип двигателя", disabled: true },
    { value: "gasturbine", label: "Газотурбинный" },
    { value: "turbojet", label: "Турбореактивный" },
    { value: "piston_gasoline", label: "Поршневой бензин" },
    { value: "piston_diesel", label: "Поршневой дизель" },
    { value: "ramjet", label: "Прямоточный воздушно-реактивный" },
    { value: "liquid_rocket", label: "Жидкостный ракетный" },
    { value: "solid_rocket", label: "Твердотопливный ракетный" },
  ];

  const handleSelect = (option) => {
    if (!option.disabled) {
      handleInputChange({ target: { name: "engineType", value: option.value } });
      setIsOpen(false);
    }
  };

  return (
    <div className="data-conteiner__select--engine">
      <div
        className="data-conteiner__select-control"
        onClick={() => setIsOpen(!isOpen)}
      >
        {formData.engineType
          ? options.find((opt) => opt.value === formData.engineType)?.label
          : "Выберите тип двигателя"}
      </div>
      {isOpen && (
        <ul className="data-conteiner__select-menu">
          {options.map((option) => (
            <li
              key={option.value}
              className={`data-conteiner__select-option ${
                option.disabled ? "disabled" : ""
              } ${formData.engineType === option.value ? "selected" : ""}`}
              onClick={() => handleSelect(option)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomSelect;