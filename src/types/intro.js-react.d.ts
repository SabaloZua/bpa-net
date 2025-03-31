// types/intro.js-react.d.ts
declare module 'intro.js-react' {
    import { Component } from 'react';
  
    export interface StepProps {
      element: string;
      intro: string;
      position?: string;
      tooltipClass?: string;
      highlightClass?: string;
    }
  
    export interface HintProps {
      element: string;
      hint: string;
      hintPosition?: string;
      hintButtonLabel?: string;
    }
  
    export interface StepsProps {
      enabled: boolean;
      steps: StepProps[];
      initialStep: number;
      onExit: () => void;
      onComplete?: () => void;
      onChange?: (currentStep: number) => void;
      options?: any;
    }
  
    export interface HintsProps {
      enabled: boolean;
      hints: HintProps[];
      onClick?: (hintIndex: number) => void;
      options?: any;
    }
  
    export class Steps extends Component<StepsProps> {}
    export class Hints extends Component<HintsProps> {}
  }