import { FunctionComponent } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

const Header: FunctionComponent = () => {
  const { data: sessionData } = useSession();

  return (
    <header className="flex justify-between p-4">
      <h1>lumedia</h1>
      <nav>
        <ul className="flex gap-2">
          <li>Sitios</li>
          <li>Contacto</li>
          {sessionData && (
            <li>
              <Link href="/dashboard">Panel</Link>
            </li>
          )}
        </ul>
      </nav>
      <button
        className=""
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Salir" : "Ingresar"}
      </button>
    </header>
  );
};

export default Header;
