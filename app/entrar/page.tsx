import { Metadata } from "next"
import Link from "next/link"
import dynamic from 'next/dynamic'
import { ComponentType } from 'react'

const SigninForm = dynamic(() => import("@/components/SigninForm").then(mod => mod.SigninForm as ComponentType), {
  loading: () => <p>Carregando formulário...</p>,
})

export const metadata: Metadata = {
  title: "Entrar",
  description: "Entre na sua conta do Sair pro Mundo",
}

export default function SigninPage() {
  return (
    <div className=" flex h-screen w-screen flex-col items-center justify-center p-4">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-normal tracking-tight">
            Bem-vindo de volta
          </h1>
          <p className="text-sm text-muted-foreground">
            Entre na sua conta para continuar
          </p>
        </div>
        <SigninForm />
        <p className="px-8 text-center text-sm text-muted-foreground">
          <Link
            href="/criar-conta"
            className="hover:text-brand underline underline-offset-4"
          >
            Não tem uma conta? Crie agora
          </Link>
        </p>
      </div>
    </div>
  )
}