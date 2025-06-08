import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const skillsOptions = ["React", "Node.js", "UI/UX", "MongoDB", "Python", "C++", "Figma"];
const rolesOptions = ["Frontend", "Backend", "Designer", "Project Manager", "DevOps"];

const TeamBuilderForm = () => {
  const [skills, setSkills] = useState([]);
  const [rolePreferences, setRolePreferences] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSelect = (value, setFunc, selected) => {
    if (selected.includes(value)) {
      setFunc(selected.filter((item) => item !== value));
    } else {
      setFunc([...selected, value]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.put(
        "/api/student/profile",
        { skills, rolePreferences },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // update if you use context
          },
        }
      );
      navigate("/team-builder/match");
    } catch (error) {
      console.error("Update failed:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-xl mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center">🧠 Your Skills & Role Preferences</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block font-medium mb-2">Skills</label>
          <div className="flex flex-wrap gap-2">
            {skillsOptions.map((skill) => (
              <button
                type="button"
                key={skill}
                onClick={() => handleSelect(skill, setSkills, skills)}
                className={`px-4 py-2 rounded-full border ${
                  skills.includes(skill)
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                {skill}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block font-medium mb-2">Role Preferences</label>
          <div className="flex flex-wrap gap-2">
            {rolesOptions.map((role) => (
              <button
                type="button"
                key={role}
                onClick={() => handleSelect(role, setRolePreferences, rolePreferences)}
                className={`px-4 py-2 rounded-full border ${
                  rolePreferences.includes(role)
                    ? "bg-green-500 text-white"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                {role}
              </button>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition"
          disabled={loading}
        >
          {loading ? "Saving..." : "Save & Find Teammates"}
        </button>
      </form>
    </div>
  );
};

export default TeamBuilderForm;
