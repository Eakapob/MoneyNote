'use client';

import { signOut } from "next-auth/react";
import { Button } from "./ui/button";

const UserAccountsidebar = () => {
  return (
    <Button onClick={() => signOut({
        redirect: true,
        callbackUrl: `${window.location.origin}/signin`,
    })} variant='destructive'>SignOut</Button>
  )
}

export default UserAccountsidebar