"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const component_1 = require("./component");
class ecstaticBits {
    constructor() {
        console.log('Foo.');
    }
}
exports.ecstaticBits = ecstaticBits;
let entity = { id: 1 };
let Foo = component_1.Component.Builder('Test-Label!');
let Fee = new Foo(3);
let thing = new Map;
thing.set(Foo, [Fee]);
thing.get(Foo);
let other = new Map;
other.set(Foo.label, Foo);
