import { Component } from './component';
import { Entity } from './entity';
import { System } from './system';
export declare class ActiveComponent extends Component {
    static primary: Entity | undefined;
    private delay;
    private command;
    constructor(eid: number);
    makePrimary(): void;
    setDelay(delay: number): void;
    execute(args: any[]): {} | undefined;
    setCommand(cmdString: string, args: any[]): void;
    cancelCommand(): void;
}
export declare type InputContext = 'DEFAULT' | 'PROMPT' | string;
export interface InputSystem extends System {
    overlay: HTMLElement | null;
    onDown: (ev: MouseEvent) => void;
    currentContext: InputContext;
    switchContext: (context: InputContext) => void;
    clickHandler: (event: MouseEvent) => void;
}
export declare const InputSystem: InputSystem;
export declare const debug: () => any[];
export declare const wait: (arg: any, ev: any) => number;
