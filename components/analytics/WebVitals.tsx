// components/analytics/WebVitals.tsx
'use client'

import Script from 'next/script'

export function WebVitals() {
  if (process.env.NODE_ENV !== 'production') {
    return null
  }

  return (
    <Script
      id="web-vitals"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          function sendToAnalytics(metric) {
            const body = JSON.stringify({
              name: metric.name,
              value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
              rating: metric.rating,
              delta: metric.delta,
              id: metric.id,
            });
            
            if (window.gtag) {
              window.gtag('event', metric.name, {
                value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
                metric_id: metric.id,
                metric_value: metric.value,
                metric_delta: metric.delta,
                metric_rating: metric.rating,
                event_category: 'Web Vitals',
                non_interaction: true,
              });
            }
            
            if (navigator.sendBeacon) {
              navigator.sendBeacon('/api/analytics', body);
            }
          }
          
          if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
            // LCP
            new PerformanceObserver((list) => {
              const entries = list.getEntries();
              const lastEntry = entries[entries.length - 1];
              sendToAnalytics({
                name: 'LCP',
                value: lastEntry.renderTime || lastEntry.loadTime,
                rating: lastEntry.renderTime < 2500 ? 'good' : lastEntry.renderTime < 4000 ? 'needs-improvement' : 'poor',
                delta: lastEntry.renderTime || lastEntry.loadTime,
                id: 'v3-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9),
              });
            }).observe({ type: 'largest-contentful-paint', buffered: true });
            
            // FID
            new PerformanceObserver((list) => {
              list.getEntries().forEach((entry) => {
                sendToAnalytics({
                  name: 'FID',
                  value: entry.processingStart - entry.startTime,
                  rating: entry.processingStart - entry.startTime < 100 ? 'good' : entry.processingStart - entry.startTime < 300 ? 'needs-improvement' : 'poor',
                  delta: entry.processingStart - entry.startTime,
                  id: 'v3-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9),
                });
              });
            }).observe({ type: 'first-input', buffered: true });
            
            // CLS
            let clsValue = 0;
            let clsEntries = [];
            new PerformanceObserver((list) => {
              list.getEntries().forEach((entry) => {
                if (!entry.hadRecentInput) {
                  clsValue += entry.value;
                  clsEntries.push(entry);
                }
              });
            }).observe({ type: 'layout-shift', buffered: true });
            
            addEventListener('visibilitychange', () => {
              if (document.visibilityState === 'hidden' && clsValue > 0) {
                sendToAnalytics({
                  name: 'CLS',
                  value: clsValue,
                  rating: clsValue < 0.1 ? 'good' : clsValue < 0.25 ? 'needs-improvement' : 'poor',
                  delta: clsValue,
                  id: 'v3-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9),
                });
              }
            });
          }
        `,
      }}
    />
  )
}