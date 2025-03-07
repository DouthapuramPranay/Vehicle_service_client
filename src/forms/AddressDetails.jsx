import React from 'react';
import './AddressDetails.css';

const AddressDetails = ({ formData, setFormData, nextStep }) => {
  return (
    <div className="address-details-container">
      <h2>Address Details</h2>
      <input
        type="text"
        placeholder="Street"
        value={formData.street}
        onChange={(e) => setFormData({ ...formData, street: e.target.value })}
        className="address-input"
      />
      <input
        type="text"
        placeholder="City"
        value={formData.city}
        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
        className="address-input"
      />
      <input
        type="text"
        placeholder="State"
        value={formData.state}
        onChange={(e) => setFormData({ ...formData, state: e.target.value })}
        className="address-input"
      />
      <input
        type="text"
        placeholder="ZIP Code"
        value={formData.zip}
        onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
        className="address-input"
      />
      <button onClick={nextStep} className="address-button">Next</button>
    </div>
  );
};

export default AddressDetails;
