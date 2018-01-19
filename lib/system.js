"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class System {
    constructor(label, components, active = true) {
        this.label = label;
        this.active = active;
        this.hooks = {};
        this.components = new Map;
        if (active) {
            System.active.add(this);
        }
        System.list.set(label, this);
        if (Array.isArray(components)) {
            components.forEach(x => this.components.set(x.label, x));
        }
        else {
            this.components.set(components.label, components);
        }
    }
    static update(elapsedTime) {
        this.active.forEach(system => {
            system.update(elapsedTime);
        });
    }
    static tick() {
        this.list.forEach(system => {
            system.tick();
        });
    }
    update(elapsedTime) { }
    tick() { }
    execute(command, ...args) {
        return this.hooks[command] && this.hooks[command].apply(this, args);
    }
    register(component) {
        this.components.set(component.label, component);
    }
    deregister(component) {
        this.components.delete(component.label);
    }
}
System.active = new Set;
System.list = new Map;
exports.System = System;
//# sourceMappingURL=system.js.map