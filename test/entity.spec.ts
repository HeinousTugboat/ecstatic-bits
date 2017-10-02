import 'mocha';
import { expect } from 'chai';
import { resetECS } from './ecstatic-bits.spec';
import * as sinon from 'sinon';
import { Entity } from '../src/entity';
import { Component, ComponentType } from '../src/component';

describe('Entity', function () {
    resetECS();
    afterEach(resetECS);
    it('should exist', function () {
        expect(Entity).to.exist;
    });
    describe('constructor', function () {
        it('should have a default name', function () {
            const entity = new Entity;
            expect(entity).to.have.property('name');
        });
        it('should have an id', function () {
            const entity = new Entity;
            expect(entity).to.have.property('id');
            expect(entity.id).to.be.a('number').greaterThan(0);
        });
        it('should set the name to what is passed to it', function () {
            const entity = new Entity('Test-Entity');
            expect(entity.name).to.equal('Test-Entity');
        });
        it('should have a unique id after 5 instances', function () {
            const entities: Entity[] = [];
            const ids: Set<Number> = new Set;
            for (let i = 0; i < 5; i++) {
                const entity = new Entity;
                entities.push(entity);
                ids.add(entity.id);
            }
            expect(ids.size).to.equal(5);

        });
        it('should have a list of components', function () {
            const entity = new Entity;
            expect(entity).to.have.property('components');
        });
        it('should be added to Entity.list', function () {
            const entity = new Entity;
            expect(Entity.list.get(entity.id)).to.deep.equal(entity);
        });
    });
    describe('get', function () {
        let entity: Entity;
        beforeEach(function () {
            entity = new Entity('Test Entity');
        });
        it('should exist', function () {
            expect(Entity).to.have.property('get');
            expect(Entity.get).to.be.a('function');
        });
        it('should return an array of entities if found by name', function () {
            expect(Entity.get(entity.name)).to.include(entity);
        });
        it('should return an entity by id number', function () {
            expect(Entity.get(entity.id)).to.be.deep.equal(entity);
        });
        it('should return undefined or an empty array if entity doesn\'t exist', function () {
            expect(Entity.get(-1)).to.be.undefined;
            expect(Entity.get('')).to.be.empty;
        });
    });
    describe('print', function () {
        let sandbox: sinon.SinonSandbox;
        let spy: sinon.SinonSpy;
        beforeEach(function () {
            sandbox = sinon.sandbox.create();
            spy = sandbox.spy(console, 'log');
        });
        afterEach(function () {
            sandbox.restore();
        });
        it('should exist', function () {
            expect(Entity).to.have.property('print');
            expect(Entity.print).to.be.a('function');
        });
        it('should print..', function () {
            const entity2 = new Entity('Test Entity 2');
            const entity3 = new Entity('Test Entity 3');
            Entity.print();
            expect(spy.called).to.be.true;
        });
    });
    describe('prototype', function () {
        let entity: Entity;

        @ComponentType('test-component')
        class TestComponent extends Component {
            constructor(public eid: number) {
                super(eid);
            }
            initialize() { }
        }
        beforeEach(function () {
            ComponentType('test-component')(TestComponent);
            entity = new Entity('Test Entity');
        });
        describe('add', function () {
            it('should exist', function () {
                expect(entity).to.have.property('add');
                expect(entity.add).to.be.a('function');
            });
            it('should add given component', function () {
                const component = entity.add('test-component');
                expect(entity.components.has('test-component')).to.be.true;
                expect(entity.components.get('test-component')).to.deep.equal(component);
            });
            // it('should add initialized component');
            it('should return an existing component if already on entity', function () {
                const component = entity.add('test-component');
                expect(entity.components.has('test-component')).to.be.true;
                const component2 = entity.add('test-component');
                expect(component2).to.deep.equal(component);
            });
            it('should throw an error if unable to find component type', function () {
                expect(() => entity.add('fake-component')).to.throw();
            });
        });
        describe('get', function () {
            it('should exist', function () {
                expect(entity).to.have.property('get');
                expect(entity.get).to.be.a('function');
            });
            it('should return the corresponding component', function () {
                const component = entity.add('test-component');
                expect(entity.components.has('test-component')).to.be.true;
                expect(entity.get('test-component')).to.deep.equal(component);
            });
        });
        describe('remove', function () {
            it('should exist', function () {
                expect(entity).to.have.property('remove');
                expect(entity.remove).to.be.a('function');
            });
            it('should remove given component from entity', function () {
                const component = entity.add('test-component');
                expect(entity.components.has('test-component')).to.be.true;
                entity.remove('test-component');
                expect(entity.components.has('test-component')).to.be.false;
                expect(entity.components.get('test-component')).to.be.undefined;
            });
            it('should not remove components from other entities', function () {
                const entity2 = new Entity('Extra Entity');
                const component = entity.add('test-component');
                const component2 = entity2.add('test-component');
                expect(entity.components.has('test-component')).to.be.true;
                expect(entity.components.get('test-component')).to.deep.equal(component);
                expect(entity2.components.has('test-component')).to.be.true;
                expect(entity2.components.get('test-component')).to.deep.equal(component2);
                entity.remove('test-component');
                expect(entity.components.has('test-component')).to.be.false;
                expect(entity.components.get('test-component')).to.be.undefined;
                expect(entity2.components.has('test-component')).to.be.true;
                expect(entity2.components.get('test-component')).to.deep.equal(component2);
            });
        });
        // describe('toJSON', function () {
        //     it('should exist', function () {
        //         expect(entity).to.have.property('toJSON');
        //         expect(entity.toJSON).to.be.a('function');
        //     });
        //     // it('should return a stringified version of entity');
        //     // it('should throw an error if unable to serialize');
        //     // it('should be able to be parsed back from JSON');
        //     // it('needs a loader function');
        // });
    });
});
