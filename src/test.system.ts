import { Component, ComponentType } from './component';
import { Entity } from './entity';
import { System } from './system';

@ComponentType('active')
class ActiveComponent extends Component {
    static primary: Entity | undefined;
    private delay: number | undefined;
    private command: {execute: (...args: any[]) => {}} | undefined;
    constructor(eid: number) {
        super(eid);
    }

    makePrimary() {
        ActiveComponent.primary = Entity.list.get(this.eid);
    }
    setDelay(delay: number) {
        this.delay = delay;
    }
    execute(args: any[]) {
        if (this.command && this.command.execute) {
            return this.command.execute(args);
        }
    }
}

const InputSystem = new System('input', ActiveComponent, true);
InputSystem.update = () => {
    console.log('InputSystem update!');
};

InputSystem.hooks = {
    LOAD_B64: () => {},
    ACCEPT: () => {}
};

const Joe = new Entity('Joe Book');
Joe.add('active');

System.update(1);
(<ActiveComponent>Joe.get('active')).makePrimary();
console.log(ActiveComponent.primary);
