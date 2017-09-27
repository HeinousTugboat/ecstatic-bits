
import { Component } from './component';

const Tester = Component.Builder('tester');
Tester.prototype.foo = () => console.log('fooo');
interface Tester extends Component {
    foo?(): void;
}
const tested: Tester = new Tester(14);

tested.foo && tested.foo();


// export interface ComponentType {
//     label: string;
//     list: Component[];
//     new(...args: any[]): Component;
// }

// export abstract class Component {
//     static list: { [K: string]: ComponentType } = {};
//     static types: Map<ComponentType, Component[]> = new Map;
//     static functions: { [K: string]: Function };
//     abstract label: string;
//     // abstract list: Component[];

//     static Builder(label: string) {
//         if (Component.list[label]) {
//             return Component.list[label];
//         }
//         const newType = class ComponentType implements Component, ComponentType { // tslint:disable-line: no-shadowed-variable
//             static label: string = label;
//             static list: Component[] = [];
//             label: string = label;

//             constructor(public num: number) {
//                 ComponentType.list.push(this);
//             }
//             public initialize(): void { }
//             public getComponentType(): string {
//                 return this.label;
//             }
//         };
//         Component.list[label] = newType;
//         const newList = newType.list;
//         Component.types.set(newType, newList);
//         return newType;
//     }

//     abstract initialize(): void;
//     abstract getComponentType(): string;
// }

// const OtherComponent = Component.Builder('other');


// console.log(Component.list);
// console.log(Component.types);

// const TestComponent = Component.Builder('test-component');

// interface TestComponent extends ComponentType {
//     test(): void;
// }

// TestComponent.prototype.test = function() { console.log('foo!'); };

// console.log(TestComponent);
// const tester1: TestComponent = new TestComponent(1);
// console.log(tester1);


// console.log(TestComponent.prototype);
// console.log(Object.getPrototypeOf(tester1));
// Object.setPrototypeOf(tester1, TestComponent);
// tester1.test();

