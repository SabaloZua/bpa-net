"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { DadosContaType } from "@/types/commons";
import { zodResolver } from "@hookform/resolvers/zod";
import { Upload } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const profileFormSchema = z.object({
	username: z
		.string()
		.min(2, {
			message: "O nome de utilizador deve ter pelo menos 2 caracteres.",
		})
		.max(30, {
			message: "O nome de utilizador não deve ter mais de 30 caracteres.",
		}),
	name: z
		.string()
		.min(2, {
			message: "O nome deve ter pelo menos 2 caracteres.",
		})
		.max(50, {
			message: "O nome não deve ter mais de 50 caracteres.",
		}),
	email: z.string().email({
		message: "Por favor, introduza um endereço de email válido.",
	}),
	bio: z
		.string()
		.max(160, {
			message: "A biografia não deve ter mais de 160 caracteres.",
		})
		.optional(),
	location: z.string().optional(),
	website: z
		.string()
		.url({
			message: "Por favor, introduza um URL válido.",
		})
		.optional()
		.or(z.literal("")),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

const defaultValues: Partial<ProfileFormValues> = {
	username: "johndoe",
	name: "John Doe",
	email: "john.doe@example.com",
	bio: "Designer de produtos e programador sediado em Nova Iorque. Crio interfaces intuitivas para startups em crescimento.",
	location: "Nova Iorque, EUA",
	website: "https://example.com",
};

interface Props{
	dados: DadosContaType | undefined;
}

export default function Perfil({dados}:Props) {
	const form = useForm<ProfileFormValues>({
		resolver: zodResolver(profileFormSchema),
		defaultValues,
		mode: "onChange",
	});

	function onSubmit(data: ProfileFormValues) {
		toast("O seu perfil foi actualizado com sucesso.");
		console.log("Edit-Profile-form", data);
	}

	return (
		<div className="space-y-6">
			<div className="space-y-4">
				<div className="flex flex-col gap-4 sm:flex-row sm:items-center">
					<Avatar className="h-24 w-24">
						<AvatarImage
							src="/placeholder.svg?height=80&width=80"
							alt="@johndoe"
						/>
						<AvatarFallback>JD</AvatarFallback>
					</Avatar>
					<div className="space-y-1">
						<h3 className="text-lg font-medium">Foto de perfil</h3>
						<p className="text-sm text-muted-foreground">
							Clique no botão abaixo para carregar uma nova foto
							de perfil.
						</p>
						<div className="flex gap-2">
							<Button size="sm" className="mt-2">
								<Upload className="mr-2 h-4 w-4" />
								Carregar imagem
							</Button>
							<Button
								size="sm"
								variant="outline"
								className="mt-2"
							>
								Remover
							</Button>
						</div>
					</div>
				</div>
			</div>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="space-y-8"
				>
					<div className="space-y-6">
						<h3 className="text-lg font-medium">
							Informações Básicas
						</h3>
						<Separator />
						<div className="grid gap-6 sm:grid-cols-2">
							<FormField
								control={form.control}
								name="name"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Nome</FormLabel>
										<FormControl>
											<Input
												placeholder={`${dados?.cliente.nome}`}
												disabled
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="username"
								render={({ field }) => (
									<FormItem>
										<FormLabel>
											Nº do Bilhete de Identidade
										</FormLabel>
										<FormControl>
											<Input
												placeholder={`${dados?.cliente.bi}`}
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Email</FormLabel>
										<FormControl>
											<Input
												placeholder={`${dados?.cliente.email}`}
												{...field}
											/>
										</FormControl>
										<FormDescription>
											Nunca partilharemos o seu email com
											ninguém.
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="bio"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Biografia</FormLabel>
										<FormControl>
									
										</FormControl>
										<FormDescription>
											Descrição breve do seu perfil.
											Máximo de 160 caracteres.
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
					</div>
					<div className="space-y-6">
						<h3 className="text-lg font-medium">
							Preferências de Notificação
						</h3>
						<Separator />
						<div className="space-y-4">
							<div className="flex items-center justify-between">
								<div className="space-y-0.5">
									<h4 className="font-medium">
										Notificações por Email
									</h4>
									<p className="text-sm text-muted-foreground">
										Receber notificações importantes por
										email.
									</p>
								</div>
				
							</div>
							<div className="flex items-center justify-between">
								<div className="space-y-0.5">
									<h4 className="font-medium">
										Notificações Push
									</h4>
									<p className="text-sm text-muted-foreground">
										Receber notificações no seu dispositivo.
									</p>
								</div>
		
							</div>
							<div className="flex items-center justify-between">
								<div className="space-y-0.5">
									<h4 className="font-medium">
										Emails de Marketing
									</h4>
									<p className="text-sm text-muted-foreground">
										Receber promoções e boletins
										informativos.
									</p>
								</div>
							
							</div>
						</div>
					</div>

					<div className="flex justify-end gap-2">
						<Button type="button" variant="outline">
							Cancelar
						</Button>
						<Button type="submit">Guardar Alterações</Button>
					</div>
				</form>
			</Form>
		</div>
	);
}
