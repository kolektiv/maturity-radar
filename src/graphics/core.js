import { select } from 'd3-selection';

// Graphics

export const graphics = ({ size }, id) => {
    return select(id)
        .append('svg')
        .attr('width', size)
        .attr('height', size)
        .append('g')
        .attr('transform', `translate(${size/2}, ${size/2})`);
};
