import styles from "@/module/Sidebar.module.css";
import Link from "next/link";
import { categories } from "@/constant/strings";
import { HiFilter } from "react-icons/hi";
function Sidebar() {
  return (
    <div className={styles.container}>
      <p>
        <HiFilter />
        دسته بندی
      </p>

      <Link href="/buy-residential">همه</Link>
      {Object.keys(categories).map((i) => (
        <Link
          key={i}
          href={{
            pathname: "/buy-residential",
            query: { category: i },
          }}
        >
          {categories[i]}
        </Link>
      ))}
    </div>
  );
}

export default Sidebar;
