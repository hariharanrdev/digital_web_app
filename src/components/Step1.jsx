import React, { useState, useEffect } from 'react';

const Step1 = ({ formData, setFormData, nextStep }) => {
  const [photos, setPhotos] = useState([]);
  const [purchaseHistory, setPurchaseHistory] = useState([]);
  const [photoPreviews, setPhotoPreviews] = useState([]);

  useEffect(() => {
    const savedHistory = localStorage.getItem('purchaseHistory');
    if (savedHistory) {
      setPurchaseHistory(JSON.parse(savedHistory));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePhotoUpload = (e, index) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.match('image.*')) {
      alert('Please select an image file');
      return;
    }

    const reader = new FileReader();
    reader.onload = (upload) => {
      const newPhotoPreviews = [...photoPreviews];
      newPhotoPreviews[index] = upload.target.result;
      setPhotoPreviews(newPhotoPreviews);

      const newPhotos = [...photos];
      newPhotos[index] = {
        name: file.name,
        size: file.size,
        type: file.type,
        lastModified: file.lastModified,
        preview: upload.target.result // Store preview URL temporarily
      };
      setPhotos(newPhotos);
      setFormData(prev => ({
        ...prev,
        photos: newPhotos.filter(photo => photo !== undefined)
      }));
    };
    reader.readAsDataURL(file);
  };

  // ... rest of the Step1 component remains the same ...

  const deletePurchase = (index) => {
    const newHistory = [...purchaseHistory];
    newHistory.splice(index, 1);
    setPurchaseHistory(newHistory);
    localStorage.setItem('purchaseHistory', JSON.stringify(newHistory));
  };

  return (
    <div className="step-container">
      <h1>About Your Wedding</h1>
      <p className="subtitle">Tell us about your special day</p>
      
      <div>
        <label>Couple's Names</label>
        <input
          type="text"
          name="name"
          value={formData.name || ''}
          onChange={handleChange}
          placeholder="E.g. Sarah & Michael"
        />
      </div>
      <div>
        <label>Wedding Description</label>
        <textarea
          name="description"
          value={formData.description || ''}
          onChange={handleChange}
          rows="4"
          placeholder="Tell us about your wedding vision, theme, and special requests..."
        />
      </div>
      <div>
        <label className="character-limit">Character Limit: 2000</label>
      </div>
      <div>
        <label>Cover Photos (Upload up to 5 photos)</label>
        <div className="photo-upload">
          {[0, 1, 2, 3, 4].map((index) => (
            <label key={index} className="upload-box">
              {photoPreviews[index] ? (
                <img 
                  src={photoPreviews[index]} 
                  alt={`Uploaded ${index}`}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: '6px'
                  }}
                />
              ) : (
                <>
                  <span>+</span>
                  <input
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={(e) => handlePhotoUpload(e, index)}
                  />
                </>
              )}
            </label>
          ))}
        </div>
      </div>
      <div>
        <label>Budget Estimate ($)</label>
        <input
          type="number"
          name="price"
          value={formData.price || ''}
          onChange={handleChange}
          placeholder="Enter your estimated budget"
        />
      </div>

      {purchaseHistory.length > 0 && (
        <div className="purchase-history-section">
          <h2>Your Purchase History</h2>
          <div className="history-items">
            {purchaseHistory.map((purchase, index) => (
              <div key={index} className="history-item">
                <div className="history-content">
                  <h3>{purchase.selectedProduct.name}</h3>
                  <p>Booked on: {purchase.purchaseDate}</p>
                  <p>Price: ${purchase.selectedProduct.price.toFixed(2)}</p>
                </div>
                <button 
                  className="delete-button"
                  onClick={() => deletePurchase(index)}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <button onClick={nextStep}>Next</button>
    </div>
  );
};

export default Step1;