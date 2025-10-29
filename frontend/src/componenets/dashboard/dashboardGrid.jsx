import DashboardBox from "./dashboardBox";

function DashboardGrid() {
  return (
    <section className="dashboard-grid">
      <DashboardBox title="대" />
      <DashboardBox title="시" />
      <DashboardBox title="보" />
      <DashboardBox title="드" />
    </section>
  );
}

export default DashboardGrid;