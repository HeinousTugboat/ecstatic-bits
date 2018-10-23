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
    // describe('get', function() {
    //     it ('should be identical to Component.types.get', function() {
    //         class GetTestComponent extends Component {
    //         }
    //         expect(Component.get('get-test-component')).to.deep.equal(Component.types.get('get-test-component'));
    //     });
    // });
    describe('Class', function() {
        // @RegisterComponent('class-test-component')
        class ClassTestComponent extends Component {
            // constructor(public eid: number) {
            //     super(eid);
            // }
        }
        // beforeEach(function() {
        //     RegisterComponent('class-test-component')(ClassTestComponent);
        // });

        // it('should be added to Component.list', function() {
        //     expect(Component.types.has('class-test-component')).to.be.true;
        //     expect(Component.types.get('class-test-component')).to.deep.equal(ClassTestComponent.prototype.constructor);
        // });
        xit('should warn if using default initialize implementation', function() {
            const component = new ClassTestComponent(3);
            expect(function() {
                // component.initialize();
            }).to.throw();
        });
    });
});
// describe('RegisterComponent', function() {
//     @RegisterComponent('type-test-component')
//     class TypeTestComponent extends Component {
//     }
//     beforeEach(function() {
//         RegisterComponent('type-test-component')(TypeTestComponent);
//         // TODO: set up Sinon sandbox for ComponentType?
//     });
//     afterEach(resetECS);
//     describe('instance', function() {
//         // let component: Component;
//         xit('should have an initialize function', function() {
//             const component = new TypeTestComponent(1);
//             // expect(component.initialize).to.exist;
//             // expect(component.initialize).to.be.a('Function');
//         });
//         xit('should have getComponentType()', function() {
//             const component = new TypeTestComponent(1);
//             // const str = component.getComponentType();
//             // expect(str).to.equal('type-test-component');
//         });
//         describe('constructor', function() {
//             let component: TypeTestComponent;
//             beforeEach(function() {
//                 component = new TypeTestComponent(1);
//             });
//             it('should generate a component instance', function() {
//                 expect(component).to.be.instanceof(TypeTestComponent);
//             });
//             it('should register itself on ComponentType.list', function() {
//                 expect(TypeTestComponent.list).to.include(component);
//             });
//             it('should throw an error if duplicate component found', function() {
//                 expect(function() {
//                     @RegisterComponent('type-test-component')
//                     class TestComponentNew extends Component {
//                         constructor(eid: number) {
//                             super(eid);
//                         }
//                     }
//                 }).to.throw();
//             });
//             // it('should call its own initialize function when generated', function() {
//             //     // TODO: set up Sinon to stub out initialize..
//             //     expect(true).to.be.false;
//             // });
//         });
//     });
// });
