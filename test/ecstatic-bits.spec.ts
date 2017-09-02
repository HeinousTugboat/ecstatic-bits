import { expect } from 'chai';
import 'mocha';
import ecstaticBits from '../src/ecstatic-bits';

describe('base tests', function () {
    it('should at least run', function () {
        expect(true).to.be.true;
    })
})
describe('ecstatictBits', function () {
    it('should exist', function () {
        expect(ecstaticBits).to.exist;
    })
    it('should be invokable', function() {
        let bits = new ecstaticBits;
        expect(bits).to.exist;
        expect(bits instanceof ecstaticBits).to.be.true;
    })
})
