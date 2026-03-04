/**
 * Fetch GitHub star count at build time.
 * Falls back to a hardcoded value if the request fails.
 */

const REPO = 'sana-lazystar/jarfis';
const FALLBACK_STARS = 0;

export async function getGitHubStars(): Promise<number> {
  try {
    const response = await fetch(`https://api.github.com/repos/${REPO}`, {
      headers: {
        Accept: 'application/vnd.github.v3+json',
        'User-Agent': 'jarfis-website-builder',
      },
    });

    if (!response.ok) {
      console.warn(`[github] API request failed: ${response.status} ${response.statusText}`);
      return FALLBACK_STARS;
    }

    const data = await response.json() as { stargazers_count?: number };
    return data.stargazers_count ?? FALLBACK_STARS;
  } catch (err) {
    console.warn('[github] Failed to fetch star count:', err);
    return FALLBACK_STARS;
  }
}

/**
 * Format star count for display.
 * < 1000: "42"
 * >= 1000: "1.2k"
 */
export function formatStarCount(count: number): string {
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}k`;
  }
  return count.toString();
}
