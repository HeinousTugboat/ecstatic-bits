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
System.register("utilities", [], function (exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
    function invalid(o) {
        return o === undefined || o === null;
    }
    exports_2("invalid", invalid);
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("entity", ["rxjs", "utilities"], function (exports_3, context_3) {
    "use strict";
    var __moduleName = context_3 && context_3.id;
    function isEntity(e) {
        return !utilities_1.invalid(e) && isFinite(e.id) && e.components !== undefined;
    }
    exports_3("isEntity", isEntity);
    var rxjs_1, utilities_1, Entity;
    return {
        setters: [
            function (rxjs_1_1) {
                rxjs_1 = rxjs_1_1;
            },
            function (utilities_1_1) {
                utilities_1 = utilities_1_1;
            }
        ],
        execute: function () {
            Entity = class Entity {
                constructor(name = 'Unnamed Entity') {
                    this.name = name;
                    this.id = Entity.nextId++;
                    this.components = new Map();
                    Entity.added$.next(this);
                    Entity.map.set(this.id, this);
                }
                static get(id) {
                    if (!id) {
                        return [];
                    }
                    if (typeof id === 'number') {
                        return Entity.map.get(id);
                    }
                    else {
                        return [...Entity.map.values()].filter((val) => val.name === id);
                    }
                }
                static print() {
                    console.log('Full Entity List [' + Entity.map.size + ']: ');
                    [...Entity.map.values()].forEach(x => { console.log(x); });
                }
                get(component) {
                    return this.components.get(component.name);
                }
                add(component) {
                    return new component(this.id);
                }
                remove(component) {
                    const componentInstance = this.components.get(component.name);
                    if (!utilities_1.invalid(componentInstance)) {
                        componentInstance.destroy();
                    }
                }
                toJSON() { return ''; }
            };
            Entity.nextId = 1;
            Entity.added$ = new rxjs_1.Subject();
            Entity.map = new Map();
            exports_3("Entity", Entity);
        }
    };
});
System.register("component", ["rxjs", "entity", "utilities"], function (exports_4, context_4) {
    "use strict";
    var __moduleName = context_4 && context_4.id;
    var rxjs_2, entity_1, utilities_2, Component;
    return {
        setters: [
            function (rxjs_2_1) {
                rxjs_2 = rxjs_2_1;
            },
            function (entity_1_1) {
                entity_1 = entity_1_1;
            },
            function (utilities_2_1) {
                utilities_2 = utilities_2_1;
            }
        ],
        execute: function () {
            Component = class Component {
                constructor(entityId) {
                    this.entityId = entityId;
                    const entity = entity_1.Entity.map.get(this.entityId);
                    if (utilities_2.invalid(entity)) {
                        throw new Error(`Component with invalid Entity! ${this} ${entity}`);
                    }
                    entity.components.set(this.constructor.name, this);
                    Component.added$.next(this);
                }
                destroy() {
                    const entity = entity_1.Entity.map.get(this.entityId);
                    if (utilities_2.invalid(entity)) {
                        throw new Error(`Component with invalid Entity! ${this} ${entity}`);
                    }
                    entity.components.delete(this.constructor.name);
                    Component.removed$.next(this);
                }
            };
            Component.added$ = new rxjs_2.Subject();
            Component.removed$ = new rxjs_2.Subject();
            exports_4("Component", Component);
        }
    };
});
System.register("entity-manager", [], function (exports_5, context_5) {
    "use strict";
    var __moduleName = context_5 && context_5.id;
    var EntityManager;
    return {
        setters: [],
        execute: function () {
            EntityManager = class EntityManager {
            };
            exports_5("EntityManager", EntityManager);
        }
    };
});
System.register("system", ["rxjs/operators", "component", "entity"], function (exports_6, context_6) {
    "use strict";
    var __moduleName = context_6 && context_6.id;
    var operators_1, component_1, entity_2, enComponents, FRAME_LENGTH, FRAME_PAD, System;
    return {
        setters: [
            function (operators_1_1) {
                operators_1 = operators_1_1;
            },
            function (component_1_1) {
                component_1 = component_1_1;
            },
            function (entity_2_1) {
                entity_2 = entity_2_1;
            }
        ],
        execute: function () {
            FRAME_LENGTH = 10;
            FRAME_PAD = 2;
            System = class System {
                constructor(label, components, active = true) {
                    this.label = label;
                    this.components = components;
                    this.active = active;
                    this.hooks = {};
                    this.entities = new Set();
                    System.list.set(label, this);
                    if (active) {
                        System.active.add(this);
                    }
                    component_1.Component.added$.pipe(operators_1.filter(component => components.some(componentType => component instanceof componentType)), operators_1.map(component => entity_2.Entity.map.get(component.entityId)), operators_1.filter(entity_2.isEntity), operators_1.filter(entity => {
                        enComponents = [...entity.components.keys()];
                        return components
                            .map(systemComponent => systemComponent.name)
                            .every(systemComponent => enComponents.includes(systemComponent));
                    }), operators_1.map((entity) => {
                        return components.map(componentType => entity.get(componentType));
                    })).subscribe(componentArr => this.entities.add(componentArr));
                    component_1.Component.removed$.pipe(operators_1.filter(component => components.some(componentType => component instanceof componentType)), operators_1.map(component => entity_2.Entity.map.get(component.entityId)), operators_1.filter(entity_2.isEntity), operators_1.map((entity) => {
                        return [...this.entities.values()]
                            .filter(entityComponents => entityComponents.every(component => component.entityId === entity.id));
                    })).subscribe(componentArr => this.entities.delete(componentArr[0]));
                }
                static tick(dT) {
                    System.active.forEach(system => system.tick(dT));
                    System.frame++;
                }
                tick(dT) {
                    this.entities.forEach(components => {
                        this.update(components, dT);
                    });
                }
                update(components, dT) {
                    if (System.debug) {
                        console.log(`[${System.frame.toString(FRAME_LENGTH).padStart(FRAME_PAD)}] ${this.label}: ${components} `, dT);
                    }
                }
                execute(command, ...args) {
                    return this.hooks[command] && this.hooks[command].apply(this, args);
                }
            };
            System.debug = false;
            System.list = new Map;
            System.active = new Set;
            System.frame = 1;
            exports_6("System", System);
        }
    };
});
System.register("ecstatic-bits", ["assemblage", "entity", "entity-manager", "component", "system"], function (exports_7, context_7) {
    "use strict";
    var __moduleName = context_7 && context_7.id;
    var EcstaticBits;
    function exportStar_1(m) {
        var exports = {};
        for (var n in m) {
            if (n !== "default") exports[n] = m[n];
        }
        exports_7(exports);
    }
    return {
        setters: [
            function (assemblage_1_1) {
                exportStar_1(assemblage_1_1);
            },
            function (entity_3_1) {
                exportStar_1(entity_3_1);
            },
            function (entity_manager_1_1) {
                exportStar_1(entity_manager_1_1);
            },
            function (component_2_1) {
                exportStar_1(component_2_1);
            },
            function (system_1_1) {
                exportStar_1(system_1_1);
            }
        ],
        execute: function () {
            EcstaticBits = class EcstaticBits {
                constructor() {
                    console.log('ecstaticBits Invoked!');
                }
            };
            exports_7("default", EcstaticBits);
        }
    };
});
System.register("test.system", ["component", "entity", "system"], function (exports_8, context_8) {
    "use strict";
    var __moduleName = context_8 && context_8.id;
    var component_3, entity_4, system_2, ActiveComponent, InputSystem, input, joe, joeActive;
    return {
        setters: [
            function (component_3_1) {
                component_3 = component_3_1;
            },
            function (entity_4_1) {
                entity_4 = entity_4_1;
            },
            function (system_2_1) {
                system_2 = system_2_1;
            }
        ],
        execute: function () {
            ActiveComponent = class ActiveComponent extends component_3.Component {
                constructor(entityId) {
                    super(entityId);
                }
                makePrimary() {
                    ActiveComponent.primary = entity_4.Entity.map.get(this.entityId);
                }
                setDelay(delay) {
                    this.delay = delay;
                }
                execute(args) {
                    if (this.command && this.command.execute) {
                        return this.command.execute(args);
                    }
                }
            };
            InputSystem = class InputSystem extends system_2.System {
                constructor() {
                    super('input', [ActiveComponent], true);
                    this.hooks = {
                        LOAD_B64: () => { },
                        ACCEPT: () => { }
                    };
                }
                update() {
                    console.log('InputSystem update!');
                }
            };
            input = new InputSystem();
            joe = new entity_4.Entity('Joe Book');
            joeActive = joe.add(ActiveComponent);
            system_2.System.tick(1);
            joeActive.makePrimary();
            console.log(ActiveComponent.primary);
        }
    };
});
//# sourceMappingURL=bundle.js.map