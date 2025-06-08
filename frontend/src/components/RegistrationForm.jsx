
import React, { useState } from "react";
import axios from "axios";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    collegeOrOrganization: "",
    eventTitle: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    await axios.post("http://localhost:5000/api/register", formData);
    alert("Registration successful!");
  } catch (error) {
    console.error("Error submitting form:", error);
    alert("Failed to register");
  }
};

  return (
    <form onSubmit={handleSubmit}>
      <h2>Event Registration</h2>
      <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
      <input name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
      <input
        name="collegeOrOrganization"
        placeholder="College or Organization"
        value={formData.collegeOrOrganization}
        onChange={handleChange}
        required
      />
      <input name="eventTitle" placeholder="Event Title" value={formData.eventTitle} onChange={handleChange} required />
      <button type="submit">Register</button>
    </form>
  );
};

export default RegistrationForm;
