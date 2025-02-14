"use client";

import Link from "next/link";
import Logo from "./Logo";
import Hamburger from "hamburger-react";
import { useState } from "react";

interface HeaderProps {
  isAdesao?: boolean;
}

export const Header = ({ isAdesao }: HeaderProps) => {
  const [isOpen, setOpen] = useState(false);

  return (
    <div className="w-full border-b">
    
      {!isAdesao && (
        <>
          <div className="h-[4.5rem] flex items-center px-6 justify-between ">
            <div className="logo flex items-center">
              <Logo size={22} />
            </div>
            <ul className="menu hidden md:flex gap-6">
              <li>
                <Link href="/aderir" className="text-lg">
                  Aderir
                </Link>
              </li>
              <li>
                <Link href="/login" className="text-lg">
                  Entrar
                </Link>
              </li>
              <li>
                <Link href="plit" className="text-lg">
                  Políticas de Privacidade
                </Link>
              </li>
            </ul>
            <div className="menu-icon md:hidden">
              <Hamburger rounded toggled={isOpen} toggle={setOpen} />
            </div>
          </div>

          {isOpen && (
            <ul className="md:hidden px-6 flex flex-col gap-2 min-h-screen inset-0 z-10 overflow-hidden">
              <li>
                <Link href="/aderir" className="text-lg">
                  Aderir
                </Link>
              </li>
              <li>
                <Link href="/login" className="text-lg">
                  Entrar
                </Link>
              </li>
              <li>
                <Link href="plit" className="text-lg">
                  Políticas de Privacidade
                </Link>
              </li>
            </ul>
          )}
        </>
      )}
    </div>
  );
};
