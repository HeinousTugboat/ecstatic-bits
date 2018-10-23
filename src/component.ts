import { Subject } from 'rxjs';
import { Entity } from './entity';
import { invalid } from './utilities';


export type ComponentType<T extends Component> = new (id: number) => T;


export class Component {
    static added$ = new Subject<Component>();
    static removed$ = new Subject<Component>();

    constructor(public readonly entityId: number) {
      const entity = Entity.map.get(this.entityId);
      if (invalid(entity)) {
        throw new Error(`Component with invalid Entity! ${this} ${entity}`);
      }

      entity.components.set(this.constructor.name, this);
      Component.added$.next(this);
    }

    destroy() {
      const entity = Entity.map.get(this.entityId);
      if (invalid(entity)) {
        throw new Error(`Component with invalid Entity! ${this} ${entity}`);
      }
      entity.components.delete(this.constructor.name);
      Component.removed$.next(this);
    }
  }


// export interface ComponentType<T extends Component> {
//     label: string;
//     list: Set<T>;
//     new(...args: any[]): T;
// }

// export type ComponentData<T extends Component> = {
//     [K in keyof T]?: T[K];
// };

/**
 * Component Class Decorator
 *
 * Attaches class it decorates to ComponentTypes, checks for duplicate component
 * labels, and sets component's label. Overloads the ComponentType Interface as
 * well.
 */
// export function RegisterComponent(label: string) {
//     return <T extends Component>(constructor: {label: string; list: Set<T>; new(...args: any[]): T}) => {
//         if (Component.types.has(label)) {
//             throw new Error('Attempting to register ' + label + '!');
//         }
//         constructor.label = label;
//         constructor.list = new Set<typeof constructor.prototype>();
//         constructor.prototype.label = label;
//         // ComponentTypes[label] = constructor;
//         Component.types.set(label, constructor);
//     };
// }

/*
 * Register of all component types registered.
 *
 * NB: Should only be added to by @ComponentType()!!
 */
// export const ComponentTypes: { [K: string]: ComponentType } = {};

/**
 * Core Component class. Is Abstract by itself. Can either be instantiated using
 * Component.Builder or by using @ComponentType and extending it. Designed so
 * that components can be loaded dynamically via JSON.
 *
 * NB: Type safety will be lost with Builder. Prefer using extension for complex
 * components.
 */
// export abstract class Component {
//     static types: Map<string, {label: string; new(...args: any[]): Component}> = new Map;
//     static list: Set<Component>;
//     static label: string;
//     public label: string;

//     static get(label: string): ComponentType<Component> {
//         return Component.types.get(label) as ComponentType<Component>;
//     }
//     /**
//      * Core Component constructor. Handles all Component creation logic after
//      * decorator.
//      */
//     constructor(public eid: number) {
//         const ctor = Object.getPrototypeOf(this).constructor;
//         this.label = ctor.label;
//         (<ComponentType<Component>>Component.types.get(ctor.label)).list.add(this);
//     }

// }
// /**
//  * Test Component Class!
//  * Leaving this here for posterity, so we can see how we can document actual Components.
//  */
// @RegisterComponent('test-component')
// class TestComponent extends Component {
//     /**
//      * Component Constructor, whoa!
//      */
//     constructor(eid: number) {
//         super(eid);
//     }
//     /**
//      * Testing function with documentation? What?
//      */
//     test() {
//         console.log('test-component-test');
//     }
// }
