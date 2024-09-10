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
