import { FunctionComponent } from "react";

const NewPost: FunctionComponent = () => {
  return (
    <form className="flex w-2/3 w-full flex-col gap-2 p-10">
      <label htmlFor="title">Título</label>
      <input id="title" name="title" type="text" className="rounded border" />
      <label htmlFor="content">Contenido</label>
      <textarea id="content" name="content" className="rounded border" />
      <label htmlFor="tags">Categorías</label>
      <input id="tags" name="tags" type="text" className="rounded border" />
      <div className="flex justify-end gap-2">
        <button className="rounded border-2 px-4 py-2">Despejar</button>
        <button className="rounded bg-darker-blue px-4 py-2 text-white">
          Enviar
        </button>
      </div>
    </form>
  );
};

export default NewPost;
