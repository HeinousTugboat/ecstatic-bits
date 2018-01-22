"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const component_1 = require("./component");
class Entity {
    constructor(name = 'Unnamed Entity') {
        this.name = name;
        this.components = new Map;
        this.id = Entity.id++;
        Entity.list.set(this.id, this);
    }
    static get(id) {
        if (!id) {
            return [];
        }
        if (typeof id === 'number') {
            return Entity.list.get(id);
        }
        else {
            return [...Entity.list.values()].filter((val) => val.name === id);
        }
    }
    static print() {
        console.log('Full Entity List [' + Entity.list.size + ']: ');
        [...Entity.list.values()].forEach((x) => { console.log(x); });
    }
    get(component) {
        return this.components.get(component);
    }
    add(component) {
        if (this.components.has(component)) {
            return this.get(component);
        }
        const componentType = component_1.Component.types.get(component);
        if (!componentType || componentType === undefined) {
            throw new Error('Unable to locate Component Type: ' + component);
        }
        const newComponent = new componentType(this.id);
        this.components.set(component, newComponent);
        return newComponent;
    }
    remove(component) {
        const type = component_1.Component.types.get(component);
        type.list.forEach((element, index, set) => {
            if (element.eid === this.id) {
                set.delete(element);
            }
        });
        this.components.delete(component);
    }
}
Entity.id = 1000;
Entity.list = new Map;
exports.Entity = Entity;
//# sourceMappingURL=entity.js.map