import { SiHomebridge } from "react-icons/si";
import { AiOutlinePhone } from "react-icons/ai";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { BiCalendarCheck } from "react-icons/bi";
import styles from "@/template/DetailesPage.module.css";
import { icons } from "@/constant/icons";
import ItemList from "@/module/ItemList";
import Title from "@/module/Title";
import { e2p, sp } from "@/utils/replaceNumber";
import ShareButton from "@/module/ShareButton";
import { categories } from "@/constant/strings";
function DetailesPage({ data }) {
  console.log(data);

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <h1>{data.title}</h1>
        <span>
          <HiOutlineLocationMarker />
        </span>
        <Title>توضیحات</Title>
        <p>{data.description}</p>
        <Title>امکانات</Title>
        <ItemList data={data.amenities} />
        <Title>قوانین</Title>
        <ItemList data={data.rules} />
      </div>
      <div className={styles.sidebar}>
        <div className={styles.realState}>
          <SiHomebridge />
          <p>املاک: {data.realState}</p>
          <span>
            <AiOutlinePhone />
            {e2p(data.phone)}
          </span>
        </div>
        <ShareButton />
        <div className={styles.price}>
          <p>
            {icons[data.category]}
            {categories[data.category]}
          </p>
          <p>{sp(data.price)} تومان</p>
          <p>
            <BiCalendarCheck />
            {new Date(data.constructionDate).toLocaleDateString("fa-IR")}
          </p>
        </div>
      </div>
    </div>
  );
}

export default DetailesPage;
