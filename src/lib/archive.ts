import { Prompt, PromptType } from '@/types'

export function groupPromptsByYear(prompts: Prompt[]): Record<number, Prompt[]> {
  const grouped = prompts.reduce((acc, prompt) => {
    const year = prompt.ISO_Year
    if (!acc[year]) {
      acc[year] = []
    }
    acc[year].push(prompt)
    return acc
  }, {} as Record<number, Prompt[]>)

  // Sort prompts within each year by week (descending - most recent first)
  Object.keys(grouped).forEach(year => {
    grouped[parseInt(year)].sort((a, b) => b.Week - a.Week)
  })

  return grouped
}

export function getYearsSorted(groupedPrompts: Record<number, Prompt[]>): number[] {
  return Object.keys(groupedPrompts)
    .map(year => parseInt(year))
    .sort((a, b) => b - a) // Descending - most recent year first
}

export function filterPromptsByType(prompts: Prompt[], type: PromptType): Prompt[] {
  return prompts.filter(prompt => prompt.Type === type)
}

export function getPromptTypeDisplayName(type: PromptType): string {
  switch (type) {
    case 'FANFIC':
      return 'Fanfiction'
    case 'FAN ART':
      return 'Fan Art'
    default:
      return type
  }
}

export function getPromptTypeDescription(type: PromptType): string {
  switch (type) {
    case 'FANFIC':
      return 'Weekly fanfiction writing prompts for the Red Rising universe. From character studies to epic space battles, explore Pierce Brown\'s world through original stories.'
    case 'FAN ART':
      return 'Weekly fan art creation prompts for the Red Rising universe. Bring characters, scenes, and original interpretations to life through visual art.'
    default:
      return 'Community prompts for creative works in the Red Rising universe.'
  }
}