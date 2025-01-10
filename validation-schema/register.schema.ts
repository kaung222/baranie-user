import { z } from "zod";

export const RegisterSchema = z.object({
    firstName: z.string().min(1, "First name is required"), // firstName must be a non-empty string
    lastName: z.string().min(1, "Last name is required"), // lastName must be a non-empty string
    email: z.string().email("Invalid email format"),
    phone: z.string().regex(
        /^[+]?[0-9]{10,15}$/,
        "Invalid phone number format. It should be 10 to 15 digits and may start with '+'"
    ).optional(),
    password: z.string()
        .min(8, "Password must be at least 8 characters long") // Minimum length of 8 characters
        .max(100, "Password must be less than 100 characters") // Optional maximum length
        .regex(/[a-z]/, "Password must contain at least one lowercase letter") // At least one lowercase letter
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter") // At least one uppercase letter
        .regex(/\d/, "Password must contain at least one number") // At least one number
        .regex(/[@$!%*?&#]/, "Password must contain at least one special character (@$!%*?&#)") // At least one special character
        .refine((value) => !/\s/.test(value), "Password must not contain spaces"), // No spaces allowed
    confirmPassword: z.string()
        .min(8, "Password must be at least 8 characters long") // Minimum length of 8 characters
        .max(100, "Password must be less than 100 characters") // Optional maximum length
        .regex(/[a-z]/, "Password must contain at least one lowercase letter") // At least one lowercase letter
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter") // At least one uppercase letter
        .regex(/\d/, "Password must contain at least one number") // At least one number
        .regex(/[@$!%*?&#]/, "Password must contain at least one special character (@$!%*?&#)") // At least one special character
        .refine((value) => !/\s/.test(value), "Password must not contain spaces") // No spaces allowed
})
    .superRefine((data, ctx) => {
        if (data.password !== data.confirmPassword) {
            ctx.addIssue({
                code: "custom", // Custom validation issue code
                path: ["confirmPassword"], // Point to the confirmPassword field
                message: "Passwords must match",
            });
        }
    });

export const EmailSchema = z.object({
    email: z.string().email("Invalid email format")
})