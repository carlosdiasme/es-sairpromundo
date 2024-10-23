import React from 'react'
import { Search } from 'lucide-react'

interface SearchInputProps {
  placeholder?: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  className?: string
}

export default function SearchInput({ placeholder = 'Search...', onChange, className = '' }: SearchInputProps) {
  return (
    <div className={`relative w-full max-w-[400px] ${className}`}>
      <input
        type="text"
        placeholder={placeholder}
        onChange={onChange}
        className="w-full h-10 pl-4 pr-10 text-xs bg-white border border-neongreen rounded-full focus:outline-none focus:border-green focus:ring-1 focus:ring-green"
      />
      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
        <Search className="w-4 h-4 text-gray-400" />
      </div>
    </div>
  )
}