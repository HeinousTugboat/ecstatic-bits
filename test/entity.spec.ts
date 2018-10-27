import { expect } from 'chai';
import 'mocha';
import { SinonStub, stub } from 'sinon';

import { Component } from '../src/component';
import { Entity, isEntity } from '../src/entity';

const TEST_ENTITY_COUNT = 5;

describe('Entity', () => {
  it('should exist', () => {
    expect(Entity).to.exist;
  });

  describe('isEntity', () => {
    it('should return True for a regular Entity', () => {
      const entity = new Entity();
      expect(isEntity(entity)).to.be.true;
    });

    it('should return false for undefined', () => {
      expect(isEntity(undefined)).to.be.false;
    });
  });

  describe('constructor', () => {
    it('should have a default name', () => {
      const entity = new Entity;
      expect(entity).to.have.property('name');
    });

    it('should have an id', () => {
      const entity = new Entity;
      expect(entity).to.have.property('id');
      expect(entity.id).to.be.a('number').greaterThan(0);
    });

    it('should set the name to what is passed to it', () => {
      const entity = new Entity('Test-Entity');
      expect(entity.name).to.equal('Test-Entity');
    });

    it('should have a unique id after 5 instances', () => {
      const entities: Entity[] = [];
      const ids: Set<Number> = new Set;
      for (let i = 0; i < TEST_ENTITY_COUNT; i++) {
        const entity = new Entity;
        entities.push(entity);
        ids.add(entity.id);
      }
      expect(ids.size).to.equal(TEST_ENTITY_COUNT);
    });

    it('should have a list of components', () => {
      const entity = new Entity;
      expect(entity).to.have.property('components');
    });

    it('should be added to Entity.map', () => {
      const entity = new Entity;
      expect(Entity.map.get(entity.id)).to.deep.equal(entity);
    });
  });

  describe('get', () => {
    let entity: Entity;

    beforeEach(() => {
      entity = new Entity('Test Entity');
    });

    it('should exist', () => {
      expect(Entity).to.have.property('get');
      expect(Entity.get).to.be.a('function');
    });

    it('should return an array of entities if found by name', () => {
      expect(Entity.get(entity.name)).to.include(entity);
    });

    it('should return an entity by id number', () => {
      expect(Entity.get(entity.id)).to.be.deep.equal(entity);
    });

    it('should return undefined or an empty array if entity doesn\'t exist', () => {
      expect(Entity.get(-1)).to.be.undefined;
      expect(Entity.get('')).to.be.empty;
    });
  });

  describe('print', () => {
    let consoleStub: SinonStub;

    beforeEach(() => {
      consoleStub = stub(console, 'log');
    });

    afterEach(() => {
      consoleStub.restore();
    });

    it('should exist', () => {
      expect(Entity).to.have.property('print');
      expect(Entity.print).to.be.a('function');
    });

    it('should print..', () => {
      const entity2 = new Entity('Test Entity 2');
      const entity3 = new Entity('Test Entity 3');
      Entity.print();
      expect(consoleStub.called).to.be.true;
    });
  });

  describe('prototype', () => {
    let entity: Entity;

    class TestComponent extends Component { }

    beforeEach(() => {
      entity = new Entity('Test Entity');
    });

    describe('add', () => {
      it('should exist', () => {
        expect(entity).to.have.property('add');
        expect(entity.add).to.be.a('function');
      });

      it('should add given component', () => {
        const component = entity.add(TestComponent);
        expect(entity.components.has('TestComponent')).to.be.true;
        expect(entity.components.get('TestComponent')).to.deep.equal(component);
      });

      it('should return an existing component if already on entity', () => {
        const component = entity.add(TestComponent);
        expect(entity.components.has('TestComponent')).to.be.true;
        const component2 = entity.add(TestComponent);
        expect(component2).to.deep.equal(component);
      });
    });

    describe('get', () => {
      it('should exist', () => {
        expect(entity).to.have.property('get');
        expect(entity.get).to.be.a('function');
      });

      it('should return the corresponding component', () => {
        const component = entity.add(TestComponent);

        expect(entity.components.has('TestComponent')).to.be.true;
        expect(entity.get(TestComponent)).to.deep.equal(component);
      });
    });

    describe('remove', () => {
      it('should exist', () => {
        expect(entity).to.have.property('remove');
        expect(entity.remove).to.be.a('function');
      });

      it('should remove given component from entity', () => {
        const component = entity.add(TestComponent);

        expect(entity.components.has('TestComponent')).to.be.true;
        entity.remove(TestComponent);

        expect(entity.components.has('TestComponent')).to.be.false;
        expect(entity.components.get('TestComponent')).to.be.undefined;
      });

      it('should not remove components from other entities', () => {
        const entity2 = new Entity('Extra Entity');
        const component = entity.add(TestComponent);
        const component2 = entity2.add(TestComponent);

        expect(entity.components.has('TestComponent')).to.be.true;
        expect(entity.components.get('TestComponent')).to.deep.equal(component);
        expect(entity2.components.has('TestComponent')).to.be.true;
        expect(entity2.components.get('TestComponent')).to.deep.equal(component2);
        entity.remove(TestComponent);

        expect(entity.components.has('TestComponent')).to.be.false;
        expect(entity.components.get('TestComponent')).to.be.undefined;
        expect(entity2.components.has('TestComponent')).to.be.true;
        expect(entity2.components.get('TestComponent')).to.deep.equal(component2);
      });

      it('should do nothing if component doesn\'t exist', () => {
        const component = entity.add(TestComponent);
        entity.components.delete('TestComponent');
        entity.remove(TestComponent);
        expect(() => entity.remove(TestComponent)).not.to.throw;
      });
    });

    describe('toJSON', () => {
      it('should exist', () => {
        expect(entity).to.have.property('toJSON');
        expect(entity.toJSON).to.be.a('function');
      });

      it('should return \'\' for now', () => {
        expect(entity.toJSON()).to.equal('');
      });

      xit('should return a stringified version of entity');
      xit('should throw an error if unable to serialize');
      xit('should be able to be parsed back from JSON');
      xit('needs a loader function');
    });
  });
});
