
var StockGraph = function(height, width, margins, data) {
  this.height = height;
  this.width = width;
  this.margins = margins;
  this.data = data;
  this.maximum = d3.max(this.data, function(d) {
    return parseFloat(d.close_p);
  });
  console.log(this.maximum);

  this.toDate = function(str) {
    date = str.split("-");
    return new Date(
      parseInt(date[0]),
      parseInt(date[1]),
      parseInt(date[2])
    );
  }

  this.minDate = this.toDate(this.data[0].date_ex);
  this.maxDate = this.toDate(this.data[this.data.length - 1].date_ex);

  this.draw = function() {
    var that = this;
    var vis = d3.select(".d3-panel")
        .attr("width", this.width + this.margins.left + this.margins.right)
        .attr("height", this.height + this.margins.top + this.margins.bottom),
      xRange = d3.time.scale()
        .range([0, this.width])
        .domain([this.minDate, this.maxDate]),
      yRange = d3.scale.linear()
        .range([this.height, 0])
        .domain([0, this.maximum]),
      xAxis = d3.svg.axis()
        .scale(xRange)
        .orient("bottom")
        .ticks(d3.time.year)
        .tickFormat(d3.time.format("%Y")),
      yAxis = d3.svg.axis()
        .scale(yRange)
        .orient('left');

    vis.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + this.height + ")")
      .call(xAxis);
    vis.append("g")
      .attr("class", "y axis")
      .call(yAxis);

    var lineGen = d3.svg.line()
      .x(function (d) { return xRange(that.toDate(d.date_ex)); })
      .y(function (d) { return yRange(parseFloat(d.close_p)); })
    vis.append("path")
      .attr("d", lineGen(data))
      .attr("stroke-width", 2)
      .attr("fill", "none");
  }
}
