import { useRouter } from "next/router";
import { type FieldValues, useForm } from "react-hook-form";
import { api } from "~/utils/api";
import Link from "next/link";
import Swal from "sweetalert2";

const EditPost: React.FC = () => {
  const router = useRouter();
  const { pid } = router.query;

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm({
    defaultValues: {
      title: "Cargando...",
      content: "Cargando...",
      tags: "Cargando...",
      authorName: "Cargando...",
    },
  });

  const { data, error, isLoading } = api.post.getOne.useQuery(
    {
      id: pid as string,
    },
    {
      onSuccess(data) {
        void reset({
          title: data?.title as string,
          content: data?.content as string,
          tags: data?.tags.join(", "),
        });
      },
    }
  );

  const updatePost = api.post.update.useMutation({
    onSuccess: () => {
      void router.push(`/post/${pid as string}`)
    },
  });

  const onSubmit = (inputData: FieldValues) => {
    const processedData = {
      id: pid as string,
      title: inputData.title as string,
      content: inputData.content as string,
      tags: (inputData.tags as string).split(", "),
      authorName: inputData.author as string,
    };

    void Swal.fire({
        title: '¿Quiere guardar los cambios?',
        showDenyButton: true,
        confirmButtonText: 'Guardar',
        denyButtonText: `No guardar`,
        customClass: {
          confirmButton: 'swal-confirm-btn',
        }
      }).then((result) => {
        if (result.isConfirmed) {
          void Swal.fire({
            icon: 'success',
            text: 'Guardado!',
            customClass: {
              confirmButton: 'swal-confirm-btn',
            }
          })
          updatePost.mutate(processedData);
        } else if (result.isDenied) {
          void Swal.fire({
            icon: 'info',
            text: 'Cambios no guardados',
            customClass: {
              confirmButton: 'swal-confirm-btn',
            }
          })
        }
      })

  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <>
        <div>{error.message}</div>;
      </>
    );
  }

  return (
    <div className="mx-auto my-2 flex w-[97%] sm:w-2/3 flex-col rounded p-2 shadow-md">
      <h1 className="mb-2 text-center text-2xl font-bold">
        Editar publicación
      </h1>
      <form className="flex flex-col" onSubmit={(e) => {e.preventDefault(); void handleSubmit(onSubmit)()}}>
        <input
          className="mb-5 p-2 text-lg font-semibold shadow-md"
          type="text"
          {...register("title", {required: true})}
        />
        {formErrors.title && <p className="text-sm text-red mb-2">Tienes que ingresar un título para la publicación</p>}

        <input
          className="w-fit p-2 text-sm italic"
          type="text"
          value={data?.authorName}
          {...register("authorName")}
          disabled
        />
        <textarea
          className="my-6 p-2 text-left shadow-md"
          id="content"
          {...register("content", {required: true})}
          rows={15}
        ></textarea>
        {formErrors.content && <p className="text-sm text-red mb-2">No olvides el contenido de la publicación</p>}

        <input
          type="text"
          className="mb-2 w-fit p-2 text-sm italic shadow-md"
          {...register("tags", {required: true})}
        />
        {formErrors.tags && <p className="text-sm text-red mb-2">Ingresa al menos una categoría</p>}

        <div className="flex">
          <button
            type="submit"
            className="mr-2 grow rounded bg-darker-blue px-4 py-2 text-white transition-all hover:opacity-50"
          >
            Guardar
          </button>
          <button
            type="button"
            className="grow rounded border-2 px-4 py-2 transition-all hover:opacity-50"
          >
            <Link href={`/post/${pid as string}`}>Cancelar</Link>
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPost;
