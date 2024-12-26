import { z } from 'zod';

export const BookingSchema = z.object({
    orgId: z.number(),
    date: z.string(),
    username: z.string(),
    notes: z.string(),
    status: z.string(),
    phone: z.string(),
    gender: z.enum(['male', 'female', 'none']),
    profilePicture: z.string(),
    email: z.string().email(),
    bookingItems: z.array(
        z.object({
            serviceId: z.string(),
            memberId: z.string(),
        })
    ),
    startTime: z.number(),
});

