import { Entity } from './entity';
import { Component, ComponentType } from './component';

/**
 * The thing that actually runs Entities..
 */
// export interface IEntityManager {
//     list: Entity[];
//     types: Map<ComponentType, Component[]>;
//     getComponent<T extends ComponentType>(entity: Entity): Component | undefined;
//     getAllComponentsOfType<T extends ComponentType>(): Component[];
//     getAllEntitiesPossessingComponent<T extends ComponentType>(): Entity[];
//     addComponent<T extends ComponentType>(entity: Entity, component: Component): void;
//     createEntity(): Entity;
//     killEntity(entity: Entity): void;
// }

export class EntityManager /* implements IEntityManager */ {

}
