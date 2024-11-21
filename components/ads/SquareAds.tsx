"use client"

import { useEffect } from 'react'
import Script from 'next/script'

export default function SquareAds() {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({})
    } catch (err) {
      console.error('Error loading AdSense ads:', err)
    }
  }, [])

  return (
    <div className="ad-container">
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8387814928293821"
        crossOrigin="anonymous"
        strategy="lazyOnload"
        onError={(e) => {
          console.error('Script failed to load', e)
        }}
      />
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-8387814928293821"
        data-ad-slot="5388237289"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  )
}