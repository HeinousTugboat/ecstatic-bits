import { ComponentType } from './component';
export declare class System {
    label: string;
    private active;
    static active: Set<System>;
    static list: Map<string, System>;
    hooks: {
        [k: string]: Function;
    };
    components: Map<string, ComponentType>;
    constructor(label: string, components: ComponentType | ComponentType[], active?: boolean);
    static update(elapsedTime: number): void;
    static tick(): void;
    update(elapsedTime: number): void;
    tick(): void;
    execute(command: string, ...args: any[]): any;
    register(component: ComponentType): void;
    deregister(component: ComponentType): void;
}
