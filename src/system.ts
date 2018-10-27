import { filter, map } from 'rxjs/operators';

import { Component, ComponentType } from './component';
import { Entity, isEntity } from './entity';

let enComponents: string[];

const FRAME_LENGTH = 10;
const FRAME_PAD = 2;

/**
 * ComponentTypeS thing!
 */
export type ComponentTypes<T extends Component[]> = { [K in keyof T]: ComponentType<T[K] extends Component ? T[K] : never> };

/**
 * System
 * @template T
 */
export class System<T extends Component[]> {
  /**
   * Debug  of system
   */
  static readonly debug = false;
  /**
   * List  of system
   */
  static list: Map<string, System<any>> = new Map;
  /**
   * Active  of system
   */
  static active: Set<System<any>> = new Set;
  /**
   * Frame  of system
   */
  static frame = 1;
  /**
   * Hooks  of system
   */
  public hooks: { [k: string]: Function } = {};

  /**
   * Entities  of system
   */
  protected entities = new Set<T>();

  /**
   * Ticks system
   * @param dT
   */
  static tick(dT: number): void {
    System.active.forEach(system => system.tick(dT));
    System.frame++;
  }

  /**
   * Creates an instance of system.
   * @param label
   * @param components
   * @param [active]
   */
  constructor(
    public label: string,
    public components: ComponentTypes<T>,
    private active: boolean = true
  ) {
    System.list.set(label, this);

    if (active) {
      System.active.add(this);
    }

    Component.added$.pipe(
      filter(component => components.some(componentType => component instanceof componentType)),
      map(component => Entity.map.get(component.entityId)),
      filter(isEntity),
      filter(entity => {
        enComponents = [...entity.components.keys()];

        return components
          .map(systemComponent => systemComponent.name)
          .every(systemComponent => enComponents.includes(systemComponent));
      }),
      map((entity: Entity) => {
        return components.map(componentType => entity.get(componentType)) as T;
      })
    ).subscribe(componentArr => this.entities.add(componentArr));

    Component.removed$.pipe(
      filter(component => components.some(componentType => component instanceof componentType)),
      map(component => Entity.map.get(component.entityId)),
      filter(isEntity),
      map((entity: Entity) => {
        return [...this.entities.values()]
          .filter(entityComponents => entityComponents.every(component => component.entityId === entity.id));
      })
    ).subscribe(componentArr => this.entities.delete(componentArr[0]));
  }

  /**
   * Ticks system
   * @param dT
   */
  tick(dT: number): void {
    this.entities.forEach(components => {
      this.update(components, dT);
    });
  }

  /**
   * Updates system
   * @param components
   * @param dT
   */
  protected update(components: T, dT: number): void {
    if (System.debug) {
      console.log(`[${System.frame.toString(FRAME_LENGTH).padStart(FRAME_PAD)}] ${this.label}: ${components} `, dT);
    }
  }

  /**
   * Executes system
   * @param command
   * @param args
   * @returns execute
   */
  execute(command: string, ...args: any[]): unknown {
    return this.hooks[command] && this.hooks[command].apply(this, args);
  }
}
