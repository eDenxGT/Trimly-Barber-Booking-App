import { z } from "zod";

import { strongEmailRegex } from "../../../../shared/validations/email.validation";
import { passwordSchema } from "../../../../shared/validations/password.validation";
import { nameSchema } from "../../../../shared/validations/name.validation";
import { phoneNumberSchema } from "../../../../shared/validations/phone.validation";

const adminSchema = z.object({
  email:strongEmailRegex, 
  password: passwordSchema,
  role: z.literal("admin"),
});

const clientSchema = z.object({
  firstName: nameSchema,
  lastName: nameSchema,
  email: strongEmailRegex,
  phoneNumber: phoneNumberSchema,
  password: passwordSchema,
  role: z.literal("client"),
});

const barberSchema = z.object({
  firstName: nameSchema,
  lastName: nameSchema,
  email:strongEmailRegex,
  phoneNumber: phoneNumberSchema,
  password: passwordSchema,
  role: z.literal("barber"),
});

export const userSchemas = {
  admin: adminSchema,
  client: clientSchema,
  barber: barberSchema,
};
