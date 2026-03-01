import { Skeleton, Dropdown, Avatar, Label, ButtonGroup, Button, Separator, Surface } from '@heroui/react';
import { createFileRoute, Link, Outlet, redirect, useRouteContext } from '@tanstack/react-router'
import { api } from 'convex/_generated/api';
import { Authenticated, AuthLoading } from 'convex/react';
import { SunMedium, Moon } from 'lucide-react';
import { convexQuery } from "@convex-dev/react-query";
import { useThemeStore } from '@/store/themeStore';

/**
 * Layout route for the groups section.
 * 
 * Ensures the user is authenticated before accessing any groups pages.
 * If the user is not logged in, redirects to the login page.
 * For non-create routes, fetches the user's groups and redirects to group creation if no groups exist.
 * 
 * @route /groups/_layout
 * @returns {Object} An object containing the authenticated user
 * @throws {redirect} Redirects to "/auth/login" if user is not authenticated
 * @throws {redirect} Redirects to "/groups/create" if user has no groups (except on create route)
 */
export const Route = createFileRoute('/groups/_layout')({
	beforeLoad: async ({ context, location }) => {

		const user = await context.queryClient.ensureQueryData(
			convexQuery(api.auth.getCurrentUser)
		)
		if (!user) {
			throw redirect({ to: "/auth/login" })
		}

		if (location.pathname === '/groups/create') {
			return { user }
		}

		const groups = await context.queryClient.ensureQueryData(
			convexQuery(api.groups.getGroups, { ownerId: user!!._id })
		);
		if (groups.length == 0) {
			throw redirect({ to: "/groups/create" })
		}

		return { user }
	},
	component: RouteComponent
})

function RouteComponent() {
	const { theme, setTheme } = useThemeStore()
	const { user: initialUser } = useRouteContext({ from: '/groups/_layout' })

	const displayName = initialUser?.name ?? ""
	const displayEmail = initialUser?.email ?? "";

	return (
		<>
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
								<Dropdown >
									<Dropdown.Trigger className="rounded-full">
										<Avatar size="sm">
											<Avatar.Image
												alt={displayName}
												src={initialUser?.image ?? "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/orange.jpg"}
											/>
											<Avatar.Fallback delayMs={600}>
												{displayName.slice(0, 2).toUpperCase()}
											</Avatar.Fallback>
										</Avatar>
									</Dropdown.Trigger>
									<Dropdown.Popover >
										<div className="px-3 pt-3 pb-1">
											<div className="flex items-center gap-2">
												<Avatar size="sm">
													<Avatar.Image
														alt={displayName}
														src={initialUser?.image ?? "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/orange.jpg"}
													/>
													<Avatar.Fallback delayMs={600}>
														{displayName.slice(0, 2).toUpperCase()}
													</Avatar.Fallback>
												</Avatar>
												<div className="flex flex-col gap-0">
													<p className="text-sm leading-5 font-medium">{displayName}</p>
													<p className="text-xs leading-none text-muted">{displayEmail}</p>
												</div>
											</div>
										</div>
										<Dropdown.Menu>
											<Dropdown.Item id="dashboard" textValue="Dashboard">
												<Label>Home</Label>
											</Dropdown.Item>
											<Dropdown.Item id="profile" textValue="Profile">
												<Label>Profile</Label>
											</Dropdown.Item>
											<Dropdown.Item id="theme" className='bg-transparent flex jusify-between'>
												<Label className='w-full'>Theme</Label>

												<ButtonGroup variant='outline' size="sm">
													<Button
														onPress={() => setTheme('light')}
														className={theme === 'light' ? 'bg-surface-secondary' : ''}
													>
														<SunMedium />
													</Button>
													<Button
														onPress={() => setTheme('dark')}
														className={theme === 'dark' ? 'bg-surface-secondary' : ''}
													>
														<Moon />
													</Button>
												</ButtonGroup>
											</Dropdown.Item>
											<Dropdown.Item id="logout" textValue="Logout" variant="danger">
												<div className="flex w-full items-center justify-between gap-2">
													<Label>Log Out</Label>
													{/* <ArrowRightFromSquare className="size-3.5 text-danger" /> */}
												</div>
											</Dropdown.Item>
										</Dropdown.Menu>
									</Dropdown.Popover>
								</Dropdown>
							</span>
						</Authenticated>
					</div>
				</Surface>
				{theme === 'dark' && <Separator variant='tertiary' />}
			</nav>

			<Surface variant='default' className="px-4 flex flex-row gap-4 h-screen w-screen overflow-hidden">
				<Outlet />
			</Surface>
		</>
	)
}
