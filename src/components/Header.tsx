import { Link } from '@tanstack/react-router'
import { Button, Chip, Skeleton } from '@heroui/react';
import '../styles.css';
import {
  Authenticated,
  Unauthenticated,
  AuthLoading
} from "convex/react";

export default function Header() {

  return (
    <nav className="px-4 z-1000 h-[64px] bg-white fixed w-screen flex justify-between items-center text-white shadow-md">
      <Link to="/" className="font-[chelsea] text-2xl text-black font-semibold">bento</Link>

      <div className="flex flex-wrap gap-2">
        <AuthLoading>
          <div className="w-54">
            <Skeleton animationType="pulse" className="bg-gray-200 h-4 rounded-lg" />
          </div>
        </AuthLoading>

        <Authenticated>
          <span className="flex items-center gap-4">
            <Chip variant="soft" color="success" className="h-fit text-green-400">logged in</Chip>
            <Button className="rounded-lg font-[chelsea]">
              <Link to="/dashboard/parents">dashboard</Link>
            </Button>
          </span>
        </Authenticated>

        <Unauthenticated>
          <Button className="rounded-lg bg-black font-[chelsea]">
            <Link to="/auth/login">login</Link>
          </Button>
          <Button className="rounded-lg font-[chelsea]">
            <Link to="/auth/signup">signup</Link>
          </Button>
        </Unauthenticated>
      </div>
    </nav>
  )
}
