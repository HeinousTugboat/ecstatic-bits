"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const component_1 = require("./component");
const entity_1 = require("./entity");
const system_1 = require("./system");
class ActiveComponent extends component_1.Component {
    constructor(entityId) {
        super(entityId);
    }
    makePrimary() {
        ActiveComponent.primary = entity_1.Entity.map.get(this.entityId);
    }
    setDelay(delay) {
        this.delay = delay;
    }
    execute(args) {
        if (this.command && this.command.execute) {
            return this.command.execute(args);
        }
    }
}
class InputSystem extends system_1.System {
    constructor() {
        super([ActiveComponent]);
        this.hooks = {
            LOAD_B64: () => { },
            ACCEPT: () => { }
        };
    }
    update() {
        console.log('InputSystem update!');
    }
}
InputSystem.label = 'input';
const input = new InputSystem();
const joe = new entity_1.Entity('Joe Book');
const joeActive = joe.add(ActiveComponent);
system_1.System.tick(1);
joeActive.makePrimary();
console.log(ActiveComponent.primary);
const a = system_1.System.list.get(input.label);
const b = system_1.System.get(InputSystem);
console.log(a === b);
//# sourceMappingURL=test.system.js.map