import React from 'react';

const Step2 = ({ formData, setFormData, nextStep }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      benefits: {
        ...prev.benefits,
        [name]: value
      }
    }));
  };

  return (
    <div className="step-container">
      <h1>Additional Details</h1>
      <p className="subtitle">Help us understand your preferences</p>
      
      <div className="section">
        <h2>Preferences</h2>
        <div className="input-group">
          <label className="input-label">
            {/* Avoid talking about politics */}
            <input
              type="text"
              name="avoidPolitics"
              value={formData.benefits?.avoidPolitics || ''}
              onChange={handleInputChange}
              placeholder="Enter your preference"
            />
          </label>
          <label className="input-label">
            {/* Avoid talking about religion */}
            <input
              type="text"
              name="avoidReligion"
              value={formData.benefits?.avoidReligion || ''}
              onChange={handleInputChange}
              placeholder="Enter your preference"
            />
          </label>
        </div>
      </div>
      
      <div className="section">
        <h2>Additional Details</h2>
        <div className="grid-container">
          <div>
            <label>Styles</label>
            <input type="text" placeholder="E.g. Wedding Style" />
          </div>
          <div>
            <label>Tradition</label>
            <input type="text" placeholder="E.g. Bohemian" />
          </div>
          <div>
            <label>Venue</label>
            <input type="text" placeholder="E.g. Venue Type" />
          </div>
          <div>
            <label>Place</label>
            <input type="text" placeholder="E.g. Beach" />
          </div>
        </div>
      </div>
      <button onClick={nextStep}>Next</button>
    </div>
  );
};

export default Step2;