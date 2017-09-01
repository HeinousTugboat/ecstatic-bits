System.register("assemblage", [], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("component", [], function (exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
    var Component;
    return {
        setters: [],
        execute: function () {
            Component = class Component {
                static Builder(label) {
                    Component.list[label] = (_a = class ComponentType extends Component {
                            constructor(num) {
                                super();
                                this.num = num;
                                this.label = label;
                            }
                            getComponentType() {
                                return this.label;
                            }
                        },
                        _a.label = label,
                        _a);
                    Component.types.set(Component.list[label], []);
                    return Component.list[label];
                    var _a;
                }
            };
            Component.list = {};
            Component.types = new Map;
            exports_2("Component", Component);
        }
    };
});
System.register("entity", [], function (exports_3, context_3) {
    "use strict";
    var __moduleName = context_3 && context_3.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("entity-manager", [], function (exports_4, context_4) {
    "use strict";
    var __moduleName = context_4 && context_4.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("system", [], function (exports_5, context_5) {
    "use strict";
    var __moduleName = context_5 && context_5.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("index", ["component"], function (exports_6, context_6) {
    "use strict";
    var __moduleName = context_6 && context_6.id;
    var component_1, ecstaticBits, entity, Foo, Fee, thing, other;
    return {
        setters: [
            function (component_1_1) {
                component_1 = component_1_1;
            }
        ],
        execute: function () {
            ecstaticBits = class ecstaticBits {
                constructor() {
                    console.log('Foo.');
                }
            };
            exports_6("ecstaticBits", ecstaticBits);
            entity = { id: 1 };
            Foo = component_1.Component.Builder('Test-Label!');
            Fee = new Foo(3);
            thing = new Map;
            thing.set(Foo, [Fee]);
            thing.get(Foo);
            other = new Map;
            other.set(Foo.label, Foo);
        }
    };
});
//# sourceMappingURL=lib.js.map