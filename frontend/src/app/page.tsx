"use client"
import Users from "@/components/UI/authentication/Users";
import LoginModal from "@/components/feature/authentication/LoginModal";

export default function Home() {
  return (

    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <LoginModal />

    </main>

  );
}
