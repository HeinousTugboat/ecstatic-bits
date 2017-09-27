

export interface ComponentType {
    label: string;
    list: Component[];
    new(...args: any[]): Component;
}

export abstract class Component {
    static list: { [K: string]: ComponentType } = {};
    static types: Map<ComponentType, Component[]> = new Map;
    abstract label: string;
    // abstract list: Component[];

    static Builder(label: string) {
        if (Component.list[label]) {
            return Component.list[label];
        }
        const newType = class ComponentType implements Component, ComponentType { // tslint:disable-line: no-shadowed-variable
            static label: string = label;
            static list: Component[] = [];
            label: string = label;

            constructor(public num: number) {
                ComponentType.list.push(this);
            }
            public initialize(): void { }
            public getComponentType(): string {
                return this.label;
            }
        };
        Component.list[label] = newType;
        const newList = newType.list;
        Component.types.set(newType, newList);
        return newType;
    }

    abstract initialize(): void;
    abstract getComponentType(): string;
}

const TestComponent = Component.Builder('test');
const OtherComponent = Component.Builder('other');

const tester2 = new TestComponent(2);
const tester3 = new TestComponent(1);

console.log(Component.list);
console.log(Component.types);
console.log(TestComponent.list);

tester2.initialize();
