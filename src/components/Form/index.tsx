import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeClosed, Loader } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useHookFormMask } from "use-mask-input";
import { toast } from "react-toastify";

type FormData = {
  name: string;
  email: string;
  password: string;
  phone: string;
  confirmPassword: string;
  profission: string;
  confirmTerms: boolean;
};

const FormSchema = z.object({
  name: z.string()
    .nonempty({ message: "Nome é obrigatório" })
    .regex(/^[a-zA-Zà-ú]+( [a-zA-Zà-ú]+)*$/, { message: "Somente letras são permitidas" })
    .min(2, { message: "O Nome precisa ter no mínimo 2 caracteres" }),
  email: z.string()
    .email({ message: "E-mail inválido" }),
  password: z.string()
    .min(6, { message: "Senha deve ter no mínimo 6 caracteres" }),
  phone: z.string()
    .regex(/^\(\d{2}\) \d{5}-\d{4}$/, { message: "Telefone inválido" }),
  confirmPassword: z.string()
    .nonempty({ message: "Confirme sua senha" }),
  profission: z.string()
    .min(1, { message: "Selecione uma opção" }),
  confirmTerms: z.boolean()
    .refine((value) => value, { message: "Você deve aceitar os termos" }),
})
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não conferem",
    path: ["confirmPassword"],
  });

export default function Form() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  function handleShowPassword(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setShowPassword(!showPassword);
  }

  function handleShowConfirmPassword(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setShowConfirmPassword(!showConfirmPassword);
  }

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(FormSchema),
  });

  const registerWithMask = useHookFormMask(register);

  function onSubmit(data: FormData) {
    console.log(data);
    reset();
    toast.success("Cadastro realizado com sucesso!");
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 p-4 rounded-md border-2 border-gray-300 bg-gray-100 min-w-[425px]"
    >
      <div>
        <h1 className="text-2xl font-bold text-center">Cadastre-se</h1>
        <p className="text-center">Crie sua conta para começar</p>
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="name" className="flex flex-col gap-1">
          <span>Nome:</span>
          <input
            id="name"
            type="text"
            className="border-2 border-gray-300 rounded-md p-2 outline-none bg-white"
            {...register("name")}
          />
        </label>
        {errors.name && (
          <span className="text-red-500">{errors.name.message}</span>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="flex flex-col gap-1">
          <span>E-mail:</span>
          <input
            id="email"
            type="email"
            className="border-2 border-gray-300 rounded-md p-2 outline-none bg-white"
            {...register("email")}
          />
        </label>
        {errors.email && (
          <span className="text-red-500">{errors.email.message}</span>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="phone" className="flex flex-col gap-1">
          <span>Telefone Celular:</span>
          <input
            id="phone"
            type="text"
            className="border-2 border-gray-300 rounded-md p-2 outline-none bg-white"
            {...registerWithMask("phone", ["(99) 99999-9999"])}
          />
        </label>
        {errors.phone && (
          <span className="text-red-500">{errors.phone.message}</span>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="password" className="flex flex-col gap-1">
          <span>Senha:</span>
          <div className="flex relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              className="w-full border-2 border-gray-300 rounded-md p-2 outline-none bg-white"
              {...register("password")}
            />
            <button
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
              onClick={handleShowPassword}
            >
              {showPassword ? <Eye /> : <EyeClosed />}
            </button>
          </div>
        </label>
        {errors.password && (
          <span className="text-red-500">{errors.password.message}</span>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="confirmPassword" className="flex flex-col gap-1">
          <span>Confirme sua senha:</span>
          <div className="flex relative">
            <input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              className="w-full border-2 border-gray-300 rounded-md p-2 outline-none bg-white"
              {...register("confirmPassword")}
            />
            <button
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
              onClick={handleShowConfirmPassword}
            >
              {showConfirmPassword ? <Eye /> : <EyeClosed />}
            </button>
          </div>
        </label>
        {errors.confirmPassword && (
          <span className="text-red-500">{errors.confirmPassword.message}</span>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <select
          className="border-2 border-gray-300 rounded-md px-1 py-3 outline-none bg-white"
          {...register("profission")}
        >
          <option value="">Informe sua profissão</option>
          <option value="desenvolvedor">Desenvolvedor</option>
          <option value="qa">QA</option>
          <option value="ux_ui">UX/UI</option>
          <option value="outra">Outra</option>
        </select>
        {errors.profission && (
          <span className="text-red-500">{errors.profission.message}</span>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            {...register("confirmTerms")}
          />
          <label>Aceito os termos de privacidade</label>
        </div>
        {errors.confirmTerms && (
          <span className="text-red-500">{errors.confirmTerms.message}</span>
        )}
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="flex justify-center bg-blue-600 text-white rounded-md p-2 mt-6 hover:bg-blue-400 transition cursor-pointer disabled:bg-gray-400"
      >
        {isSubmitting ? <Loader className="animate-spin" /> : "Enviar"}
      </button>
    </form>
  )
}
