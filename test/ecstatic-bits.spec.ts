import { expect } from 'chai';
import 'mocha';
import { Subject } from 'rxjs';

import { Component } from '../src/component';
import EcstaticBits from '../src/ecstatic-bits';
import { Entity } from '../src/entity';
import { System } from '../src/system';

afterEach(() => {
    Entity.map.forEach(x => x.components.clear());
    Entity.map.clear();
    Component.added$ = new Subject<Component>();
    Component.removed$ = new Subject<Component>();
    System.active.clear();
    System.list.clear();
});

describe('EcstatictBits', () => {
    describe('base tests', () => {
        it('should at least run', () => {
            expect(true).to.be.true;
        });
    });

    it('should exist', () => {
        expect(EcstaticBits).to.exist;
    });

    it('should be invokable', () => {
        const bits = new EcstaticBits;
        expect(bits).to.exist;
        expect(bits instanceof EcstaticBits).to.be.true;
    });
});
