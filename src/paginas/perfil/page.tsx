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
import { useState } from "react";
import { useForm } from "react-hook-form";
import api from "@/utils/axios";
import { toast } from "sonner";
import { AxiosError } from "axios";
import * as z from "zod";
import { TailSpin } from "react-loader-spinner";



const profileFormSchema = z.object({
	numeroBI: z
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

});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

interface Props {
	dados: DadosContaType | undefined;
}

export default function Perfil({ dados }: Props) {
	const [selectedImage, setSelectedImage] = useState<string | null>(dados?.cliente.imagem ?? null); // Estado para armazenar a imagem selecionada
	const [selectedFile, setSelectedFile] = useState<File | null>(null); // Estado para armazenar o arquivo selecionado
 	 const [isLoading, setIsLoading] = useState(false);
	const defaultValues: Partial<ProfileFormValues> = {
		numeroBI: dados?.cliente.bi?.toString(),
		name: dados?.cliente.nome,
		email: dados?.cliente.email,
	};

	const form = useForm<ProfileFormValues>({
		resolver: zodResolver(profileFormSchema),
		defaultValues,
		mode: "onChange",
	});
	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			const imageUrl = URL.createObjectURL(file); // Cria uma URL temporária para a imagem
			setSelectedImage(imageUrl); // Atualiza o estado com a URL da imagem
			setSelectedFile(file); 
		}
	}
	async	function onSubmit(data: ProfileFormValues) {
		try {
		if (!selectedFile) {
            alert("Por favor, selecione uma imagem antes de enviar.");
            return;
        }
		setIsLoading(true);
		const formData = new FormData();
        formData.append("image", selectedFile); 

		 await api.post(`/cliente/uploadfoto/${dados?.id}`, formData,
			{
				headers: {
					"Content-Type": "multipart/form-data",
				},
		 }
		)
		console.log("Edit-Profile-form", data);
		toast.success("Foto de perfil carregada com sucesso!");
	}catch (erro) {
		if (erro instanceof AxiosError) {
				if (erro.response?.status === 400) {
				  toast.error(erro.response?.data.message);
				} else {
				  toast.error("Sem conexão com o servidor");
				}
			  }
	}finally {
		setIsLoading(false);
	  }
	}
 // Função para lidar com a seleção de arquivo


	return (
		<div className="space-y-6">
			<div className="space-y-4">
				<div className="flex flex-col gap-4 sm:flex-row sm:items-center">
					<Avatar className="h-24 w-24">
						<AvatarImage
							src={selectedImage ?? undefined}
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
							<input
								type="file"
								id="fileInput"
								name="image"
								hidden
								multiple={false}
								accept="image/*"
								onChange={handleFileChange} // Adiciona o evento onChange
							/>
							<Button size="sm" className="mt-2"
							 onClick={() => document.getElementById('fileInput')?.click()}
							>
								<Upload className="mr-2 h-4 w-4" />
								Carregar foto

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
								name="numeroBI"
								render={({ field }) => (
									<FormItem>
										<FormLabel>
											Nº do Bilhete de Identidade
										</FormLabel>
										<FormControl>
											<Input
												placeholder={`${dados?.cliente.bi}`}
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
								name="email"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Email</FormLabel>
										<FormControl>
											<Input
												placeholder={`${dados?.cliente.email}`}
												{...field}
												disabled
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

						</div>
					</div>
					<div className="flex justify-end gap-2">
						<Button type="button" variant="outline">
							Cancelar
						</Button>
						<Button type="submit">
							
								 {isLoading ? (
											  <TailSpin
												height="25"
												width="25"
												color="#fff"
												ariaLabel="tail-spin-loading"
												radius="1"
												visible={true}
											  />
											) : (
											  <>
												<span>Guardar Alterações</span>
												
											  </>
											)}
							</Button>
					</div>
				</form>
			</Form>
		</div>
	);
}
