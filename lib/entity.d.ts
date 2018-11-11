import { Subject } from 'rxjs';
import { Component, ComponentType } from './component';
export declare function isEntity(e: Entity | undefined): e is Entity;
export declare class Entity {
    name: string;
    static nextId: number;
    static added$: Subject<Entity>;
    static map: Map<number, Entity>;
    id: number;
    components: Map<string, Component>;
    constructor(name?: string);
    static get(id?: string): Entity[];
    static get(id: number): Entity | undefined;
    static print(): void;
    get<T extends Component>(component: ComponentType<T>): T | undefined;
    add<T extends Component>(component: ComponentType<T>): T;
    remove<T extends Component>(component: ComponentType<T>): void;
    destroy(): void;
    toJSON(): string;
}
