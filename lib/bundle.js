"use strict";
System.register("assemblage", [], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Assemblage;
    return {
        setters: [],
        execute: function () {
            Assemblage = class Assemblage {
            };
            exports_1("Assemblage", Assemblage);
        }
    };
});
System.register("component", [], function (exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
    function RegisterComponent(label) {
        return (constructor) => {
            if (Component.types.has(label)) {
                throw new Error('Attempting to register ' + label + '!');
            }
            constructor.label = label;
            constructor.list = new Set();
            constructor.prototype.label = label;
            Component.types.set(label, constructor);
        };
    }
    exports_2("RegisterComponent", RegisterComponent);
    var Component;
    return {
        setters: [],
        execute: function () {
            Component = class Component {
                constructor(eid) {
                    this.eid = eid;
                    const ctor = Object.getPrototypeOf(this).constructor;
                    this.label = ctor.label;
                    Component.types.get(ctor.label).list.add(this);
                }
                static get(label) {
                    return Component.types.get(label);
                }
            };
            Component.types = new Map;
            exports_2("Component", Component);
        }
    };
});
System.register("entity", ["component"], function (exports_3, context_3) {
    "use strict";
    var __moduleName = context_3 && context_3.id;
    var component_1, Entity;
    return {
        setters: [
            function (component_1_1) {
                component_1 = component_1_1;
            }
        ],
        execute: function () {
            Entity = class Entity {
                constructor(name = 'Unnamed Entity') {
                    this.name = name;
                    this.components = new Map;
                    this.id = Entity.id++;
                    Entity.list.set(this.id, this);
                }
                static get(id) {
                    if (!id) {
                        return [];
                    }
                    if (typeof id === 'number') {
                        return Entity.list.get(id);
                    }
                    else {
                        return [...Entity.list.values()].filter((val) => val.name === id);
                    }
                }
                static print() {
                    console.log('Full Entity List [' + Entity.list.size + ']: ');
                    [...Entity.list.values()].forEach((x) => { console.log(x); });
                }
                get(component) {
                    return this.components.get(component.label);
                }
                add(component, data) {
                    if (this.components.has(component.label)) {
                        return this.get(component);
                    }
                    const newComponent = new component(this.id, data);
                    this.components.set(component.label, newComponent);
                    return newComponent;
                }
                remove(component) {
                    const type = component_1.Component.types.get(component.label);
                    type.list.forEach((element, index, set) => {
                        if (element.eid === this.id) {
                            set.delete(element);
                        }
                    });
                    this.components.delete(component.label);
                }
            };
            Entity.id = 1000;
            Entity.list = new Map;
            exports_3("Entity", Entity);
        }
    };
});
System.register("entity-manager", [], function (exports_4, context_4) {
    "use strict";
    var __moduleName = context_4 && context_4.id;
    var EntityManager;
    return {
        setters: [],
        execute: function () {
            EntityManager = class EntityManager {
            };
            exports_4("EntityManager", EntityManager);
        }
    };
});
System.register("system", [], function (exports_5, context_5) {
    "use strict";
    var __moduleName = context_5 && context_5.id;
    var System;
    return {
        setters: [],
        execute: function () {
            System = class System {
                constructor(label, components, active = true) {
                    this.label = label;
                    this.active = active;
                    this.hooks = {};
                    this.components = new Map;
                    if (active) {
                        System.active.add(this);
                    }
                    System.list.set(label, this);
                    if (Array.isArray(components)) {
                        components.forEach(x => this.components.set(x.label, x));
                    }
                    else {
                        this.components.set(components.label, components);
                    }
                }
                static update(elapsedTime) {
                    this.active.forEach(system => {
                        system.update(elapsedTime);
                    });
                }
                static tick() {
                    this.list.forEach(system => {
                        system.tick();
                    });
                }
                update(elapsedTime) { }
                tick() { }
                execute(command, ...args) {
                    return this.hooks[command] && this.hooks[command].apply(this, args);
                }
                register(component) {
                    this.components.set(component.label, component);
                }
                deregister(component) {
                    this.components.delete(component.label);
                }
            };
            System.active = new Set;
            System.list = new Map;
            exports_5("System", System);
        }
    };
});
System.register("ecstatic-bits", ["entity", "entity-manager", "component", "system", "assemblage"], function (exports_6, context_6) {
    "use strict";
    var __moduleName = context_6 && context_6.id;
    var EcstaticBits;
    function exportStar_1(m) {
        var exports = {};
        for (var n in m) {
            if (n !== "default") exports[n] = m[n];
        }
        exports_6(exports);
    }
    return {
        setters: [
            function (entity_1_1) {
                exportStar_1(entity_1_1);
            },
            function (entity_manager_1_1) {
                exportStar_1(entity_manager_1_1);
            },
            function (component_2_1) {
                exportStar_1(component_2_1);
            },
            function (system_1_1) {
                exportStar_1(system_1_1);
            },
            function (assemblage_1_1) {
                exportStar_1(assemblage_1_1);
            }
        ],
        execute: function () {
            EcstaticBits = class EcstaticBits {
                constructor() {
                    console.log('ecstaticBits Invoked!');
                }
            };
            exports_6("default", EcstaticBits);
        }
    };
});
//# sourceMappingURL=bundle.js.map