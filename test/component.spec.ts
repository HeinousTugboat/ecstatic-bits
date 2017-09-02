import { expect } from 'chai';
import 'mocha';
import { Component, ComponentType } from '../src/component';

describe('Component', function() {
    it('should exist', function() {
        expect(Component).to.exist;
    })
})
describe('ComponentType', function() {
    let TestComponent: ComponentType;
    beforeEach(function() {
        TestComponent = Component.Builder('test-component');
    })
    describe('constructor', function() {
        it('should throw an error without a label');
        it('should be added to ECS.Component.list');
        it('should throw an error if label already exists');
        it('should have a list of all instances of itself');
        it('should have a list of all systems it is attached to');
    });
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
