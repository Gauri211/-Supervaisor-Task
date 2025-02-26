import FlowChart from "../components/FlowChart";

function Home() {
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Interactive Flow Chart</h1>
      <div style={{ height: "90vh", width: "100%" }}>
      <FlowChart />
      </div>
    </div>
  );
}

export default Home;
