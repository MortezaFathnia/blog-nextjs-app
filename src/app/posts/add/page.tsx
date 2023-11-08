import { cookies } from "next/headers"
import AddPostForm from "./addPost-form"

export default function addPostPage() {
  const cookieStore = cookies();
  const token = cookieStore.get("token");
  return (
    <>
      <h4 className="text-center text-xl font-bold mb-[2rem]">Add Post</h4>
      <section className="bg-ct-blue-600 grid place-items-center">
        <AddPostForm token={token} />
      </section>
    </>
  )
}