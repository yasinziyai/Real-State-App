"use client";
import CustomDatePicker from "@/module/CustomDatePicker";
import Loader from "@/module/Loader";
import RadioList from "@/module/RadioList";
import TextInput from "@/module/TextInput";
import TextList from "@/module/TextList";
import styles from "@/template/AddProfilePage.module.css";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
function AddProfilePage({ data }) {
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState({
    title: "",
    description: "",
    location: "",
    phone: "",
    price: "",
    realState: "",
    constructionDate: new Date(),
    category: "",
    rules: [],
    amenities: [],
  });
  useEffect(() => {
    if (data) setProfileData(data);
  }, [data]);
  const submitHandler = async () => {
    // console.log(profileData);
    setLoading(true);
    const res = await fetch("/api/profile", {
      method: "POST",
      body: JSON.stringify(profileData),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    setLoading(false);
    if (data.error) {
      toast.error(data.error);
    } else {
      toast.success(data.message);
      // setProfileData("");
    }
  };
  const router = useRouter();
  const editHandler = async () => {
    setLoading(true);
    const res = await fetch("/api/profile", {
      method: "PATCH",
      body: JSON.stringify(profileData),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    setLoading(false);
    if (data.error) {
      toast.error(data.error);
    } else {
      toast.success(data.message);
      router.refresh();
    }
  };
  return (
    <div className={styles.container}>
      <h3> {data ? "ویرایش آگهی" : "ثبت آگهی"}</h3>
      <TextInput
        title="عنوان آگهی"
        name="title"
        setProfileData={setProfileData}
        profileData={profileData}
      />
      <TextInput
        title="توضیحات"
        name="description"
        profileData={profileData}
        setProfileData={setProfileData}
        textarea={true}
      />
      <TextInput
        title="آدرس"
        name="location"
        setProfileData={setProfileData}
        profileData={profileData}
      />
      <TextInput
        title=" شماره تماس"
        name="phone"
        setProfileData={setProfileData}
        profileData={profileData}
      />
      <TextInput
        title="قیمت(تومان)"
        name="price"
        setProfileData={setProfileData}
        profileData={profileData}
      />
      <TextInput
        title=" بنگاه"
        name="realState"
        setProfileData={setProfileData}
        profileData={profileData}
      />
      <RadioList profileData={profileData} setProfileData={setProfileData} />
      <TextList
        title="امکانات رفاهی"
        profileData={profileData}
        setProfileData={setProfileData}
        type="amenities"
      />
      <TextList
        title="قوانین"
        profileData={profileData}
        setProfileData={setProfileData}
        type="rules"
      />
      <CustomDatePicker
        profileData={profileData}
        setProfileData={setProfileData}
      />
      <Toaster />
      {loading ? (
        <Loader />
      ) : data ? (
        <button onClick={editHandler} className={styles.submit}>
          ویرایش آگهی
        </button>
      ) : (
        <button onClick={submitHandler} className={styles.submit}>
          ثبت آگهی
        </button>
      )}
    </div>
  );
}

export default AddProfilePage;
