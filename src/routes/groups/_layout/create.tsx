import { revalidateLogic, useForm } from '@tanstack/react-form'
import { createFileRoute, useRouter, useSearch } from '@tanstack/react-router'
import { api } from 'convex/_generated/api'
import { useMutation, useQuery } from 'convex/react'
import { Button, Input, toast } from '@heroui/react'


export const Route = createFileRoute('/groups/_layout/create')({
	component: CreateGroupComponent,
})

function CreateGroupComponent() {
	const router = useRouter()
	const user = useQuery(api.auth.getCurrentUser);
	const createGroup = useMutation(api.groups.createGroup)

	const form = useForm({
		defaultValues: {
			name: ""
		},
		validationLogic: revalidateLogic({ mode: "submit", modeAfterSubmission: "blur" }),
		validators: {
			onSubmit: ({ value }) => {
				if (value.name.length === 0) {
					return "Ensure all fields are filled out"
				} else { return undefined }
			},
		},
		onSubmit: async ({ value }) => {
			try {
				const groupId = await createGroup({ ownerId: user?._id.toString() ?? "", name: value.name })
				form.reset()
				toast("Success", {
					description: "Your group was created"
				})

				setTimeout(()=>{
					router.navigate({to: "/dashboard/parents/$groupId", params: {groupId: groupId}})
				}, 1000)

			} catch (error: any) {
				toast("Error", {
					actionProps: {
						children: "Dismiss",
						onPress: () => toast.clear(),
						variant: "tertiary",
					},
					variant: "danger",
					description: error.message || "An unknown error occurred"
				})
			}
		}
	})


	return (
		<section className="polka flex flex-col gap-12 px-4 justify-center items-center bg-white w-screen h-screen">
			<header className="text-center flex flex-col gap-2">
				<h1 className="text-4xl font-[chelsea] text-black">Create your group</h1>
				<p className="text-gray-400 max-w-xs">Get started by making your first group!</p>
			</header>

			<form
				className="flex flex-col gap-2 w-full max-w-sm"
				onSubmit={(e) => {
					e.preventDefault()
					form.handleSubmit()
				}}
			>
				<form.Field
					asyncDebounceMs={1000}
					name="name"
					validators={{
						onChangeAsync: ({ value }) => { }
					}}
					children={(field) =>
						<>
							<Input
								id={field.name}
								name={field.name}
								type="text"
								fullWidth={true}
								className="bg-gray-100 text-black rounded-lg"
								placeholder="group name"
								value={field.state.value}
								onChange={(e) => field.handleChange(e.target.value)}
							/>

							<form.Subscribe
								selector={(state) => state.isSubmitting}
								children={(isSubmitting) => (
									<Button isDisabled={isSubmitting} type="submit" fullWidth className="rounded-lg font-semibold">{isSubmitting ? "Submitting..." : "Submit"}</Button>
								)}
							/>

							<form.Subscribe
								selector={(state) => state.errorMap}
								children={(errorMap) =>
									errorMap.onSubmit ? (
										<div className="text-red-500 text-sm">
											{errorMap.onSubmit}
										</div>
									) : null
								}
							/>
						</>
					}
				/>
			</form>
		</section>
	)
}
