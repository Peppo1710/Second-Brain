const { z } = require('zod');

const userRegisterSchema = z.object({
  username: z.string().email(),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  age: z.number().int().positive().optional(),
  phone: z.string().optional(),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const userLoginSchema = z.object({
  username: z.string().email(),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

module.exports = { userRegisterSchema, userLoginSchema };