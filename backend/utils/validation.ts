import { z } from 'zod';

export const voteSchema = z.object({
  projectId: z.number().int().positive(),
  voteValue: z.boolean(),
  voteIntensity: z.number().int().min(1).max(10).default(1),
  delegatedTo: z.string().nullable().optional(),
});

export const registerSchema = z.object({
  phone: z.string().regex(/^\+[1-9]\d{1,14}$/, 'Invalid phone number format'),
  name: z.string().min(2).max(100),
  email: z.string().email(),
});

export const verifyOtpSchema = z.object({
  phone: z.string().regex(/^\+[1-9]\d{1,14}$/),
  otp: z.string().length(6).regex(/^\d{6}$/),
});

export const createProjectSchema = z.object({
  title: z.string().min(3).max(200),
  description: z.string().min(10).max(5000),
  fundingGoal: z.number().int().positive(),
  deadline: z.string().datetime(),
  costPerParticipant: z.number().int().positive().optional(),
});

export type VoteInput = z.infer<typeof voteSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type VerifyOtpInput = z.infer<typeof verifyOtpSchema>;
export type CreateProjectInput = z.infer<typeof createProjectSchema>;

export function validateVote(data: unknown): { valid: true } | { valid: false; error: string } {
  const result = voteSchema.safeParse(data);
  if (!result.success) {
    return { valid: false, error: result.error.errors.map(e => e.message).join(', ') };
  }
  return { valid: true };
}

export function validateRegister(data: unknown): { valid: true } | { valid: false; error: string } {
  const result = registerSchema.safeParse(data);
  if (!result.success) {
    return { valid: false, error: result.error.errors.map(e => e.message).join(', ') };
  }
  return { valid: true };
}

export function validateVerifyOtp(data: unknown): { valid: true } | { valid: false; error: string } {
  const result = verifyOtpSchema.safeParse(data);
  if (!result.success) {
    return { valid: false, error: result.error.errors.map(e => e.message).join(', ') };
  }
  return { valid: true };
}
