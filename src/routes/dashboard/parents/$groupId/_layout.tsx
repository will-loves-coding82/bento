

import { authClient } from 'convex/auth/auth-client'
import { Select, ListBox, Skeleton, Chip, Dropdown, Avatar, Label, ButtonGroup, Button, Surface, Separator } from '@heroui/react'
import { Link, Outlet, createFileRoute, useLocation } from '@tanstack/react-router'
import { api } from 'convex/_generated/api'
import { Authenticated, AuthLoading } from 'convex/react'
import { PersonStanding, Settings, Coins, Moon, SunMedium } from 'lucide-react'
import { useQuery } from "@tanstack/react-query";
import { convexQuery } from "@convex-dev/react-query";
import { useThemeStore } from '@/store/themeStore'


export const Route = createFileRoute('/dashboard/parents/$groupId/_layout')({
  component: PathlessLayoutComponent,
})

function PathlessLayoutComponent() {
  const { theme, setTheme } = useThemeStore()

  const params = Route.useParams()
  const location = useLocation()
  const currentPath = location.href.split("/").slice(-1)[0]

  const { data: user } = useQuery(convexQuery(api.auth.getCurrentUser));
  const displayName = user?.name ?? ""
  const displayEmail = user?.email ?? "";

  const { data: groups } = useQuery(convexQuery(api.groups.getGroups, { ownerId: user ? user._id.toString() : "skip" }))
  const { data: groupData, isLoading: isLoadingGroupData } = useQuery(convexQuery(api.groups.getGroupById, { groupId: params.groupId }))
  const { data: subscriptionState } = useQuery({
    queryKey: ["subscription_state"],
    queryFn: async () => {
      try {
        const { data, error } = await authClient.customer.state();
        if (error) {
          throw error
        }
        return data
      }
      catch (error) {
        console.log(error)
      }
    },
  })

  return (
    <>
      <nav className="flex flex-col z-1000 h-[64px] fixed w-screen">
        <Surface variant='default' className='inline-flex h-[64px] items-center px-4 gap-8 justify-between shadow-sm'>
          <span className='inline-flex gap-4'>
            <Link to="/" className="font-[chelsea] text-2xl font-semibold">bento</Link>
            {
              !isLoadingGroupData &&
              <Select className="w-[180px]" placeholder={groupData!!.name!!} defaultValue={groupData!!._id}>
                <Select.Trigger className="bg-surface-secondary">
                  <Select.Value />
                  <Select.Indicator />
                </Select.Trigger>
                <Select.Popover className="p-2">
                  <ListBox>
                    {
                      groups?.map(group => (
                        <ListBox.Item key={group._id} id={group._id.toString()}>
                          <Link to="/dashboard/parents/$groupId" params={{ groupId: group._id }}>{group.name}</Link>
                          <ListBox.ItemIndicator />
                        </ListBox.Item>
                      ))
                    }
                  </ListBox>
                  <div className="mt-1 border-t pt-1">
                    <Link to="/groups" className="rounded-2xl w-full text-blue-400 text-sm px-4 py-2 block">view groups</Link>
                  </div>
                </Select.Popover>
              </Select>
            }
          </span>
          <div className="flex flex-wrap gap-2">
            <AuthLoading>
              <div className="w-54">
                <Skeleton animationType="pulse" className="bg-gray-200 h-4 rounded-lg" />
              </div>
            </AuthLoading>
            <Authenticated>
              <span className="flex items-center gap-4">
                {
                  subscriptionState?.activeSubscriptions.length == 0 && <Chip color="accent" className='bg-accent/20 font-semibold'>upgrade</Chip>
                }
                <Dropdown >
                  <Dropdown.Trigger className="rounded-full">
                    <Avatar size="sm">
                      <Avatar.Image
                        alt={displayName}
                        src={user?.image ?? "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/orange.jpg"}
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
                            src={user?.image ?? "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/orange.jpg"}
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

      <Surface className="bg-surface-secondary pt-24 px-4 flex flex-row gap-4 h-screen w-screen overflow-hidden">
        <aside className="hidden lg:block h-full w-full max-w-[200px] flex-shrink-0">
          {isLoadingGroupData ?
            <div className="w-full max-w-md space-y-3">
              <Skeleton className="bg-gray-200 h-4 w-full rounded" />
              <Skeleton className="bg-gray-200 h-4 w-5/6 rounded" />
              <Skeleton className="bg-gray-200 h-4 w-4/6 rounded" />
            </div>
            :
            <nav className="flex flex-col gap-1">
              <Link to="/dashboard/parents/$groupId" params={{ groupId: groupData!!._id }} className={`flex items-center justify-between px-4 py-2 rounded-xl ${currentPath === params.groupId ? "bg-surface text-foreground" : "text-gray-400"} hover:bg-surface hover:text-foreground transition-colors`}>
                <span className="text-sm font-medium">Home</span>
                <PersonStanding className="size-4" />
              </Link>
              <Link to="/dashboard/parents/$groupId/settings" params={{ groupId: groupData!!._id }} className={`flex items-center justify-between px-4 py-2 rounded-xl ${currentPath === "settings" ? "bg-surface text-foreground" : "text-gray-400"} hover:bg-surface hover:text-foreground transition-colors`}>
                <span className="text-sm font-medium">Settings</span>
                <Settings className="size-4" />
              </Link>
              <Link to="/dashboard/parents/$groupId/billing" params={{ groupId: groupData!!._id }} className={`flex items-center justify-between px-4 py-2 rounded-xl ${currentPath === "billing" ? "bg-surface text-foreground" : "text-gray-400"} hover:bg-surface hover:text-foreground transition-colors`}>
                <span className="text-sm font-medium">Billing</span>
                <Coins className="size-4" />
              </Link>
            </nav>
          }
        </aside>

        <Surface className={`p-4 lg:px-12 lg:pt-8 w-full h-full bg-surface rounded-t-2xl shadow-sm ${theme === "dark" && "border-2"}`}>
          <Outlet />
        </Surface>
      </Surface>
    </>
  )
}