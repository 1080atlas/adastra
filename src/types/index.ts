export type PromptType = 'FANFIC' | 'FAN ART';

// Raw data from Google Sheets (matching your column structure)
export type PromptRaw = {
  'Prompt_ID (auto)': string;
  'Week (ISO)': number;
  Type: PromptType;
  Title: string;
  'Start_Date (Oslo)': string;
  'End_Date (Oslo)': string;
  ISO_Year: number;
  'Reddit_Title (auto)': string;
  Status: 'UPCOMING' | 'ACTIVE' | 'CLOSED';
  Reddit_Post_URL: string;
  Total_Submissions: number;
  Total_Votes: number;
  'Winners (Usernames)': string;
  Notes: string;
};

// Processed data (normalized for the app)
export type Prompt = {
  Prompt_ID: string;
  Type: PromptType;
  Week: number;
  ISO_Year: number;
  Prompt_Title: string;
  Prompt_Theme?: string; // Optional since your sheet doesn't have this
  Reddit_Thread_URL: string;
  Opens_At: string;
  Closes_At: string;
  Status: 'UPCOMING' | 'ACTIVE' | 'CLOSED';
  Winners_Usernames?: string;
  Notes?: string;
  // Additional fields from your sheet
  Reddit_Title?: string;
  Total_Submissions?: number;
  Total_Votes?: number;
};

// Raw submissions data from Google Sheets (matching your column structure)
export type SubmissionRaw = {
  'Submission_ID (auto)': string;
  'Prompt_ID (choose)': string;
  'Week (auto)': number;
  'ISO_Year (auto)': number;
  'Type (auto)': PromptType;
  Author_Username: string;
  Submission_Title: string;
  Reddit_Post_URL: string;
  Upvotes: number;
  Comments: number;
  Created_At: string;
  Votes_Valid: string;
  Winner_Rank: number;
  Spoilers: string;
  'Generated_Reddit_Title (auto)': string;
};

// Processed submissions data (normalized for the app)
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
  // Additional fields from your sheet
  Week?: number;
  ISO_Year?: number;
  Comments?: number;
  Votes_Valid?: string;
  Generated_Reddit_Title?: string;
};

// Legacy type alias for backward compatibility
export type SubmissionForScore = {
  Author_Username: string;
  Upvotes_Snapshot?: number;
  Is_Winner_Rank?: 1 | 2 | 3;
};

export type LeaderboardEntry = {
  Username: string;
  Points: number;
};