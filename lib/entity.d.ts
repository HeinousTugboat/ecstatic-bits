import { Component } from './component';
export declare class Entity {
    name: string;
    static id: number;
    static list: Map<number, Entity>;
    id: number;
    components: Map<string, Component>;
    constructor(name?: string);
    static get(id: string | number): Entity | undefined | Entity[];
    static print(): void;
    get(component: string): Component | undefined;
    add(component: string): Component | undefined;
    remove(component: string): void;
}
