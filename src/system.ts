/**
 * The System that runs through the entities..
 *
 * @export
 * @interface System
 */
export interface System {
    processOneGameTick(previousFrameTime: number): void;
}
