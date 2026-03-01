

import Header from '@/components/Header'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({ component: App })

function App() {
  return (
    <>
      <Header />
      <section className="bg-surface font-[chelsea] flex flex-col justify-center h-screen w-screen ">
        <header className="w-full h-full justify-center items-center flex flex-col gap-4">
          <h1 className="text-7xl text-chelsea">bento</h1>
          <p className="text-gray-400">The task app for families</p>
        </header>
      </section>
    </>
  )
}
