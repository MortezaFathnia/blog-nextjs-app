import { getErrorResponse } from "@/lib/helpers"
import { PostAddInput, PostAddSchema } from "@/lib/validations/post.schema"
import { cookies, headers } from "next/headers"
import { NextRequest, NextResponse } from "next/server"
import { ZodError } from "zod"
const SERVER_ENDPOINT = 'https://ffrhqp-3000.csb.app'

export async function POST(req: NextRequest) {
  try {
    const headersList = cookies()
    const token = headersList.get('token')
    console.log(token)
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };
  
    if (token) {
      headers["Authorization"] =  `Bearer ${token.value}`;
    }
    const body = (await req.json()) as PostAddInput
    const data = PostAddSchema.parse(body)

    const res = await fetch(`${SERVER_ENDPOINT}/api/blog/create`, {
      method: "POST",
      credentials: "include",
      headers,
      body:JSON.stringify(data)
    })
    const postAdded = await res.json()
    const response = new NextResponse(
      JSON.stringify({
        status: "success",
        postAdded,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    )
    return response
  } catch (error: any) {
    if (error instanceof ZodError) {
      return getErrorResponse(400, "failed validations", error)
    }
    console.log(error)
    return getErrorResponse(500, error.message)
  }
}
