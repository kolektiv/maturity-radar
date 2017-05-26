import { cartesian } from '../position';
import { max } from '../../prelude/maths';

// Axes

// Common base d3 elements generated from the array of names for each maturity
// axis, to which the axial lines and labels are applied.

const common = (metrics, surface) => {
    return surface
        .append('g')
        .attr('class', 'axes')
        .selectAll('.surface')
        .data(metrics.map(m => m.name))
        .enter()
        .append('g')
        .attr('class', 'axis');
};

// Axial lines radiating from the radar centre point, scaled for the common
// d3 scale in use.

const lines = (common, { arc, range, scale }) => {
    return common
        .append('line')
        .attr('x1', 0)
        .attr('y1', 0)
        .attr('x2', (_, i) => cartesian(arc, i, scale(max(range))).x())
        .attr('y2', (_, i) => cartesian(arc, i, scale(max(range))).y())
        .attr('class', 'line')
        .style('stroke', '#fff')
        .style('stroke-width', 1);
};

// Axial labels, giving the name of the maturity axis at the end of each axial
// line.

const labels = (common, { arc, range, scale }) => {
    return common
        .append('text')
        .attr('text-anchor', 'middle')
        .attr('x', (_, i) => cartesian(arc, i, scale(max(range)) * 1.25).x())
        .attr('y', (_, i) => cartesian(arc, i, scale(max(range)) * 1.25).y())
        .style('fill', '#999')
        .style('font-family', 'sans-serif')
        .style('font-size', '11px')
        .text(d => d);
};

// Axial lines and labels, giving a base to display the individual metrics
// associated with each maturity axis.

export const axes = (dimensions, metrics, surface) => {
    const _common = common(metrics, surface);
    const _lines = lines(_common, dimensions);
    const _labels = labels(_common, dimensions);

    return surface;
};
