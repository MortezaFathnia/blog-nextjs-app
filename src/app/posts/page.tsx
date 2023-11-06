import { FC } from 'react'
import { cookies } from "next/headers";
import { getAllPosts } from '@/lib/api-requests'
import AllPosts from '@/components/posts/AllPosts'


export default async function PostsPage() {
  const cookieStore = cookies();
  const token = cookieStore.get("token");
  const data = await getAllPosts(token?.value);
  return(
    <>
    <h1>posts</h1>
    {data?.posts &&  <AllPosts posts={data?.posts}/>}
   
    </>
  )
}
