import type { FunctionComponent } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";

const Hero: FunctionComponent = () => {
  const { data: sessionData } = useSession();

  return (
    <div className="text-center mt-[12%]">
      <h1 className="text-gray-900 text-4xl font-bold tracking-tight sm:text-6xl">
        Contenido masivo en tiempo record
      </h1>
      <div className="font-medium">
        <ul className="mx-auto mt-10 flex w-fit gap-4 text-lg">
          <li className="px-4 py-2 border-2 rounded">
            <Link href="/contact">Contactanos</Link>
          </li>
          <li className="px-4 bg-darker-blue text-white py-2 rounded">{sessionData ? <Link href="/dashboard">Ir al Panel</Link> : <Link href="/auth">Ingresar</Link>}</li>
        </ul>
      </div>
    </div>
  );
};

export default Hero;
