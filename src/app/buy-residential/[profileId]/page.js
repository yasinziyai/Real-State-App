"use server";
import Profile from "@/models/Profile";
import DetailesPage from "@/template/DetailesPage";
import connectDB from "@/utils/connectDB";

async function ProfileDetailes({ params: { profileId } }) {
  await connectDB();
  const profile = await Profile.findOne({ _id: profileId });
  console.log(profile);
  if (!profile) return <h3>مشکلی پیش امده است</h3>;

  return <DetailesPage data={profile} />;
}

export default ProfileDetailes;
