import { Entity } from './entity';
import { Component, ComponentType } from './component';
import { System } from './system';
import { Assemblage } from './assemblage';

export class ecstaticBits {
    constructor() {
        console.log('Foo.');

    }
}

let entity: Entity = { id: 1 };

let Foo = Component.Builder('Test-Label!');
let Fee = new Foo(3);
type stt = typeof Fee;

let thing: Map<ComponentType, Component[]> = new Map;
thing.set(Foo, [Fee]);
thing.get(Foo);
let other: Map<string, ComponentType> = new Map;
other.set(Foo.label, Foo);
