import { expect } from 'chai';
import 'mocha';
import { stub } from 'sinon';

import { Component } from '../src/component';
import { Entity } from '../src/entity';

describe('Component', () => {
  class TestComponent extends Component { }

  it('should exist', () => {
    expect(Component).to.exist;
    expect(Component.added$).to.exist;
    expect(Component.removed$).to.exist;
  });

  describe('constructor', () => {
    it('should add itself to entity passed in', () => {
      const entity = new Entity();
      const component = new TestComponent(entity.id);

      expect(component).to.exist;
      expect(component.entityId).to.equal(entity.id);
      expect(entity.components.has('TestComponent')).to.be.true;
      expect(entity.components.get('TestComponent')).to.equal(component);
    });

    it('should throw an error if bad entity passed in', () => {
      expect(() => new TestComponent(-1)).to.throw(Error);
    });
  });

  describe('prototype', () => {
    describe('destroy', () => {
      it('should remove Component from Entity', () => {
        const entity = new Entity();
        const component = new TestComponent(entity.id);

        expect(entity.components.has('TestComponent')).to.be.true;
        expect(entity.components.get('TestComponent')).to.equal(component);
        component.destroy();

        expect(entity.components.has('TestComponent')).to.be.false;
        expect(entity.components.get('TestComponent')).not.to.exist;
      });

      it('should throw an error if bad Entity', () => {
        const entity = new Entity();
        const component = new TestComponent(entity.id);

        Entity.map.delete(entity.id);
        expect(() => component.destroy()).to.throw(Error);
      });
    });
  });

  describe('added$', () => {
    it('should pass Component to all subscribers when added', () => {
      const entity = new Entity();
      const rxStub = stub();

      Component.added$.subscribe(rxStub);
      const component = new TestComponent(entity.id);

      expect(rxStub.calledOnce).to.be.true;
      expect(rxStub.calledWithExactly(component)).to.be.true;
    });
  });

  describe('removed$', () => {
    it('should pass Component to all subscribers when destroyed', () => {
      const entity = new Entity();
      const rxStub = stub();

      Component.removed$.subscribe(rxStub);
      const component = new TestComponent(entity.id);
      component.destroy();

      expect(rxStub.calledOnce).to.be.true;
      expect(rxStub.calledWithExactly(component)).to.be.true;
    });
  });
});
