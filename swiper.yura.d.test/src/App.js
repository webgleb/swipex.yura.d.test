import React, { useState } from 'react';
import './App.css';

const jsonData = [
  {
    "name": "name",
    "type": "text",
    "validation": "^[A-Za-z]+$",
    "value": "",
    "placeholder": "Enter name game"
  },
  {
    "name": "description",
    "type": "longtext",
    "value": "",
    "placeholder": "Enter a description of game"
  },
  {
    "name": "type",
    "type": "dropdown",
    "options": ["Shooter", "Racing", "PRG", "Strategy", "Adventure"],
    "value": "",
    "placeholder": "Select type of game"
  },
  {
    "name": "age",
    "type": "number",
    "min_value": 12,
    "max_value": 100,
    "value": "",
    "placeholder": "Enter the age limit for the game"
  }
];

function App() {
  const [formData, setFormData] = useState({});
  const [formValues, setFormValues] = useState({});

  const handleChange = (name, value) => {
    const fieldData = jsonData.find((field) => field.name === name);
  
    if (fieldData) {
      if (fieldData.type === 'text' || fieldData.type === 'longtext') {
        if (fieldData.validation && !new RegExp(fieldData.validation).test(value)) {
          alert(`Invalid ${name}! Please follow the validation rules.`);
          return;
        }
      }
  
      if (fieldData.type === 'number') {
        const numValue = parseFloat(value);
        if (
          (fieldData.min_value !== undefined && numValue < fieldData.min_value) ||
          (fieldData.max_value !== undefined && numValue > fieldData.max_value)
        ) {
          alert(`Invalid ${name}! Please enter a valid number within the specified range.`);
          return;
        }
      }
    }
  
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormValues(formData);
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        {jsonData.map((fieldData, index) => (
          <div key={index} className="form-field">
            <label>{fieldData.placeholder}</label>
            {fieldData.type === 'text' && (
              <input
                type="text"
                name={fieldData.name}
                onChange={(e) => handleChange(fieldData.name, e.target.value)}
                value={formData[fieldData.name] || ''}
                placeholder={fieldData.placeholder}
              />
            )}
            {fieldData.type === 'longtext' && (
              <textarea
                name={fieldData.name}
                onChange={(e) => handleChange(fieldData.name, e.target.value)}
                value={formData[fieldData.name] || ''}
                placeholder={fieldData.placeholder}
              />
            )} 
             {fieldData.type === 'dropdown' && (
              <select
                name={fieldData.name}
                onChange={(e) => handleChange(fieldData.name, e.target.value)}
                value={formData[fieldData.name] || ''}
              >
                <option value="">{fieldData.placeholder}</option>
                {fieldData.options.map((option, optionIndex) => (
                  <option key={optionIndex} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            )}
            {fieldData.type === 'number' && (
              <input
                type="number"
                name={fieldData.name}
                onChange={(e) => handleChange(fieldData.name, e.target.value)}
                value={formData[fieldData.name] || ''}
                placeholder={fieldData.placeholder}
                min={fieldData.min_value}
                max={fieldData.max_value}
              />
            )}  
          </div>
        ))}
        <div className="button-container">
          <button type="submit">Submit</button>
        </div>
      </form>
      <div className="result">
        <h2>Form Values:</h2>
        <pre>{JSON.stringify(formValues, null, 2)}</pre>
      </div>
    </div>
  );
}

export default App;
