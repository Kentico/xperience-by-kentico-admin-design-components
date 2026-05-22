/**
 * Dark gradient values for avatar backgrounds.
 * These use the 60→70 gradient scale for good contrast with white text.
 */
export const DarkGradients = [
  'var(--gradient-dark-grey)',
  'var(--gradient-dark-warm-grey)',
  'var(--gradient-dark-neon-green)',
  'var(--gradient-dark-kontent-turquoise)',
  'var(--gradient-dark-sky-blue)',
  'var(--gradient-dark-ultramarine-blue)',
  'var(--gradient-dark-majorelle-blue)',
  'var(--gradient-dark-xperience-violet)',
  'var(--gradient-dark-rose)',
  'var(--gradient-dark-red)',
  'var(--gradient-dark-kentico-orange)',
  'var(--gradient-dark-yellow)',
] as const

/**
 * Light gradient values.
 * These use the 30→40 gradient scale.
 */
export const LightGradients = [
  'var(--gradient-light-grey)',
  'var(--gradient-light-warm-grey)',
  'var(--gradient-light-neon-green)',
  'var(--gradient-light-kontent-turquoise)',
  'var(--gradient-light-sky-blue)',
  'var(--gradient-light-ultramarine-blue)',
  'var(--gradient-light-majorelle-blue)',
  'var(--gradient-light-xperience-violet)',
  'var(--gradient-light-rose)',
  'var(--gradient-light-red)',
  'var(--gradient-light-kentico-orange)',
  'var(--gradient-light-yellow)',
] as const

/**
 * Get a random dark gradient.
 * If a key is provided, returns a consistent gradient for that key.
 */
export function getRandomDarkGradient(key?: string): string {
  if (key) {
    // Generate consistent index based on key
    let hash = 0
    for (let i = 0; i < key.length; i++) {
      const char = key.charCodeAt(i)
      hash = (hash << 5) - hash + char
      hash = hash & hash // Convert to 32-bit integer
    }
    const index = Math.abs(hash) % DarkGradients.length
    return DarkGradients[index]
  }

  // Random selection
  const index = Math.floor(Math.random() * DarkGradients.length)
  return DarkGradients[index]
}
