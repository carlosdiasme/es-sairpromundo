import React from 'react'
import InArticleAds from '@/components/ads/InArticleAds'

export function insertAdsInContent(content: string, adInterval: number = 8): (React.ReactElement | null)[] {
  const paragraphs = content.split('</p>')
  const result: (React.ReactElement | null)[] = []

  paragraphs.forEach((paragraph, index) => {
    if (paragraph.trim() !== '') {
      result.push(React.createElement('div', { dangerouslySetInnerHTML: { __html: paragraph + '</p>' }, key: `p-${index}` }))
      if ((index + 1) % adInterval === 0 && index < paragraphs.length - 1) {
        result.push(React.createElement(InArticleAds, { key: `ad-${index}` }))
      }
    }
  })

  return result
}