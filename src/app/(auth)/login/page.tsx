import AuthForm from "@/Components/AuthForm";

export default function Login(){
    return(
        <section className="flex-center size-full max-sm:px-6 ">
            <AuthForm type="login"/>
        </section>
    )
}