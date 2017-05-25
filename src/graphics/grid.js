import { range } from 'd3-array';
import { diameter } from '../calculations';

// Axial

// Axial lines and labels, giving a base to display the individual metrics
// associated with each maturity axis.

const axial = (axes, base, dimensions, scales) => {

    // Axial lines radiating from the radar centre point, scaled for the common
    // d3 scale in use.

    const lines = (axes, common, dimensions, scale) => {
        return common
            .append('line')
            .attr('x1', 0)
            .attr('y1', 0)
            .attr('x2', (_, i) => scale(axes.range.max) * Math.cos(axes.arc * i - Math.PI / 2))
            .attr('y2', (_, i) => scale(axes.range.max) * Math.sin(axes.arc * i - Math.PI / 2))
            .attr('class', 'line')
            .style('stroke', '#fff')
            .style('stroke-width', '1px');
    };

    // Common base d3 elements generated from the array of names for each maturity
    // axis, to which the axial lines and labels are applied.

    const common = (axes, base) => {
        return base
            .selectAll('.axial-lines')
            .data(axes.names)
            .enter()
            .append('g');
    };

    // Common base d3 elements (instance).

    const common_ = common(axes, base);

    return {
        lines: lines(axes, common_, dimensions, scales.scale)
    };
};

// Radial

const radial = (axes, base, dimensions) => {

    const circles = (axes, base, dimensions) => {
        return base
            .selectAll('.radials')
            .data(range(axes.range.min, axes.range.max).reverse())
            .enter()
            .append('circle')
            .attr('r', (_, i) => diameter(i, dimensions.radius, axes.range))
            .style('fill', '#ccc')
            .style('fill-opacity', 0.25)
            .style('stroke', '#fff');
    };

    const labels = (axes, base, dimensions) => {
        return base
            .selectAll('.radial-labels')
            .data(range(axes.range.min, axes.range.max).reverse())
            .enter()
            .append('text')
            .attr('x', 5)
            .attr('y', (_, i) => -1 * diameter(i, dimensions.radius, axes.range))
            .attr('dy', "0.4em")
            .style('fill', '#999')
            .style('font-family', 'sans-serif')
            .style('font-size', "11px")
            .text((d) => d);
    };

    return {
        circles: circles(axes, base, dimensions),
        labels: labels(axes, base, dimensions)
    };
};

// Grid

export const grid = (axes, dimensions, graphics, scales) => {

    const base = (graphics) => {
        return graphics
            .append('g')
            .attr('class', 'base');
    };

    const _base = base(graphics);
    const _radial = radial(axes, _base, dimensions);
    const _axials = axial(axes, _base, dimensions, scales);

    return grid;
};
