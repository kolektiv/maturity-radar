import { orbital } from '../position';
import { min, max } from '../../prelude/maths';

// Scale

// Common base d3 elements generated from the basic range of values calculated
// from the maturity axes.

const common = ({ range }, surface) => {
    return surface
        .append('g')
        .attr('class', 'circles')
        .selectAll('.surface')
        .data(range)
        .enter()
        .append('g')
        .attr('class', 'circle');
};

// Radial circles forming the basic radar, and defined with partial opacity
// to provide a gradient visualisation.

const circles = (common, { radius, range }) => {
    return common
        .append('circle')
        .attr('r', (_, i) => orbital(i, radius, range))
        .style('fill', '#ccc')
        .style('fill-opacity', 0.25)
        .style('stroke', '#fff')
        .style('stroke-width', 1);
};

// Labels for individual values, represented by each concentric circle, and
// shown against the north vertical axis.

const labels = (common, { radius, range }) => {
    return common
        .append('text')
        .attr('x', 7)
        .attr('y', (_, i) => -1 * orbital(i, radius, range))
        .attr('dy', 5)
        .style('fill', '#999')
        .style('font-family', 'sans-serif')
        .style('font-size', "11px")
        .text(d => d);
};

// Draws a labelled radial scale given appropriate dimensions and a surface
// drawing element.

export const scale = (dimensions, surface) => {
    const _common = common(dimensions, surface);

    return {
        circles: circles(_common, dimensions),
        labels: labels(_common, dimensions)
    };
};
