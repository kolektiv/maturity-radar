import { select } from 'd3-selection';
import { cartesian } from '../position';

const common = (metrics, overlay) => {
    return overlay.selectAll('.overlay')
        .data(metrics.map(m => m.range))
        .enter()
        .append('g')
        .attr('class', 'axis');
};

const dots = (common, { arc, scale }) => {
    return common
        .selectAll('.axis')
        .data((d, i) => d.map(v => {
            return {
                axis: i,
                value: v
            };
        }))
        .enter()
        .append('circle')
        .attr('r', 8)
        .attr('cx', (d, i) => cartesian(arc, d.axis, scale(i)).x())
        .attr('cy', (d, i) => cartesian(arc, d.axis, scale(i)).y())
        .style('fill', '#fff')
        .style('fill-opacity', 0)
        .on('mouseover', (d, i, nodes) => select(nodes[i]).style('fill-opacity', 0.3))
        .on('mouseout', (d, i, nodes) => select(nodes[i]).style('fill-opacity', 0))
        .append('svg:title')
        .text(d => d.value);
};

export const markers = (dimensions, metrics, overlay) => {
    const _common = common(metrics, overlay);
    const _dots = dots(_common, dimensions);

    return overlay;
};
