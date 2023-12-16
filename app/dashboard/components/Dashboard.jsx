import React from "react";

const Dashboard = ({ users = [] }) => {
  const date = new Date();
  return (
    <div>
      <div>Dashboard</div>
      {date.toLocaleTimeString()}
      <div
        // onClick={() => console.log("hello")}
        className="dashboard-container "
      >
        {users.map((item) => (
          <>
            <h1>{item.id}</h1>
            <h1>{item.title}</h1>
          </>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
