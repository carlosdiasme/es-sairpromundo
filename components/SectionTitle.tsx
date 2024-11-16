import React from 'react'

interface SectionTitleProps {
  children: React.ReactNode
}

export function SectionTitle({ children }: SectionTitleProps) {
  return (
    <p className='text-xl mb-4 mt-16 bg-lightgreen py-2 px-4 border border-green inline-block rounded-full'>
      {children}
    </p>
  )
}