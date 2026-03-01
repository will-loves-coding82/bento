import { Button, Card, LinkIcon } from '@heroui/react';
import { createFileRoute } from '@tanstack/react-router'
import { api } from 'convex/_generated/api';
import { useQuery } from 'convex/react';
import { Boxes, CircleDollarSign } from 'lucide-react';
import { Link } from '@tanstack/react-router'


export const Route = createFileRoute('/groups/_layout/')({
	component: RouteComponent,
})

function RouteComponent() {
	// https://stack.convex.dev/authentication-best-practices-convex-clerk-and-nextjs#skipping-queries-when-the-user-is-not-authenticated
	const user = useQuery(api.auth.getCurrentUser);
	const groups = useQuery(api.groups.getGroups, { ownerId: user ? user._id.toString() : "skip" })

	return (
		<section className="polka flex flex-col gap-8 px-4 pt-32 items-center w-screen h-screen">
			<header className="flex justify-between gap-2 w-full max-w-6xl">
				<h1 className="text-2xl font-[chelsea]">Your groups</h1>
				<span>
					<Button>Add group</Button>
				</span>
			</header>
			<div className="flex flex-wrap gap-2 w-full max-w-6xl">
				{
					groups?.map(group => (
						<Card className="bg-surface-secondary w-full w-full md:max-w-[400px] rounded-xl" key={group._id}>
							<Boxes size={18} color="gray" />
							<Card.Header>
								<Card.Title className='text-xl font-semibold'>{group.name}</Card.Title>
								<Card.Description>
									created on {new Date(group._creationTime).toDateString()}
								</Card.Description>
							</Card.Header>
							<Card.Footer>
								<Link to="/dashboard/parents/$groupId" params={{groupId: group._id}} className='text-blue-400'>view</Link>
								<LinkIcon className='text-blue-400'/>
							</Card.Footer>
						</Card>
					))
				}
			</div>
		</section>
	)
}
