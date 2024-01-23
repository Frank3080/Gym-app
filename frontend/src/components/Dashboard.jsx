import React from "react";
import Calendar from "./Calendar";
import DashboardHeader from "./DashboardHeader";
import AddEventModal from "./AddEventModal";

const Dashboard = () => {
  return (
    <div>
      <DashboardHeader />
      <Calendar />
    </div>
  );
};

export default Dashboard;
