


interface RegistoLayoutProps {
    children: React.ReactNode;
}
  
export default async function RegistoLayout({ children }: RegistoLayoutProps){
    
    /*const session = await getServerSession(nextAuthOptions);

    if(!session){
        redirect('/login');
      
    }*/
    
    return (
        <>
            {children}
        </>
    )
}
