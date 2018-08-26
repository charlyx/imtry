const { getCodeLieu } = require('.')

const TRAIN_STATION = 'Croix Bonneau'

describe('getCodeLieu', () => {
  it('should return "codeLieu" for a train station"', async () => {
    const codeLieu = await getCodeLieu(TRAIN_STATION)

    expect(codeLieu).toBe('XBON')
  })

  it('should throw an error saying "Coult not find station 9¾"', async () => {
    expect.assertions(1)
    const hiddenStation = '9¾'

    try {
      const codeLieu = await getCodeLieu(hiddenStation)
    } catch (e) {
      expect(e).toEqual(Error(`Could not find station ${hiddenStation}`))
    }
  })
})


