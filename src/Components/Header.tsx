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
      <Navbar isBordered isBlurred>
        <NavbarContent className="md:hidden pr-1" justify="start">
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
            <Logo size={22}/>
          </NavbarBrand>
        </NavbarContent>
        <NavbarContent className="hidden md:flex gap-6" justify="start">
          <NavbarBrand>

            <Logo size={22}/>
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
            <Link className="text-color-text" href="/credencias/email">
              Recuperar Credenciais
            </Link>
          </NavbarItem>
        </NavbarContent>

        <NavbarContent className="md:hidden" justify="end">
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
