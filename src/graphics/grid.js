import { diameter, position } from '../calculations';
import { min, max } from '../prelude';

// Axial

// Axial lines and labels, giving a base to display the individual metrics
// associated with each maturity axis.

const axial = ({ arc, range, values }, grid, scale) => {

    // Axial lines radiating from the radar centre point, scaled for the common
    // d3 scale in use.

    const lines = (common) => {
        return common
            .append('line')
            .attr('x1', 0)
            .attr('y1', 0)
            .attr('x2', (_, i) => position(arc, i, scale(max(range))).x())
            .attr('y2', (_, i) => position(arc, i, scale(max(range))).y())
            .attr('class', 'line')
            .style('stroke', '#fff')
            .style('stroke-width', '1px');
    };

    // Axial labels, giving the name of the maturity axis at the end of each axial
    // line.

    const labels = (common) => {
        common
            .append('text')
            .attr('text-anchor', 'middle')
            .attr('x', (d, i) => position(arc, i, scale(max(range)) * 1.25).x())
            .attr('y', (d, i) => position(arc, i, scale(max(range)) * 1.25).y())
            .style('fill', '#999')
            .style('font-family', 'sans-serif')
            .style('font-size', "11px")
            .text((d) => d.name);
    };

    // Common base d3 elements generated from the array of names for each maturity
    // axis, to which the axial lines and labels are applied.

    const common = () => {
        return grid
            .selectAll('.axial')
            .data(values)
            .enter()
            .append('g');
    };

    // Common base d3 elements (instance).

    const _common = common();

    return {
        lines: lines(_common),
        labels: labels(_common)
    };
};

// Radial

const radial = ({ range }, grid, { radius }) => {

    // Radial circles forming the basic radar, and defined with partial opacity
    // to provide a gradient visualisation.

    const circles = (common) => {
        return common
            .append('circle')
            .attr('r', (_, i) => diameter(i, radius, range))
            .style('fill', '#ccc')
            .style('fill-opacity', 0.25)
            .style('stroke', '#fff');
    };

    // Labels for individual values, represented by each concentric circle, and
    // shown against the north vertical axis.

    const labels = (common) => {
        return common
            .append('text')
            .attr('x', 5)
            .attr('y', (_, i) => -1 * diameter(i, radius, range))
            .attr('dy', "0.4em")
            .style('fill', '#999')
            .style('font-family', 'sans-serif')
            .style('font-size', "11px")
            .text((d) => d);
    };

    // Common base d3 elements generated from the basic range of values calculated
    // from the maturity axes.

    const common = () => {
        return grid
            .selectAll('.radial')
            .data(range)
            .enter()
            .append('g');
    };

    // Common base d3 elements (instance);

    const _common = common();

    return {
        circles: circles(_common),
        labels: labels(_common)
    };
};

// Grid

export const grid = (axes, dimensions, graphics, { scale }) => {

    const grid = (graphics) => {
        return graphics
            .append('g')
            .attr('class', 'grid');
    };

    const _grid = grid(graphics);
    const _radial = radial(axes, _grid, dimensions);
    const _axials = axial(axes, _grid, scale);

    return grid;
};
