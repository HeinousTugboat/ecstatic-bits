"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
function ComponentType(label) {
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
exports.ComponentType = ComponentType;
class Component {
    constructor(eid) {
        this.eid = eid;
        const ctor = Object.getPrototypeOf(this).constructor;
        this.label = ctor.label;
        Component.types.get(ctor.label).list.add(this);
        try {
            this.initialize();
        }
        catch (e) {
            console.error('Component Initialize errored out: ', e.message);
        }
    }
    static Builder(label) {
        if (Component.types.has(label)) {
            return Component.types.get(label);
        }
        else {
            let GenericComponent = class GenericComponent extends Component {
                constructor(eid) {
                    super(eid);
                    this.eid = eid;
                }
            };
            GenericComponent.list = new Set;
            GenericComponent = __decorate([
                ComponentType(label),
                __metadata("design:paramtypes", [Number])
            ], GenericComponent);
            return GenericComponent;
        }
    }
    static get(label) {
        return Component.types.get(label);
    }
    initialize() {
        throw new Error('Unimplemented initialization function! ' + this.label);
    }
    getComponentType() {
        return this.label;
    }
}
Component.types = new Map;
exports.Component = Component;
//# sourceMappingURL=component.js.map