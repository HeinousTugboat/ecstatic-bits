import { expect } from 'chai';
import 'mocha';
import * as sinon from 'sinon';
import { resetECS } from './ecstatic-bits.spec';
import { System } from '../src/system';
import { Component, ComponentType, RegisterComponent } from '../src/component';

describe('System', function () {
    resetECS();
    // let sandbox: sinon.SinonSandbox;

    // console.log(Component.types);
    @RegisterComponent('test-component')
    class TestComponent extends Component {
        // constructor(public eid: number) {
        //     super(eid);
        // }
        initialize() { }
    }

    @RegisterComponent('test-component-2')
    class TestComponent2 extends Component {
        // constructor(public eid: number) {
        //     super(eid);
        // }
        initialize() { }
    }
    beforeEach(function () {
        RegisterComponent('test-component')(TestComponent);
        RegisterComponent('test-component-2')(TestComponent2);
    });

    afterEach(function () {
        // sandbox.restore();
        resetECS();
    });

    it('should exist', function () {
        expect(System).to.exist;
    });

    describe('constructor', function () {
        it('should add itself to System.list', function () {
            const system = new System('test-system', TestComponent);
            expect(System.list.has('test-system')).to.be.true;
            expect(System.list.get('test-system')).to.deep.equal(system);
        });
        it('should add itself to ECS.System.active by default', function () {
            const system = new System('test-system', TestComponent);
            expect(System.list.has('test-system')).to.be.true;
            expect(System.list.get('test-system')).to.deep.equal(system);
            expect(System.active.has(system)).to.be.true;
        });
        it('should add itself to ECS.System.active if passed true', function () {
            const system = new System('test-system', TestComponent, true);
            expect(System.list.has('test-system')).to.be.true;
            expect(System.list.get('test-system')).to.deep.equal(system);
            expect(System.active.has(system)).to.be.true;
        });
        it('should not add itself to ECS.System.active if passed false', function () {
            const system = new System('test-system', TestComponent, false);
            expect(System.list.has('test-system')).to.be.true;
            expect(System.list.get('test-system')).to.deep.equal(system);
            expect(System.active.has(system)).to.be.false;
        });
        it('should work fine with array of component types', function () {
            const system = new System('test-system', [TestComponent, TestComponent2]);
            expect(system.components.has('test-component')).to.be.true;
            expect(system.components.has('test-component-2')).to.be.true;
            expect(system.components.get('test-component')).to.deep.equal(TestComponent);
            expect(system.components.get('test-component-2')).to.deep.equal(TestComponent2);
        });
    });
    describe('update', function () {
        let sandbox: sinon.SinonSandbox;
        let systems: System[] = [];
        let spies: sinon.SinonSpy[] = [];
        beforeEach(function () {
            systems = [];
            spies = [];
            sandbox = sinon.sandbox.create();
            systems.push(new System('test-system', [TestComponent, TestComponent2]));
            systems.push(new System('test-system-2', [TestComponent, TestComponent2]));
            systems.push(new System('test-system-3', [TestComponent, TestComponent2], false));
            spies.push(sinon.spy(systems[0], 'update'));
            spies.push(sinon.spy(systems[1], 'update'));
            spies.push(sinon.spy(systems[2], 'update'));
        });
        afterEach(function () {
            sandbox.restore();
        });
        it('should run this.update on every system on ECS.System.list', function () {
            System.update(1000 / 60);
            expect(spies[0].called).to.be.true;
            expect(spies[1].called).to.be.true;
        });
        it('should not run this.update on any system marked not active', function () {
            System.update(1000 / 60);
            expect(spies[0].called).to.be.true;
            expect(spies[1].called).to.be.true;
            expect(spies[2].called).to.be.false;
        });
    });
    describe('tick', function () {
        let sandbox: sinon.SinonSandbox;
        let systems: System[] = [];
        let spies: sinon.SinonSpy[] = [];
        beforeEach(function () {
            systems = [];
            spies = [];
            sandbox = sinon.sandbox.create();
            systems.push(new System('test-system', [TestComponent, TestComponent2]));
            systems.push(new System('test-system-2', [TestComponent, TestComponent2]));
            systems.push(new System('test-system-3', [TestComponent, TestComponent2], false));
            spies.push(sinon.spy(systems[0], 'tick'));
            spies.push(sinon.spy(systems[1], 'tick'));
            spies.push(sinon.spy(systems[2], 'tick'));
        });
        afterEach(function () {
            sandbox.restore();
        });
        it('should run this.tick on every system on ECS.System.list', function () {
            System.tick();
            expect(spies[0].called).to.be.true;
            expect(spies[1].called).to.be.true;
        });
        it('should not run this.tick on any system marked not active', function () {
            System.tick();
            expect(spies[0].called).to.be.true;
            expect(spies[1].called).to.be.true;
            expect(spies[2].called).to.be.true;
        });

    });
    describe('prototype', function () {
        let testSystem: System;
        let activeSystem: System;
        let passiveSystem: System;
        beforeEach(function () {
            testSystem = new System('test-system', [TestComponent, TestComponent2]);
            activeSystem = new System('test-system', [TestComponent, TestComponent2], true);
            passiveSystem = new System('test-system', [TestComponent, TestComponent2], false);
        });
        describe('update', function () {
            it('should exist', function () {
                expect(testSystem.update).to.exist;
                expect(activeSystem.update).to.exist;
                expect(passiveSystem.update).to.exist;
            });
        });
        describe('tick', function () {
            it('should exist', function () {
                expect(testSystem.tick).to.exist;
                expect(activeSystem.tick).to.exist;
                expect(passiveSystem.tick).to.exist;
            });
        });
        describe('execute', function () {
            const testFunc = sinon.spy();
            beforeEach(function () {
                testSystem.hooks = {
                    TEST: testFunc
                };
            });
            it('should exist', function() {
                expect(testSystem.execute).to.exist;
                expect(activeSystem.execute).to.exist;
                expect(passiveSystem.execute).to.exist;
            });
            it('should call the correct command', function() {
                testSystem.execute('TEST');
                expect(testFunc.called).to.be.true;
            });
            it('should call the command with any additional arguments', function() {
                const testArg = 'test-arg-1';
                const testNum = 13;
                testSystem.execute('TEST', testArg, testNum);
                expect(testFunc.called).to.be.true;
                expect(testFunc.calledWithExactly(testArg, testNum));

            });
        });
        describe('register', function () {
            it('should exist', function() {
                expect(testSystem.register).to.exist;
                expect(testSystem.register).to.be.a('Function');
            });
            it('should add given component to this system\'s components map', function() {
                // const RegisteredComponent = Component.Builder('register-component');
                @RegisterComponent('register-component')
                class RegisteredComponent extends Component { }
                expect(testSystem.components.has('register-component')).to.be.false;
                testSystem.register(RegisteredComponent);
                expect(testSystem.components.has('register-component')).to.be.true;
            });
        });
        describe('deregister', function () {
            it('should exist', function() {
                expect(testSystem.deregister).to.exist;
                expect(testSystem.deregister).to.be.a('Function');
            });
            it('should remove given component from this system', function() {
                // const RegisterComponent = Component.Builder('register-component');
                @RegisterComponent('deregister-component')
                class DeregisteredComponent extends Component { }
                testSystem.register(DeregisteredComponent);
                expect(testSystem.components.has('deregister-component')).to.be.true;
                testSystem.deregister(DeregisteredComponent);
                expect(testSystem.components.has('deregister-component')).to.be.false;
            });
        });
    });
});
