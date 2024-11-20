"use client"

import * as React from "react"
import Link from "next/link"
import { MapPin, AudioWaveform, ListFilter, Heart, ChevronDown } from 'lucide-react'

import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface NavPlaceProps {
  cityName: string
  citySlug: string
  categoryName: string
  categorySlug: string
}

export default function NavPlace({ cityName, citySlug, categoryName, categorySlug }: NavPlaceProps) {
  return (
    <div className="w-full border-0 mb-2">
      <div className="overflow-x-auto scrollbar-hide">
        <nav className="flex h-14 items-center gap-4 px-4 min-w-max">
          <Link
            href={`/cidades/${citySlug}`}
            className="flex items-center gap-2 text-xs text-muted-foreground hover:text-primary"
          >
            <MapPin className="h-3 w-3" />
            <span>{cityName}</span>
          </Link>
          <div className="h-4 w-px bg-border" aria-hidden="true" />
          <Link 
            href={`/cidades/${citySlug}/categorias/${categorySlug}`}
            className="flex items-center gap-2 text-xs text-muted-foreground hover:text-primary"
          >
            <AudioWaveform className="h-3 w-3" />
            <span>{categoryName}</span>
          </Link>
          
          <div className="h-4 w-px bg-border" aria-hidden="true" />
          <div className="flex items-center gap-6">
            <ListFilter className="h-3 w-3" />
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2 text-xs text-muted-foreground hover:text-primary p-0 h-auto hover:bg-background">
                  <span>Categorias</span>
                  <ChevronDown className="h-3 w-3" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <div className="grid gap-4 py-4">
                  <Button variant="ghost">Restaurantes</Button>
                  <Button variant="ghost">Bares</Button>
                  <Button variant="ghost">Cafés</Button>
                </div>
              </DialogContent>
            </Dialog>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2 text-xs text-muted-foreground hover:text-primary p-0 h-auto hover:bg-background">
                  <span>Especialidades</span>
                  <ChevronDown className="h-3 w-3" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <div className="grid gap-4 py-4">
                  <Button variant="ghost">Italiana</Button>
                  <Button variant="ghost">Japonesa</Button>
                  <Button variant="ghost">Brasileira</Button>
                </div>
              </DialogContent>
            </Dialog>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2 text-xs text-muted-foreground hover:text-primary p-0 h-auto hover:bg-background">
                  <span>Atividades</span>
                  <ChevronDown className="h-3 w-3" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <div className="grid gap-4 py-4">
                  <Button variant="ghost">Esportes</Button>
                  <Button variant="ghost">Jogos</Button>
                  <Button variant="ghost">Aventura</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </nav>
      </div>
      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  )
}