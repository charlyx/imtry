import { formatStationName } from './formatStationName'


describe('formatStationName', () => {
    it('should return Bd in place of Boulevard in station name', () => {
      expect(formatStationName('Boulevard jules verne')).toBe('Bd jules verne')
    })

    it('should return Bd in place of boulevard in station name', () => {
        expect(formatStationName('boulevard jules verne')).toBe('Bd jules verne')
    })
  
    it('should return same string if there\'s nothing to replace', () => {
      expect(formatStationName('Croix bonneau')).toBe('Croix bonneau')
    })
})