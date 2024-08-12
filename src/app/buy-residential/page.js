"use server";
import BuyResidentialPage from "@/template/BuyResidentialPage";

async function BuyResidential({ searchParams }) {
  const res = await fetch(`https://real-state-app-bay.vercel.app/api/profile`, {
    cache: "no-store",
  });
  const data = await res.json();
  // console.log(data);
  if (data.error) return <h3>مشکلی پیش آمده است</h3>;
  let finalData = data.data;
  if (searchParams.category) {
    finalData = finalData.filter((i) => i.category === searchParams.category);
  }
  return <BuyResidentialPage data={finalData} />;
}

export default BuyResidential;
