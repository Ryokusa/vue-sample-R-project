export type TodoFilterType = 'all' | 'active' | 'completed'
export const isTodoFilterType = (value: unknown): value is TodoFilterType => {
  if (typeof value !== 'string') {
    return false
  }
  return ['all', 'active', 'completed'].includes(value)
}
