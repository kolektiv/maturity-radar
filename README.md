# maturity-radar

## Overview

A simple JS library for embedding a maturity radar, given axis definitions and target/actual values. It allows you to embed a clear and intuitive maturity radar anywhere you can embed HTML and JavaScript. The display includes colourization based on maturity level (on a traffic light gradient) and hover functionality to provide tooltip access to metrics and maturity levels.

The maturity radar in use looks like this (this is the demo file provided in the repo as `/dist/index.html`, which is also useful if you want to modify the code for your own use (NPM and WebPack is the short answer to the first question you'll ask).

![Maturity Radar](/docs/radar.png?raw=true "Maturity Radar")

## Usage

You can use the the library directly from the githack CDN by referencing the following URI:

`https://rawcdn.githack.com/kolektiv/maturity-radar/master/dist/radar.js`

To use the maturity radar, create an empty page element in which to embed the radar, and include the library:

```html
<div id="demo"></div>
<script src="https://rawcdn.githack.com/kolektiv/maturity-radar/master/dist/radar.js"></script>
```

Now, simply define your data in a script element. The `radar.show` function takes a selector for the element to use as a container, and an object containing a desired pixel size, and the metrics to display, like so.

```html
<script>
radar.show('#demo', {
  size: 700,
  metrics: [
    {
      name: "Metric 1",
      range: [
        "Value 0",
        "Value 1",
        "Value 2",
        "Value 3"
      ],
      target: 2,
      actual: 1
    },
    ...
  ]
});
</script>
```

Each metric requires a **name**, a **range** (a simple ordered array of maturity values, from 0 onwards), a **target** maturity level, and an **actual** maturity level. The library is quite adaptive. It should cope reasonably well with metrics with different cardinalities, maturity measures with different numbers of metrics.

## Acknowledgements

maturity-radar contains a tree-shaken version of various d3 libraries (it is built using d3).

The maturity radar is a simplified and specialised version of the radar chart work done by Nadieh Bremer (https://bl.ocks.org/nbremer). It has been rebuilt to be less generic and more opinionated, focused solely on providing a simple and embeddable way to display maturity levels.
