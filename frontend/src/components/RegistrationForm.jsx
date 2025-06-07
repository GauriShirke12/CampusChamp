import React, { useState } from "react";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    college: "",
    branch: "",
    year: "",
  });

  const handleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>User Registration</h2>
      <form action="https://formspree.io/f/mdoqqbrq" method="POST">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          required
          value={formData.name}
          onChange={handleChange}
        /><br />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          required
          value={formData.email}
          onChange={handleChange}
        /><br />

        <input
          type="text"
          name="college"
          placeholder="College Name"
          required
          value={formData.college}
          onChange={handleChange}
        /><br />

        <input
          type="text"
          name="branch"
          placeholder="Branch"
          required
          value={formData.branch}
          onChange={handleChange}
        /><br />

        <input
          type="text"
          name="year"
          placeholder="Year"
          required
          value={formData.year}
          onChange={handleChange}
        /><br />

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegistrationForm;
