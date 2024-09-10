export type UserProfile = {
  id: UserId;
  name: string | null;
  image: string | null;
};

export type UserId = number;


export type ProjectCategoryPreference = {
  id?: string,
  userOnboardingId: string,
  name: string
}

export type Technology = {
  id?: string,
  userOnboardingId: string,
  name: string
}