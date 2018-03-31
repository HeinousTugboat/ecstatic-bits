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
    setCommand(cmdString, args) {
    }
    cancelCommand() {
        if (this.command) {
            delete this.command;
        }
    }
};
ActiveComponent = ActiveComponent_1 = __decorate([
    component_1.ComponentType('active'),
    __metadata("design:paramtypes", [Number])
], ActiveComponent);
exports.ActiveComponent = ActiveComponent;
exports.InputSystem = new system_1.System('input', ActiveComponent, true);
exports.InputSystem.update = elapsedTime => console.log('Input update!');
exports.InputSystem.onDown = event => {
    console.log('toDo: InputSystem.onDown(ev)');
};
exports.InputSystem.currentContext = 'DEFAULT';
exports.InputSystem.switchContext = context => {
    console.log('toDo: InputSystem.switchContext(context)');
};
exports.InputSystem.clickHandler = event => {
    console.log('toDo: InputSystem.clickHandler(event)');
};
const loadb64 = () => {
    console.log('Load B64!');
};
const reloadJSON = () => {
    console.log('Reload JSON!');
};
const cancel = () => {
    const component = ActiveComponent.primary && ActiveComponent.primary.get('active');
    return component && component.cancelCommand();
};
exports.debug = () => {
    console.log(arguments);
    return [true, ...arguments];
};
exports.wait = (arg, ev) => {
    console.log('ev: %O', ev);
    if (!ev.repeat) {
        ev.repeat = true;
    }
    return Math.floor(Math.random() * 10);
};
exports.InputSystem.hooks = {
    LOAD_B64: loadb64,
    ACCEPT: exports.debug,
    LOAD_JOE: exports.debug,
    RELOAD_JSON: reloadJSON,
    CANCEL: cancel,
    WAIT: exports.wait
};
Object.defineProperty(exports.InputSystem, 'hooks', { writable: false });
console.log(exports.InputSystem);
var ActiveComponent_1;
//# sourceMappingURL=input.system.js.map