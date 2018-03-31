
export interface ComponentType {
    label: string;
    list: Set<Component>;
    new(...args: any[]): Component;
}

/**
 * Component Class Decorator
 *
 * Attaches class it decorates to ComponentTypes, checks for duplicate component
 * labels, and sets component's label. Overloads the ComponentType Interface as
 * well.
 */
export function ComponentType(label: string) {
    return (constructor: ComponentType) => {
        if (Component.types.has(label)) {
            throw new Error('Attempting to register ' + label + '!');
        }
        constructor.label = label;
        constructor.list = new Set<typeof constructor.prototype>();
        constructor.prototype.label = label;
        // ComponentTypes[label] = constructor;
        Component.types.set(label, constructor);
    };
}

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
export abstract class Component {
    static types: Map<string, ComponentType> = new Map;
    static list: Set<Component>;
    static label: string;
    public label: string;
    /**
     * One of two methods for instantiating Component Types. If Component
     * already registered, will instead return its constructor. No guaranteed
     * typesafety when using this.
     */
    static Builder(label: string): ComponentType {
        if (Component.types.has(label)) {
            return Component.types.get(label) as ComponentType;
        } else {
            @ComponentType(label)
            class GenericComponent extends Component {
                static list: Set<GenericComponent> = new Set;

                constructor(public eid: number) {
                    super(eid);
                }
            }
            return GenericComponent;
        }
    }
    static get(label: string): ComponentType | undefined {
        return Component.types.get(label);
    }
    /**
     * Core Component constructor. Handles all Component creation logic after
     * decorator.
     */
    constructor(public eid: number) {
        const ctor = Object.getPrototypeOf(this).constructor;
        this.label = ctor.label;
        (<ComponentType>Component.types.get(ctor.label)).list.add(this);
        try {
            this.initialize();
        } catch (e) {
            console.error('Component Initialize errored out: ', e.message);
        }
    }

    initialize(): void {
        throw new Error('Unimplemented initialization function! ' + this.label);
    }
    getComponentType(): string {
        return this.label;
    }
}
// /**
//  * Test Component Class!
//  * Leaving this here for posterity, so we can see how we can document actual Components.
//  */
// @ComponentType('test-component')
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
