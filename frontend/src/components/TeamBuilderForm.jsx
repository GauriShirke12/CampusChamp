import React, { useState, useEffect } from "react";
import axios from "axios";

const skillOptions = ["React", "Node.js", "Python", "MongoDB", "Figma", "Java", "next.js", "ML", "cyber security", "UI/UX"];
const roleOptions = ["Frontend", "Backend", "Designer", "DevOps", "Data Analyst" , "AI-ML"];

export default function TeamBuilderForm({ user, token, onSuccess }) {
  const [skills, setSkills] = useState([]);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleCheckbox = (value, list, setList) => {
    if (list.includes(value)) {
      setList(list.filter((item) => item !== value));
    } else {
      setList([...list, value]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (skills.length === 0 || roles.length === 0) {
      setMessage("Please select at least one skill and one role.");
      return;
    }

    setLoading(true);
    try {
      await axios.put(
        "/api/student/profile",
        { skills, rolePreferences: roles },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage("Profile updated successfully!");
      onSuccess(); // Navigate to match screen
    } catch (error) {
      console.error(error);
      setMessage("Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">🎯 Build Your Profile for Team Matching</h2>

      {message && <p className="text-center text-red-500 mb-2">{message}</p>}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block font-semibold mb-2">Your Skills:</label>
          <div className="flex flex-wrap gap-2">
            {skillOptions.map((skill) => (
              <label key={skill} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={skills.includes(skill)}
                  onChange={() => handleCheckbox(skill, skills, setSkills)}
                  className="accent-blue-600"
                />
                <span>{skill}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block font-semibold mb-2">Preferred Roles:</label>
          <div className="flex flex-wrap gap-2">
            {roleOptions.map((role) => (
              <label key={role} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={roles.includes(role)}
                  onChange={() => handleCheckbox(role, roles, setRoles)}
                  className="accent-blue-600"
                />
                <span>{role}</span>
              </label>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition"
        >
          {loading ? "Saving..." : "Save & Find Teammates"}
        </button>
      </form>
    </div>
  );
}
