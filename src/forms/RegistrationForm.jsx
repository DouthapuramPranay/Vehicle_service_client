import React, { useState } from "react";
import AddressDetails from "./AddressDetails";
import LanguageDetails from "./LanguageDetails";
import Credentials from "./Credentials";
import PersonalDetails from "./PersonalDetails";

import axios from "axios";
import { useNavigate } from "react-router-dom";

const RegistrationForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    languages: [],
    username: "",
    password: "",
  });

  const [step, setStep] = useState(0);

  const nextStep = () => setStep(step + 1);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Send the form data to the backend
      const response = await axios.post(
        "https://vehicle-service-management-server.onrender.com/users",
        formData
      );
      console.log("User registered successfully:", response.data);
      navigate("/login"); // Redirect to the login page after successful registration
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <PersonalDetails
            formData={formData}
            setFormData={setFormData}
            nextStep={nextStep}
          />
        );
      case 1:
        return (
          <AddressDetails
            formData={formData}
            setFormData={setFormData}
            nextStep={nextStep}
          />
        );
      case 2:
        return (
          <LanguageDetails
            formData={formData}
            setFormData={setFormData}
            nextStep={nextStep}
          />
        );
      case 3:
        return (
          <Credentials
            formData={formData}
            setFormData={setFormData}
            handleSubmit={handleSubmit}
          />
        );
      default:
        return (
          <PersonalDetails
            formData={formData}
            setFormData={setFormData}
            nextStep={nextStep}
          />
        );
    }
  };

  return <div>{renderStep()}</div>;
};

export default RegistrationForm;