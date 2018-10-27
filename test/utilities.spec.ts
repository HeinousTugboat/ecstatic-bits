import { expect } from 'chai';
import 'mocha';

import * as utils from '../src/utilities';

describe('Utilities', () => {
  describe('invalid()', () => {
    it('returns true if passed undefined', () => {
      expect(utils.invalid(undefined)).to.be.true;
    });

    it('returns true if passed null', () => {
      expect(utils.invalid(null)).to.be.true;
    });

    it('returns false if passed 0', () => {
      expect(utils.invalid(0)).to.be.false;
    });

    it('returns false if passed \'\'', () => {
      expect(utils.invalid('')).to.be.false;
    });

    it('returns false if passed []', () => {
      expect(utils.invalid([])).to.be.false;
    });

    it('returns false if passed {}', () => {
      expect(utils.invalid({})).to.be.false;
    });
  });
});
