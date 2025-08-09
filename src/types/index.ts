export type PromptType = 'FANFIC' | 'FAN ART';

export type Prompt = {
  Prompt_ID: string;
  Type: PromptType;
  Week: number;
  ISO_Year: number;
  Prompt_Title: string;
  Prompt_Theme: string;
  Reddit_Thread_URL: string;
  Opens_At: string;
  Closes_At: string;
  Status: 'UPCOMING' | 'ACTIVE' | 'CLOSED';
  Winners_Usernames?: string;
  Notes?: string;
};

export type Submission = {
  Submission_ID: string;
  Prompt_ID: string;
  Type: PromptType;
  Author_Username: string;
  Submission_Title: string;
  Reddit_Post_URL: string;
  Upvotes_Snapshot?: number;
  Is_Winner_Rank?: 1 | 2 | 3;
  Has_Spoilers?: 'YES' | 'NO';
  Created_At?: string;
};

export type SubmissionForScore = {
  Author_Username: string;
  Upvotes_Snapshot?: number;
  Is_Winner_Rank?: 1 | 2 | 3;
};

export type LeaderboardEntry = {
  Username: string;
  Points: number;
};