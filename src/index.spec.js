const { getClosestTramwayFrom } = require('.')
const { getCodeLieu } = require('./getCodeLieu')
const { getClosestTramwayAt } = require('./getClosestTramwayAt')

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

jest.mock('./getCodeLieu', () => ({
    getCodeLieu: jest.fn().mockReturnValue('XBON')
}))

jest.mock('./getClosestTramwayAt')