import { Component, ComponentType } from './component';
export declare type ComponentTypes<T extends Component[]> = {
    [K in keyof T]: ComponentType<T[K] extends Component ? T[K] : never>;
};
export interface SystemType<T extends System<Component[]>> {
    new (...args: any[]): T;
}
export declare class System<T extends Component[]> {
    label: string;
    components: ComponentTypes<T>;
    private active;
    static readonly debug = false;
    static list: Map<string, System<Component[]>>;
    static active: Set<System<Component[]>>;
    static frame: number;
    hooks: {
        [k: string]: Function;
    };
    protected entities: Set<T>;
    static tick(dT: number): void;
    static get<T extends System<Component[]>>(system: SystemType<T>): T | undefined;
    constructor(label: string, components: ComponentTypes<T>, active?: boolean);
    tick(dT: number): void;
    protected update(components: T, dT: number): void;
    execute(command: string, ...args: any[]): unknown;
}
