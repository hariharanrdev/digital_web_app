import React, { useState } from 'react';
import Confetti from 'react-confetti';

const Step4 = ({ selectedProduct, formData }) => {
  const [isPurchased, setIsPurchased] = useState(false);

  if (!selectedProduct) {
    return (
      <div className="step-container">
        <h1>No Product Selected</h1>
        <p>Please go back and select a photography package.</p>
      </div>
    );
  }

  const handlePurchase = () => {
    // Create a purchase object without the actual photo data
    const purchaseData = {
      name: formData.name,
      description: formData.description,
      photos: formData.photos?.map(photo => ({
        name: photo?.name || 'photo',
        size: photo?.size || 0,
        type: photo?.type || 'image/jpeg'
      })),
      selectedProduct: {
        id: selectedProduct.id,
        name: selectedProduct.name,
        title: selectedProduct.title,
        price: selectedProduct.price
      },
      purchaseDate: new Date().toLocaleString()
    };

    try {
      // Save to purchase history
      const existingHistory = JSON.parse(localStorage.getItem('purchaseHistory') || '[]');
      const updatedHistory = [...existingHistory, purchaseData];
      localStorage.setItem("purchaseHistory", JSON.stringify(updatedHistory));
      
      // Save minimal data as previous purchase
      localStorage.setItem("previousPurchase", JSON.stringify({
        productId: selectedProduct.id,
        name: formData.name,
        date: new Date().toLocaleString()
      }));

      setIsPurchased(true);
    } catch (error) {
      console.error("Storage error:", error);
      // Fallback: Store only essential data
      localStorage.setItem("previousPurchase", JSON.stringify({
        productId: selectedProduct.id,
        date: new Date().toISOString().split('T')[0]
      }));
      setIsPurchased(true);
    }
  };

  return (
    <div className="step-container">
      {isPurchased && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={500}
        />
      )}
      
      <h1>{isPurchased ? 'Booking Confirmed!' : 'Review Your Booking'}</h1>
      
      {isPurchased ? (
        <div className="purchase-confirmation">
          <div className="checkmark-circle">
            <svg className="checkmark" viewBox="0 0 24 24">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
          <h2 className="purchase-success-text">Thank You For Your Booking!</h2>
          <p>We've sent a confirmation to your email.</p>

          <div className="booking-details">
            <h3>Booking Summary</h3>
            <div className="detail-section">
              <h4>Couple Information</h4>
              <p><strong>Names:</strong> {formData.name || 'Not provided'}</p>
              <p><strong>Wedding Description:</strong> {formData.description || 'Not provided'}</p>
              {formData.photos && formData.photos.length > 0 && (
                <div className="photo-preview">
                  <h5>Uploaded Photos:</h5>
                  <div className="photo-grid">
                    {formData.photos.map((photo, index) => (
                      photo.preview && (
                        <img
                          key={index}
                          src={photo.preview}
                          alt={`Uploaded ${index + 1}`}
                          className="photo-preview-img"
                        />
                      )
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="detail-section">
              <h4>Selected Package</h4>
              <p><strong>Photographer:</strong> {selectedProduct.name}</p>
              <p><strong>Package:</strong> {selectedProduct.title}</p>
              <p><strong>Price:</strong> ${selectedProduct.price.toFixed(2)}</p>
              {selectedProduct.description && (
                <p><strong>Description:</strong> {selectedProduct.description}</p>
              )}
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="booking-details">
            <h3>Review Your Booking Details</h3>
            
            <div className="detail-section">
              <h4>Couple Information</h4>
              <p><strong>Names:</strong> {formData.name || 'Not provided'}</p>
              <p><strong>Wedding Description:</strong> {formData.description || 'Not provided'}</p>
              {formData.photos && formData.photos.length > 0 && (
                <div className="photo-preview">
                  <h5>Uploaded Photos:</h5>
                  <div className="photo-grid">
                    {formData.photos.map((photo, index) => (
                      photo.preview && (
                        <img
                          key={index}
                          src={photo.preview}
                          alt={`Uploaded ${index + 1}`}
                          className="photo-preview-img"
                        />
                      )
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            <div className="detail-section">
              <h4>Selected Photography Package</h4>
              <p><strong>Photographer:</strong> {selectedProduct.name}</p>
              <p><strong>Package:</strong> {selectedProduct.title}</p>
              <p><strong>Price:</strong> ${selectedProduct.price.toFixed(2)}</p>
              {selectedProduct.description && (
                <p><strong>Description:</strong> {selectedProduct.description}</p>
              )}
            </div>
          </div>
          
          <button 
            className={`purchase-button ${isPurchased ? 'purchased' : ''}`} 
            onClick={handlePurchase}
          >
            Confirm Booking for ${selectedProduct.buyPrice?.toFixed(2) || selectedProduct.price.toFixed(2)}
          </button>
        </>
      )}
    </div>
  );
};

export default Step4;