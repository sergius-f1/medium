/**
 * Format dateString to human-readable value (April 8, 2021)
 * @param dateString
 */
export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
