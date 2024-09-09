import {
  deleteMagicToken,
  getMagicLinkByToken,
  setEmailVerified,
  upsertMagicLink,
} from "../../data-access/magic-links";
import { createMagicUser, getUserByEmail } from "../../data-access/users";
import { sendEmail } from "../../lib/resend";
import { PublicError } from "../errors";

export async function sendMagicLinkUseCase(email: string) {
  const token = await upsertMagicLink(email);

  // await sendEmail(
  //   email,
  //   `Your magic login link for ${applicationName}`,
  //   <MagicLinkEmail token={token} />
  // );
}

export async function loginWithMagicLinkUseCase(token: string) {
  const magicLinkInfo = await getMagicLinkByToken(token);

  if (!magicLinkInfo) {
    throw new PublicError("Invalid or expired magic link");
  }

  if (magicLinkInfo.tokenExpiresAt! < new Date()) {
    throw new PublicError("This magic link has expired");
  }

  const existingUser = await getUserByEmail(magicLinkInfo.email);

  if (existingUser) {
    await setEmailVerified(existingUser.id);
    await deleteMagicToken(token);
    return existingUser;
  } else {
    const newUser = await createMagicUser(magicLinkInfo.email);

    await deleteMagicToken(token);
    return newUser;
  }
}
