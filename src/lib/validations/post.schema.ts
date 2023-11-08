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
export const PostEditSchema = z
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

export type PostAddInput = z.infer<typeof PostAddSchema>
export type PostEditInput = z.infer<typeof PostEditSchema>
