import { cookies } from "next/headers"
import AddPostForm from "./addPost-form"

export default function addPostPage() {
  const cookieStore = cookies();
  const token = cookieStore.get("token");
  return (
    <>
      <div>AddPostPage</div>
      <AddPostForm token={token}/>
    </>
  )
}