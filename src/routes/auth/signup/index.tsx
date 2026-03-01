import { createFileRoute, Link } from '@tanstack/react-router'
import { useForm } from '@tanstack/react-form'
import { Button, Input } from '@heroui/react'
import { authClient } from 'convex/auth/auth-client';
import { toast } from '@heroui/react';
import { useRouter } from '@tanstack/react-router'

export const Route = createFileRoute('/auth/signup/')({
  component: SignUpRouteComponent,
})

function SignUpRouteComponent() {
  const router = useRouter()

  const form = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      try {
        const response = await authClient.signUp.email({
          name: value.firstName + " " + value.lastName,
          email: value.email,
          password: value.password,
        })
        if (response.error!!) {
          throw response.error
        }
        
        router.navigate({ to: "/dashboard/parents"})
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
    },
    validators: {
      onSubmit: ({ value }) => {  
        if ( value.email.length === 0 || value.password.length === 0 || value.firstName.length === 0 || value.lastName.length === 0) {
          return "Ensure all fields are filled out"
        } else { return undefined }
      },
    },
  })

  return (
    <section className="polka flex flex-col gap-12 px-4 justify-center items-center bg-white w-screen h-screen">
      <header className="text-center flex flex-col gap-2">
        <h1 className="text-4xl font-[chelsea] text-black">Sign Up</h1>
        <p className="text-gray-400 max-w-xs">Create an account with a valid email & password or use Google.</p>
      </header>
      <form
        className="flex flex-col gap-2 w-full max-w-sm"
        onSubmit={(e) => {
          e.preventDefault()
          form.handleSubmit()
        }}
      >
        <form.Field
          name="firstName"
          children={(field) =>
            <>
              <Input
                id={field.name}
                name={field.name}
                type="text"
                fullWidth={true}
                className="bg-gray-100 text-black rounded-lg"
                placeholder='first name'
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            </>
          }
        />

        <form.Field
          name="lastName"
          children={(field) =>
            <>
              <Input
                id={field.name}
                name={field.name}
                type="text"
                fullWidth={true}
                className="bg-gray-100 text-black rounded-lg"
                placeholder='last name'
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            </>
          }
        />

        <form.Field
          asyncDebounceMs={1000}
          name="email"
          validators={{
            onChangeAsync: ({ value }) => !value.includes("@") && value.length > 0 ? "Invalid email" : undefined
          }}
          children={(field) =>
            <>
              <Input
                id={field.name}
                name={field.name}
                type="email"
                fullWidth={true}
                className="bg-gray-100 text-black rounded-lg"
                placeholder='email'
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

        <form.Field
          name="password"
          children={(field) =>
            <Input
              id={field.name}
              name={field.name}
              type="text"
              fullWidth={true}
              className="bg-gray-100 text-black rounded-lg"
              placeholder='password'
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
            />
          }
        />

        <form.Subscribe
          selector={(state) => state.isSubmitting}
          children={(isSubmitting) => (
            <Button isDisabled={isSubmitting} type="submit" fullWidth className="rounded-lg font-semibold">
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
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
      </form>

      <div className="mt-8 flex flex-col gap-4 justify-center items-center">
        <p className="text-gray-400 text-center font-medium">Joining your parent's group? <Link to="/auth/join" className="text-blue-400">Click here</Link></p>
      </div>

    </section>
  )
}
