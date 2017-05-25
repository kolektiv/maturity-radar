import { select } from 'd3-selection';

// Graphics

export const graphics = (dimensions, id) => {
    const graphics = select(id)
          .append('svg')
          .attr('width', 700)
          .attr('height', 700)
          .append('g')
          .attr('transform', 'translate(350, 350)');

    return graphics;
};
