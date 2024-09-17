### 1. **POST `/auth/get-magic-link`**

**TypeScript Example:**

```typescript
import fetch from "node-fetch";

interface MagicLinkResponse {
  success: boolean;
}

async function requestMagicLink(email: string): Promise<MagicLinkResponse> {
  const response = await fetch("http://localhost:3001/auth/get-magic-link", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });

  if (!response.ok) {
    throw new Error("Failed to send magic link");
  }

  const data: MagicLinkResponse = await response.json();
  return data;
}

// Usage
requestMagicLink("user@example.com")
  .then((data) => {
    if (data.success) {
      console.log("Magic link sent successfully!");
    } else {
      console.log("Failed to send magic link");
    }
  })
  .catch((err) => console.error(err));
```

### 2. **GET `/auth/magic/:token`**

**TypeScript Example:**

```typescript
import fetch from "node-fetch";

async function handleMagicLink(token: string): Promise<void> {
  const response = await fetch(`http://localhost:3001/auth/magic/${token}`, {
    method: "GET",
  });

  if (response.ok) {
    const message = await response.text();
    console.log("Magic link processed:", message);
  } else {
    console.error("Failed to process magic link");
  }
}

// Usage
const token = "your-magic-link-token";
handleMagicLink(token).catch((err) => console.error(err));
```

### 3. **GET `/auth/google-redirect-url`**

**TypeScript Example:**

```typescript
import fetch from "node-fetch";

interface GoogleRedirectResponse {
  url: string;
}

async function getGoogleRedirectUrl(): Promise<GoogleRedirectResponse> {
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
  return data;
}

// Usage
getGoogleRedirectUrl()
  .then((data) => {
    console.log("Redirect to Google OAuth:", data.url);
  })
  .catch((err) => console.error(err));
```

### 4. **GET `/auth/google-callback`**

**TypeScript Example:**

```typescript
import fetch from "node-fetch";

async function handleGoogleCallback(callbackUrl: string): Promise<void> {
  const response = await fetch(callbackUrl, {
    method: "GET",
    credentials: "include",
  });

  if (response.ok) {
    const data = await response.json();
    console.log("Google OAuth successful:", data);
  } else {
    console.error("Google OAuth failed");
  }
}

// Usage
const callbackUrl =
  "http://localhost:3001/auth/google-callback?code=auth_code&state=state_value";
handleGoogleCallback(callbackUrl).catch((err) => console.error(err));
```

### 5. **GET `/auth/github-redirect-url`**

**TypeScript Example:**

```typescript
import fetch from "node-fetch";

interface GithubRedirectResponse {
  url: string;
}

async function getGithubRedirectUrl(): Promise<GithubRedirectResponse> {
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

// Usage
getGithubRedirectUrl()
  .then((data) => {
    console.log("Redirect to GitHub OAuth:", data.url);
  })
  .catch((err) => console.error(err));
```

### 6. **GET `/auth/github-callback`**

**TypeScript Example:**

```typescript
import fetch from "node-fetch";

async function handleGithubCallback(callbackUrl: string): Promise<void> {
  const response = await fetch(callbackUrl, {
    method: "GET",
    credentials: "include",
  });

  if (response.ok) {
    const data = await response.json();
    console.log("GitHub OAuth successful:", data);
  } else {
    console.error("GitHub OAuth failed");
  }
}

// Usage
const callbackUrl =
  "http://localhost:3001/auth/github-callback?code=auth_code&state=state_value";
handleGithubCallback(callbackUrl).catch((err) => console.error(err));
```