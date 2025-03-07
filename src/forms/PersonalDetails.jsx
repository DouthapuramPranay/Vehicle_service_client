import React from 'react';
import './PersonalDetails.css'
const PersonalDetails = ({ formData, setFormData, nextStep }) => {
  return (
    <div className="personal-details-container">
      <h2>Personal Details</h2>
      <input
        type="text"
        placeholder="First Name"
        value={formData.firstName}
        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
      />
      <input
        type="text"
        placeholder="Last Name"
        value={formData.lastName}
        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
      />
      <input
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />
      <button onClick={nextStep}>Next</button>
    </div>
  );
};

export default PersonalDetails;
