"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const entity_1 = require("./entity");
const utilities_1 = require("./utilities");
class Component {
    constructor(entityId) {
        this.entityId = entityId;
        const entity = entity_1.Entity.map.get(this.entityId);
        if (utilities_1.invalid(entity)) {
            throw new Error(`Component with invalid Entity! ${this} ${entity}`);
        }
        entity.components.set(this.constructor.name, this);
        Component.added$.next(this);
    }
    destroy() {
        const entity = entity_1.Entity.map.get(this.entityId);
        if (utilities_1.invalid(entity)) {
            throw new Error(`Component with invalid Entity! ${this} ${entity}`);
        }
        entity.components.delete(this.constructor.name);
        Component.removed$.next(this);
    }
}
Component.added$ = new rxjs_1.Subject();
Component.removed$ = new rxjs_1.Subject();
exports.Component = Component;
//# sourceMappingURL=component.js.map