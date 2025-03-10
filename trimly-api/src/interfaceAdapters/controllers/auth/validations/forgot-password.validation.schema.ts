import { ERROR_MESSAGES } from "@/shared/constants";
import { strongEmailRegex } from "@/shared/validations/email.validation";
import { z } from "zod";

export const forgotPasswordValidationSchema = z.object({
	email: strongEmailRegex,
	role: z.enum(["client", "admin", "barber"], {
		message: ERROR_MESSAGES.INVALID_ROLE,
	}),
});
