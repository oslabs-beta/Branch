// src/main.js
var treeData = {
  name: "http://localhost:3000",
  parent: null,
  children: [
    {
      name: "/chore",
      parent: "http://localhost:3000",
      children: [
        {
          name: "/",
          method: ["GET, POST"],
          parent: "router1",
          children: [
            {
              name: "GET",
              method: ["GET"],
              parent: "router1",
              reqParamRequired: "true",
              children: null
            },
            {
              name: "POST",
              method: ["POST"],
              parent: "router1",
              reqParamRequired: "true",
              children: null
            }
          ]
        },
        {
          name: "/pasta",
          method: ["POST"],
          parent: "router1",
          children: null
        }
      ]
    },
    {
      name: "/",
      method: ["GET", "POST"],
      children: null,
      parent: "http://localhost:3000"
    }
  ]
};
var margin = { top: 20, right: 120, bottom: 20, left: 175 };
var width = 800 - margin.right - margin.left;
var height = 400 - margin.top - margin.bottom;
var i = 0;
var duration = 750;
var root = treeData;
var tree = d3.layout.tree().size([height, width]);
var diagonal = d3.svg.diagonal().projection(function(d) {
  return [d.y, d.x];
});
var svg = d3.select(".treeContainer").append("svg").attr("width", width + margin.right + margin.left).classed("svg", true).attr("height", height + margin.top + margin.bottom).append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
root.x0 = height / 2;
root.y0 = 0;
update(root);
d3.select(self.frameElement).style("height", "400px");
d3.select(self.frameElement).style("width", "800px");
function update(source) {
  const nodes = tree.nodes(root).reverse(), links = tree.links(nodes);
  const node = svg.selectAll("g.node").data(nodes, function(d) {
    return d.id || (d.id = ++i);
  });
  const nodeEnter = node.enter().append("g").attr("class", "node").attr("transform", function(d) {
    return "translate(" + source.y0 + "," + source.x0 + ")";
  }).on("click", click);
  nodeEnter.append("circle").attr("r", 1e-6).style("fill", function(d) {
    return d._children ? "lightsteelblue" : "#fff";
  });
  nodeEnter.append("text").attr("x", function(d) {
    return d.children || d._children ? -13 : 13;
  }).attr("dy", ".35em").attr("text-anchor", function(d) {
    return d.children || d._children ? "end" : "start";
  }).text(function(d) {
    return d.name;
  }).style("fill-opacity", 1e-6);
  const nodeUpdate = node.transition().duration(duration).attr("transform", function(d) {
    return "translate(" + d.y + "," + d.x + ")";
  });
  nodeUpdate.select("circle").attr("r", 10).style("fill", function(d) {
    return d._children ? "lightsteelblue" : "#fff";
  });
  nodeUpdate.select("text").style("fill-opacity", 1);
  const nodeExit = node.exit().transition().duration(duration).attr("transform", function(d) {
    return "translate(" + source.y + "," + source.x + ")";
  }).remove();
  nodeExit.select("circle").attr("r", 1e-6);
  nodeExit.select("text").style("fill-opacity", 1e-6);
  let link = svg.selectAll("path.link").data(links, function(d) {
    return d.target.id;
  });
  link.enter().insert("path", "g").attr("class", "link").attr("d", function(d) {
    const o = { x: source.x0, y: source.y0 };
    return diagonal({ source: o, target: o });
  });
  link.transition().duration(duration).attr("d", diagonal);
  link.exit().transition().duration(duration).attr("d", function(d) {
    const o = { x: source.x, y: source.y };
    return diagonal({ source: o, target: o });
  }).remove();
  nodes.forEach(function(d) {
    d.x0 = d.x;
    d.y0 = d.y;
  });
}
var pathStr = "";
function click(d, node) {
  pathStr = "";
  let input = document.querySelector("#url");
  input.value = "";
  if (d.method) {
    const fullPath = [];
    console.log("d.parent", d.parent);
    const tempD = structuredClone(d);
    while (tempD.parent) {
      fullPath.unshift(tempD.parent);
      tempD.parent = tempD.parent.parent;
    }
    for (let i2 = 0; i2 < fullPath.length; i2++) {
      if (fullPath[i2].name) {
        pathStr += fullPath[i2].name;
      }
    }
  }
  if (d.reqParamRequired) {
    input.value = pathStr + ":ENTER PARAM HERE";
  }
  fetch(pathStr).then((data) => data.json()).then((data) => {
    data = JSON.stringify(data);
    codemirror.getDoc().setValue(data);
  });
  if (d.children) {
    d._children = d.children;
    d.children = null;
  } else {
    d.children = d._children;
    d._children = null;
  }
  update(d);
}
//# sourceMappingURL=main.js.map
