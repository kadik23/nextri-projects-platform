export type UserProfile = {
  id: UserId;
  name: string | null;
  image: string | null;
};

export type UserId = number;

export interface GoogleUser {
  provider: 'google';
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
  provider: 'github';
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


export type ProjectCategoryPreference = "freelance" | "open source" | "company";




export interface Prefrences {
  id: string ,
  role : string ; 
  skill_level : string ; 
  project_type : string ; 
  project_focus : string[] ;
  work_type : string ; 
  work_pace : string ; 
  techstack :string[] ; 
}
export type WorkPace =
  | "Short_term"
  | "Medium_term"
  | "Long_term"
  | "Specific_task";
