import { Header } from "@/Components/Header";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="w-full h-full flex flex-col">
            <Header />
            {children}
        </div>
    )
}
