import { range } from 'd3-array';
import { scaleLinear } from 'd3-scale';
import { max } from './prelude/maths';
import { graphics } from './graphics/core';
import { data } from './graphics/data';
import { overlay } from './graphics/overlay';
import { surface } from './graphics/surface';

export const dimensions = (metrics, size) => {
    const _radius = size / 3;
    const _range = range(0, max(metrics.map(m => m.range.length))).reverse();

    return {
        arc: Math.PI * 2 / (metrics.length),
        radius: _radius,
        range: _range,
        scale: scaleLinear()
            .range([_radius / _range.length, _radius])
            .domain([0, max(_range)]),
        size
    };
};

export const show = (id, { curve, metrics, size }) => {

    // Dimensions

    const _dimensions = dimensions(metrics, size);

    // Graphics

    const _graphics = graphics(_dimensions, id);

    // Surface, Data, Overlay

    const _surface = surface(_dimensions, _graphics, metrics);
    const _data = data(_dimensions, _graphics, metrics);
    const _overlay = overlay(_dimensions, _graphics, metrics);

    return _graphics;
};
