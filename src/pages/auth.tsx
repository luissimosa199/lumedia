import { FunctionComponent } from "react";
import { signIn, signOut, useSession } from "next-auth/react";

const Auth: FunctionComponent = () => {
  const { data: sessionData } = useSession();

  return (
    <div className="flex flex-col justify-center content-center gap-4 border-1 border-current">
      <div className="text-center text-2xl">
        <h1>Ingresa con tu cuenta de Google</h1>
        <p>Solo usuarios autorizados previamente tienen acceso</p>
      </div>

      <p className="text-center text-2xl">
        {sessionData && <span>Ingresaste como {sessionData.user?.name}</span>}
      </p>

      <button
        className="mx-auto"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Salir" : "Ingresar"}
      </button>
    </div>
  );
};

export default Auth;
