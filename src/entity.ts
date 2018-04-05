import { Component, ComponentType, ComponentData } from './component';

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
    static get(id?: string): Entity[];
    static get(id: number): Entity | undefined;
    static get(id: string | number | undefined): Entity | undefined | Entity[] {
        if (!id) { return []; }
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
    get<T extends Component>(component: {label: string; new(...args: any[]): T}): T {
        return this.components.get(component.label) as T;
    }
    add<T extends Component>(component: {label: string; new(...args: any[]): T}, data?: ComponentData<T>): T {
        if (this.components.has(component.label)) {
            return this.get(component);
        }

        const newComponent = new component(this.id, data);
        this.components.set(component.label, newComponent);
        return newComponent;
    }
    remove<T extends Component>(component: {label: string; new(...args: any[]): T}): void {
        const type = Component.types.get(component.label);
        (<ComponentType<T>>type).list.forEach((element, index, set) => {
            if (element.eid === this.id) {
                set.delete(element);
            }
        });
        this.components.delete(component.label);
    }
    // toJSON(): {[key: string]: any} { }
}
