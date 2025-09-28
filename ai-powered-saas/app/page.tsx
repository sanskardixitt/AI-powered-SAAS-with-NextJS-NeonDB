"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { user, isLoaded } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && user) {
      router.push("/home");
    }
  }, [isLoaded, user, router]);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-8 text-center">
      <h1 className="text-3xl font-bold mb-4">Welcome to AI-powered SAAS</h1>
      <p className="text-gray-600">Please sign up or sign in to continue</p>
    </div>
  );
}
