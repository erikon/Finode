var StockGraph = function(height, width, margins, data) {
  this.margins = margins;
  this.height = d3.select(".d3-container").style("height").split("px").shift();
  this.width = d3.select(".d3-container").style("width").split("px").shift();
  this.data = data;
  this.maximum = d3.max(this.data, function(d) {
    return d3.max(d, function(x) {
      return parseFloat(x.close_p);
    })
  });

  this.toDate = function(str) {
    date = str.split("-");
    return new Date(
      parseInt(date[0]),
      parseInt(date[1]),
      parseInt(date[2])
    );
  }

  this.minDate = this.toDate(
    d3.min(this.data, function(d) {
      return d3.min(d, function(x) {
        return x.date_ex;
      })
    })
  );

  this.maxDate = this.toDate(
    d3.max(this.data, function(d) {
      return d3.max(d, function(x) {
        return x.date_ex;
      })
    })
  );

  console.log(this.minDate + " " + this.maxDate);

  this.draw = function() {
    var that = this;
    var vis = d3.select(".d3-panel")
        .attr("viewBox","0 0 " + this.width + " " + this.height)
        .attr("width", "100%")
        .attr("height", "100%")
        .attr("preserveAspectRatio", "xMaxyMax meet"),
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
      .call(xAxis)
      .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-0.8em")
      .attr("dy", "0.3em")
      .attr("transform", "rotate(-45)");
    vis.append("g")
      .attr("class", "y axis")
      .call(yAxis);

    for (var x = 0; x < this.data.length; x++) {
      var lineGen = d3.svg.line()
        .x(function (d) { return xRange(that.toDate(d.date_ex)); })
        .y(function (d) { return yRange(parseFloat(d.close_p)); })
      vis.append("path")
        .attr("d", lineGen(data[x]))
        .attr("stroke-width", 1)
        .attr("fill", "none");
    }
  }
}
