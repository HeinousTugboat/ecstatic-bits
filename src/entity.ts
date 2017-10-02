import { Component, ComponentType } from './component';

/**
 * Basic Entity. It's just a number.
 */

export class Entity {
    static id = 1000;
    static list: Map<number, Entity> = new Map;
    id: number;
    components: Map<string, Component> = new Map;

    constructor(public name: string = 'Unnamed Entity') {
        this.id = Entity.id++;
        Entity.list.set(this.id, this);

    }
    static get(id: string | number): Entity | undefined | Entity[] {
        if (typeof id === 'number') {
            return Entity.list.get(id);
        } else {
            return [...Entity.list.values()].filter((val: Entity) => val.name === id);
        }
    }
    static print(): void {
        console.log('Full Entity List [' + Entity.list.size + ']: ');
        [...Entity.list.values()].forEach((x) => { console.log(x); });
    }
    get(component: string): Component | undefined {
        return this.components.get(component);
    }
    add(component: string): Component | undefined {
        if (this.components.has(component)) {
            return this.get(component);
        }
        const componentType = Component.types.get(component);
        if (!componentType || componentType === undefined) {
            throw new Error('Unable to locate Component Type: ' + component);
        }
        const newComponent = new componentType(this.id);
        this.components.set(component, newComponent);
        return newComponent;
    }
    remove(component: string): void {
        const type = Component.types.get(component);
        (<ComponentType>type).list.forEach((element, index, set) => {
            if (element.eid === this.id) {
                set.delete(element);
            }
        });
        this.components.delete(component);
    }
    // toJSON(): {[key: string]: any} { }
}
