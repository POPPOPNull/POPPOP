import DashboardCard from "./dashboardCard";

function DashboardTop() {
  // 데이터 확정 전이라서 빈 틀만
  return (
    <section className="dashboard-top">
      <DashboardCard />
      <DashboardCard />
      <DashboardCard />
      <DashboardCard />
    </section>
  );
}

export default DashboardTop;