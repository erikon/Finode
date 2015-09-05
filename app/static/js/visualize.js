var data = [{
    "price": 202,
    "year": 1985
}, {
    "price": 215,
    "year": 1990
}, {
    "price": 179,
    "year": 1998
}, {
    "price": 199,
    "year": 2005
}, {
    "price": 134,
    "year": 2012
}, {
    "price": 176,
    "year": 2015
}];

var vis = d3.select('#visualisation'),
    WIDTH = 1000,
    HEIGHT = 500,
    MARGINS = {
      top: 20,
      right: 20,
      bottom: 20,
      left: 50
    },
    xRange = d3.scale.linear().range([MARGINS.left, WIDTH - MARGINS.right]).domain([d3.min(data, function(d) {
      return d.year;
    }), d3.max(data, function(d) {
      return d.year;
    })]),
    yRange = d3.scale.linear().range([HEIGHT - MARGINS.top, MARGINS.bottom]).domain([d3.min(data, function(d) {
      return d.price;
    }), d3.max(data, function(d) {
      return d.price;
    })]),
    xAxis = d3.svg.axis()
      .scale(xRange)
      .tickSize(5)
      .tickSubdivide(true),
    yAxis = d3.svg.axis()
      .scale(yRange)
      .tickSize(5)
      .orient('left')
      .tickSubdivide(true);


vis.append("svg:g")
  .attr("class", "x axis")
  .attr("transform", "translate(0," + (HEIGHT - MARGINS.bottom) + ")")
  .call(xAxis);
vis.append("svg:g")
  .attr("class", "y axis")
  .attr("transform", "translate(" + (MARGINS.left) + ",0)")
  .call(yAxis);
