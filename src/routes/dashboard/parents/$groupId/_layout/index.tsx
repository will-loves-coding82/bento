import { createFileRoute, redirect, useRouter } from '@tanstack/react-router'
import { Background, Controls, MiniMap, Panel, ReactFlow } from '@xyflow/react'
import { Button, Modal, Skeleton, Surface } from "@heroui/react";
import { ChartNoAxesColumn, Rocket } from 'lucide-react';
import { api } from 'convex/_generated/api';
import { useConvexAuth } from 'convex/react';
import { useQuery } from "@tanstack/react-query";
import '@/styles.css'
import '@xyflow/react/dist/style.css'
import { convexQuery } from '@convex-dev/react-query';
import { useEffect } from 'react';


export const Route = createFileRoute('/dashboard/parents/$groupId/_layout/')({
	component: ParentsDashboardComponent
})

function ParentsDashboardComponent() {
	const router = useRouter()
  const { isAuthenticated, isLoading } = useConvexAuth();
  const { data: user } = useQuery(convexQuery(api.auth.getCurrentUser));
  const { data: groups } = useQuery(
    convexQuery(api.groups.getGroups, user ? { ownerId: user._id.toString() } : "skip")
  );

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.navigate({ to: "/auth/login" });
    }
  }, [isLoading, isAuthenticated]);

  useEffect(() => {
    if (groups?.length === 0) {
      router.navigate({ to: "/groups/create" });
    }
  }, [groups]);


	return (
		<section className="w-full h-full">
			<header className='w-full inline-flex items-center justify-between mb-4'>
				{
					isLoading ? 
					<div className="w-54"><Skeleton animationType="pulse" className="bg-gray-200 h-8 rounded-lg" /></div> 
					: 
					<h1 className='text-xl font-[chelsea] px-2 rounded-xl'>Welcome, {user?.name ?? ""}</h1>
				}

				{
					isLoading ? 
					<div className="w-24"><Skeleton animationType="pulse" className="bg-gray-200 h-8 rounded-lg" /></div> 
					: 
					<span className='inline-flex gap-2'>
					<Modal>
						<Button><ChartNoAxesColumn /></Button>
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
						<Button>Add</Button>
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
				}
			</header>

			<Surface className={`h-full w-full pb-12 bg-surface-secondary rounded-t-2xl shadow-sm border-[--border-primary]`}>
				<ReactFlow fitView>
					<MiniMap />
					<Controls className='text-foreground' />
				</ReactFlow>
			</Surface>


		</section>
	)
}


