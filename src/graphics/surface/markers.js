import { cartesian } from '../position';

// Markers

// Draws node markers at points where a metrics value sits on the
// display surface.

const base = (metrics, surface) => {
    return surface
        .append('g')
        .attr('class', 'markers')
        .selectAll('.markers')
        .data(metrics.map(m => m.range))
        .enter()
        .append('g')
        .attr('class', 'axis');
};

const dots = (base, { arc, scale }) => {
    return base
        .selectAll('.axis')
        .data((d, i) => d.map(_ => i))
        .enter()
        .append('circle')
        .attr('r', 5)
        .attr('cx', (d, i) => cartesian(arc, d, scale(i)).x())
        .attr('cy', (d, i) => cartesian(arc, d, scale(i)).y())
        .style('fill', '#fff');
};

export const markers = (dimensions, metrics, surface) => {
    const _base = base(metrics, surface);
    const _dots = dots(_base, dimensions);

    return surface;
};
