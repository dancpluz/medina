import React, { createContext, useContext, useState, ReactNode } from 'react';

type Stage = 'loading' | 'envelope' | 'heart' | 'carousel' | 'final';

interface AnimationContextType {
  stage: Stage;
  setStage: (stage: Stage) => void;
}

const AnimationContext = createContext<AnimationContextType | undefined>(undefined);

export const AnimationProvider = ({ children }: { children: ReactNode }) => {
  const [stage, setStage] = useState<AnimationContextType['stage']>('loading');

  return (
    <AnimationContext.Provider value={{ stage, setStage }}>
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
