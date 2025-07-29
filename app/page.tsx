'use client'

import GradientButton from '@/components/GradientButton';
import Magnet from '@/components/Magnet';
import Scene from '@/components/Scene';

export default function Home() {
  return (
    <main className='relative h-screen'>
      <Scene />
      <Magnet wrapperClassName="absolute bottom-[20%] left-1/2 -translate-x-1/2">
        <GradientButton>
          <span className="text-white font-bold">Por que?</span>
        </GradientButton>
      </Magnet>
    </main>
  );
}
