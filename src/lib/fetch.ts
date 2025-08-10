import { Prompt, Submission } from '@/types';

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

export async function getPrompts(): Promise<Prompt[]> {
  return fetchJson<Prompt[]>('prompts');
}

export async function getSubmissions(): Promise<Submission[]> {
  return fetchJson<Submission[]>('submissions');
}