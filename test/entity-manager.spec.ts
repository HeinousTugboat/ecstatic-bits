import { expect } from 'chai';
import 'mocha';

import { EntityManager } from '../src/entity-manager';

xdescribe('Entity Manager', () => {
    it('should exist', () => {
        expect(EntityManager).to.exist;
    });

    describe('constructor', () => {});
    describe('prototype', () => {
        describe('list', () => {});
        describe('types', () => {});
        describe('getComponent', () => {});
        describe('getAllComponentsOfType', () => {});
        describe('getAllEntitiesPossessingComponent', () => {});
        describe('addComponent', () => {});
        describe('createEntity', () => {});
        describe('killEntity', () => {});
    });
});
