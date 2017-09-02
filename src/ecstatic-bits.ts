import { Entity } from './entity';
import { EntityManager } from './entity-manager';
import { Component, ComponentType } from './component';
import { System } from './system';
import { Assemblage } from './assemblage';

export default class ecstaticBits {
    constructor() {
        console.log('ecstaticBits Invoked!');

    }
}

let testEntity: Entity = new Entity;
let TestComponent: ComponentType = Component.Builder('test-component');
let testComp: Component = new TestComponent(1);

let componentMap: Map<ComponentType, Component[]> = new Map;
componentMap.set(TestComponent, [testComp]);
console.log(componentMap.get(TestComponent));

let labelMap: Map<string, ComponentType> = new Map;
labelMap.set(TestComponent.label, TestComponent);
console.log(labelMap.get('test-component'));

export * from './entity';
export * from './entity-manager';
export * from './component';
export * from './system';
export * from './assemblage';
