import { expect } from 'chai';
import 'mocha';
import {Entity} from '../src/entity';

describe('Entity', function() {
    it('should exist', function() {
        expect(Entity).to.exist;
    })
    describe('constructor', function() {
        it('should have a default name', function(){
            const entity = new Entity;
            expect(entity).to.have.property('name');
        });
        it('should have an id', function() {
            const entity = new Entity;
            expect(entity).to.have.property('id');
            expect(entity.id).to.be.a('number').greaterThan(0);
        });
        it('should set the name to what is passed to it', function() {
            const entity = new Entity('Test-Entity');
            expect(entity.name).to.equal('Test-Entity');
        });
        it('should have a unique id after 5 instances', function() {
            const entities: Entity[] = [];
            const ids: Set<Number> = new Set;
            for (let i = 0; i < 5; i++) {
                let entity = new Entity;
                entities.push(entity);
                ids.add(entity.id);
            }
            expect(ids.size).to.equal(5);

        });
        it('should have a list of components', function() {
            const entity = new Entity;
            expect(entity).to.have.property('components');
        });
        it('should be added to Entity.list', function() {
            const entity = new Entity;
            expect(Entity.list.get(entity.id)).to.deep.equal(entity);
        });
    })
    describe('prototype', function() {
        let entity: Entity;
        beforeEach(function(){
            entity = new Entity('Test Entity');
        })
        describe('add', function() {
            it('should exist', function() {
                expect(entity).to.have.property('add');
                expect(entity.add).to.be.a('function');
            });
            it('should add given component');
            it('should add initialized component');
            it('should throw an error if no component given');
            it('should throw an error if component given already on entity');
            it('TODO: (95)[Unit Tests] Reconsider this test - should add this entity to given component\'s list');
            it('should work the same as generating a new component via EID');
        });
        describe('removeComponent', function() {
            it('should exist', function() {
                expect(entity).to.have.property('remove');
                expect(entity.remove).to.be.a('function');
            });
            it('should remove given component from entity');
            it('should throw an error if no component given');
            it('should throw an error if component given not found on entity');
            it('should remove this entity from given component\'s list');
        });
        describe('toJSON', function() {
            it('should exist', function() {
                expect(entity).to.have.property('toJSON');
                expect(entity.toJSON).to.be.a('function');
            });
            it('should return a stringified version of entity');
            it('should throw an error if unable to serialize');
            it('should be able to be parsed back from JSON');
            it('needs a loader function');
        });
    });
    describe('findEntity', function() {
        it('should exist', function() {
            expect(Entity).to.have.property('find');
            expect(Entity.find).to.be.a('function');
        });
    });
})
