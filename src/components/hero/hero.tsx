import { FunctionComponent } from "react";
import Link from "next/link";

const Hero: FunctionComponent = () => {
  return (
    <div className="text-center">
      <h1 className="text-gray-900 text-4xl font-bold tracking-tight sm:text-6xl">
        Contenido masivo
      </h1>
      <div className="">
        <ul className="flex gap-4 w-fit mx-auto my-4">
          <li>
            <Link href="/contact">Contactanos</Link>
          </li>
          <li>
            <Link href="/auth">Ingresar</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Hero;
