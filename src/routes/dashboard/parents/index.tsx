import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/parents/')({
  component: ParentsDashboard,
})

function ParentsDashboard() {
  return (
    <section className="polka flex flex-col gap-12 px-4 justify-center items-center bg-white w-screen h-screen">
			<header className="text-center flex flex-col gap-2">
				<h1 className="text-4xl font-[chelsea] text-black">Dashboard</h1>
				<p className="text-gray-400 max-w-xs">Good to see you again!</p>
			</header>
    </section>
  )
}
