import { Subject } from 'rxjs';

import { Component, ComponentType } from './component';
import { invalid } from './utilities';

/**
 * Determines whether entity is
 * @param e
 * @returns entity
 */
export function isEntity(e: Entity | undefined): e is Entity {
  return !invalid(e) && isFinite((<Entity> e).id) && (<Entity> e).components !== undefined;
}

/**
 * Entity
 */
export class Entity {
  /**
   * Next id of entity
   */
  static nextId = 1;
  /**
   * Added$  of entity
   */
  static added$ = new Subject<Entity>();
  /**
   * Map  of entity
   */
  static map = new Map<number, Entity>();
  /**
   * Id  of entity
   */
  id = Entity.nextId++;
  /**
   * Components  of entity
   */
  components = new Map<string, Component>();

  /**
   * Creates an instance of entity.
   * @param [name]
   */
  constructor(public name: string = 'Unnamed Entity') {
    Entity.added$.next(this);
    Entity.map.set(this.id, this);
  }

  /**
   * Gets entity
   * @param [id]
   * @returns get
   */
  static get(id?: string): Entity[];
  /**
   * Gets entity
   * @param id
   * @returns get
   */
  static get(id: number): Entity | undefined;
  static get(id: string | number | undefined): Entity | undefined | Entity[] {
    if (!id) { return []; }
    if (typeof id === 'number') {
      return Entity.map.get(id);
    } else {
      return [...Entity.map.values()].filter((val: Entity) => val.name === id);
    }
  }

  /**
   * Prints entity
   */
  static print(): void {
    console.log('Full Entity List [' + Entity.map.size + ']: ');
    [...Entity.map.values()].forEach(x => { console.log(x); });
  }

  /**
   * Gets entity
   * @template T
   * @param component
   * @returns get
   */
  get<T extends Component>(component: ComponentType<T>): T | undefined {
    return this.components.get(component.name) as T | undefined;
  }

  /**
   * Adds entity
   * @template T
   * @param component
   * @returns add
   */
  add<T extends Component>(component: ComponentType<T>): T {
    return new component(this.id);
  }

  /**
   * Removes entity
   * @template T
   * @param component
   */
  remove<T extends Component>(component: ComponentType<T>): void {
    const componentInstance = this.components.get(component.name) as T;
    if (!invalid(componentInstance)) {
      componentInstance.destroy();
    }

    this.components.delete(component.name);
  }

  destroy(): void {
    this.components.forEach(component => component.destroy());
  }

  /**
   * To json
   * @returns json
   */
  toJSON(): string { return ''; }
}
