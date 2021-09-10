export const removeLeadingUrl = (str: string): string => {
  return str.replace('https://api.spotify.com/v1', '')
}
