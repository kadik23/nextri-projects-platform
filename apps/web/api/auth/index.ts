import { fetcher } from "@/lib/utils";

interface ApiResponse {
  url: string;
}

/**
 * Sends a magic link to the user's email for authentication.
 *
 * @param {string} email - The email address to send the magic link to.
 * @returns {Promise<void>} A promise that resolves to undefined.
 */
export const signInByMagicLink = async ({
  email,
}: {
  email: string;
}): Promise<void> => {
  try {
    await fetcher("http://localhost:3001/auth/get-magic-link", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });
  } catch (err) {
    console.error("Error sending magic link:", err);
    throw new Error("Failed to send magic link. Please try again later.");
  }
};

/**
 * Initiates Google OAuth login and redirects the user to Google's authentication page.
 *
 * @returns {Promise<void>} A promise that resolves to undefined.
 */
export const signInByGoogle = async (): Promise<void> => {
  try {
    const data: ApiResponse = await fetcher(
      "http://localhost:3001/auth/google-redirect-url",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );

    window.location.href = data.url;
  } catch (err) {
    console.error("Error during Google sign-in:", err);
    throw new Error(
      "Failed to initiate Google sign-in. Please try again later."
    );
  }
};

/**
 * Initiates GitHub OAuth login and redirects the user to GitHub's authentication page.
 *
 * @returns {Promise<void>} A promise that resolves to undefined.
 */
export const signInByGithub = async (): Promise<void> => {
  try {
    const data: ApiResponse = await fetcher(
      "http://localhost:3001/auth/github-redirect-url",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );

    window.location.href = data.url;
  } catch (err) {
    console.error("Error during GitHub sign-in:", err);
    throw new Error(
      "Failed to initiate GitHub sign-in. Please try again later."
    );
  }
};
