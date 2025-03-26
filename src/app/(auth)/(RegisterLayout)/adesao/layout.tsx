

interface AdesaoLayoutProps {
    children: React.ReactNode;
}
  
export default async function AdesaoLayout({ children }: AdesaoLayoutProps){
    
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
