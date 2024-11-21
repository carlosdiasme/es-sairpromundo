import { Metadata } from "next"
import Link from "next/link"
import dynamic from 'next/dynamic'
import { ComponentType } from 'react'

const SignupForm = dynamic(() => import("@/components/SignupForm").then(mod => mod.SignupForm as ComponentType), {
  loading: () => <p>Carregando formulário...</p>,
})

export const metadata: Metadata = {
  title: "Criar Conta",
  description: "Crie sua conta no Sair pro Mundo",
}

export default function SignupPage() {
  return (
    <div className=" flex h-screen w-screen flex-col items-center justify-center p-4">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-normal tracking-tight">
            Crie sua conta
          </h1>
          <p className="text-sm text-muted-foreground">
            Preencha os campos abaixo para criar sua conta
          </p>
        </div>
        <SignupForm />
        <p className="px-8 text-center text-sm text-muted-foreground">
          <Link
            href="/entrar"
            className="hover:text-brand underline underline-offset-4"
          >
            Já tem uma conta? Entre agora
          </Link>
        </p>
      </div>
    </div>
  )
}