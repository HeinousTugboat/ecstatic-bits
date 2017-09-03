import { expect } from 'chai';
import 'mocha';
import { Component, ComponentType } from '../src/component';

describe('Component', function() {
    it('should exist', function() {
        expect(Component).to.exist;
    })
    describe('Builder', function() {
        it('should be added to Component.list', function() {
            const TestComponent = Component.Builder('test-component');
            expect(Component.list).to.have.property('test-component');
            expect(Component.list['test-component']).to.deep.equal(TestComponent);
        });
        it('should return existing type if label already exists', function() {
            const TestComponent = Component.Builder('test-component');
            expect(Component.Builder('test-component')).to.deep.equal(TestComponent);
        })
        it('should have a list of all instances of itself', function() {
            const TestComponent = Component.Builder('test-component');
            const test = new TestComponent(1);
            expect(TestComponent).to.have.property('list');
            expect(TestComponent.list[0]).to.deep.equal(test);
        });
        it('should have a map of types to arrays of instances', function() {
            const TestComponent = Component.Builder('test-component');
            const test = new TestComponent(1);
            expect(Component).to.have.property('types');
            expect(Component.types.has(TestComponent)).to.be.true;
            const list = Component.types.get(TestComponent);
            expect(list).to.exist;
            if (!list) { throw new Error('lolwat?'); }
            expect(list[0]).to.deep.equal(test);
        })
        it('should have a list of all systems it is attached to', function() {
            expect(true).to.be.false;
        });
    })
})
describe('ComponentType', function() {
    let TestComponent: ComponentType;
    beforeEach(function() {
        TestComponent = Component.Builder('test-component');
    })
    describe('instance', function() {
        let component: Component;
        beforeEach(function() {
            component = new TestComponent();
        })
        it('should have an initialize function');
        describe('constructor', function() {
            it('should generate a component instance');
            it('should throw an error if no EID is given');
            it('should throw an error if unable to locate EID given');
            it('should throw an error if component already attached to Entity');
            it('should register itself on ComponentType.list');
            it('should register itself on the EID passed');
            it('should call its own initialize function when generated');
        });
        it('should have getComponentType()', function() {
            let str = component.getComponentType();
            expect(str).to.equal('test-component');
        })
    })
})
