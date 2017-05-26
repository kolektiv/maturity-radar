import { select } from 'd3-selection';
import { curveLinearClosed, lineRadial } from 'd3-shape';
import { cartesian } from '../position';

const common = (data) => {
    return data
        .append('g')
        .attr('class', 'shape');
};

const line = ({ arc, scale }, values) => {
    return lineRadial(values)
        .curve(curveLinearClosed)
        .radius((d) => scale(d))
        .angle((d, i) => i * arc);
};

const plot = (common, line, { colour, hover, opacity }, values) => {
    const _plot = common
          .append('path')
          .attr('class', 'path')
          .attr('d', () => line(values))
          .style('fill', colour)
          .style('fill-opacity', opacity)
          .style('stroke', colour)
          .style('stroke-opacity', 2 * opacity)
          .style('stroke-width', 1);

    return hover ? _plot
        .on('mouseover', (d, i, nodes) => select(nodes[i]).style('fill-opacity', 1.4 * opacity))
        .on('mouseout', (d, i, nodes) => select(nodes[i]).style('fill-opacity', opacity)) : _plot;
};

const markers = (common, { arc, scale }, { colour, opacity }, values) => {
    return common
        .selectAll('.markers')
        .data(values)
        .enter()
        .append('circle')
        .attr('r', 4)
        .attr('cx', (d, i) => cartesian(arc, i, scale(d)).x())
        .attr('cy', (d, i) => cartesian(arc, i, scale(d)).y())
        .style('fill', colour)
        .style('fill-opacity', 2 * opacity);
};

export const shape = (data, dimensions, style, values) => {
    const _common = common(data);
    const _line = line(dimensions, values);
    const _plot = plot(_common, _line, style, values);
    const _markers = markers(_common, dimensions, style, values);

    return data;
};
