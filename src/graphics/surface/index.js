import { axes } from './axes';
import { markers } from './markers';
import { scale } from './scale';

export const surface = (dimensions, graphics, metrics) => {
    const _surface = graphics
          .append('g')
          .attr('class', 'surface');

    const _scale = scale(dimensions, _surface);
    const _axes = axes(dimensions, metrics, _surface);
    const _markers = markers(dimensions, metrics, _surface);

    return _surface;
};
