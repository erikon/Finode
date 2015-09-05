var toDate = function(str) {
  date = str.split("-");
  return new Date(
    parseInt(date[0]),
    parseInt(date[1]),
    parseInt(date[2])
  )
}

var data = [{
    "price": 202,
    "date": "2014-06-01"
}, {
    "price": 215,
    "date": "2014-06-02"
}, {
    "price": 179,
    "date": "2014-06-03"
}, {
    "price": 199,
    "date": "2014-06-04"
}, {
    "price": 134,
    "date": "2014-06-05"
}, {
    "price": 176,
    "date": "2014-06-06"
}];

var maximum = d3.max(data, function(d) {
  return d.price;
});

var WIDTH = 1000,
HEIGHT = 350,
MARGINS = {
  top: 20,
  right: 20,
  bottom: 20,
  left: 20
}

var vis = d3.select('#visualization')
    .attr("width", WIDTH + MARGINS.left + MARGINS.right)
    .attr("height", HEIGHT + MARGINS.top + MARGINS.bottom),
  xRange = d3.time.scale()
    .range([0, WIDTH])
    .domain([toDate("2014-06-01"), toDate("2014-06-06")]),
  yRange = d3.scale.linear()
    .range([HEIGHT, 0])
    .domain([0, maximum]),
  xAxis = d3.svg.axis()
    .scale(xRange)
    .orient("bottom")
    .tickFormat(d3.time.format("%x")),
  yAxis = d3.svg.axis()
    .scale(yRange)
    .orient('left');

vis.append("g")
  .attr("class", "x axis")
  .attr("transform", "translate(0," + HEIGHT + ")")
  .call(xAxis);
vis.append("g")
  .attr("class", "y axis")
  .call(yAxis);

  var lineGen = d3.svg.line()
      .x(function (d) { console.log(toDate(d.date)); return xRange(toDate(d.date)) })
      .y(function (d) { return yRange(d.price); })
  vis.append("path")
      .attr("d", lineGen(data))
      .attr("stroke-width", 2)
      .attr("fill", "none");
