"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import Link from "next/link"

export function LoginRequired() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Avaliar</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>É preciso estar logado para fazer avaliações.</DialogTitle>
          <DialogDescription>
            Entre ou crie sua conta para avaliar este lugar.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end space-x-4 mt-4">
          <Button asChild>
            <Link href="/entrar">Entre</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/criar-conta">Crie sua conta</Link>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}