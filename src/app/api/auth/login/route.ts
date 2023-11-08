import { getErrorResponse } from "@/lib/helpers"
import { LoginUserInput, LoginUserSchema } from "@/lib/validations/user.schema"
import { NextRequest, NextResponse } from "next/server"
import { ZodError } from "zod"
const SERVER_ENDPOINT = 'https://ffrhqp-3000.csb.app'

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as LoginUserInput
    const data = LoginUserSchema.parse(body)
    const res = await fetch(`${SERVER_ENDPOINT}/api/auth/login`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    const { response:token} = await res.json();
  
    const tokenMaxAge = 60 * 60000
    const cookieOptions = {
      name: "token",
      value: token,
      httpOnly: true,
      path: "/",
      secure: process.env.NODE_ENV !== "development",
      maxAge: tokenMaxAge,
    }

    const response = new NextResponse(
      JSON.stringify({
        status: "success",
        token,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    )

    await Promise.all([
      response.cookies.set(cookieOptions),
      response.cookies.set({
        name: "logged-in",
        value: "true",
        maxAge: tokenMaxAge,
      }),
    ])

    return response
  } catch (error: any) {
    if (error instanceof ZodError) {
      return getErrorResponse(400, "failed validations", error)
    }

    return getErrorResponse(500, error.message)
  }
}
