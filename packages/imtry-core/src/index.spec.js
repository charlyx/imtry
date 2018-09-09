import {
  getClosestTramwayFrom,
  getClosestTramwayNearby,
} from '.'
import { getCodeLieu } from './getCodeLieu'
import { getCodeLieuNearby } from './getCodeLieuNearby'
import { getClosestTramwayAt } from './getClosestTramwayAt'

describe('getClosestTramwayFrom', () => {
    beforeEach(async () => {
        await getClosestTramwayFrom('Croix Bonneau')
    })

    it('should call getCodeLieu with Croix Bonneau', () => {
        expect(getCodeLieu).toBeCalledWith('Croix Bonneau')
    })

    it('should call getClosestTramwayAt with XBON', () => {
        expect(getClosestTramwayAt).toBeCalledWith('XBON')
    })
})

describe('getClosestTramwayNearby', () => {
    beforeEach(async () => {
        await getClosestTramwayNearby('latitude', 'longitude')
    })

    it('should call getCodeLieuNearby with Croix Bonneau', () => {
        expect(getCodeLieuNearby).toBeCalledWith('latitude', 'longitude')
    })

    it('should call getClosestTramwayAt with XBON', () => {
        expect(getClosestTramwayAt).toBeCalledWith('XBON')
    })
})

jest.mock('./getCodeLieu', () => ({
    getCodeLieu: jest.fn().mockReturnValue('XBON')
}))

jest.mock('./getCodeLieuNearby', () => ({
    getCodeLieuNearby: jest.fn().mockReturnValue('XBON')
}))

jest.mock('./getClosestTramwayAt')
