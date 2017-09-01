

export interface ComponentType {
    label: string;
    new(...args: any[]): Component;
}

export abstract class Component {
    static list: { [K: string]: ComponentType } = {};
    static types: Map<ComponentType, Component[]> = new Map;
    static Builder(label: string) {
        Component.list[label] = class ComponentType extends Component {
            static label: string = label;
            label: string = label;
            constructor(public num: number) {
                super();
                // super(label);
            }
            public getComponentType(): string {
                return this.label;
            }
        };
        Component.types.set(Component.list[label], []);
        return Component.list[label];
    }
    abstract label: string;
    abstract getComponentType(): string;
    // constructor() {}
}
