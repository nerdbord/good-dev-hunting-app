export interface UserPayload {
    id: string;
    profileId: string;
    githubCredentials: {
      username: string;
      email: string;
    }
  }
  
