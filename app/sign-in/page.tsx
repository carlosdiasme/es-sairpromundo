import { Metadata } from "next"
import Link from "next/link"
import dynamic from 'next/dynamic'
import { ComponentType } from 'react'

const SigninForm = dynamic(() => import("@/components/SigninForm").then(mod => mod.SigninForm as ComponentType), {
  loading: () => <p>Loading form...</p>,
})

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to your Sair pro Mundo account",
}

export default function SigninPage() {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center p-4">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-normal tracking-tight">
            Welcome back
          </h1>
          <p className="text-sm text-muted-foreground">
            Sign in to your account to continue
          </p>
        </div>
        <SigninForm />
        <p className="px-8 text-center text-sm text-muted-foreground">
          <Link
            href="/create-account"
            className="hover:text-brand underline underline-offset-4"
          >
            Don&apos;t have an account? Create one now
          </Link>
        </p>
      </div>
    </div>
  )
}

