import { expect } from 'chai';
import 'mocha';
import { sandbox, SinonSpy, SinonStub } from 'sinon';

import { Component } from '../src/component';
import { Entity } from '../src/entity';
import { System } from '../src/system';

const SEC = 1000;
const RATE = 60;
const FRAME_DELAY = SEC / RATE;

describe('System', () => {
  const systemSandbox = sandbox.create();

  class TestComponent extends Component { }

  class TestComponent2 extends Component { }

  class DummyComponent extends Component { }

  type TestComponents = [TestComponent, TestComponent2];

  class TestSystem extends System<TestComponents> {
    static n = 1;
    static label = `test-system-${TestSystem.n++}`;
    tick: SinonStub;
    update: SinonStub;

    constructor(active?: boolean) {
      if (active !== undefined) {
        super([TestComponent, TestComponent2], active);
      } else {
        super([TestComponent, TestComponent2]);
      }
      this.tick = systemSandbox.stub().callsFake(dT => super.tick(dT));
      this.update = systemSandbox.stub().callsFake((entity, dT) => super.update(entity, dT));
    }
  }

  class DummySystem extends System<[DummyComponent]> {
    static label = `dummy-system-${TestSystem.n++}`;
    constructor() {
      super([DummyComponent], true);
    }
  }

  afterEach(() => systemSandbox.restore());

  it('should exist', () => {
    expect(System).to.exist;
  });

  describe('constructor', () => {
    it('should add itself to System.list', () => {
      const system = new TestSystem();
      expect(System.list.has(system.label)).to.be.true;
      expect(System.list.get(system.label)).to.equal(system);
    });

    it('should add itself to ECS.System.active by default', () => {
      const system = new TestSystem();
      expect(System.list.has(system.label)).to.be.true;
      expect(System.list.get(system.label)).to.equal(system);
      expect(System.active.has(system as System<TestComponents>)).to.be.true;
    });

    it('should add itself to ECS.System.active if passed true', () => {
      const system = new TestSystem(true);
      expect(System.list.has(system.label)).to.be.true;
      expect(System.list.get(system.label)).to.equal(system);
      expect(System.active.has(system as System<TestComponents>)).to.be.true;
    });

    it('should not add itself to ECS.System.active if passed false', () => {
      const system = new TestSystem(false);
      expect(System.list.has(system.label)).to.be.true;
      expect(System.list.get(system.label)).to.equal(system);
      expect(System.active.has(system as System<TestComponents>)).to.be.false;
    });

    it('should correctly subscribe to the component streams', () => {
      const addedObservers = Component.added$.observers.length;
      const removedObservers = Component.removed$.observers.length;

      new TestSystem();

      expect(Component.added$.observers.length - addedObservers).to.equal(1);
      expect(Component.removed$.observers.length - removedObservers).to.equal(1);
    });

    it('should correctly add an entity only after all components present', () => {
      const expectedEntities = 2;
      const system = new TestSystem();
      const entity = new Entity();
      const entity2 = new Entity();

      expect(system['entities'].size).to.equal(0);

      entity.add(TestComponent);
      entity2.add(TestComponent2);
      expect(system['entities'].size).to.equal(0);

      entity.add(TestComponent2);
      entity2.add(TestComponent);
      expect(system['entities'].size).to.equal(expectedEntities);
    });

    it('should correctly remove an entity if any component is removed', () => {
      const expectedEntities = 2;
      const system = new TestSystem();
      const entity = new Entity();
      entity.add(TestComponent);
      entity.add(TestComponent2);
      entity.add(DummyComponent);

      const entity2 = new Entity();
      entity2.add(TestComponent);
      entity2.add(TestComponent2);
      entity2.add(DummyComponent);

      expect(system['entities'].size).to.equal(expectedEntities);

      entity.remove(DummyComponent);
      entity2.remove(TestComponent2);
      expect(system['entities'].size).to.equal(1);

      entity.remove(TestComponent);
      entity2.remove(DummyComponent);
      expect(system['entities'].size).to.equal(0);
    });
  });

  describe('tick', () => {
    let testSystem: TestSystem;
    let activeSystem: TestSystem;
    let passiveSystem: TestSystem;

    beforeEach(() => {
      testSystem = new TestSystem();
      activeSystem = new TestSystem(true);
      passiveSystem = new TestSystem(false);
    });

    it('should run this.tick on every system on ECS.System.active', () => {
      System.tick(FRAME_DELAY);
      expect(testSystem.tick.calledOnce).to.be.true;
      expect(activeSystem.tick.calledOnce).to.be.true;
    });

    it('should not run this.tick on any system marked not active', () => {
      System.tick(FRAME_DELAY);
      expect(testSystem.tick.calledOnce).to.be.true;
      expect(activeSystem.tick.calledOnce).to.be.true;
      expect(passiveSystem.tick.calledOnce).to.be.false;
    });
  });

  describe('get', () => {
    it('should return an existing system if it exists', () => {
      const testSystem = new TestSystem();

      expect(System.get(TestSystem)).to.equal(testSystem);
    });

    it('should return the correct existing system if two exist', () => {
      const testSystem = new TestSystem();
      const dummySystem = new DummySystem();

      expect(System.get(TestSystem)).to.equal(testSystem);
      expect(System.get(DummySystem)).to.equal(dummySystem);
    });

    it('should return undefined and the correct existing system if one exists', () => {
      const testSystem = new TestSystem();

      expect(System.get(TestSystem)).to.equal(testSystem);
      expect(System.get(DummySystem)).to.be.undefined;
    });

    it('should return undefined it neither exists', () => {
      expect(System.get(TestSystem)).to.be.undefined;
      expect(System.get(DummySystem)).to.be.undefined;
    })
  });

  describe('prototype', () => {
    let testSystem: TestSystem;
    let activeSystem: TestSystem;
    let passiveSystem: TestSystem;

    beforeEach(() => {
      testSystem = new TestSystem();
      activeSystem = new TestSystem(true);
      passiveSystem = new TestSystem(false);
    });

    describe('tick', () => {
      it('should exist', () => {
        expect(testSystem.tick).to.exist;
        expect(activeSystem.tick).to.exist;
        expect(passiveSystem.tick).to.exist;
      });
    });

    describe('update', () => {
      it('should exist', () => {
        expect(testSystem['update']).to.exist;
        expect(activeSystem['update']).to.exist;
        expect(passiveSystem['update']).to.exist;
      });

      it('should not be called if system has no entities', () => {
        System.tick(FRAME_DELAY);

        expect(testSystem['update'].callCount).to.equal(0);
      });

      it('should be called once per entity', () => {
        const entities = [
          new Entity(),
          new Entity(),
          new Entity()
        ];

        entities.forEach(entity => {
          entity.add(TestComponent);
          entity.add(TestComponent2);
        });

        System.tick(FRAME_DELAY);

        expect(testSystem['entities'].size).to.equal(entities.length);
        expect(testSystem['tick'].callCount).to.equal(1);
        expect(testSystem['update'].callCount).to.equal(entities.length);
      });

      it('should be passed each entity\'s matching components', () => {
        const entities = [
          new Entity(),
          new Entity(),
          new Entity()
        ];

        entities.map(entity => [entity.add(TestComponent), entity.add(TestComponent2)]);
        System.tick(FRAME_DELAY);

        entities.forEach((entity, i) => expect(testSystem['update'].getCall(i).calledWithExactly(entity, FRAME_DELAY)));
      });

      it('should call System.prototype.update if none given', () => {
        systemSandbox.spy<any>(System.prototype, 'update');
        const dummySystem = new DummySystem();
        const entity = new Entity();
        entity.add(DummyComponent);

        System.tick(FRAME_DELAY);

        expect((System.prototype['update'] as SinonSpy).callCount).to.equal(1);
      });

      context('when System.debug is true', () => {
        it('should print out a debug message', () => {
          systemSandbox.stub(console, 'log');
          const dummySystem = new DummySystem();
          const entity = new Entity();
          entity.add(DummyComponent);
          (<any>System).debug = true;

          System.tick(FRAME_DELAY);

          expect((console.log as SinonStub).callCount).to.equal(1);
          (console.log as SinonStub).restore();
        });
      });
    });

    describe('execute', () => {
      const testFunc = systemSandbox.stub();

      beforeEach(() => {
        testSystem.hooks = {
          TEST: testFunc
        };
      });

      it('should exist', () => {
        expect(testSystem.execute).to.exist;
        expect(activeSystem.execute).to.exist;
        expect(passiveSystem.execute).to.exist;
      });

      it('should call the correct command', () => {
        testSystem.execute('TEST');
        expect(testFunc.called).to.be.true;
      });

      it('should call the command with any additional arguments', () => {
        const testArg = 'test-arg-1';
        const testNum = 13;
        testSystem.execute('TEST', testArg, testNum);
        expect(testFunc.called).to.be.true;
        expect(testFunc.calledWithExactly(testArg, testNum));
      });
    });
  });
});
