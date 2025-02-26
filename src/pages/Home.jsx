import React from "react";
import FlowChart from "../components/FlowChart";

function Home() {
  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Interactive Flow Chart</h2>
      <div style={{ height: "90vh", width: "100%" }}>
      <FlowChart />
      </div>
    </div>
  );
}

export default Home;
