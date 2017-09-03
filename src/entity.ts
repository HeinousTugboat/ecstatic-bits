import { Component } from './component';

/**
 * Basic Entity. It's just a number.
 */

interface ComponentMap {
    [key: string]: Component;
}

export class Entity {
    static id: number = 0;
    static list: Map<number, Entity> = new Map;
    static find() { }

    id: number;
    components: ComponentMap = {};
    constructor(public name: string = 'Unnamed Entity') {
        this.id = Entity.id++;
        Entity.list.set(this.id, this);
    }
    add() { }
    remove() { }
    toJSON() { }
}
