import { getErrorResponse } from "@/lib/helpers"
import { RegisterUserInput, RegisterUserSchema } from "@/lib/validations/user.schema"
import { NextRequest, NextResponse } from "next/server"
import { ZodError } from "zod"
const SERVER_ENDPOINT = 'https://ffrhqp-3000.csb.app'

export async function POST(req: NextRequest) {
  try {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    }

    const body = (await req.json()) as RegisterUserInput
    const data = RegisterUserSchema.parse(body)

    const res = await fetch(`${SERVER_ENDPOINT}/api/auth/register`, {
      method: "POST",
      credentials: "include",
      headers,
      body: JSON.stringify(data)
    })
    const registeredUser = await res.json()
    if (res.status == 200) {
      const response = new NextResponse(
        JSON.stringify({
          status: "success",
          registeredUser,
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      )
      return response
    }else{
      throw new Error(registeredUser.error)
    }
  } catch (error: any) {
    if (error instanceof ZodError) {
      return getErrorResponse(400, "failed validations", error)
    }
    console.log(error)
    return getErrorResponse(500, error.message)
  }
}
