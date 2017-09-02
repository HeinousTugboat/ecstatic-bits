/**
 * The System that runs through the entities..
 */
export interface ISystem {
    processOneGameTick(previousFrameTime: number): void;
}

export class System /* implements ISystem */ {

}
