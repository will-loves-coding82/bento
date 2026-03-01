import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute('/dashboard/parents/')({
  beforeLoad: () => {
    // redirect base /dashboard/parents somewhere
    throw redirect({ to: '/' }); // or to a default group, etc.
  },
  component: () => null, // or a small wrapper
});