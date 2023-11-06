import { cookies } from "next/headers"
import EditPostForm from "./editPost-form"



export default function editPostPage() {
  const cookieStore = cookies();
  const token = cookieStore.get("token");
  return (
    <>
      <div>AddPostPage</div>
      <EditPostForm token={token}/>
    </>
  )
}