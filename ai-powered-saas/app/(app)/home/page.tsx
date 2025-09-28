"use client";

import { useUser } from "@clerk/nextjs";

export default function HomePage() {
  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Welcome to Home!</h1>
      {user ? (
        <div className="space-y-2">
          <p>
            <strong>User ID:</strong> {user.id}
          </p>
          <p>
            <strong>Email:</strong> {user.emailAddresses[0]?.emailAddress}
          </p>
          <p>
            <strong>Name:</strong> {user.fullName}
          </p>
        </div>
      ) : (
        <p>No user found</p>
      )}
    </div>
  );
}
