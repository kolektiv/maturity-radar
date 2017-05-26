import { axes, dimensions, scales } from './calculations';
import { graphics } from './graphics/core';
import { grid } from './graphics/grid';
import { colour } from './graphics/colour';
import { plot } from './graphics/plot';

export const show = (id, { curve, metrics, size }) => {

    // Calculations

    const _axes = axes(metrics);
    const _dimensions = dimensions(size);
    const _scales = scales(_axes, _dimensions);

    // Graphics

    const _graphics = graphics(_dimensions, id);
    const _grid = grid(_axes, _dimensions, _graphics, _scales);

    const _colour = colour(metrics);

    const _target = plot(_axes, _dimensions, {
        name: 'target',
        colour: '#ccc',
        curve,
        opacity: 0.3,
        values: metrics.map(m => m.target)
    }, _graphics, _scales);

    const _actual = plot(_axes, _dimensions, {
        name: 'actual',
        colour: _colour,
        curve,
        opacity: 0.5,
        values: metrics.map(m => m.actual)
    }, _graphics, _scales);
};
