import { FunctionComponent } from "react";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import { api } from "~/utils/api";

const NewPost: FunctionComponent = () => {
  const { data: sessionData } = useSession();

  const { refetch: refetchPosts } = api.post.getLatest.useQuery();

  const createPost = api.post.create.useMutation({
    onSuccess: () => {
      refetchPosts();
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    const processedData = {
      title: data.title,
      content: data.content,
      tags: data.tags.split(", "),
      authorName: sessionData?.user?.name || data.author,
    };
    createPost.mutate(processedData);
    reset({
        title: '',
        content: '',
        tags: '',
    })
  };

  return (
    <form
      className="flex w-full flex-col gap-2 p-10"
      onSubmit={handleSubmit(onSubmit)}
    >
      <label htmlFor="title">Título</label>
      <input
        id="title"
        type="text"
        className="rounded border p-1"
        {...register("title")}
      />
      <label htmlFor="content">Contenido</label>
      <textarea
        id="content"
        className="rounded border p-1"
        {...register("content")}
      />
      <label htmlFor="tags">Categorías</label>
      <input
        id="tags"
        type="text"
        className="rounded border p-1"
        {...register("tags")}
      />
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
