import { createFileRoute, redirect } from '@tanstack/react-router'
import { Background, Controls, MiniMap, Panel, ReactFlow } from '@xyflow/react'
import { Button, Modal, Surface } from "@heroui/react";
import { ChartNoAxesColumn, Rocket } from 'lucide-react';
import { api } from 'convex/_generated/api';
import { useQuery } from 'convex/react';
import { Authenticated } from "convex/react";
import '@/styles.css'
import '@xyflow/react/dist/style.css'
import { useThemeStore } from '@/store/themeStore';


export const Route = createFileRoute('/dashboard/parents/$groupId/_layout/')({
	beforeLoad: async ({ context, params }) => {
		const { groupId } = params

		if (groupId == undefined || groupId == "") {
			console.log("entering redirect block");
			throw redirect({ to: "/" });
		}

		const convex = context.convexQueryClient;
		const user = await convex.convexClient.query(api.auth.getCurrentUser);
		if (!user) {
			throw redirect({ to: "/auth/login" });
		}

		const groups = await convex.convexClient.query(api.groups.getGroups, {
			ownerId: user._id.toString()
		})
		if (groups.length === 0) {
			throw redirect({ to: "/groups/create" });
		}
	},
	component: ParentsDashboardComponent
})

function ParentsDashboardComponent() {
	const { theme } = useThemeStore()
	const user = useQuery(api.auth.getCurrentUser)
	const displayName = user?.name


	return (
		<section className="w-full h-full">
			<header className='w-full inline-flex items-center justify-between mb-4'>
				<h1 className='text-xl font-[chelsea] px-2 rounded-xl'>Welcome, {displayName}</h1>
				<span className='inline-flex gap-2'>
					<Modal>
						<Button className="rounded-xl shadow-gray-400 shadow-sm"><ChartNoAxesColumn /></Button>
						<Modal.Backdrop className="z-1000">
							<Modal.Container size="cover" className="z-1000">
								<Modal.Dialog>
									<Modal.CloseTrigger />
									<Modal.Header>
										<Modal.Icon className="bg-default text-foreground">
											<Rocket className="size-5" />
										</Modal.Icon>
										<Modal.Heading>Welcome to HeroUI</Modal.Heading>
									</Modal.Header>
									<Modal.Body>
										<p>
											A beautiful, fast, and modern React UI library for building accessible and
											customizable web applications with ease.
										</p>
									</Modal.Body>
									<Modal.Footer>
										<Button className="w-full" slot="close">
											Continue
										</Button>
									</Modal.Footer>
								</Modal.Dialog>
							</Modal.Container>
						</Modal.Backdrop>
					</Modal>
					<Modal>
						<Button className="rounded-xl shadow-gray-400 shadow-sm">Add</Button>
						<Modal.Backdrop className="z-1000">
							<Modal.Container>
								<Modal.Dialog className="sm:max-w-[360px]">
									<Modal.CloseTrigger />
									<Modal.Header>
										<Modal.Icon className="bg-default text-foreground">
											<Rocket className="size-5" />
										</Modal.Icon>
										<Modal.Heading>Welcome to HeroUI</Modal.Heading>
									</Modal.Header>
									<Modal.Body>
										<p>
											A beautiful, fast, and modern React UI library for building accessible and
											customizable web applications with ease.
										</p>
									</Modal.Body>
									<Modal.Footer>
										<Button className="w-full" slot="close">
											Continue
										</Button>
									</Modal.Footer>
								</Modal.Dialog>
							</Modal.Container>
						</Modal.Backdrop>
					</Modal>
				</span>

			</header>

			<Surface className={`h-full w-full pb-12 bg-surface-secondary rounded-t-2xl shadow-sm ${theme === "dark" && "border-2"}`}>
				<ReactFlow fitView>
					<MiniMap />
					<Controls className='text-foreground' />
				</ReactFlow>
			</Surface>


		</section>
	)
}


