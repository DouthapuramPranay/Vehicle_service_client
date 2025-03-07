import React, { useState } from 'react';
import './LanguageDetails.css';

const LanguageDetails = ({ formData, setFormData, nextStep }) => {
  const [language, setLanguage] = useState('');

  const addLanguage = () => {
    if (language) {
      setFormData({ ...formData, languages: [...formData.languages, language] });
      setLanguage('');
    }
  };

  const removeLanguage = (index) => {
    const updatedLanguages = formData.languages.filter((_, i) => i !== index);
    setFormData({ ...formData, languages: updatedLanguages });
  };

  return (
    <div className="language-details-container">
      <h2>Language Details</h2>
      <input
        type="text"
        placeholder="Add Language"
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        className="language-input"
      />
      <button type="button" onClick={addLanguage} className="add-button">Add</button>
      <div className="language-list">
        {formData.languages.map((lang, index) => (
          <div key={index} className="language-item">
            {lang}
            <button
              type="button"
              className="remove-button"
              onClick={() => removeLanguage(index)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
      <button onClick={nextStep} className="next-button">Next</button>
    </div>
  );
};

export default LanguageDetails;
