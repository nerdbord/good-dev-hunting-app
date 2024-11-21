"use server";

import { cookies } from "next/headers";

export async function setServerCookie(
  name: string,
  value: string,
  days: number
): Promise<void> {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);

  (await cookies()).set(name, value, {
    expires,
    path: "/",
    secure: true,
    sameSite: "lax",
  });
}

export async function getServerCookie(name: string): Promise<string | null> {
  const cookieStore = cookies();
  const cookie = (await cookieStore).get(name);
  return cookie?.value || null;
}

