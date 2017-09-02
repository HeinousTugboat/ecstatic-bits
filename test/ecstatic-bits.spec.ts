import {expect} from 'chai';
import 'mocha';
import ecstaticBits from '../src/ecstatic-bits';

describe('Thing', function() {
    it('should do stuff', function() {
        expect(true).to.be.true;
    })
    it('should exist', function() {
        expect(ecstaticBits).to.exist;
    })
    it('should NOT exist!', function() {
        // expect(false).to.be.true;
    })
})
