// src/main.js
var displayTree = (treeData) => {
  const margin = { top: 20, right: 120, bottom: 20, left: 175 }, width = 800 - margin.right - margin.left, height = 400 - margin.top - margin.bottom;
  let i = 0;
  const duration = 750;
  const root = treeData;
  const tree = d3.layout.tree().size([height, width]);
  const diagonal = d3.svg.diagonal().projection(function(d) {
    return [d.y, d.x];
  });
  const svg = d3.select(".treeContainer").append("svg").attr("width", width + margin.right + margin.left).classed("svg", true).attr("height", height + margin.top + margin.bottom).append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
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
    const link = svg.selectAll("path.link").data(links, function(d) {
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
  console.log(msg.data);
  displayTree(msg.data);
});
var pathStr = "";
function click(d, node) {
  console.log(d);
  const required = document.querySelector(".required");
  const get = document.querySelector(".get");
  const post = document.querySelector(".post");
  const url = document.querySelector("#url");
  const put2 = document.querySelector(".put");
  const delete1 = document.querySelector(".delete");
  const key = document.querySelector("#key");
  const value = document.querySelector("#value");
  const string = d.methods[0].toLowerCase();
  if (string === "get") {
    required.innerText = "";
    get.style.backgroundColor = "red";
    url.style.borderColor = "red";
    put2.style.backgroundColor = "#eee5d5";
    key.style.borderColor = "#b7c5b7";
    value.style.borderColor = "#b7c5b7";
    delete1.style.backgroundColor = "#eee5d5";
    post.style.backgroundColor = "#eee5d5";
  }
  if (string === "post") {
    url.value = "";
    required.innerText = "";
    post.style.backgroundColor = "red";
    key.style.borderColor = "red";
    value.style.borderColor = "red";
    put2.style.backgroundColor = "#eee5d5";
    get.style.backgroundColor = "#eee5d5";
    url.style.borderColor = "#b7c5b7";
    delete1.style.backgroundColor = "#eee5d5";
  }
  if (string === "put") {
    required.innerText = "";
    put2.style.backgroundColor = "red";
    key.style.borderColor = "red";
    value.style.borderColor = "red";
    url.style.borderColor = "red";
    delete1.style.backgroundColor = "#eee5d5";
    get.style.backgroundColor = "#eee5d5";
    post.style.backgroundColor = "#eee5d5";
  }
  if (string === "delete") {
    required.innerText = "";
    delete1.style.backgroundColor = "red";
    url.style.borderColor = "red";
    put2.style.backgroundColor = "#eee5d5";
    key.style.borderColor = "#b7c5b7";
    value.style.borderColor = "#b7c5b7";
    get.style.backgroundColor = "#eee5d5";
    post.style.backgroundColor = "#eee5d5";
  }
  pathStr = "";
  const input = document.querySelector("#url");
  input.value = "";
  if (d.methods.length > 0) {
    const fullPath = [];
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
  if (d.reqParamRequired && d.methods[0] !== "post") {
    input.value = pathStr + ":ENTER PARAM ID HERE";
  } else {
    input.value = pathStr;
  }
  if (d.methods[0] === "get" && d.reqParamRequired === false) {
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
var bodyObj = {};
function checkRoute() {
  const key = document.getElementById("key").value;
  document.getElementById("key").value = "";
  const value = document.getElementById("value").value;
  document.getElementById("value").value = "";
  fetch(pathStr, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(bodyObj)
  }).then((data) => data.json()).then((data) => {
    data = JSON.stringify(data);
    codemirror.getDoc().setValue(data);
  });
}
var addParams = () => {
  const required = document.querySelector(".required");
  required.innerText = "";
  const keyInfo = document.getElementById("key").value;
  document.getElementById("key").value = "";
  const valueInfo = document.getElementById("value").value;
  document.getElementById("value").value = "";
  if (keyInfo !== "" && valueInfo !== "") {
    bodyObj[keyInfo] = valueInfo;
  } else {
    required.innerText = "Please add key and value";
  }
  document.querySelector(".reqObj").innerText = JSON.stringify(bodyObj);
};
var checkParam = () => {
  document.querySelector(".get").style.backgroundColor = "#eee5d5";
  const urlPath = document.querySelector("#url").value;
  fetch(urlPath).then((data) => data.json()).then((data) => {
    data = JSON.stringify(data);
    codemirror.getDoc().setValue(data);
  });
};
var statusInfo = {};
function deleteItem() {
  document.querySelector(".delete").style.backgroundColor = "#eee5d5";
  document.querySelector("#url").style.borderColor = "#b7c5b7";
  const urlPath = document.querySelector("#url").value;
  document.getElementById("url").value = "";
  fetch(urlPath, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    }
  }).then((data) => {
    statusInfo["status code"] = data.status;
    statusInfo["status"] = data.statusText;
    data = JSON.stringify(statusInfo);
    codemirror.getDoc().setValue(data);
  });
}
function put() {
  document.querySelector(".put").style.backgroundColor = "#eee5d5";
  document.querySelector("#key").style.borderColor = "#b7c5b7";
  document.querySelector("#value").style.borderColor = "#b7c5b7";
  document.querySelector("#url").style.borderColor = "#b7c5b7";
  const urlPath = document.querySelector("#url").value;
  document.getElementById("key").value = "";
  document.getElementById("value").value = "";
  fetch(urlPath, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(bodyObj)
  }).then((data) => {
    statusInfo["status code"] = data.status;
    statusInfo["status"] = data.statusText;
    data = JSON.stringify(statusInfo);
    codemirror.getDoc().setValue(status);
  });
}
var deleteReqBody = () => {
  bodyObj = {};
  document.querySelector(".reqObj").innerText = "";
};
function sum(a, b) {
  return a + b;
}
function subtract(a, b) {
  return a - b;
}
module.exports = { sum, subtract, click, checkRoute, addParams, checkParam, deleteItem, put, deleteReqBody };
//# sourceMappingURL=main.js.map
