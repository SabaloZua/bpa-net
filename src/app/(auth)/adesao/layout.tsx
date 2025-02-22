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
import Logo from "@/Components/Logo";
import { useRouter } from "next/navigation";
import { LogIn } from "lucide-react";
import { Stepper } from "@/Components/Stepper";

interface CadastroLayoutProps {
  children: React.ReactNode;
}

const AdesaoTemplate = ({ children }: CadastroLayoutProps) => {
  const { currentStep } = useStepperStore();

  const router = useRouter();

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
            <button className="login-button" onClick={() => router.replace("/login")}>
              <LogIn style={{ width: "1rem", height: "1rem" }} />
              <span>Fazer login</span>
            </button>
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
            <button
              type="button"
              className="goToLogin"
              onClick={(event) => {
                event.preventDefault();
                router.replace("/login");
              }}
            >
              Fazer login
            </button>
          </NavbarItem>
        </NavbarMenu>
      </Navbar>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row">
        {/* Stepper */}
        <Stepper currentStep={currentStep} />

        {/* Content */}
        <main className="flex-1 px-4 py-8">
          <div className="bg-white rounded-lg shadow-lg p-8">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default AdesaoTemplate;
