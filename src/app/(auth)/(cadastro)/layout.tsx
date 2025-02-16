"use client";

import {
  Navbar,
  NavbarContent,
  NavbarBrand,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
} from "@nextui-org/react";

import Stepper from "@keyvaluesystems/react-stepper";
import "react-step-progress/dist/index.css";
import "./register.css"
import useStepsStore from "@/contexts/stepStore";
import Logo from "@/Components/Logo";


interface CadastroLayoutProps {
  children: React.ReactNode;
}

export default function CadastroLayout({ children }: CadastroLayoutProps) {
  const stepsStore = useStepsStore();

  const styles = {
    LineSeparator: () => ({
      backgroundColor: "#1A82FF",
    }),
    ActiveLabelTitle: () => ({
      color: "#1A82FF",
      fontFamily: "Rubik",
    }),
    LabelTitle: () => ({
      color: "#545454",
      fontFamily: "Rubik",
    }),
    ActiveNode: () => ({
      backgroundColor: "#1A82FF",
    }),
    CompletedNode: () => ({
      backgroundColor: "#1A82FF",
    }),
    InactiveLineSeparator: () => ({
      backgroundColor: "#d2d2d2",
    }),
  };

  return (
    <div className="flex flex-col h-full">
      {/* NAVBAR */}
      <Navbar isBordered>
        <NavbarContent className="sm:hidden pr-1" justify="center">
          <NavbarBrand>
            <Logo size={22}/>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden sm:flex gap-6" justify="end">
          <NavbarBrand>
           
            <Logo size={22}/>
          </NavbarBrand>
          <NavbarItem>
            <p>Já tem uma conta?</p>
          </NavbarItem>
          <NavbarItem>
            
            <button
              className="goToLogin"
              onClick={(event) => {
                event.preventDefault();
              }}
            >
              Fazer login
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
              }}
            >
              Fazer login
            </button>
          </NavbarItem>
        </NavbarMenu>
      </Navbar>

      <div className="home_main">
        <div className="home_body">
          <div className="regLeft">
            <Stepper
              orientation="vertical"
              steps={[
                {
                  stepLabel: "Email",
                  completed: stepsStore.step1,
                },
                {
                  stepLabel: "Dados",
                  completed: stepsStore.step2,
                },
                {
                  stepLabel: "Contas",
                  completed: stepsStore.step3,
                },
                {
                  stepLabel: "Contrato",
                  completed: stepsStore.step4,
                },
              ]}
              currentStepIndex={stepsStore.current}
              styles={styles}
            />
          </div>
          <div className="regRight">
            <Stepper
              className="stepper2"
              orientation="horizontal"
              steps={[
                {
                  completed: stepsStore.step1,
                },
                {
                  completed: stepsStore.step2,
                },
                {
                  completed: stepsStore.step3,
                },
                {
                  completed: stepsStore.step4,
                },
              ]}
              currentStepIndex={stepsStore.current}
              styles={styles}
            />
            {children}
          </div>
          <div className="last" />
        </div>
      </div>
    </div>
  );
}
