"use client"
import { useEffect } from "react";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";
interface GuideDriverStep {
    element: string;
    popover: {
      title: string;
      description: string;
    };
  }
  
interface GuideDriverProps {
  steps: GuideDriverStep[];
  onFinish?: () => void; 
}

export default function GuideDriver({ steps, onFinish }: GuideDriverProps) {
  useEffect(() => {
    const driverObj = driver({
      popoverClass: 'driverjs-theme',
      doneBtnText: 'Fechar',
      nextBtnText: 'Próximo',
      prevBtnText: 'Anterior',
      showProgress: true,
      steps:steps,
      onDestroyed: () => {
        
        console.log("Tour finalizado!");
        if (onFinish) onFinish(); // chama a função externa se houver
      }

    });    
    driverObj.drive();
  }, []);

  return null;
}