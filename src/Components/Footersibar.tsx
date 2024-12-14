import Image from "next/image";

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
          Sabalovieira@gmail.com
        </p>
      </div>

      <div className="footer_image">
        <Image src="icons/logout.svg" fill alt="jsm" />
      </div>
    </footer>
  );
};

export default Footersibar;
