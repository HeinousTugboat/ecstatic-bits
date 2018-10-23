import { Subject } from 'rxjs';
import { ComponentType, Component } from './component';
import { invalid } from './utilities';

export function isEntity(e: Entity | undefined): e is Entity {
  return isFinite((<Entity>e).id) && (<Entity>e).components !== undefined;
}

export class Entity {
  static nextId = 1;
  static added$ = new Subject<Entity>();
  static map = new Map<number, Entity>();
  id = Entity.nextId++;
  components = new Map<string, Component>();

  constructor(public name: string = 'Unnamed Entity') {
    Entity.added$.next(this);
    Entity.map.set(this.id, this);
  }

  static get(id?: string): Entity[];
  static get(id: number): Entity | undefined;
  static get(id: string | number | undefined): Entity | undefined | Entity[] {
    if (!id) { return []; }
    if (typeof id === 'number') {
      return Entity.map.get(id);
    } else {
      return [...Entity.map.values()].filter((val: Entity) => val.name === id);
    }
  }

  static print(): void {
    console.log('Full Entity List [' + Entity.map.size + ']: ');
    [...Entity.map.values()].forEach((x) => { console.log(x); });
  }

  get<T extends Component>(component: ComponentType<T>): T | undefined {
    return this.components.get(component.name) as T | undefined;
  }

  add<T extends Component>(component: ComponentType<T>): T {
    return new component(this.id);
  }

  remove<T extends Component>(component: ComponentType<T>): void {
    const componentInstance = this.components.get(component.name) as T;
    if (!invalid(componentInstance)) {
      componentInstance.destroy();
    }
  }

  // toJSON(): {[key: string]: any} { }
}
