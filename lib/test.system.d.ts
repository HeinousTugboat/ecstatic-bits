import { Component } from './component';
import { Entity } from './entity';
declare class ActiveComponent extends Component {
    static primary: Entity | undefined;
    private delay;
    private command;
    constructor(entityId: number);
    makePrimary(): void;
    setDelay(delay: number): void;
    execute(args: any[]): {} | undefined;
}
export declare type InputComponents = [ActiveComponent];
export {};
