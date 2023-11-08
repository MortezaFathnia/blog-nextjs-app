import { getErrorResponse } from "@/lib/helpers"
import { PostAddInput, PostAddSchema, PostEditInput } from "@/lib/validations/post.schema"
import { cookies, headers } from "next/headers"
import { NextRequest, NextResponse } from "next/server"
import { ZodError } from "zod"
const SERVER_ENDPOINT = 'https://ffrhqp-3000.csb.app'

export async function PUT(req: NextRequest, context: { params: { id: string } }) {
  try {
    const headersList = cookies()
    const token = headersList.get('token')
    console.log('1212', context.params.id)

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    }

    if (token) {
      headers["Authorization"] = `Bearer ${token.value}`
    }
    const body = (await req.json()) as PostEditInput
    const data = PostAddSchema.parse(body)

    const res = await fetch(`${SERVER_ENDPOINT}/api/blog/${context.params.id}/edit`, {
      method: "PUT",
      credentials: "include",
      headers,
      body: JSON.stringify(data)
    })
    const postEdited = await res.json()
    const response = new NextResponse(
      JSON.stringify({
        status: "success",
        postEdited,
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

export async function DELETE(req: NextRequest, context: { params: { id: string } }) {
  try {
    const headersList = cookies()
    const token = headersList.get('token')

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    }
    console.log(token)
    if (token) {
      headers["Authorization"] = `Bearer ${token.value}`
    }

    const res = await fetch(`${SERVER_ENDPOINT}/api/blog/${context.params.id}/delete`, {
      method: "DELETE",
      credentials: "include",
      headers
    })
    if (res.status === 200) {
      const response = new NextResponse(
        JSON.stringify({
          status: "success",
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      )
      return response
    }
  } catch (error: any) {
    if (error instanceof ZodError) {
      return getErrorResponse(400, "failed validations", error)
    }
    console.log(error)
    return getErrorResponse(500, error.message)
  }
}
