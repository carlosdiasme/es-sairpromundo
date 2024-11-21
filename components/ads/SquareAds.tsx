"use client"

import React, { useEffect, useRef } from 'react'

declare global {
  interface Window {
    adsbygoogle: unknown[]
  }
}

export default function SquareAds() {
  const adRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const currentRef = adRef.current
    
    const loadAd = () => {
      if (typeof window !== 'undefined' && currentRef && currentRef.children.length === 0) {
        const script = document.createElement('script')
        script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8387814928293821"
        script.async = true
        script.crossOrigin = "anonymous"
        document.head.appendChild(script)

        const ins = document.createElement('ins')
        ins.className = 'adsbygoogle'
        ins.style.display = 'block'
        ins.dataset.adClient = 'ca-pub-8387814928293821'
        ins.dataset.adSlot = '5388237289'
        ins.dataset.adFormat = 'auto'
        ins.dataset.fullWidthResponsive = 'true'
        currentRef.appendChild(ins)

        try {
          ;(window.adsbygoogle = window.adsbygoogle || []).push({})
        } catch (err) {
          console.error('Error pushing ad:', err)
        }
      }
    }

    loadAd()

    return () => {
      if (currentRef) {
        currentRef.innerHTML = ''
      }
    }
  }, [])

  return <div ref={adRef} className="w-full h-full min-h-[250px]" />
}