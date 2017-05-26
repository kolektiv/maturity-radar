import { select } from 'd3-selection';
import { cartesian } from '../position';
import { markers } from './markers';

export const overlay = (dimensions, graphics, metrics) => {
    const _overlay = graphics
          .append('g')
          .attr('class', 'overlay');

    const _markers = markers(dimensions, metrics, _overlay);

    return graphics;
};
