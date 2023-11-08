import { cookies } from "next/headers"
import EditPostForm from "./editPost-form"
import { getAllPosts } from "@/lib/api-requests"
import { Post } from "@/types/Post"

export default async function editPostPage({ params }: any) {
  console.log(params.id)
  const cookieStore = cookies()
  const token = cookieStore.get("token")
  const data = await getAllPosts(token?.value)
  const post = data?.posts.find((item: Post) => item.id === params.id)
  console.log(post)
  return (
    <>
      <div>EditPostItem</div>
      {post && (<EditPostForm token={token} post={post} />)}
    </>
  )
}