import { Assemblage } from './assemblage';
import { Component, ComponentType } from './component';
import { Entity } from './entity';
import { EntityManager } from './entity-manager';
import { System } from './system';

/**
 * Ecstatic bits
 */
export default class EcstaticBits {
    /**
     * Creates an instance of ecstatic bits.
     */
    constructor() {
        console.log('ecstaticBits Invoked!');
    }
}

export * from './assemblage';
export * from './entity';
export * from './entity-manager';
export * from './component';
export * from './system';
