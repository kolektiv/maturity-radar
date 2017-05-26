import { interpolateRgbBasis as interpolate } from 'd3-interpolate';
import { max } from '../prelude';

const colours = [
    '#c00',
    '#f90',
    '#ff0',
    '#0f0'
];

const gradient = interpolate(colours);

export const colour = (metrics) => {
    const target = metrics.map(m => m.target).reduce((a, v) => a + v, 0);
    const actual = metrics.map(m => max([0, m.target - m.actual])).reduce((a, v) => a - v, target);

    return gradient(actual / target);
};
