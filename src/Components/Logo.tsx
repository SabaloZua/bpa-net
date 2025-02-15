"use client";

import Image from "next/image";

interface LogoProps {
  size: number;
  isLink?: boolean;
  position?: "center" | "start" | "end";
}

const Logo = ({ position }: LogoProps) => {
  return (
    <div
      className={` flex cursor-pointer items-center gap-1 
    ${position ? `justify-${position}` : ""}`}
    >
      <Image
        src={`/icons/logo_favicon.svg`}
        width={10}
        height={10}
        alt="Logo horizontal"
        className="size-[20px]  md:size-[36px] max-md:size-8"
      />
      <h1 className="sidebar-logo">
        BPA <span className="text-sm">NET</span>
      </h1> 

      {/* <h1 className="text-30 font-ibm-plex-serif font-bold text-black-1">
        BPA <span className="text-sm">NET</span>
      </h1> */}
    </div>
  );
};

export default Logo;
