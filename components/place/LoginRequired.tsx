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
        <Button variant="outline">Rate</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>You must be logged in to post reviews.</DialogTitle>
          <DialogDescription>
          Log in or create an account to rate this place.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end space-x-4 mt-4">
          <Button asChild>
            <Link href="/entrar">Sign in</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/criar-conta">Sign up</Link>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}