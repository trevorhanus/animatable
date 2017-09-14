import { observable, computed, action } from 'mobx';
import { stepper } from './Spring';

export class Animatable {
    @observable private x: number;
    private velocity: number;
    private destX: number;
    private lastFrameAt: number;
    private canBeNegative: boolean;

    constructor(initialValue: number, canBeNegative?: boolean) {
        this.x = initialValue;
        this.velocity = 0;
        this.destX = null;
        this.canBeNegative = canBeNegative || false;
    }

    @computed
    public get value(): number {
        return this.x;
    }

    @action
    public jumpTo(value: number): void {
        this.x = value;
    }

    @action
    public animateTo(to: number): void {
        this.lastFrameAt = performance.now();
        this.destX = to;
        window.requestAnimationFrame(this.step.bind(this));
    }

    @action
    private step(now: number): void {
        const { newX, newV } = stepper({
            deltaT: this.timeElapsed(now),
            x: this.x,
            v: this.velocity,
            destX: this.destX
        });
        this.x = newX;
        this.velocity = newV;
        this.lastFrameAt = now;
        if (newX !== this.destX) {
            window.requestAnimationFrame(this.step.bind(this));
        }
    }

    private timeElapsed(now: number): number {
        const deltaT = now - this.lastFrameAt;
        return deltaT > 0 ? deltaT : 0;
    }
}

export function animatable(initialValue: number): Animatable {
    return new Animatable(initialValue);
}
