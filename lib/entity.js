"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const utilities_1 = require("./utilities");
function isEntity(e) {
    return !utilities_1.invalid(e) && isFinite(e.id) && e.components !== undefined;
}
exports.isEntity = isEntity;
class Entity {
    constructor(name = 'Unnamed Entity') {
        this.name = name;
        this.id = Entity.nextId++;
        this.components = new Map();
        Entity.added$.next(this);
        Entity.map.set(this.id, this);
    }
    static get(id) {
        if (!id) {
            return [];
        }
        if (typeof id === 'number') {
            return Entity.map.get(id);
        }
        else {
            return [...Entity.map.values()].filter((val) => val.name === id);
        }
    }
    static print() {
        console.log('Full Entity List [' + Entity.map.size + ']: ');
        [...Entity.map.values()].forEach(x => { console.log(x); });
    }
    get(component) {
        return this.components.get(component.name);
    }
    add(component) {
        return new component(this.id);
    }
    remove(component) {
        const componentInstance = this.components.get(component.name);
        if (!utilities_1.invalid(componentInstance)) {
            componentInstance.destroy();
        }
        this.components.delete(component.name);
    }
    toJSON() { return ''; }
}
Entity.nextId = 1;
Entity.added$ = new rxjs_1.Subject();
Entity.map = new Map();
exports.Entity = Entity;
//# sourceMappingURL=entity.js.map