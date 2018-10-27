import { Subject } from 'rxjs';

import { Entity } from './entity';
import { invalid } from './utilities';

/**
 * ComponentType thing!
 */
export type ComponentType<T extends Component> = new (id: number) => T;

/**
 * Component
 */
export class Component {
  /**
   * Added$  of component
   */
  static added$ = new Subject<Component>();

  /**
   * Removed$  of component
   */
    static removed$ = new Subject<Component>();

  /**
   * Creates an instance of component.
   * @param entityId
   */
  constructor(public readonly entityId: number) {
    const entity = Entity.map.get(this.entityId);
    if (invalid(entity)) {
      throw new Error(`Component with invalid Entity! ${this} ${entity}`);
    }

    entity.components.set(this.constructor.name, this);
    Component.added$.next(this);
  }

  /**
   * Destroys component
   */
  destroy() {
    const entity = Entity.map.get(this.entityId);
    if (invalid(entity)) {
      throw new Error(`Component with invalid Entity! ${this} ${entity}`);
    }
    entity.components.delete(this.constructor.name);
    Component.removed$.next(this);
  }
}
