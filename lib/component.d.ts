export interface ComponentType {
    label: string;
    list: Set<Component>;
    new (...args: any[]): Component;
}
export declare function ComponentType(label: string): (constructor: ComponentType) => void;
export declare abstract class Component {
    eid: number;
    static types: Map<string, ComponentType>;
    static list: Set<Component>;
    static label: string;
    label: string;
    static Builder(label: string): ComponentType;
    static get(label: string): ComponentType | undefined;
    constructor(eid: number);
    initialize(): void;
    getComponentType(): string;
}
