import { Link } from "react-router-dom";

<Link to="/invites" className="text-blue-600 underline">View Team Invites</Link>
import { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [invites, setInvites] = useState([]);
  const [team, setTeam] = useState(null);

  useEffect(() => {
    fetchInvites();
    fetchTeam(); // Optional: show current team if formed
  }, []);

  const fetchInvites = async () => {
    const res = await axios.get("/api/invites/my-invites", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    setInvites(res.data);
  };

  const fetchTeam = async () => {
    const res = await axios.get("/api/teams/my-team", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    setTeam(res.data);
  };

  const respondToInvite = async (id, status) => {
    await axios.put(`/api/invites/respond/${id}`, { status }, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    fetchInvites();
    fetchTeam();
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-3">🔔 Pending Invites</h2>
      {invites.length === 0 && <p>No invites at the moment.</p>}
      {invites.map(invite => (
        <div key={invite._id} className="border p-2 mb-2 rounded shadow">
          <p><strong>From:</strong> {invite.inviter.name}</p>
          <p><strong>Event:</strong> {invite.hackathonTitle}</p>
          <button
            className="bg-green-500 text-white px-3 py-1 mr-2 rounded"
            onClick={() => respondToInvite(invite._id, "accepted")}
          >
            Accept
          </button>
          <button
            className="bg-red-500 text-white px-3 py-1 rounded"
            onClick={() => respondToInvite(invite._id, "rejected")}
          >
            Reject
          </button>
        </div>
      ))}

      {team && (
        <div className="mt-6">
          <h2 className="text-xl font-bold">👥 Your Hackathon Team</h2>
          <ul className="list-disc ml-5">
            {team.members.map(member => (
              <li key={member._id}>{member.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};



export default Dashboard;
