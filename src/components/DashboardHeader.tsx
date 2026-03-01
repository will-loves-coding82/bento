// import { authClient } from "@/lib/auth-client";
// import { Select, ListBox, Skeleton, Chip, Dropdown, Avatar, Label, ButtonGroup, Button } from "@heroui/react";
// import type { CustomerState } from "@polar-sh/sdk/models/components/customerstate.js";
// import { api } from "convex/_generated/api";
// import { Authenticated, AuthLoading, useQuery } from "convex/react";
// import { Link, SunMedium, Moon } from "lucide-react";
// import { useState, useEffect } from "react";

// export default function DashboardHeader(groupName: string) {
// 	const user = useQuery(api.auth.getCurrentUser);
// 	const groups = useQuery(api.groups.getGroups, { ownerId: user ? user._id.toString() : "skip" })

// 	const displayName = user?.name ?? ""
// 	const displayEmail = user?.email ?? "";
// 	const [customerState, setCustomerState] = useState<CustomerState | null>(null);

// 	useEffect(() => {
// 		const fetchCustomerState = async () => {
// 			const { data } = await authClient.customer.state();
// 			setCustomerState(data);
// 		}
// 		fetchCustomerState();
// 	}, []);

// 	return (
// 		<nav className="px-4 z-1000 h-[64px] bg-white fixed w-screen flex justify-between items-center text-white shadow-sm shadow-gray-200">
// 			<span className='inline-flex gap-8'>
// 				<Link to="/" className="font-[chelsea] text-2xl text-black font-semibold">bento</Link>
// 				<Select className="w-[180px]" placeholder={groupName}>
// 					<Select.Trigger>
// 						<Select.Value />
// 						<Select.Indicator />
// 					</Select.Trigger>
// 					<Select.Popover>
// 						<ListBox>
// 							{/* {
// 								groups?.map(group => (
// 									<ListBox.Item key={group._id}>
// 										{group.name}
// 										<ListBox.ItemIndicator />
// 									</ListBox.Item>
// 								))
// 							} */}

// 						</ListBox>
// 					</Select.Popover>
// 				</Select>
// 			</span>

// 			<div className="flex flex-wrap gap-2">
// 				<AuthLoading>
// 					<div className="w-54">
// 						<Skeleton animationType="pulse" className="bg-gray-200 h-4 rounded-lg" />
// 					</div>
// 				</AuthLoading>

// 				<Authenticated>
// 					<span className="flex items-center gap-4">
// 						{
// 							customerState?.activeSubscriptions.length == 0 && <Chip color="accent" className='bg-accent/20 font-semibold'>upgrade</Chip>
// 						}
// 						<Dropdown >
// 							<Dropdown.Trigger className="rounded-full">
// 								<Avatar size="sm">
// 									<Avatar.Image
// 										alt={displayName}
// 										src={user?.image ?? "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/orange.jpg"}
// 									/>
// 									<Avatar.Fallback delayMs={600}>
// 										{displayName.slice(0, 2).toUpperCase()}
// 									</Avatar.Fallback>
// 								</Avatar>
// 							</Dropdown.Trigger>
// 							<Dropdown.Popover >
// 								<div className="px-3 pt-3 pb-1">
// 									<div className="flex items-center gap-2">
// 										<Avatar size="sm">
// 											<Avatar.Image
// 												alt={displayName}
// 												src={user?.image ?? "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/orange.jpg"}
// 											/>
// 											<Avatar.Fallback delayMs={600}>
// 												{displayName.slice(0, 2).toUpperCase()}
// 											</Avatar.Fallback>
// 										</Avatar>
// 										<div className="flex flex-col gap-0">
// 											<p className="text-sm leading-5 font-medium">{displayName}</p>
// 											<p className="text-xs leading-none text-muted">{displayEmail}</p>
// 										</div>
// 									</div>
// 								</div>
// 								<Dropdown.Menu>
// 									<Dropdown.Item id="dashboard" textValue="Dashboard">
// 										<Label>Home</Label>
// 									</Dropdown.Item>
// 									<Dropdown.Item id="profile" textValue="Profile">
// 										<Label>Profile</Label>
// 									</Dropdown.Item>
// 									<Dropdown.Item id="theme" className='bg-transparent flex jusify-between'>
// 										<Label className='w-full'>Theme</Label>
// 										<ButtonGroup variant='outline' size="sm">
// 											<Button><SunMedium /></Button>
// 											<Button><Moon /></Button>
// 										</ButtonGroup>
// 									</Dropdown.Item>
// 									<Dropdown.Item id="logout" textValue="Logout" variant="danger">
// 										<div className="flex w-full items-center justify-between gap-2">
// 											<Label>Log Out</Label>
// 											{/* <ArrowRightFromSquare className="size-3.5 text-danger" /> */}
// 										</div>
// 									</Dropdown.Item>
// 								</Dropdown.Menu>
// 							</Dropdown.Popover>
// 						</Dropdown>
// 					</span>
// 				</Authenticated>
// 			</div>
// 		</nav>
// 	)
// }
