import { Submission, Prompt } from '@/types'

export function filterSubmissionsByPromptId(submissions: Submission[], promptId: string): Submission[] {
  return submissions.filter(submission => submission.Prompt_ID === promptId)
}

export function findPromptByYearAndWeek(prompts: Prompt[], year: number, week: number): Prompt | null {
  return prompts.find(prompt => 
    prompt.ISO_Year === year && prompt.Week === week
  ) || null
}

export function generatePromptId(type: 'FANFIC' | 'FAN ART', year: number, week: number): string {
  const typeCode = type === 'FANFIC' ? 'FIC' : 'ART'
  const weekStr = String(week).padStart(2, '0')
  return `${year}-W${weekStr}-${typeCode}`
}

export function findPromptsForYearAndWeek(prompts: Prompt[], year: number, week: number): Prompt[] {
  return prompts.filter(prompt => 
    prompt.ISO_Year === year && prompt.Week === week
  )
}

export function getPromptDisplayInfo(prompt: Prompt) {
  return {
    title: prompt.Prompt_Title,
    theme: prompt.Prompt_Theme,
    type: prompt.Type,
    status: prompt.Status,
    opensAt: prompt.Opens_At,
    closesAt: prompt.Closes_At,
    redditUrl: prompt.Reddit_Thread_URL,
    winnerUsernames: prompt.Winners_Usernames,
    notes: prompt.Notes
  }
}