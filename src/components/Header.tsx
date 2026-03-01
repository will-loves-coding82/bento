import { Link } from '@tanstack/react-router'
import { Button, Chip, Separator, Skeleton, Surface } from '@heroui/react';
import '../styles.css';
import {
  Authenticated,
  Unauthenticated,
  AuthLoading
} from "convex/react";
import { useThemeStore } from '@/store/themeStore';

export default function Header() {
  const { theme, setTheme } = useThemeStore()

  return (
    <nav className="flex flex-col z-1000 h-[64px] fixed w-screen">
      <Surface variant='default' className='inline-flex p-4 gap-8 justify-between shadow-sm'>

        <Link to="/" className="font-[chelsea] text-2xl font-semibold">bento</Link>

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
                <Link to="/groups">dashboard</Link>
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
      </Surface>
      {theme === 'dark' && <Separator variant='tertiary' />}

    </nav>


  )
}
