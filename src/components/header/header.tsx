import { FunctionComponent } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

const Header: FunctionComponent = () => {
  const { data: sessionData } = useSession();

  return (
    <header className="flex justify-between p-4">
      <Link href="/">
        <h1 className="hover:opacity-50 transition-all">lumedia</h1>
      </Link>
      <nav>
        <ul className="flex gap-2">
          <li className="hover:opacity-50 transition-all">
            <Link href="/">Sitios</Link>
          </li>
          <li className="hover:opacity-50 transition-all">
            <Link href="/contact">Contacto</Link>
          </li>
          {sessionData && (
            <li className="hover:opacity-50 transition-all">
              <Link href="/dashboard">Panel</Link>
            </li>
          )}
        </ul>
      </nav>
      <button
        className="hover:opacity-50 transition-all"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Salir→" : "Ingresar"}
      </button>
    </header>
  );
};

export default Header;
