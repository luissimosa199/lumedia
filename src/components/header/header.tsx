import { FunctionComponent } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

const Header: FunctionComponent = () => {
  const { data: sessionData } = useSession();

  return (
    <header className="flex justify-between p-4">
      <Link href="/">
        <h1>lumedia</h1>
      </Link>
      <nav>
        <ul className="flex gap-2">
          <li><Link href="/">Sitios</Link></li>
          <li>
            <Link href="/contact">Contacto</Link>
          </li>
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
