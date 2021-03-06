/* global describe it expect */

import { merge } from '../lib/utils'
import Config from '../lib/config'

const defaults = { headers: {} }

const configParams = {
  mode: 'no-cors',
  credentials: 'same-origin',
}

function getConfigWithParams() {
  return new Config(configParams)
}

describe('Config -> config', () => {
  it('initializes with the default fetch config', () => {
    const config = new Config()

    expect(config._config).toEqual(defaults)
    expect(config.get()).toEqual(defaults)
  })

  it('initializes with the defaults merged with the provided config', () => {
    const config = getConfigWithParams()

    expect(config.get()).toEqual(merge(defaults, configParams))
  })

  describe('set', () => {
    it('merges the provided config with this._config', () => {
      const config = getConfigWithParams()
      config.set({
        mode: 'cors',
        headers: {
          'X-ACCESS-TOKEN': 'aasdljhf2kjrasdf2l3jrhn2',
        },
      })

      expect(config._config).toMatchSnapshot()
    })
  })

  describe('get', () => {
    it('returns the merged _defaults and _config', () => {
      const config = getConfigWithParams()
      config.set({
        mode: 'cors',
        headers: {
          'X-ACCESS-TOKE': 'aasdljhf2kjrasdf2l3jrhn2',
        },
      })

      expect(config.get()).toMatchSnapshot()
    })
  })

  describe('merge', () => {
    it('returns body stringified according to Content-Type', () => {
      const config = new Config()

      const actual = config.merge({ body: { foo: 'bar' } })
      expect(actual).toMatchSnapshot()
    })

    it('returns the config merged with the params', () => {
      const config = new Config({ mode: 'no-cors' })

      const actual = config.merge({ credentials: 'same-origin' })
      expect(actual).toMatchSnapshot()
    })

    it('returns the config merged with the params', () => {
      const config = new Config({ mode: 'no-cors' })

      const actual = config.merge({ credentials: 'same-origin' })
      expect(actual).toMatchSnapshot()
    })

    it('merges all the params passed', () => {
      const config = new Config({ mode: 'no-cors' })

      const actual = config.merge(
        { credentials: 'same-origin' },
        { headers: { 'Content-Type': 'text/plain' } },
      )
      expect(actual).toMatchSnapshot()
    })

    it('does not mutate _config or _defaults', () => {
      const config = new Config({ mode: 'no-cors' })

      expect(config._config).toEqual({ headers: {}, mode: 'no-cors' })

      const actual = config.merge(
        { headers: { 'Content-Type': 'text/plain' } },
        { mode: 'cors' },
      )
      expect(actual).toMatchSnapshot()

      expect(config._config).toEqual({ headers: {}, mode: 'no-cors' })
    })
  })
})
