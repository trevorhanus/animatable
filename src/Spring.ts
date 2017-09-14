export interface StepperOptions {
    deltaT: number;
    x: number;
    v: number;
    destX: number;
    k?: number;
    b?: number;
}

export function stepper(options: StepperOptions): { newX: number, newV: number } {
    const { x, v, destX, deltaT } = options;
    let t = deltaT / 1000; // milliseconds to seconds
    const k = options.k || 170;
    const b = options.b || 14;
    const precision = .1;

    const Fspring = -k * (x - destX);
    const Fdamper = -b * v;

    const accel = Fspring + Fdamper;

    const newV = v + accel * t;
    const newX = x + newV * t;

    if (Math.abs(newV) < precision && Math.abs(newX - destX) < precision) {
        return {
            newX: destX,
            newV: 0
        }
    }

    return {
        newX: newX,
        newV: newV
    }
}
