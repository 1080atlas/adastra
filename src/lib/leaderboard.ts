import { Submission, LeaderboardEntry } from '@/types';

export const POINTS = {
  submit: 5,
  first: 15,
  second: 8,
  third: 5,
  upvoteBlock: 25,
  upvoteCap: 10,
};

// Filter to only include valid submissions for scoring
function isValidSubmission(submission: Submission): boolean {
  // Only count submissions with valid votes
  return submission.Votes_Valid?.toUpperCase() === 'YES';
}

export function computeLeaderboard(submissions: Submission[]): LeaderboardEntry[] {
  // Filter out invalid submissions
  const validSubmissions = submissions.filter(isValidSubmission);
  
  const m = new Map<string, number>();
  const add = (u: string, p: number) => m.set(u, (m.get(u) ?? 0) + p);

  for (const s of validSubmissions) {
    add(s.Author_Username, POINTS.submit);
    if (s.Is_Winner_Rank === 1) add(s.Author_Username, POINTS.first);
    if (s.Is_Winner_Rank === 2) add(s.Author_Username, POINTS.second);
    if (s.Is_Winner_Rank === 3) add(s.Author_Username, POINTS.third);
    const bonus = Math.min(
      POINTS.upvoteCap,
      Math.floor((s.Upvotes_Snapshot ?? 0) / POINTS.upvoteBlock)
    );
    add(s.Author_Username, bonus);
  }

  return Array.from(m.entries())
    .map(([Username, Points]) => ({ Username, Points }))
    .sort((a, b) => b.Points - a.Points);
}