import { z } from 'zod';

export const userUpdateSchema = z.object({
    firstName: z.string().min(1, { message: "First name is required" }).optional(),
    lastName: z.string().min(1, { message: "Last name is required" }).optional(),
    phone: z.string().min(1, { message: "Phone number is required" }).optional(),
    profilePicture: z.string().url({ message: "Invalid URL for profile picture" }).optional(),
    gender: z.enum(["male", "female", "none"], { message: "Gender must be 'male', 'female', or 'other'" }).optional(),
    dob: z.string().optional(),
});