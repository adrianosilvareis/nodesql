export function addHours(date, hours) {
  return new Date(date + hours * 3600 * 1000)
}
