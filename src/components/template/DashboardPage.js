import styles from "@/template/DashboardPage.module.css";
function DashboardPage({ createdAt }) {
  console.log(createdAt);
  return (
    <div className={styles.container}>
      <h3>سلام</h3>
      <p>آگهی خود را ثبت کنید تا هزاران نفر آن را ببینند</p>
      <div className={styles.createdAt}>
        <p>تاریخ عضویت:</p>
        <span>{new Date(createdAt).toLocaleDateString("fa-IR")}</span>
      </div>
    </div>
  );
}

export default DashboardPage;
