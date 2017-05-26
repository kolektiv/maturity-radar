import { colourize } from './colour';
import { shape } from './shape';

export const data = (dimensions, graphics, metrics) => {
    const _data = graphics
          .append('g')
          .attr('class', 'data');

    const _target = shape(_data, dimensions, {
        colour: '#ccc',
        opacity: 0.3
    }, metrics.map(m => m.target));

    const _actual = shape(_data, dimensions, {
        colour: colourize(metrics),
        hover: true,
        opacity: 0.45
    }, metrics.map(m => m.actual));

    return graphics;
};
