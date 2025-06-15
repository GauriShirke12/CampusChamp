import React, { useEffect, useState } from "react";
import axios from "axios";

const InvitesPage = () => {
  const [invites, setInvites] = useState([]);

  const fetchInvites = async () => {
    try {
      const res = await axios.get("/api/invite", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setInvites(res.data);
    } catch (err) {
      console.error("Failed to fetch invites", err);
    }
  };

  const respondToInvite = async (id, status) => {
    try {
      await axios.put(
        `/api/invite/${id}/respond`,
        { status },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      fetchInvites(); // refresh list after action
    } catch (err) {
      console.error("Failed to respond", err);
    }
  };

  useEffect(() => {
    fetchInvites();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">📨 Team Invites</h1>

      {invites.length === 0 ? (
        <p>No invites yet.</p>
      ) : (
        invites.map((invite) => (
          <div
            key={invite._id}
            className="border p-4 mb-4 rounded-lg shadow-md bg-white"
          >
            <h2 className="font-semibold">
              From: {invite.inviter.name} ({invite.inviter.collegeName})
            </h2>
            <p>Hackathon: {invite.hackathonId?.title || "Unknown"}</p>
            <p>Skills: {invite.inviter.skills.join(", ")}</p>
            <p>Roles: {invite.inviter.rolePreferences.join(", ")}</p>
            <p>Status: <strong>{invite.status}</strong></p>

            {invite.status === "pending" && (
              <div className="mt-3 flex gap-3">
                <button
                  onClick={() => respondToInvite(invite._id, "accepted")}
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  Accept
                </button>
                <button
                  onClick={() => respondToInvite(invite._id, "rejected")}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Reject
                </button>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default InvitesPage;