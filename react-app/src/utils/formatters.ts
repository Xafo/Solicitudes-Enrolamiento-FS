export const normalizeDecimal = (raw: string): string => {
  if (!raw) {
    return ''
  }

  const cleaned = raw.replace(/,/g, '.').replace(/[^0-9.-]/g, '')
  const parsed = Number(cleaned)
  return Number.isNaN(parsed) ? '' : parsed.toFixed(2)
}

export const parseDecimal = (raw: string): number => {
  if (!raw.trim()) {
    return 0
  }

  const normalized = raw.replace(',', '.')
  const parsed = Number.parseFloat(normalized)
  return Number.isNaN(parsed) ? 0 : Number(parsed.toFixed(2))
}
