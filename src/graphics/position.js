import { cos, sin } from '../prelude/maths';
import { min, max } from '../prelude/maths';

// Cartesian

export const cartesian = (arc, index, value) => {
    return {
        x: () => value * cos(arc * index - Math.PI / 2),
        y: () => value * sin(arc * index - Math.PI / 2)
    };
};

// Orbital

export const orbital = (index, radius, range) => {
    return radius - (index * (radius / (1 + max(range) - min(range))));
};
