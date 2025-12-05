import * as z from "zod"

  export interface ActionResponse<T = any> {
      success: boolean
      message: string
      errors?: {
          [K in keyof T]?: string[]
      }
      inputs?: T
  }
  export const formSchema = z.object({
"input-824": z.string({ error: 'This field is required' }),
"input-82e": z.string({ error: 'This field is required' }).optional(),
"password-aae": z.string({ error: 'This field is required' }),
"input-c5a": z.coerce.number({error: 'Please enter a valid number'}),
"checkbox-0f9": z.literal(true, {error: 'This field is required'})
});