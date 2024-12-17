import Image from "next/image";
import Link from "next/link";

interface FooterProps {
  tipo: string;
}

const Footersibar = ({ tipo = "desktop" }: FooterProps) => {
  return (
    <footer className="footer">
      <div className={`${tipo === "mobile" ? "footer_name-mobile" : "footer_name"} bg-[url('/icons/perfil.jpeg')] bg-cover`}>
        
      </div>

      <div
        className={tipo === "mobile" ? "footer_email-mobile" : "footer_email"}
      >
        <h1 className="text-14 truncate text-gray-700 font-semibold">Astro</h1>
        <p className="text-14 truncate font-normal text-gray-600">
        Astronauta42@outlook.pt
        </p>
      </div>

      <div className="footer_image">
        <Link  href={'/login'}>
          <Image src="icons/logout.svg" fill alt="jsm" />
        </Link> 
      </div>
    </footer>
  );
};

export default Footersibar;
