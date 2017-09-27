import { Component } from './component';

/**
 * Basic Entity. It's just a number.
 */

interface ComponentMap {
    [key: string]: Component;
}

export class Entity {
    static id = 0;
    static list: Map<number, Entity> = new Map;
    id: number;
    components: ComponentMap = {};

    constructor(public name: string = 'Unnamed Entity') {
        this.id = Entity.id++;
        Entity.list.set(this.id, this);

    }
    static find() { }
    add() { }
    remove() { }
    toJSON() { }
}
