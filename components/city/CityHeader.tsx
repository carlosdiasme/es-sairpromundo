import Image from "next/image"

interface CityHeaderProps {
  cityName: string
  logo: string
}

export function CityHeader({ cityName, logo }: CityHeaderProps) {
  return (
    <div className="relative w-full bg-background px-6 py-12">
      <div className="container flex flex-col-reverse items-center justify-between gap-6 md:flex-row md:items-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-regular tracking-tight text-foreground text-center md:text-left">
        ¿Qué hacer en {cityName}?
        </h1>
        <div className="relative aspect-square w-32 sm:w-40 md:w-48 overflow-hidden rounded-lg">
          <Image
            src={logo}
            alt={`Logo de ${cityName}`}
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>
    </div>
  )
}

