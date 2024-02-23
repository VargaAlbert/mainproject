"use client"
import React, { useState } from 'react'
import HomeCarousel from '@/components/feature/navigation/HomeCarousel';

export default function Home() {

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 container mx-auto max-w-screen-2xl">
      <HomeCarousel />
    </main>
  );
}
