export interface ComponentType<T extends Component> {
    label: string;
    list: Set<T>;
    new (...args: any[]): T;
}
export declare type ComponentData<T extends Component> = {
    [K in keyof T]?: T[K];
};
export declare function RegisterComponent(label: string): <T extends Component>(constructor: {
    new (...args: any[]): T;
    label: string;
    list: Set<T>;
}) => void;
export declare abstract class Component {
    eid: number;
    static types: Map<string, {
        label: string;
        new (...args: any[]): Component;
    }>;
    static list: Set<Component>;
    static label: string;
    label: string;
    static get(label: string): ComponentType<Component>;
    constructor(eid: number);
}
