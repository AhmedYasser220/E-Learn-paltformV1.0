"use client";

import axiosInstance from "@/app/util/axiosInstance";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

let backend_url = "http://localhost:3001";

export default function Register() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [profile_picture_url, setProfile_Picture_url] = useState("");
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post(`${backend_url}/auth/register`, {
        email, // Match backend DTO
        name,
        password,
        role,
        profile_picture_url,
        created_at: new Date(), // Send valid ISO string
      });

      const { status } = res;
      if (status === 201) {
        alert("Registration successful!");
        setTimeout(() => {
          router.push("/auth/login");
        }, 1000);
      }
    } catch (err: any) {
      console.error("Error during registration:", err.response?.data || err);
      alert(
        `Registration failed: ${err.response?.data?.message || err.message}`
      );
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <h1>Register</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <br />
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <br />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <br />
      <input
        type="text"
        placeholder="Role (student, instructor)"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      />
      <br />
      <input
        type="text"
        placeholder="Profile Picture URL"
        value={profile_picture_url}
        onChange={(e) => setProfile_Picture_url(e.target.value)}
      />
      <br />
      <button type="submit">Register</button>
    </form>
  );
}
