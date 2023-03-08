import type { FunctionComponent } from "react";
import { type FieldValues, useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import { api } from "~/utils/api";

const NewPost: FunctionComponent = () => {
  const { data: sessionData } = useSession();

  const { refetch: refetchPosts } = api.post.getLatest.useQuery();

  const createPost = api.post.create.useMutation({
    onSuccess: () => {
      void refetchPosts()
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: FieldValues) => {

    const processedTags = (data.tags as string).split(", ")

    const processedData = {
      title: data.title as string,
      content: data.content as string,
      tags: processedTags,
      authorName: sessionData?.user?.name || data.author as string,
    };

    createPost.mutate(processedData);

    reset({
      title: "",
      content: "",
      tags: "",
    });
  };

  return (
    <form
      className="flex w-full flex-col gap-2 p-10"
      onSubmit={(e) => {
        e.preventDefault();
        void handleSubmit(onSubmit)()
      }}
    >
      <h2 className="text-gray-900 text-lg font-bold">Nueva publicación</h2>
      <label htmlFor="title">Título</label>
      <input
        id="title"
        type="text"
        className="rounded border p-1"
        {...register("title", { required: true })}
      />
      {errors.title && <p className="text-sm text-red">Tienes que ingresar un título para la publicación</p>}
      <label htmlFor="content">Contenido</label>
      <textarea
        id="content"
        className="rounded border p-1"
        {...register("content", { required: true })}
      />
      {errors.content && <p className="text-sm text-red">No olvides el contenido de la publicación</p>}
      <label htmlFor="tags">Categorías</label>
      <input
        id="tags"
        type="text"
        className="rounded border p-1"
        {...register("tags", { required: true })}
      />
      {errors.tags && <p className="text-sm text-red">Ingresa al menos una categoría</p>}
      <label htmlFor="author">Autor</label>
      <input
        id="author"
        type="text"
        className="rounded border p-1"
        {...register("author")}
        disabled
        value={sessionData?.user?.name || "Es necesario iniciar sesión"}
      />

      <div className="flex justify-end gap-2">
        <button className="rounded border-2 px-4 py-2">Despejar</button>
        <button
          className="rounded bg-darker-blue px-4 py-2 text-white"
          type="submit"
        >
          Enviar
        </button>
      </div>
    </form>
  );
};

export default NewPost;
