import React, { useState } from 'react';
import Step1 from './components/Step1';
import Step2 from './components/Step2';
import Step3 from './components/Step3';
import Step4 from './components/Step4';
import './styles.css';

function App() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [selectedProduct, setSelectedProduct] = useState(null);

  const nextStep = () => {
    setStep(prev => prev + 1);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <Step1 formData={formData} setFormData={setFormData} nextStep={nextStep} />;
      case 2:
        return <Step2 formData={formData} setFormData={setFormData} nextStep={nextStep} />;
      case 3:
        return <Step3 formData={formData} setSelectedProduct={setSelectedProduct} nextStep={nextStep} />;
      case 4:
        return <Step4 selectedProduct={selectedProduct} formData={formData} />;
      default:
        return <Step1 formData={formData} setFormData={setFormData} nextStep={nextStep} />;
    }
  };

  return (
    <div className="App">
      <header>
        <h1>Wedding Photography Service</h1>
        <div className="step-indicator">Step {step} of 4</div>
      </header>
      {renderStep()}
    </div>
  );
}

export default App;