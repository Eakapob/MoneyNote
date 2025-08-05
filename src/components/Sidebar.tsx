
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";
import React from "react";
import { Button, buttonVariants } from "./ui/button";
import UserAccountsidebar from "./UserAccountsidebar";
import WalletForm from "./form/WalletForm";

const Sidebar = async () => {
  const session = await getServerSession(authOptions)
  return (
    <div className="w-full bg-[#F9FBFD] border-l border-[#79C3ED] p-4 h-screen">
      {session?.user ? (
        <UserAccountsidebar />
      ) : (
        <Link className={buttonVariants()} href="/signin">
          SignIn
        </Link>
      )}
      <ul>
        <li>ตั้งค่า</li>
        <li>ข้อมูลผู้ใช้</li>
      </ul>
      <div className="w-full">
        <WalletForm />
      </div>
    </div>
  );
};

export default Sidebar;
