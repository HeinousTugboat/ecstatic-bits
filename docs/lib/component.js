"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Component {
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
}
Component.list = {};
Component.types = new Map;
exports.Component = Component;
