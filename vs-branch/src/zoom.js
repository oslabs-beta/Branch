d3 = require("d3@6");

height = 600;


  const randomX = d3.randomNormal(width / 2, 80);
  const randomY = d3.randomNormal(height / 2, 80);
  return Array.from({length: 2000}, () => [randomX(), randomY()]);



const svg = d3.create("svg")
        .attr("viewBox", [0, 0, width, height]);
  
    const g = svg.append("g");
  
    g.selectAll("circle")
      .data(data)
      .join("circle")
        .attr("cx", ([x]) => x)
        .attr("cy", ([, y]) => y)
        .attr("r", 1.5);
  
    svg.call(d3.zoom()
        .extent([[0, 0], [width, height]])
        .scaleExtent([1, 8])
        .on("zoom", zoomed));
  
    function zoomed({transform}) {
      g.attr("transform", transform);
    }
  
    return svg.node();

