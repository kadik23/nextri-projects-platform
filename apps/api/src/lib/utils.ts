import crypto from "node:crypto";
import { createId } from "@paralleldrive/cuid2";
import { db } from "@repo/db/src";

export async function generateRandomToken(length: number) {
	const buf = await new Promise<Buffer>((resolve, reject) => {
		crypto.randomBytes(Math.ceil(length / 2), (err, buf) => {
			if (err !== null) {
				reject(err);
			} else {
				resolve(buf);
			}
		});
	});

	return buf.toString("hex").slice(0, length);
}

export async function createTransaction<T extends typeof db>(
	cb: (trx: T) => void,
) {
	await db.transaction(cb as any);
}

export const getRandomId = () => createId();
