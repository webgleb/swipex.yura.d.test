import React, { useState } from 'react';
import './App.css';

const jsonData = [
  {
    id: "text-type",
    "name": "text",
    "type": "text",
    "validation": "^[A-Za-z]+$",
    "value": "",
    "placeholder": "Enter name game"
  },
  {
    id: "longtext-type",
    "type": "longtext",
    "value": "",
    "placeholder": "Enter a description of game"
  },
  {
    id: "dropdown-type",
    "type": "dropdown",
    "options": ["Shooter", "Racing", "PRG", "Strategy", "Adventure"],
    "value": "",
    "placeholder": "Select type of game"
  },
  {
    id: "number-type",
    "type": "number",
    "min_value": 12,
    "max_value": 100,
    "default_value": 12,
    "placeholder": "Enter the age limit for the game"
  },
  {
    id: "boolean-type",
    "type": "boolean",
    "default_value": false,
    "placeholder": "Select true or false"
  }
];

function App() {
  const initialFormData = {};
  jsonData.forEach((fieldData) => {
    if (fieldData.type === 'number') {
      initialFormData[fieldData.id] = fieldData.default_value || 12;
    }  
    if (fieldData.type === 'boolean') {
      initialFormData[fieldData.id] = fieldData.default_value || false;
    } 
    initialFormData[fieldData.id] = '';
  });

  const [formData, setFormData] = useState(initialFormData);
  const [formValues, setFormValues] = useState({});

  const handleChange = (id, value) => {
    const fieldData = jsonData.find((field) => field.id === id);
  
    if (fieldData) {
      if (fieldData.type === 'text') {
        if (fieldData.validation && !new RegExp(fieldData.validation).test(value)) {
          alert(`Invalid ${fieldData.id}! Please follow the validation rules.`);
        }
      }
  
      if (fieldData.type === 'number') {
        const numValue = parseFloat(value);
        setFormData({
          ...formData,
          [id]: numValue,
        });
      }
    }
  
    setFormData({
      ...formData,
      [id]: value,
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
                name={fieldData.id}
                onChange={(e) => handleChange(fieldData.id, e.target.value)}
                value={formData[fieldData.id] || ''}
                placeholder={fieldData.placeholder}
             />
            )}
            {fieldData.type === 'longtext' && (
              <textarea
                name={fieldData.id}
                onChange={(e) => handleChange(fieldData.id, e.target.value)}
                value={formData[fieldData.id] || ''}
                placeholder={fieldData.placeholder}
              />
            )} 
             {fieldData.type === 'dropdown' && (
              <select
                name={fieldData.id}
                onChange={(e) => handleChange(fieldData.id, e.target.value)}
                value={formData[fieldData.id] || ''}
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
                name={fieldData.id}
                onChange={(e) => handleChange(fieldData.id, e.target.value)}
                value={formData[fieldData.id]} 
                placeholder={fieldData.placeholder}
                min={fieldData.min_value}
                max={fieldData.max_value}
              />
            )}
            {fieldData.type === 'boolean' && (
              <input
                type="checkbox"
                name={fieldData.id}
                onChange={(e) => handleChange(fieldData.id, e.target.checked)}
                checked={formData[fieldData.id]}
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
