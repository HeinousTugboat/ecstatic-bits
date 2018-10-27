import { Component, ComponentType } from './component';
import { Entity } from './entity';
import { EntityManager } from './entity-manager';
import { System } from './system';

export default class EcstaticBits {
    constructor() {
        console.log('ecstaticBits Invoked!');
    }
}

export * from './entity';
export * from './entity-manager';
export * from './component';
export * from './system';
