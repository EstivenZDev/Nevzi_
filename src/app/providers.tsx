// app/providers.tsx
'use client'

import { HeroUIProvider } from '@heroui/react'
import { ShoppingCartProvider } from '../context/ShoppingCarContext';
import { LanguageProvider } from '@/context/LanguageContext';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <HeroUIProvider>
      <ShoppingCartProvider>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </ShoppingCartProvider>
    </HeroUIProvider>
  )
}