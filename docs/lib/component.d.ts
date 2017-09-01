export interface ComponentType {
    label: string;
    new (...args: any[]): Component;
}
export declare abstract class Component {
    static list: {
        [K: string]: ComponentType;
    };
    static types: Map<ComponentType, Component[]>;
    static Builder(label: string): ComponentType;
    abstract label: string;
    abstract getComponentType(): string;
}
