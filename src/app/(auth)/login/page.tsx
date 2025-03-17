import AuthForm from "@/components/AuthLoginForm";
import nextAuthOptions from "@/lib/nextAuthOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Login() {

  const session = await getServerSession(nextAuthOptions);

  if(session){
    redirect('/dashboard')
  }

  return (
    <section className="flex-center size-full max-sm:px-6  ">
      <AuthForm />
    </section>
  );
}
