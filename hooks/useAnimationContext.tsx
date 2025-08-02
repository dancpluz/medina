'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react';

type Stage = {
  id: string;
  buttonText?: string;
};

interface AnimationContextType {
  stage: Stage;
  setStage: (stage: Stage) => void;
  stageArray: Stage[];
  nextStage: () => void;
  prevStage: () => void;
}

const AnimationContext = createContext<AnimationContextType | null>(null);

export const AnimationProvider = ({ children }: { children: ReactNode }) => {
  const stageArray: Stage[] = [
    { id: 'envelope' },
    { id: 'heart', buttonText: 'Veja Por que' },
    { id: 'carousel' },
    { id: 'question' },
    { id: 'final', buttonText: 'Voltar' },
  ];
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
    <AnimationContext.Provider value={{ stage, setStage, stageArray, nextStage, prevStage }}>
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
