"use client";

import {
  Navbar,
  NavbarContent,
  NavbarBrand,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
} from "@nextui-org/react";

import "react-step-progress/dist/index.css";
import "./register.css";
import { useStepperStore } from "@/contexts/stepsStore";
import { useStepperRegistoStore } from "@/contexts/stepsStore";
import Logo from "@/components/Logo";
import { usePathname } from "next/navigation";
import { LogIn } from "lucide-react";
import { Stepper } from "@/components/Stepper";
import Link from "next/link";


interface RegisterLayoutProps {
  children: React.ReactNode;
}

const RegisterLayout = ({ children }: RegisterLayoutProps) => {
  const { currentStep } = useStepperStore();
  const { currentStepRegisto } = useStepperRegistoStore();

  const path = usePathname() || "";

  return (
    <div className="flex flex-col min-h-dvh bg-[#EBF5FF]">
      {/* NAVBAR */}
      <Navbar isBordered>
        <NavbarContent className="sm:hidden pr-1" justify="center">
          <NavbarBrand>
            <Logo size={22} />
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden sm:flex gap-6" justify="end">
          <NavbarBrand>
            <Logo size={22} />
          </NavbarBrand>
          <NavbarItem>
            <p>Já tem uma conta?</p>
          </NavbarItem>
          <NavbarItem>
            <Link href={'/login'} className="login-button" >
              <LogIn style={{ width: "1rem", height: "1rem" }} />
              <span>Fazer login</span>
            </Link>
          </NavbarItem>
        </NavbarContent>

        <NavbarContent className="sm:hidden" justify="end">
          <NavbarMenuToggle />
        </NavbarContent>

        <NavbarMenu>
          <NavbarItem>
            <p>Já tem uma conta?</p>
          </NavbarItem>
          <NavbarItem>
            <Link href={'/login'} className="login-button" >
              <LogIn style={{ width: "1rem", height: "1rem" }} />
              <span>Fazer login</span>
            </Link>
          </NavbarItem>
        </NavbarMenu>
      </Navbar>

      <div className="max-w-[90rem] flex flex-col md:flex-row gap-3 md:gap-0 md:pl-8">
        {/* Stepper */}
        {path.includes("registo") ? (
          <Stepper currentStep={currentStepRegisto} type="registo" />
        ) : (
          <Stepper currentStep={currentStep} type="adesao" />
        )}
        {/* Content */}
        <main className="flex-1 px-4 py-8 md:max-w-[35rem] md:mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default RegisterLayout;
