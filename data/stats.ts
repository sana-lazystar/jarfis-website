/**
 * JARFIS project statistics.
 * Locale-independent numeric/version values displayed in SocialProof section.
 * Update this file when releasing new versions or adding agents/artifacts/commands.
 */
export const JARFIS_STATS = {
  version: 'v1.0.7',
  agents: 9,
  artifacts: 11,
  commands: 10,
} as const;

export type JarfisStats = typeof JARFIS_STATS;
