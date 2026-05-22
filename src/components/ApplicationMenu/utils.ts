import type { Application, ApplicationCategory } from '@/templates/App/App.types'

/**
 * Filters applications in list of categories. Applications are sorted according to best matching result.
 * If no application of category match query, whole category is omitted.
 *
 * @param categories List of categories with applications to filter.
 * @param filter Filter string to match.
 * @returns FilteredCategories Categories with matched applications.
 */
export const filterCategories = (
  categories: ApplicationCategory[],
  filter: string
): ApplicationCategory[] => {
  const filteredCategories: ApplicationCategory[] = []

  categories.forEach((category) => {
    const startsWithMatch: Application[] = []
    const containsMatch: Application[] = []

    category.applications.forEach((application) => {
      // Escape special regex characters
      const safeQuery = filter.replace(/[-[\]/{}()*+?.\\^$|]/g, '\\$&')
      const match = new RegExp(safeQuery.split(' ').join('.* '), 'i').exec(
        application.name
      )

      if (match) {
        if (match.index === 0) {
          startsWithMatch.push(application)
        } else {
          containsMatch.push(application)
        }
      }
    })

    // Items with start match are listed first
    const matchedApplications = [...startsWithMatch, ...containsMatch]

    if (matchedApplications.length) {
      filteredCategories.push({ ...category, applications: matchedApplications })
    }
  })

  return filteredCategories
}

/**
 * Get path without base path prefix.
 * Simplified version for our use case.
 */
export const getPathWithoutBasePath = (pathname: string): string => {
  // In our standalone app, we don't have a base path
  return pathname
}
