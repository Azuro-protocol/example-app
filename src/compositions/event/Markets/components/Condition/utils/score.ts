import { type MarketOutcome } from '@azuro-org/toolkit'


// Correct-score `selectionName`s come from the feed as `"N-N"` (dash-separated),
// e.g. "2-1". Group 1 is the home goals, group 2 the away goals.
export const scoreRegex = /\s*(\d+)-(\d+)\s*$/

// Outcomes priced above this are treated as noise and excluded from the views.
export const MAX_SCORE_ODDS = 150

export type Score = {
  home: number
  away: number
}

/**
 * Parse a correct-score `selectionName` into home/away goals.
 * Returns `null` when the name doesn't match the score format.
 */
export const parseScore = (selectionName: string): Score | null => {
  const match = scoreRegex.exec(selectionName)

  if (!match) {
    return null
  }

  return {
    home: +match[1],
    away: +match[2],
  }
}

/**
 * Filter outcomes down to the ones usable by the correct-score views: drop
 * anything priced above `MAX_SCORE_ODDS` or whose `selectionName` doesn't parse
 * into a score, pairing each survivor with its parsed `Score`.
 */
export const getScoredOutcomes = (outcomes: MarketOutcome[]): { outcome: MarketOutcome, score: Score }[] => {
  const result: { outcome: MarketOutcome, score: Score }[] = []

  outcomes.forEach((outcome) => {
    if (outcome.odds > MAX_SCORE_ODDS) {
      return
    }

    const score = parseScore(outcome.selectionName)

    if (!score) {
      return
    }

    result.push({ outcome, score })
  })

  return result
}
