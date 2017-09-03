

export interface ComponentType {
    label: string;
    list: Component[];
    new(...args: any[]): Component;
}

export abstract class Component {
    static list: { [K: string]: ComponentType } = {};
    static types: Map<ComponentType, Component[]> = new Map;
    static Builder(label: string) {
        if (Component.list[label]) {
            return Component.list[label];
        }
        let newType = class ComponentType implements Component, ComponentType{
            static label: string = label;
            static list: Component[] = [];
            list: Component[];
            label: string = label;
            constructor(public num: number) {
                // super();
                ComponentType.list.push(this);
                // super(label);
            }
            public getComponentType(): string {
                return this.label;
            }
        };
        Component.list[label] = newType;
        let newList = newType.list;
        Component.types.set(newType, newList);
        return newType;
    }
    abstract label: string;
    abstract getComponentType(): string;
    abstract list: Component[];
    // constructor() {}
}
