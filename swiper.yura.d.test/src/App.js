import React, { useState } from 'react';
import './App.css';

const jsonData = [
  {
    "name": "text",
    "type": "text",
    "validation": "^[A-Za-z]+$",
    "value": "",
    "placeholder": "Enter name game"
  },
  {
    "name": "longtext",
    "type": "longtext",
    "value": "",
    "placeholder": "Enter a description of game"
  },
  {
    "name": "dropdown",
    "type": "dropdown",
    "options": ["Shooter", "Racing", "PRG", "Strategy", "Adventure"],
    "value": "",
    "placeholder": "Select type of game"
  },
  {
    "name": "number",
    "type": "number",
    "min_value": 12,
    "max_value": 100,
    "default_value": 0,
    "placeholder": "Enter the age limit for the game"
  },
  {
    "name": "boolean",
    "type": "boolean",
    "default_value": false,
    "placeholder": "Select true or false"
  }
];

function App() {
  const [formData, setFormData] = useState({});
  const [formValues, setFormValues] = useState({});

  const handleChange = (name, value) => {
    const fieldData = jsonData.find((field) => field.name === name);
  
    if (fieldData) {
      if (fieldData.type === 'text') {
        if (fieldData.validation && !new RegExp(fieldData.validation).test(value)) {
          alert(`Invalid ${name}! Please follow the validation rules.`);
          return;
        }
      }
  
      if (fieldData.type === 'number') {
        const numValue = parseFloat(value);
        setFormData({
          ...formData,
          [name]: numValue,
        });
        return;
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
                value={formData[fieldData.name]} 
                placeholder={fieldData.placeholder}
                min={fieldData.min_value}
                max={fieldData.max_value}
              />
            )}
            {fieldData.type === 'boolean' && (
              <input
                type="checkbox"
                name={fieldData.name}
                onChange={(e) => handleChange(fieldData.name, e.target.checked)}
                checked={formData[fieldData.name] || false}
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
