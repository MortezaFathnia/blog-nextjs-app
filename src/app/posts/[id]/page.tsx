import { cookies } from "next/headers"
import EditPostForm from "./editPost-form"
import { getAllPosts } from "@/lib/api-requests"
import { Post } from "@/types/Post"

export default async function editPostPage({ params }: any) {
  const cookieStore = cookies()
  const token = cookieStore.get("token")
  const data = await getAllPosts(token?.value)
  const post = data?.posts.find((item: Post) => item.id === params.id)
  return (
    <>
      <h4 className="text-center text-xl font-bold mb-[2rem]">Edit Post</h4>
      <section className="bg-ct-blue-600 grid place-items-center">
      {post && (<EditPostForm token={token} post={post} />)}
      </section>
    </>
  )
}