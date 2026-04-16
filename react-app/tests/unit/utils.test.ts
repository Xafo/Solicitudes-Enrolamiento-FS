import { describe, it, expect } from 'vitest'
import { normalizeDecimal, parseDecimal, hasAnyValue, isLongHealthForm, isShortHealthForm, hasDependents, isFemaleQuestion } from '../../src/utils'

describe('Formatters', () => {
  describe('normalizeDecimal', () => {
    it('should return empty string for empty input', () => {
      expect(normalizeDecimal('')).toBe('')
    })

    it('should convert comma to dot', () => {
      expect(normalizeDecimal('1,5')).toBe('1.50')
    })

    it('should remove non-numeric characters except dot and minus', () => {
      expect(normalizeDecimal('abc123.45xyz')).toBe('123.45')
    })

    it('should return 0.00 for input with only letters', () => {
      expect(normalizeDecimal('abc')).toBe('0.00')
    })

    it('should format to 2 decimal places', () => {
      expect(normalizeDecimal('10')).toBe('10.00')
      expect(normalizeDecimal('10.5')).toBe('10.50')
      expect(normalizeDecimal('10.567')).toBe('10.57')
    })
  })

  describe('parseDecimal', () => {
    it('should return 0 for empty input', () => {
      expect(parseDecimal('')).toBe(0)
    })

    it('should parse decimal strings', () => {
      expect(parseDecimal('1.5')).toBe(1.5)
      expect(parseDecimal('1,5')).toBe(1.5)
    })

    it('should return 0 for invalid input', () => {
      expect(parseDecimal('abc')).toBe(0)
    })
  })
})

describe('Helpers', () => {
  describe('hasAnyValue', () => {
    it('should return false for all empty values', () => {
      expect(hasAnyValue({ a: '', b: '', c: '' })).toBe(false)
    })

    it('should return true if any value is non-empty', () => {
      expect(hasAnyValue({ a: '', b: 'test', c: '' })).toBe(true)
    })

    it('should return false for whitespace-only values', () => {
      expect(hasAnyValue({ a: '   ' })).toBe(false)
    })
  })

  describe('isLongHealthForm', () => {
    it('should return true for 63 and 64', () => {
      expect(isLongHealthForm('63')).toBe(true)
      expect(isLongHealthForm('64')).toBe(true)
    })

    it('should return false for other form types', () => {
      expect(isLongHealthForm('101')).toBe(false)
      expect(isLongHealthForm('61')).toBe(false)
      expect(isLongHealthForm('62')).toBe(false)
    })
  })

  describe('isShortHealthForm', () => {
    it('should return true for 61 and 62', () => {
      expect(isShortHealthForm('61')).toBe(true)
      expect(isShortHealthForm('62')).toBe(true)
    })

    it('should return false for other form types', () => {
      expect(isShortHealthForm('101')).toBe(false)
      expect(isShortHealthForm('63')).toBe(false)
      expect(isShortHealthForm('64')).toBe(false)
    })
  })

  describe('hasDependents', () => {
    it('should return true for 101, 63, and 64', () => {
      expect(hasDependents('101')).toBe(true)
      expect(hasDependents('63')).toBe(true)
      expect(hasDependents('64')).toBe(true)
    })

    it('should return false for 61 and 62', () => {
      expect(hasDependents('61')).toBe(false)
      expect(hasDependents('62')).toBe(false)
    })
  })

  describe('isFemaleQuestion', () => {
    it('should return true for q4a, q4b, q4c, q4d', () => {
      expect(isFemaleQuestion('q4a')).toBe(true)
      expect(isFemaleQuestion('q4b')).toBe(true)
      expect(isFemaleQuestion('q4c')).toBe(true)
      expect(isFemaleQuestion('q4d')).toBe(true)
    })

    it('should return false for other question IDs', () => {
      expect(isFemaleQuestion('q1a')).toBe(false)
      expect(isFemaleQuestion('q2a')).toBe(false)
      expect(isFemaleQuestion('q3')).toBe(false)
      expect(isFemaleQuestion('q5')).toBe(false)
    })
  })
})
