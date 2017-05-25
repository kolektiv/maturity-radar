import { scaleLinear } from 'd3-scale';

// Axial

export const axes = ({ metrics }) => {
    const global = metrics.map(m => {
        const local = m.range.map(m => m.value);

        return {
            min: Math.min.apply(null, local),
            max: Math.max.apply(null, local)
        };
    });

    return {
        arc: Math.PI * 2 / metrics.length,
        count: metrics.length,
        names: metrics.map(m => m.name),
        range: {
            min: Math.min.apply(null, global.map(v => v.min)) - 1,
            max: Math.max.apply(null, global.map(v => v.max)) + 1
        }
    };
};

// Dimensional

export const dimensions = (data) => {
    return {
        radius: 300
    };
};

// Radial

export const diameter = (index, radius, range) => {
    return radius - (index * (radius / (range.max - range.min)));
};

// Scalar

export const scales = (axes, dimensions) => {
    return {
        scale: scaleLinear()
            .range([0, dimensions.radius])
            .domain([axes.range.min, axes.range.max])
    };
};
