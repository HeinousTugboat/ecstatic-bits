import { Component, ComponentType } from './component';

export class System /* implements ISystem */ {
    static active: Set<System> = new Set;
    static list: Map<string, System> = new Map;
    public hooks: { [k: string]: Function } = {};
    public components: Map<string, ComponentType<any>> = new Map;

    constructor(public label: string,
        components: ComponentType<any> | ComponentType<any>[],
        private active: boolean = true) {
        if (active) {
            System.active.add(this);
        }
        System.list.set(label, this);
        if (Array.isArray(components)) {
            components.forEach(x => this.components.set(x.label, x));
        } else {
            this.components.set(components.label, components);
        }
    }
    static update(elapsedTime: number): void {
        this.active.forEach(system => {
            system.update(elapsedTime);
        });
    }
    static tick(): void {
        this.list.forEach(system => {
            system.tick();
        });
    }
    update(elapsedTime: number): void { }
    tick(): void { }

    execute(command: string, ...args: any[]) {
        return this.hooks[command] && this.hooks[command].apply(this, args);
    }
    register(component: ComponentType<any>) {
        this.components.set(component.label, component);
    }
    deregister(component: ComponentType<any>) {
        this.components.delete(component.label);
    }
}

// interface TestSystem extends System {
//     test?: Function;
// }
// const test: TestSystem = new System('test', []);
// test.test = () => console.log(test);
// test.test();
