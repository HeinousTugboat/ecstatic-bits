import { Component, ComponentType } from './component';
import { Entity } from './entity';
import { System } from './system';

// @ComponentType('active')
class ActiveComponent extends Component {
  static primary: Entity | undefined;
  private delay: number | undefined;
  private command: { execute: (...args: any[]) => {} } | undefined;
  constructor(entityId: number) {
    super(entityId);
  }

  makePrimary() {
    ActiveComponent.primary = Entity.map.get(this.entityId);
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

export type InputComponents = [ActiveComponent];

class InputSystem extends System<InputComponents> {
  hooks = {
    LOAD_B64: () => { },
    ACCEPT: () => { }
  };

  constructor() {
    super('input', [ActiveComponent], true);
  }

  update() {
    console.log('InputSystem update!');
  }
}

const input = new InputSystem();
const Joe = new Entity('Joe Book');
const JoeActive = Joe.add(ActiveComponent);

System.tick(1);
JoeActive.makePrimary();
console.log(ActiveComponent.primary);
