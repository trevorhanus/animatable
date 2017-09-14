import { Animatable } from './Animatable';

export function animatable(initialValue: number): Animatable {
    return new Animatable(initialValue);
}

export {
    Animatable
}
