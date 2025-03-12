import Form from "./components/Form";

export default function App() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-8 py-6">
      <div className="w-full max-w-xl px-2">
        <h1 className="text-2xl text-center">Estamos muito felizes em ter você aqui! Crie sua conta para se conectar com amigos, descobrir novas comunidades e compartilhar momentos incríveis.</h1>
      </div>
      <Form />
    </div>
  )
}
