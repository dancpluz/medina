'use client'

import GradientButton from '@/components/GradientButton';
import Magnet from '@/components/Magnet';
import Scene from '@/components/Scene';
import useAnimationContext from '@/hooks/useAnimationContext';
import ReverseMagnet from '@/components/ReverseMagnet';

export default function Home() {
  const { nextStage, stage, stageArray } = useAnimationContext();

  return (
    <main className='relative h-screen overflow-hidden'>
      <Scene />
      {stage.id === 'question' && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center flex flex-col gap-32 w-full p-8">
          <h1 className="text-6xl font-thin">Você quer namorar comigo?</h1>
          <div className="flex justify-around">
            <Magnet padding={200} magnetStrength={1} wrapperClassName="">
              <GradientButton onClick={nextStage}>
                <span>Sim</span>
              </GradientButton>
            </Magnet>
            <ReverseMagnet repulsionStrength={100} padding={200} wrapperClassName="">
              <GradientButton onClick={nextStage}>
                <span>Não</span>
              </GradientButton>
            </ReverseMagnet>
          </div>
        </div>)
      }
      {stage.buttonText && (
        <Magnet wrapperClassName="absolute bottom-[15vh] left-1/2 -translate-x-1/2">
          <GradientButton onClick={nextStage}>
            <span>{stage.buttonText}</span>
          </GradientButton>
        </Magnet>)
      }
    </main>
  );
}
