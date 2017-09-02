import { expect } from 'chai';
import 'mocha';
import {Entity} from '../src/entity';

describe('Entity', function() {
    it('should exist', function() {
        expect(Entity).to.exist;
    })
    describe('constructor', function() {
        it('should have a default name');
        it('should have an id');
        it('should set the name to what is passed to it');
        it('should have a unique id after 5 instances');
        it('should have a list of components');
        it('should be added to Entity.list');
    })
    describe('prototype', function() {
        describe('addComponent', function() {
            it('should exist');
            it('should add given component');
            it('should add initialized component');
            it('should throw an error if no component given');
            it('should throw an error if component given already on entity');
            it('TODO: (95)[Unit Tests] Reconsider this test - should add this entity to given component\'s list');
            it('should work the same as generating a new component via EID');
        });
        describe('removeComponent', function() {
            it('should exist');
            it('should remove given component from entity');
            it('should throw an error if no component given');
            it('should throw an error if component given not found on entity');
            it('should remove this entity from given component\'s list');
        });
        describe('print', function() {
            it('should exist');
            it('should return a stringified version of entity');
            it('should throw an error if unable to serialize');
            it('should be able to be parsed back from JSON');
            it('needs a loader function');
        });
    });
    describe('findEntity', function() {
        it('should exist');
    });
})
