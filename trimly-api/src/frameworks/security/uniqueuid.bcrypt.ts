import { randomUUID } from "crypto";

export const generateUniqueUid = (prefix: string = "trimly") => {
	return `trimly-${prefix}-${randomUUID().slice(10)}`;
};
