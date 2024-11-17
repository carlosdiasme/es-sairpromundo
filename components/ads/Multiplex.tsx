'use client'

import { useEffect } from 'react'
import Script from 'next/script'

export default function Multiplex() {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({})
    } catch (err) {
      console.error('Error initializing AdSense Multiplex:', err)
    }
  }, [])

  return (
    <>
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8387814928293821"
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-format="autorelaxed"
        data-ad-client="ca-pub-8387814928293821"
        data-ad-slot="9142805572"
      />
    </>
  )
}