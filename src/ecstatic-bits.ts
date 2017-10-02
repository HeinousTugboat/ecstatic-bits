import { Entity } from './entity';
import { EntityManager } from './entity-manager';
import { Component, ComponentType } from './component';
import { System } from './system';
import { Assemblage } from './assemblage';

export default class EcstaticBits {
    constructor() {
        console.log('ecstaticBits Invoked!');

    }
}

export * from './entity';
export * from './entity-manager';
export * from './component';
export * from './system';
export * from './assemblage';

