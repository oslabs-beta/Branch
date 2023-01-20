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
          method: ["GET, POST", "DELETE", "PUT"],
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
              reqParamRequired: "false",
              children: null
            },
            {
              name: "DELETE",
              method: ["DELETE"],
              parent: "router1",
              reqParamRequired: "true",
              children: null
            },
            {
              name: "PUT",
              method: ["PUT"],
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
var displayTree = (treeData2) => {
  const margin = { top: 20, right: 120, bottom: 20, left: 175 }, width = 800 - margin.right - margin.left, height = 400 - margin.top - margin.bottom;
  let i = 0;
  const duration = 750;
  const root = treeData2;
  let tree = d3.layout.tree().size([height, width]);
  let diagonal = d3.svg.diagonal().projection(function(d) {
    return [d.y, d.x];
  });
  let svg = d3.select(".treeContainer").append("svg").attr("width", width + margin.right + margin.left).classed("svg", true).attr("height", height + margin.top + margin.bottom).append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  root.x0 = height / 2;
  root.y0 = 0;
  update2(root);
  d3.select(self.frameElement).style("height", "400px");
  d3.select(self.frameElement).style("width", "800px");
  function update2(source) {
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
};
window.addEventListener("message", (msg) => {
  displayTree(treeData);
});
var pathStr = "";
function click(d, node) {
  const required = document.querySelector(".required");
  if (d.method[0] === "GET") {
    required.innerText = "";
    document.querySelector(".get").style.backgroundColor = "red";
    document.querySelector("#url").style.borderColor = "red";
    document.querySelector(".put").style.backgroundColor = "#eee5d5";
    document.querySelector("#key").style.borderColor = "#b7c5b7";
    document.querySelector("#value").style.borderColor = "#b7c5b7";
    document.querySelector(".delete").style.backgroundColor = "#eee5d5";
    document.querySelector(".post").style.backgroundColor = "#eee5d5";
  }
  if (d.method[0] === "POST") {
    document.querySelector("#url").value = "";
    required.innerText = "";
    document.querySelector(".post").style.backgroundColor = "red";
    document.querySelector("#key").style.borderColor = "red";
    document.querySelector("#value").style.borderColor = "red";
    document.querySelector(".put").style.backgroundColor = "#eee5d5";
    document.querySelector(".get").style.backgroundColor = "#eee5d5";
    document.querySelector("#url").style.borderColor = "#b7c5b7";
    document.querySelector(".delete").style.backgroundColor = "#eee5d5";
  }
  if (d.method[0] === "PUT") {
    required.innerText = "";
    document.querySelector(".put").style.backgroundColor = "red";
    document.querySelector("#key").style.borderColor = "red";
    document.querySelector("#value").style.borderColor = "red";
    document.querySelector("#url").style.borderColor = "red";
    document.querySelector(".delete").style.backgroundColor = "#eee5d5";
    document.querySelector(".get").style.backgroundColor = "#eee5d5";
    document.querySelector(".post").style.backgroundColor = "#eee5d5";
  }
  if (d.method[0] === "DELETE") {
    required.innerText = "";
    document.querySelector(".delete").style.backgroundColor = "red";
    document.querySelector("#url").style.borderColor = "red";
    document.querySelector(".put").style.backgroundColor = "#eee5d5";
    document.querySelector("#key").style.borderColor = "#b7c5b7";
    document.querySelector("#value").style.borderColor = "#b7c5b7";
    document.querySelector(".get").style.backgroundColor = "#eee5d5";
    document.querySelector(".post").style.backgroundColor = "#eee5d5";
  }
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
    for (let i = 0; i < fullPath.length; i++) {
      if (fullPath[i].name) {
        pathStr += fullPath[i].name;
      }
    }
  }
  if (d.reqParamRequired && d.method[0] !== "POST") {
    input.value = pathStr + ":ENTER PARAM ID HERE";
  }
  if (d.method[0] === "GET" && d.reqParamRequired === false) {
    fetch(pathStr).then((data) => data.json()).then((data) => {
      data = JSON.stringify(data);
      codemirror.getDoc().setValue(data);
    });
  }
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
