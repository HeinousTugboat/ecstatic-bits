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
const component_1 = require("./component");
const entity_1 = require("./entity");
const system_1 = require("./system");
let ActiveComponent = ActiveComponent_1 = class ActiveComponent extends component_1.Component {
    constructor(eid) {
        super(eid);
    }
    makePrimary() {
        ActiveComponent_1.primary = entity_1.Entity.list.get(this.eid);
    }
    setDelay(delay) {
        this.delay = delay;
    }
    execute(args) {
        if (this.command && this.command.execute) {
            return this.command.execute(args);
        }
    }
};
ActiveComponent = ActiveComponent_1 = __decorate([
    component_1.ComponentType('active'),
    __metadata("design:paramtypes", [Number])
], ActiveComponent);
const InputSystem = new system_1.System('input', ActiveComponent, true);
InputSystem.update = () => {
    console.log('InputSystem update!');
};
InputSystem.hooks = {
    LOAD_B64: () => { },
    ACCEPT: () => { }
};
const Joe = new entity_1.Entity('Joe Book');
Joe.add('active');
system_1.System.update(1);
Joe.get('active').makePrimary();
console.log(ActiveComponent.primary);
var ActiveComponent_1;
//# sourceMappingURL=test.system.js.map