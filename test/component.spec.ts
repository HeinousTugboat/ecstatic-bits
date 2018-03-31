import { expect } from 'chai';
import 'mocha';
import { resetECS } from './ecstatic-bits.spec';
import { Component, ComponentType } from '../src/component';

describe('Component', function() {
    resetECS();
    afterEach(resetECS);
    it('should exist', function() {
        expect(Component).to.exist;
    });
    describe('get', function() {
        it ('should be identical to Component.types.get', function() {
            @ComponentType('get-test-component')
            class GetTestComponent extends Component {
                // constructor(public eid: number) {
                //     super(eid);
                // }
            }
            expect(Component.get('get-test-component')).to.deep.equal(Component.types.get('get-test-component'));
        });
    });
    describe('Builder', function() {
        let BuiltTestComponent: ComponentType;
        beforeEach(function() {
            BuiltTestComponent = Component.Builder('built-test-component');
            BuiltTestComponent.prototype.initialize = () => {};
        });
        it('should be added to ComponentTypes', function() {
            expect(Component.types.get('built-test-component')).to.not.be.undefined;
            expect(Component.types.get('built-test-component')).to.deep.equal(BuiltTestComponent);
        });
        it('should return existing type if label already exists', function() {
            expect(Component.Builder('built-test-component')).to.deep.equal(BuiltTestComponent);
        });
        it('should have a list of all instances of itself', function() {
            const test = new BuiltTestComponent(1);
            expect(BuiltTestComponent).to.have.property('list');
            expect(BuiltTestComponent.list.has(test)).to.be.true;
        });
        it('should have a map of types to arrays of instances', function() {
            const test = new BuiltTestComponent(1);
            expect(Component).to.have.property('types');
            expect(Component.types.has(BuiltTestComponent.label)).to.be.true;
            const component = Component.types.get(BuiltTestComponent.label);
            expect(component).to.exist;
            if (!component || !component.list) { throw new Error('lolwat?'); }
            expect(component.list.has(test)).to.be.true;
        });
        it('should have getComponentType()', function() {
            const test = new BuiltTestComponent(1);
            const str = test.getComponentType();
            expect(str).to.equal('built-test-component');
        });
    });
    describe('Class', function() {
        @ComponentType('class-test-component')
        class ClassTestComponent extends Component {
            // constructor(public eid: number) {
            //     super(eid);
            // }
        }
        beforeEach(function() {
            ComponentType('class-test-component')(ClassTestComponent);
        });

        it('should be added to Component.list', function() {
            expect(Component.types.has('class-test-component')).to.be.true;
            expect(Component.types.get('class-test-component')).to.deep.equal(ClassTestComponent.prototype.constructor);
        });
        it('should warn if using default initialize implementation', function() {
            const component = new ClassTestComponent(3);
            expect(function() {
                component.initialize();
            }).to.throw();
        });
    });
});
describe('ComponentType', function() {
    @ComponentType('type-test-component')
    class TypeTestComponent extends Component {
        // constructor(public eid: number) {
        //     super(eid);
        // }
        initialize() {}
    }
    beforeEach(function() {
        ComponentType('type-test-component')(TypeTestComponent);
        // TODO: set up Sinon sandbox for ComponentType?
    });
    afterEach(resetECS);
    describe('instance', function() {
        // let component: Component;
        it('should have an initialize function', function() {
            const component = new TypeTestComponent(1);
            expect(component.initialize).to.exist;
            expect(component.initialize).to.be.a('Function');
        });
        it('should have getComponentType()', function() {
            const component = new TypeTestComponent(1);
            const str = component.getComponentType();
            expect(str).to.equal('type-test-component');
        });
        describe('constructor', function() {
            let component: TypeTestComponent;
            beforeEach(function() {
                component = new TypeTestComponent(1);
            });
            it('should generate a component instance', function() {
                expect(component).to.be.instanceof(TypeTestComponent);
            });
            it('should register itself on ComponentType.list', function() {
                expect(TypeTestComponent.list).to.include(component);
            });
            it('should throw an error if duplicate component found', function() {
                expect(function() {
                    @ComponentType('type-test-component')
                    class TestComponentNew extends Component {
                        constructor(eid: number) {
                            super(eid);
                        }
                    }
                }).to.throw();
            });
            // it('should call its own initialize function when generated', function() {
            //     // TODO: set up Sinon to stub out initialize..
            //     expect(true).to.be.false;
            // });
        });
    });
});
