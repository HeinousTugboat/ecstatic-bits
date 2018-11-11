"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const operators_1 = require("rxjs/operators");
const component_1 = require("./component");
const entity_1 = require("./entity");
let enComponents;
const FRAME_LENGTH = 10;
const FRAME_PAD = 2;
class System {
    constructor(label, components, active = true) {
        this.label = label;
        this.components = components;
        this.active = active;
        this.hooks = {};
        this.entities = new Set();
        System.list.set(label, this);
        if (active) {
            System.active.add(this);
        }
        component_1.Component.added$.pipe(operators_1.filter(component => components.some(componentType => component instanceof componentType)), operators_1.map(component => entity_1.Entity.map.get(component.entityId)), operators_1.filter(entity_1.isEntity), operators_1.filter(entity => {
            enComponents = [...entity.components.keys()];
            return components
                .map(systemComponent => systemComponent.name)
                .every(systemComponent => enComponents.includes(systemComponent));
        }), operators_1.map((entity) => {
            return components.map(componentType => entity.get(componentType));
        })).subscribe(componentArr => this.entities.add(componentArr));
        component_1.Component.removed$.pipe(operators_1.filter(component => components.some(componentType => component instanceof componentType)), operators_1.map(component => entity_1.Entity.map.get(component.entityId)), operators_1.filter(entity_1.isEntity), operators_1.map((entity) => {
            return [...this.entities.values()]
                .filter(entityComponents => entityComponents.every(component => component.entityId === entity.id));
        })).subscribe(([entity]) => {
            this.entities.delete(entity);
            this.removed(entity);
        });
    }
    static tick(dT) {
        System.active.forEach(system => system.tick(dT));
        System.frame++;
    }
    static get(system) {
        return System.list.get(system.prototype.label);
    }
    tick(dT) {
        this.entities.forEach(components => {
            this.update(components, dT);
        });
    }
    update(components, dT) {
        if (System.debug) {
            console.log(`[${System.frame.toString(FRAME_LENGTH).padStart(FRAME_PAD)}] ${this.label}: ${components} `, dT);
        }
    }
    removed(components) { }
    execute(command, ...args) {
        return this.hooks[command] && this.hooks[command].apply(this, args);
    }
}
System.debug = false;
System.list = new Map;
System.active = new Set;
System.frame = 1;
exports.System = System;
//# sourceMappingURL=system.js.map