'use client'
import AuthForm from "@/Components/AuthLoginForm";
import FingerprintJS from '@fingerprintjs/fingerprintjs';
import { useEffect } from "react";
export default function Login(){
    useEffect(()=>{

        const collectFingerprint = async () => {
          const fp = await FingerprintJS.load(); 
          const result = await fp.get();
          console.log(result.visitorId);
         
        }
        collectFingerprint();
      }, [])
    return(
        <section className="flex-center size-full max-sm:px-6  ">
            <AuthForm/>
        </section>
    )
}