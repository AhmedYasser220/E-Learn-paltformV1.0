"use client";

import axiosInstance from "@/app/util/axiosInstance";
import { useRouter } from "next/router";

let backend_url = "htpp://localhost:3001";

import React, { useState } from "react";

export default function Register() {
  const [Email, setEmail] = useState("");
  const [Name, setName] = useState("");
  const [Password, setPassword] = useState("");
  const [role, setrole] = useState("student");
  const [Profile_Picture_url, setProfile_Picture_url] = useState("");
  const [created_at, setcreated_at] = useState("");
  const router = useRouter();
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault;
    try {
      const res = await axiosInstance.post(`${backend_url}/auth/register`, {
        Email,
        Name,
        Password,
        role,
        Profile_Picture_url,
        created_at,
      });

      const { status, data } = res;
      if (status == 201) {
        setTimeout(() => {
          router.push("/login");
        }, 1000);
      }
    } catch (err) {
      alert("Registration falied");
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <h1>Register</h1>
      <input
        type="text"
        placeholder="Email"
        value={Email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        type="text"
        placeholder="name"
        value={Name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <input
        type="text"
        placeholder="password"
        value={Password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <input
        type="text"
        placeholder="student,Instructor"
        value={role}
        onChange={(e) => setrole(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="http//:catimage.google.webp"
        value={Profile_Picture_url}
        onChange={(e) => setProfile_Picture_url(e.target.value)}
      />
      <button type="submit">Register</button>
    </form>
  );
}
