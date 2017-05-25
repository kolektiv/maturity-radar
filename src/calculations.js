import { range } from 'd3-array';
import { scaleLinear } from 'd3-scale';
import { min, max } from './prelude';

// Axial

export const axes = ({ metrics }) => {
    const global = metrics.map(m => {
        const local = m.range.map(m => m.value);

        return {
            min: min(local),
            max: max(local)
        };
    });

    return {
        arc: Math.PI * 2 / metrics.length,
        count: metrics.length,
        names: metrics.map(m => {
            return {
                name: m.name,
                description: m.description
            };
        }),
        range: range(min(global.map(v => v.min)), max(global.map(v => v.max)) + 1).reverse()
    };
};

export const position = (axes, index, value) => {
    return {
        x: () => value * Math.cos(axes.arc * index - Math.PI / 2),
        y: () => value * Math.sin(axes.arc * index - Math.PI / 2)
    };
};

// Dimensional

export const dimensions = ({ size }) => {
    return {
        radius: size / 3,
        size
    };
};

// Radial

export const diameter = (index, radius, range) => {
    return radius - (index * (radius / (1 + max(range) - min(range))));
};

// Scalar

export const scales = (axes, dimensions) => {
    return {
        scale: scaleLinear()
            .range([0, dimensions.radius])
            .domain([min(axes.range), max(axes.range)])
    };
};
