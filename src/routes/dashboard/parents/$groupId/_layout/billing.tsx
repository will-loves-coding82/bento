import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/parents/$groupId/_layout/billing')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/dashboard/parents/billing"!</div>
}
