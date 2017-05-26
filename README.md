# maturity-radar
A simple JS library for embedding a maturity radar, given axis definitions and target/actual values.

<div id="demo"></div>

<script src="https://rawcdn.githack.com/kolektiv/maturity-radar/master/dist/radar.js"></script>

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
    {
      name: "Metric 2",
      range: [
        "Value 0",
        "Value 1",
        "Value 2",
        "Value 3"
      ],
      target: 3,
      actual: 0
    },
    {
      name: "Metric 3",
      range: [
        "Value 0",
        "Value 1",
        "Value 2",
        "Value 3"
      ],
      target: 2,
      actual: 2
    },
    {
      name: "Metric 4",
      range: [
        "Value 0",
        "Value 1",
        "Value 2",
        "Value 3"
      ],
      target: 3,
      actual: 2
    },
    {
      name: "Metric 5",
      range: [
        "Value 0",
        "Value 1",
        "Value 2",
        "Value 3"
      ],
      target: 3,
      actual: 0
    }
  ]
});
</script>
