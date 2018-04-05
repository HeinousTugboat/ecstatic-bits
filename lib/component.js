"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function RegisterComponent(label) {
    return (constructor) => {
        if (Component.types.has(label)) {
            throw new Error('Attempting to register ' + label + '!');
        }
        constructor.label = label;
        constructor.list = new Set();
        constructor.prototype.label = label;
        Component.types.set(label, constructor);
    };
}
exports.RegisterComponent = RegisterComponent;
class Component {
    constructor(eid) {
        this.eid = eid;
        const ctor = Object.getPrototypeOf(this).constructor;
        this.label = ctor.label;
        Component.types.get(ctor.label).list.add(this);
    }
    static get(label) {
        return Component.types.get(label);
    }
}
Component.types = new Map;
exports.Component = Component;
//# sourceMappingURL=component.js.map