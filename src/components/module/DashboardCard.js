"use client";
import Card from "./Card";
import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import styles from "@/module/DashboardCard.module.css";
import { useRouter } from "next/navigation";
import { ThreeDots } from "react-loader-spinner";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";
function DashboardCard({ data }) {
  const [loading, setLoading] = useState();
  const router = useRouter();
  const editHandler = () => {
    router.push(`/dashboard/my-profile/${data._id}`);
  };
  const deleteHandler = async () => {
    setLoading(true);
    const res = await fetch(`/api/profile/delete/${data._id}`, {
      method: "DELETE",
    });
    const result = await res.json();
    console.log(result);
    if (result.error) {
      toast.error(result.error);
    } else {
      router.refresh();
      toast.success(result.message);
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <Card data={data} />
      <div className={styles.main}>
        <button onClick={editHandler}>
          ویرایش
          <FiEdit />
        </button>
        {loading ? (
          <ThreeDots />
        ) : (
          <button onClick={deleteHandler}>
            حذف آگهی
            <AiOutlineDelete />
          </button>
        )}
      </div>
      <Toaster />
    </div>
  );
}

export default DashboardCard;
