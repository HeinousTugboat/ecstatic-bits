import { Component, ComponentData } from './component';
export declare class Entity {
    name: string;
    static id: number;
    static list: Map<number, Entity>;
    id: number;
    components: Map<string, Component>;
    constructor(name?: string);
    static get(id?: string): Entity[];
    static get(id: number): Entity | undefined;
    static print(): void;
    get<T extends Component>(component: {
        label: string;
        new (...args: any[]): T;
    }): T;
    add<T extends Component>(component: {
        label: string;
        new (...args: any[]): T;
    }, data?: ComponentData<T>): T;
    remove<T extends Component>(component: {
        label: string;
        new (...args: any[]): T;
    }): void;
}
