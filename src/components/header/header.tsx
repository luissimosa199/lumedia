import { FunctionComponent } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

const Header: FunctionComponent = () => {
  const { data: sessionData } = useSession();

  return (
    <header className="flex justify-between p-4">
      <Link href="/">
        <h1 className="transition-all text-gray-900 font-bold hover:opacity-50">lumedia</h1>
      </Link>
      <nav>
        <ul className="flex gap-2">
          <li className="transition-all hover:opacity-50">
            <Link href="/">Sitios</Link>
          </li>
          <li className="transition-all hover:opacity-50">
            <Link href="/contact">Contacto</Link>
          </li>
          {sessionData && (
            <>
              <li className="transition-all hover:opacity-50">
                <Link href="/dashboard">Panel</Link>
              </li>
              <li className="transition-all hover:opacity-50">
                <Link href="/posts">Índice</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
      <button
        className="transition-all hover:opacity-50"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Salir→" : "Ingresar"}
      </button>
    </header>
  );
};

export default Header;
