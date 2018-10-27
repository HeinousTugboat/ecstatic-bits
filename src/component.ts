import { Subject } from 'rxjs';

import { Entity } from './entity';
import { invalid } from './utilities';

export type ComponentType<T extends Component> = new (id: number) => T;

export class Component {
  static added$ = new Subject<Component>();
  static removed$ = new Subject<Component>();

  constructor(public readonly entityId: number) {
    const entity = Entity.map.get(this.entityId);
    if (invalid(entity)) {
      throw new Error(`Component with invalid Entity! ${this} ${entity}`);
    }

    entity.components.set(this.constructor.name, this);
    Component.added$.next(this);
  }

  destroy() {
    const entity = Entity.map.get(this.entityId);
    if (invalid(entity)) {
      throw new Error(`Component with invalid Entity! ${this} ${entity}`);
    }
    entity.components.delete(this.constructor.name);
    Component.removed$.next(this);
  }
}
