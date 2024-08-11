import Profile from "@/models/Profile";
import User from "@/models/User";
import connectDB from "@/utils/connectDB";
import { Types } from "mongoose";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
export async function GET() {
  try {
    await connectDB();
    const profiles = await Profile.find({
      published: true,
    }).select("-userId");
    return NextResponse.json(
      {
        data: profiles,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "مشکلی در سرور رخ داده است" },
      { status: 500 }
    );
  }
}
export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    const {
      title,
      description,
      location,
      phone,
      realState,
      price,
      constructionDate,
      category,
      rules,
      amenities,
    } = body;

    const session = await getServerSession(req);
    if (!session) {
      return NextResponse.json(
        { error: "لطفا وارد حساب کاربری خود شوید" },
        { status: 401 }
      );
    }
    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json(
        { error: "حساب کاربری شما یافت نشد" },
        { status: 404 }
      );
    }
    if (
      !title ||
      !description ||
      !location ||
      !phone ||
      !realState ||
      !price ||
      !constructionDate ||
      !category
    ) {
      return NextResponse.json(
        { error: "اطلاعات را کامل وارد کنید" },
        { status: 400 }
      );
    }
    const newProfile = await Profile.create({
      title,
      description,
      location,
      phone,
      realState,
      price: +price,
      constructionDate,
      category,
      rules,
      amenities,
      userId: new Types.ObjectId(user._id),
    });
    console.log(newProfile);
    return NextResponse.json({
      message: "اگهی جدید اضافه  شد",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "مشکلی در سرور رخ داده است" },
      { status: 500 }
    );
  }
}
export async function PATCH(req) {
  try {
    await connectDB();
    const body = await req.json();
    const {
      _id,
      title,
      description,
      location,
      phone,
      realState,
      price,
      constructionDate,
      category,
      rules,
      amenities,
    } = body;
    const session = await getServerSession(req);
    if (!session) {
      return NextResponse.json(
        { error: "لطفا وارد حساب کاربری خود شوید" },
        { status: 401 }
      );
    }
    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json(
        { error: "حساب کاربری شما یافت نشد" },
        { status: 404 }
      );
    }
    if (
      !_id ||
      !title ||
      !description ||
      !location ||
      !phone ||
      !realState ||
      !price ||
      !constructionDate ||
      !category
    ) {
      return NextResponse.json(
        { error: "اطلاعات را کامل وارد کنید" },
        { status: 400 }
      );
    }
    const profile = await Profile.findOne({ _id });
    if (!user._id.equals(profile.userId)) {
      return NextResponse.json(
        {
          error: "دسترسی شما ب این آگهی محدود شده است",
        },
        {
          status: 403,
        }
      );
    }
    profile.title = title;
    profile.description = description;
    profile.location = location;
    profile.phone = phone;
    profile.realState = realState;
    profile.price = price;
    profile.constructionDate = constructionDate;
    profile.category = category;
    profile.rules = rules;
    profile.amenities = amenities;
    profile.save();

    return NextResponse.json(
      {
        message: "آگهی بت موفقیت ویرایش شد",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "مشکلی در سرور رخ داده است" },
      { status: 500 }
    );
  }
}
