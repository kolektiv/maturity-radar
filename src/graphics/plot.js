import { curveCatmullRomClosed as curved, curveLinearClosed as straight, lineRadial } from 'd3-shape';
import { position } from '../calculations';
import { max } from '../prelude';

const shape = (arc, colour, curve, name, opacity, range, plot, scale, values) => {

    const curveStyle = curve ? curved : straight;

    const line = () => {
        return lineRadial(values)
            .curve(curve ? curved : straight)
            .radius((d) => scale(d))
            .angle((d, i) => i * arc);
    };

    const shape = (common, line) => {
        return common
            .append('path')
            .attr('class', 'shape-${name}')
            .attr('d', () => line(values))
            .style('fill', colour)
            .style('fill-opacity', opacity)
            .style('stroke', colour)
            .style('stroke-opacity', 2 * opacity)
            .style('stroke-width', '1px');
    };

    const markers = (common) => {
        return common
            .selectAll('.markers')
            .data(values)
            .enter()
            .append('circle')
            .attr('r', 3)
            .attr('cx', (d, i) => position(arc, i, scale(d)).x())
            .attr('cy', (d, i) => position(arc, i, scale(d)).y())
            .style('fill', colour)
            .style('fill-opacity', 2 * opacity);
    };

    const common = () => {
        return plot
            .append('g');
    };

    const _common = common();
    const _line = line();
    const _shape = shape(_common, _line);
    const _markers = markers(_common);

    return _shape;
};


export const plot = ({ arc, range }, dimensions, { name, colour, curve, opacity, values }, graphics, { scale }) => {

    const plot = (graphics) => {
        return graphics
            .append('g')
            .attr('class', `plot-${name}`);
    };

    const _plot = plot(graphics);
    const _shape = shape(arc, colour, curve, name, opacity, range, _plot, scale, values);

    return _plot;
};
