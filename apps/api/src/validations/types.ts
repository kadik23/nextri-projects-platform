
export type UserProfile = {
  id: UserId;
  name: string | null;
  image: string | null;
};

export type UserId = number;

export interface GoogleUser {
  sub: string;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  email: string;
  email_verified: boolean;
  locale: string;
}

export interface GitHubUser {
  id: string;
  login: string;
  avatar_url: string;
  email: string;
}

export interface Email {
  email: string;
  primary: boolean;
  verified: boolean;
  visibility: string | null;
}

export type ProjectCategoryPreference = "freelance" | "open source" | "company"
export type workPace = "Short-term" | "Medium-term" | "Long-term" | "Specific-task";
