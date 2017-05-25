import { axes, dimensions, scales } from './calculations';
import { graphics } from './graphics/core';
import { grid } from './graphics/grid';

export const show = (id, { metrics, size }) => {

    // Calculations

    const _axes = axes(metrics);
    const _dimensions = dimensions(size);
    const _scales = scales(_axes, _dimensions);

    // Graphics

    const _graphics = graphics(_dimensions, id);
    const _grid = grid(_axes, _dimensions, _graphics, _scales);
};
