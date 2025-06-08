
import { useState } from 'react';
import axios from 'axios';

export default function TeamBuilderForm({ studentId }) {
  const [skills, setSkills] = useState([]);
  const [roles, setRoles] = useState([]);

  const allSkills = ["React", "Node.js", "Figma", "C++", "Python", "MongoDB"];
  const allRoles = ["Frontend", "Backend", "Designer", "Team Lead", "DevOps"];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/student/${studentId}`, {
        skills,
        rolePreferences: roles,
      });
      alert("Profile updated! Now find teammates");
    } catch (err) {
      console.error("Update error:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white rounded-lg shadow-md space-y-4">
      <div>
        <label className="font-semibold">Select your Skills</label>
        <div className="flex flex-wrap gap-2 mt-2">
          {allSkills.map(skill => (
            <button
              key={skill}
              type="button"
              onClick={() =>
                setSkills(prev => prev.includes(skill)
                  ? prev.filter(s => s !== skill)
                  : [...prev, skill])
              }
              className={`px-3 py-1 rounded-full border ${
                skills.includes(skill) ? "bg-blue-500 text-white" : "bg-gray-100"
              }`}
            >
              {skill}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="font-semibold">Role Preferences</label>
        <div className="flex flex-wrap gap-2 mt-2">
          {allRoles.map(role => (
            <button
              key={role}
              type="button"
              onClick={() =>
                setRoles(prev => prev.includes(role)
                  ? prev.filter(r => r !== role)
                  : [...prev, role])
              }
              className={`px-3 py-1 rounded-full border ${
                roles.includes(role) ? "bg-green-500 text-white" : "bg-gray-100"
              }`}
            >
              {role}
            </button>
          ))}
        </div>
      </div>

      <button type="submit" className="bg-black text-white px-4 py-2 rounded-md">
        Save & Proceed
      </button>
    </form>
  );
}
