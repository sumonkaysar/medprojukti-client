import z from "zod";

export const createDepartmentZodSchema = z.object({
  name: z
    .string("Department name is required")
    .nonempty("Department name can't be blank.")
    .min(2, "Department name must be at least 2 characters long.")
    .max(50, "Department name can't be more than 50 characters long."),
  description: z
    .string("Department description is required")
    .nonempty("Department description can't be blank"),
  status: z.enum(
    ["ACTIVE", "INACTIVE"],
    `Status must be one of: ${["ACTIVE", "INACTIVE"].join(", ")}`
  ),
});

export const updateDepartmentZodSchema = z.object({
  name: z
    .string("Department name must be a string")
    .nonempty("Department name can't be blank.")
    .min(2, "Department name must be at least 2 characters long.")
    .max(50, "Department name can't be more than 50 characters long.")
    .optional(),
  description: z
    .string("Department description must be a string")
    .nonempty("Department description can't be blank")
    .optional(),
  status: z
    .enum(
      ["ACTIVE", "INACTIVE"],
      `Status must be one of: ${["ACTIVE", "INACTIVE"].join(", ")}`
    )
    .optional(),
});
