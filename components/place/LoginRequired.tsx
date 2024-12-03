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
        <Button variant="outline">Calificar</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Debes iniciar sesión para publicar reseñas.</DialogTitle>
          <DialogDescription>
          Inicia sesión o crea una cuenta para calificar este lugar.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end space-x-4 mt-4">
          <Button asChild>
            <Link href="/iniciar-sesion">Iniciar sesión</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/crear-cuenta">Registrarse</Link>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

