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
        return this.components.get(component.label);
    }
    add(component, data) {
        if (this.components.has(component.label)) {
            return this.get(component);
        }
        const newComponent = new component(this.id, data);
        this.components.set(component.label, newComponent);
        return newComponent;
    }
    remove(component) {
        const type = component_1.Component.types.get(component.label);
        type.list.forEach((element, index, set) => {
            if (element.eid === this.id) {
                set.delete(element);
            }
        });
        this.components.delete(component.label);
    }
}
Entity.id = 1000;
Entity.list = new Map;
exports.Entity = Entity;
//# sourceMappingURL=entity.js.map