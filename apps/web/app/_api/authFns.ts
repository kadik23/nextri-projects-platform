import { BASE_URL } from "@/config/application";
import { fetcher } from "@/lib/utils";

interface MagicLinkResponse {
  success: boolean;
}
interface GoogleRedirectResponse {
  url: string;
}

interface GithubRedirectResponse {
  url: string;
}

export async function requestMagicLink(
  email: string
): Promise<MagicLinkResponse | undefined> {
  console.log(email);
  try {
    const response = await fetch("http://localhost:3001/auth/get-magic-link", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    console.log(response);
    if (!response.ok) {
      throw new Error("Failed to send magic link");
    }

    const data: MagicLinkResponse = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}

////////////////////////

export async function getGoogleRedirectUrl(): Promise<
  GoogleRedirectResponse | undefined
> {
  try {
    const response = await fetch(
      "http://localhost:3001/auth/google-redirect-url",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );

    const data: GoogleRedirectResponse = await response.json();
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
}

export async function getGithubRedirectUrl(): Promise<
  GithubRedirectResponse | undefined
> {
  try {
    const response = await fetch(
      "http://localhost:3001/auth/github-redirect-url",
      {
        method: "GET",
        credentials: "include",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to get GitHub redirect URL");
    }

    const data: GithubRedirectResponse = await response.json();
    return data;
  } catch (err) {
    console.error(err);
  }
}

export const signOut = async () => {
  try {
    const response = await fetcher(`${BASE_URL}/auth/logout`, {
      method: "GET",
      credentials: "include",
    });
    console.log("this is the response we got");
    console.log(response);
  } catch (err) {
    console.log(err);
  }
};
