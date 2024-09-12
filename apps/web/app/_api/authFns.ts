 interface MagicLinkResponse {
  success: boolean;
}
interface GoogleRedirectResponse {
  url: string;
}

interface GithubRedirectResponse {
  url: string;
}

export async function requestMagicLink(email: string): Promise<MagicLinkResponse> {
  const response = await fetch("http://localhost:3001/auth/get-magic-link", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });

  console.log(response)
  if (!response.ok) {
    throw new Error("Failed to send magic link");
  }

  const data: MagicLinkResponse = await response.json();
  return data;
}

////////////////////////



export async function getGoogleRedirectUrl(): Promise<GoogleRedirectResponse> {
  const response = await fetch(
    "http://localhost:3001/auth/google-redirect-url",
    {
      method: "GET",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to get Google redirect URL");
  }

  const data: GoogleRedirectResponse = await response.json();
  console.log(data)
  return data;
}




export async function getGithubRedirectUrl(): Promise<GithubRedirectResponse> {
  const response = await fetch(
    "http://localhost:3001/auth/github-redirect-url",
    {
      method: "GET",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to get GitHub redirect URL");
  }

  const data: GithubRedirectResponse = await response.json();
  return data;
}
