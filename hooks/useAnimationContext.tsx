'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Stage = {
  id: string;
  buttonText?: string;
  fadeIn?: number;      // Transition in duration (ms)
  fadeOut?: number;     // Transition out duration (ms)
  delay?: number;       // Transition delay (ms)
};

interface AnimationContextType {
  stage: Stage;
  setStage: (stage: Stage) => void;
  nextStage: () => void;
  prevStage: () => void;
}

const AnimationContext = createContext<AnimationContextType | null>(null);

export const stageArray: Stage[] = [
  { id: 'envelope' },
  {
    id: 'heart',
    buttonText: 'Veja o Porquê',
    fadeIn: 800,
    fadeOut: 500,
    delay: 8000
  },
  {
    id: 'carousel',
    buttonText: 'Eu tenho um Pedido...',
    fadeIn: 1500,
    fadeOut: 500,
    delay: 30000
  },
  { 
    id: 'question',
    fadeIn: 1500,
    fadeOut: 800,
    delay: 2000
  },
  {
    id: 'final',
    buttonText: 'kkkkkkkkk',
    fadeIn: 800,
    fadeOut: 600,
    delay: 3000
  },
];

export const AnimationProvider = ({ children }: { children: ReactNode }) => {
  const [stage, setStage] = useState<AnimationContextType['stage']>(stageArray[0]);

  function nextStage() {
    const currentIndex = stageArray.findIndex(s => s.id === stage.id);
    if (currentIndex < stageArray.length - 1) {
      setStage(stageArray[currentIndex + 1]);
    } else {
      setStage(stageArray[0]);
    }
  }

  function prevStage() {
    const currentIndex = stageArray.findIndex(s => s.id === stage.id);
    if (currentIndex > 0) {
      setStage(stageArray[currentIndex - 1]);
    } else {
      setStage(stageArray[stageArray.length - 1]);
    }
  }

  return (
    <AnimationContext.Provider value={{ stage, setStage, nextStage, prevStage }}>
      {children}
    </AnimationContext.Provider>
  );
};

export const useAnimationContext = () => {
  const context = useContext(AnimationContext);
  if (!context) {
    throw new Error('useAnimationContext must be used within an AnimationProvider');
  }
  return context;
};

export default useAnimationContext;
