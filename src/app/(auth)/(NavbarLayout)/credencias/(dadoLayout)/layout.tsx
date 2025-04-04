"use client";


interface AdesaoLayoutProps {
  children: React.ReactNode;
}
import "./register.css";

const AdesaoLayout = ({ children }: AdesaoLayoutProps) => {
  

  return (
    <div className="flex flex-col min-h-dvh bg-[#EBF5FF]">
     
      <div className="max-w-[90rem] flex flex-col md:flex-row gap-3 md:gap-0 md:pl-8">
      
        <main className="flex-1 px-4 py-8 md:max-w-[35rem] md:mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default AdesaoLayout;