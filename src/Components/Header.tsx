"use client";

import Link from "next/link";
import Logo from "./Logo";
import {
  Navbar,
  NavbarContent,
  NavbarBrand,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
} from "@nextui-org/react";

export const Header = () => {
  return (
    <>
      {/**
        
         * <div className="w-full border-b">
    
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
         */}

      <Navbar isBordered isBlurred>
        <NavbarContent className="sm:hidden pr-1" justify="start">
          <NavbarBrand>
            {/* <Image
              src={`/icons/logo_favicon.svg`}
              width={44}
              height={44}
              alt="Logo horizontal"
              className="size-[45px] max-md:size-14 "
            />
            <h1 className="sidebar-logo">
              BPA <span className="text-sm">NET</span>
            </h1> */}
            <Logo size={22} />
          </NavbarBrand>
        </NavbarContent>
        <NavbarContent className="hidden sm:flex gap-6" justify="start">
          <NavbarBrand>
            {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
            {/* <Image
              src={`/icons/logo_favicon.svg`}
              width={35}
              height={35}
              alt="Logo horizontal"
              className="size-[36px] max-md:size-14"
            />
            <h1 className="sidebar-logo">
              BPA <span className="text-sm">NET</span>
            </h1> */}

            <Logo size={22} />
          </NavbarBrand>
          <NavbarItem>
            <Link className="text-color-text" href="/login">
              Entrar
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link href="/aderir" className="text-color-text" aria-current="page">
              Aderir
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link className="text-color-text" href="/privacy-policies">
              Políticas de Privacidade
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link className="text-color-text" href="/forgot-password">
              Recuperar Credenciais
            </Link>
          </NavbarItem>
        </NavbarContent>

        <NavbarContent className="sm:hidden" justify="end">
          <NavbarMenuToggle />
        </NavbarContent>

        <NavbarMenu>
          <NavbarItem>
            <Link className="text-color-text" href="/login">
              Entrar
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link href="/aderir" className="text-color-text" aria-current="page">
              Aderir
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link className="text-color-text" href="/privacy-policies">
              Políticas de Privacidade
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link className="text-color-text" href="/forgot-password">
              Recuperar Credenciais
            </Link>
          </NavbarItem>
        </NavbarMenu>
      </Navbar>
    </>
  );
};
