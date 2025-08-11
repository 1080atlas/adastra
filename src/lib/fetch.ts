import { Prompt, PromptRaw, Submission, SubmissionRaw } from '@/types';

const BASE = process.env.ARCHIVE_DATA_URL;

async function fetchJson<T>(action: 'prompts' | 'submissions'): Promise<T> {
  // Check if the data URL is configured
  if (!BASE || BASE.trim() === '') {
    throw new Error(`Data source not configured. ARCHIVE_DATA_URL environment variable is missing or empty.`);
  }

  const url = `${BASE}?action=${action}`;
  const res = await fetch(url, { next: { revalidate: 300 } });
  if (!res.ok) {
    throw new Error(`Fetch ${action} failed: ${res.status} ${res.statusText}`);
  }
  const j = await res.json();
  return j.data as T;
}

// Transform raw Google Sheets data to normalized format
function transformPrompt(raw: PromptRaw): Prompt {
  return {
    Prompt_ID: raw['Prompt_ID (auto)'],
    Type: raw.Type,
    Week: raw['Week (ISO)'],
    ISO_Year: raw.ISO_Year,
    Prompt_Title: raw.Title,
    Prompt_Theme: raw.Title, // Use title as theme since you don't have a separate theme field
    Reddit_Thread_URL: raw.Reddit_Post_URL,
    Opens_At: raw['Start_Date (Oslo)'],
    Closes_At: raw['End_Date (Oslo)'],
    Status: raw.Status,
    Winners_Usernames: raw['Winners (Usernames)'] || undefined,
    Notes: raw.Notes || undefined,
    // Additional fields from your sheet
    Reddit_Title: raw['Reddit_Title (auto)'],
    Total_Submissions: raw.Total_Submissions,
    Total_Votes: raw.Total_Votes,
  };
}

export async function getPrompts(): Promise<Prompt[]> {
  const rawPrompts = await fetchJson<PromptRaw[]>('prompts');
  return rawPrompts.map(transformPrompt);
}

// Transform raw submissions data to normalized format
function transformSubmission(raw: SubmissionRaw): Submission {
  return {
    Submission_ID: raw['Submission_ID (auto)'],
    Prompt_ID: raw['Prompt_ID (choose)'],
    Type: raw['Type (auto)'],
    Author_Username: raw.Author_Username,
    Submission_Title: raw.Submission_Title,
    Reddit_Post_URL: raw.Reddit_Post_URL,
    Upvotes_Snapshot: raw.Upvotes,
    Is_Winner_Rank: raw.Winner_Rank && raw.Winner_Rank >= 1 && raw.Winner_Rank <= 3 ? raw.Winner_Rank as 1 | 2 | 3 : undefined,
    Has_Spoilers: raw.Spoilers ? (raw.Spoilers.toUpperCase() === 'YES' ? 'YES' : 'NO') : undefined,
    Created_At: raw.Created_At,
    // Additional fields from your sheet
    Week: raw['Week (auto)'],
    ISO_Year: raw['ISO_Year (auto)'],
    Comments: raw.Comments,
    Votes_Valid: raw.Votes_Valid,
    Generated_Reddit_Title: raw['Generated_Reddit_Title (auto)'],
  };
}

export async function getSubmissions(): Promise<Submission[]> {
  const rawSubmissions = await fetchJson<SubmissionRaw[]>('submissions');
  return rawSubmissions.map(transformSubmission);
}