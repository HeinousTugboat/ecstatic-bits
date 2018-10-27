import { Subject } from 'rxjs';
export declare type ComponentType<T extends Component> = new (id: number) => T;
export declare class Component {
    readonly entityId: number;
    static added$: Subject<Component>;
    static removed$: Subject<Component>;
    constructor(entityId: number);
    destroy(): void;
}
