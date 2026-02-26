import { Button, Input } from '@heroui/react'
import { useForm } from '@tanstack/react-form'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/auth/join/')({
	component: JoinGroupComponent,
})

function JoinGroupComponent() {

	const form = useForm({
		defaultValues: {
			code: "",
		},
	})

	return (
		<section className="polka flex flex-col gap-12 px-4 justify-center items-center bg-white w-screen h-screen">
			<header className="text-center flex flex-col gap-2">
				<h1 className="text-4xl font-[chelsea] text-black">Login</h1>
				<p className="text-gray-400 max-w-xs">Joining your parent's group? Enter the unique group id to enter.</p>
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
					name="code"
					validators={{
						onChangeAsync: ({ value }) => !value.includes("@") && value.length > 0 ? "Invalid email" : undefined
					}}
					children={(field) =>
						<>
							<Input
								id={field.name}
								name={field.name}
								type="code"
								fullWidth={true}
								className="bg-gray-100 text-black rounded-lg"
								placeholder='code'
								value={field.state.value}
								onChange={(e) => field.handleChange(e.target.value)}
							/>

							{field.state.meta.errors.map((error, i) => (
								<div key={i} className="text-red-400 text-xs">
									{error}
								</div>
							))}
						</>
					}
				/>

				<form.Subscribe
					selector={(state) => state.isSubmitting}
					children={(isSubmitting) => (
						<Button isDisabled={isSubmitting} type="submit" fullWidth className="rounded-lg font-semibold">{isSubmitting ? "Joining..." : "Join"}</Button>
					)}
				/>
			</form>

		</section>
	)
}
