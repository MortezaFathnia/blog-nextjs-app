import { z } from "zod"

export const PostAddSchema = z
  .object({
    title: z
      .string({
        required_error: "title is required",
      })
      .min(1, "Title is required"),
    content: z
      .string({
        required_error: "content is required",
      })
      .min(1, "Content is required")
  })

export const LoginUserSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
    })
    .min(1, "Email is required")
    .email("Email is invalid"),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters"),
})

export type LoginUserInput = z.infer<typeof LoginUserSchema>
export type PostAddInput = z.infer<typeof PostAddSchema>
