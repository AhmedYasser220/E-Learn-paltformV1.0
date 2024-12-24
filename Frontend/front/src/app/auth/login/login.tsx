"use server";

import axiosInstance from "@/app/util/axiosInstance";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

let backend_url = "http://localhost:3001";

export default async function login(prevState: any, formData: FormData) {
  const cookieStore = await cookies();
  console.log(formData.get("email"));
  console.log("FormData email:", formData.get("email")); // Debug email
  console.log("FormData password:", formData.get("password")); // Debug password
  try {
    const response = await axiosInstance.post(`${backend_url}/auth/login`, {
      email: formData.get("email"),
      password: formData.get("password"),
    });

    console.log(response.status);
    if (response.status != 201) {
      console.log(response);
      return { message: "error" };
    }
    let token = response.headers["set-cookie"]![0].split(";")[0].split("=")[1];
    let maxAge = parseInt(
      response.headers["set-cookie"]![0].split(";")[1].split("=")[1]
    );

    cookieStore.set("CookieFromServer", token, {
      secure: true,
      httpOnly: true,
      sameSite: true,
      maxAge,
    });
    redirect("/home");
  } catch (error: any) {
    console.log("hi", error?.response?.data?.message);
    let m = error?.response?.data?.message;
    return { message: m };
  }
}
