import z from "zod";

export const loginZodSchema = z.object({
  username: z
    .string("Username is required")
    .nonempty("Username can't be blank."),
  password: z
    .string("Password is required")
    .nonempty("Password can't be blank"),
});
