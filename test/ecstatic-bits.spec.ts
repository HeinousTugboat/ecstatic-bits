import 'mocha';
import { expect } from 'chai';
import EcstaticBits from '../src/ecstatic-bits';
import { Entity } from '../src/entity';
import { Component } from '../src/component';
import { System } from '../src/system';

export function resetECS() {
    Entity.map.forEach(x => x.components.clear());
    Entity.map.clear();
    // Component.types.clear();
    // System.list.forEach(x => x.components.clear());
    System.active.clear();
    System.list.clear();
}

afterEach(resetECS);
describe('base tests', function () {
    resetECS();
    it('should at least run', function () {
        expect(true).to.be.true;
    });
});
describe('EcstatictBits', function () {
    it('should exist', function () {
        expect(EcstaticBits).to.exist;
    });
    it('should be invokable', function () {
        const bits = new EcstaticBits;
        expect(bits).to.exist;
        expect(bits instanceof EcstaticBits).to.be.true;
    });
});
