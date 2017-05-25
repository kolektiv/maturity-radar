import { range } from 'd3-array';
import { scaleLinear } from 'd3-scale';
import { min, max } from './prelude';

// Axial

export const axes = ({ metrics }) => {
    return {
        arc: Math.PI * 2 / metrics.length,
        count: metrics.length,
        range: range(0, max(metrics.map(m => m.range.length))).reverse(),
        values: metrics.map(m => {
            return {
                name: m.name,
                range: m.range
            };
        })
    };
};

export const position = (arc, index, value) => {
    return {
        x: () => value * Math.cos(arc * index - Math.PI / 2),
        y: () => value * Math.sin(arc * index - Math.PI / 2)
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

export const scales = ({ range }, { radius }) => {
    return {
        scale: scaleLinear()
            .range([0, radius])
            .domain([0, max(range)])
    };
};
