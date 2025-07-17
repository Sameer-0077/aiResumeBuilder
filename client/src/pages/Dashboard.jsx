import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Dashboard() {
  const location = useLocation();
  const naviagte = useNavigate();
  const { user } = location.state || {};

  useEffect(() => {
    if (!user) naviagte("/login");
  }, [user, naviagte]);

  if (!user) return null;

  return (
    <div>
      <h1 className="text-3xl font-bold text-center mt-6">Dashboard</h1>
      <h3 className="text-xl font-bold text-center mt-6">Hey</h3>
      <h2 className="text-2xl font-bold text-center">{`${user.name}, Welcome to AiResumeBuilder`}</h2>
    </div>
  );
}

export default Dashboard;
