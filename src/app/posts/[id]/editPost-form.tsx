"use client";

import {
  RegisterUserInput,
  RegisterUserSchema,
} from "@/lib/validations/user.schema";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { apiRegisterUser, createPost, editPost } from "@/lib/api-requests";
import FormInput from "@/components/ui/FromInput";
import Link from "next/link";
import { LoadingButton } from "@/components/ui/LoadingButton";
import useStore from "@/store";
import { handleApiError } from "@/lib/helpers";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { PostAddInput, PostAddSchema, PostEditInput } from "@/lib/validations/post.schema"
import { Post } from "@/types/Post"
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies"



export default function EditPostForm({token,post}:{token:any,post:Post}) {
  const store = useStore();
  const router = useRouter();
  const methods = useForm<PostAddInput>({
    resolver: zodResolver(PostAddSchema),
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitSuccessful },
  } = methods;

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitSuccessful]);

  async function EditPostFunction(postItem: PostEditInput) {
    store.setRequestLoading(true);
    try {
      const responsePost = await editPost(token,post.id,JSON.stringify(postItem));
      console.log(responsePost)
      return router.push("/posts");
    } catch (error: any) {
      if (error instanceof Error) {
        handleApiError(error);
      } else {
        toast.error(error.message);
        console.log("Error message:", error.message);
      }
    } finally {
      store.setRequestLoading(false);
    }
  }

  const onSubmitHandler: SubmitHandler<PostEditInput> = (values) => {
    console.log(values)
    EditPostFunction(values);
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmitHandler)}
        className="max-w-md w-full mx-auto overflow-hidden shadow-lg bg-ct-dark-200 rounded-2xl p-8 space-y-5"
      >
        <FormInput label="Title" value={post.title} name="title" />
        <FormInput label="Content" name="content" value={post.content} multiline={4} />
        <LoadingButton
          loading={store.requestLoading}
          textColor="text-ct-blue-600"
        >
          UpdatePost
        </LoadingButton>
      </form>
    </FormProvider>
  );
}
