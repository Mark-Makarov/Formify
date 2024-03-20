import { z } from "zod";

export const formSchema = z.object({
  name: z.string({required_error: "Введите название формы"})
    .min(1, { message: "Название формы не может быть пустым" })
    .max(40, { message: "Название формы слишком длинное"}),
  description: z.string().max(500, { message: "Описание формы слишком длинное"}).optional(),
});

export type formSchemaType = z.infer<typeof formSchema>;
