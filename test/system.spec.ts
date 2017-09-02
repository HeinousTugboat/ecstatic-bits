import { expect } from 'chai';
import 'mocha';
import {System} from '../src/system';

describe('System', function() {
    it('should exist', function() {
        expect(System).to.exist;
    })
    describe('constructor', function() {
        it('should throw an error without any arguments');
        it('should throw an error with only a label');
        it('should throw an error if passed generic component');
        it('should work fine with array of component types');
        it('should throw an error if passed a component instance within array');
        it('should add itself to ECS.System.list');
        it('should add itself to ECS.System.active by default');
        it('should add itself to ECS.System.active if passed true');
        it('should not add itself to ECS.System.active if passed false');
        it('should have a list of all components it checks');
    });
    describe('update', function() {
        it('should run this.update on every system on ECS.System.list');
        it('should not run this.update on any system marked not active');
    });
    describe('tick', function() {
        it('should run this.tick on every system on ECS.System.list');
        it('should not run this.tick on any system marked not active');
    });
    describe('prototype', function() {
        describe('update', function() {
            it('should exist');
            it('should update when update function called');
        });
        describe('registerComponent', function() {
            it('should exist');
            it('should throw an error if no component given');
            it('should throw an error if component is already registered');
            it('should throw an error if component invalid');
            it('should throw an error if component instance');
            it('should add given component to this system\'s components array');
        });
        describe('deregisterComponent', function() {
            it('should exist');
            it('should throw an error if no component given');
            it('should throw an error if component is not found');
            it('should remove given component from this system');
        });
    });
})
