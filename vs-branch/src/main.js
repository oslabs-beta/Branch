const treeData = {
  name: 'http://localhost:3000',
  parent: null,
  children: [
    {
      name: '/chore',
      parent: 'http://localhost:3000',
      children: [
        {
          name: '/',
          method: ['GET, POST'],
          parent: 'router1',
          children: [
            {
              name: 'GET',
              method: ['GET'],
              parent: 'router1',
              reqParamRequired: 'true',
              children: null,
            },
            {
              name: 'POST',
              method: ['POST'],
              parent: 'router1',
              reqParamRequired: 'true',
              children: null,
            },
          ],
        },
        {
          name: '/pasta',
          method: ['POST'],
          parent: 'router1',
          children: null,
        },
      ],
    },
    {
      name: '/',
      method: ['GET', 'POST'],
      children: null,
      parent: 'http://localhost:3000',
    },
  ],
};

const margin = { top: 20, right: 120, bottom: 20, left: 175 },
  width = 800 - margin.right - margin.left,
  height = 400 - margin.top - margin.bottom;
let i = 0;
const duration = 750;
const root = treeData;
let tree = d3.layout.tree().size([height, width]);
let diagonal = d3.svg.diagonal().projection(function (d) {
  return [d.y, d.x];
});
let svg = d3
  .select('.treeContainer')
  .append('svg')
  .attr('width', width + margin.right + margin.left)
  .classed('svg', true)
  .attr('height', height + margin.top + margin.bottom)
  .append('g')
  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
root.x0 = height / 2;
root.y0 = 0;
update(root);
d3.select(self.frameElement).style('height', '400px');
d3.select(self.frameElement).style('width', '800px');
function update(source) {
  // Compute the new tree layout.
  const nodes = tree.nodes(root).reverse(),
    links = tree.links(nodes);
  // Update the nodes…
  const node = svg.selectAll('g.node').data(nodes, function (d) {
    return d.id || (d.id = ++i);
  });
  // Enter any new nodes at the parent's previous position.
  const nodeEnter = node
    .enter()
    .append('g')
    .attr('class', 'node')
    .attr('transform', function (d) {
      return 'translate(' + source.y0 + ',' + source.x0 + ')';
    })
    .on('click', click);
  nodeEnter
    .append('circle')
    .attr('r', 1e-6)
    .style('fill', function (d) {
      return d._children ? 'lightsteelblue' : '#fff';
    });
  nodeEnter
    .append('text')
    .attr('x', function (d) {
      return d.children || d._children ? -13 : 13;
    })
    .attr('dy', '.35em')
    .attr('text-anchor', function (d) {
      return d.children || d._children ? 'end' : 'start';
    })
    .text(function (d) {
      return d.name;
    })
    .style('fill-opacity', 1e-6);
  // Transition nodes to their new position.
  const nodeUpdate = node
    .transition()
    .duration(duration)
    .attr('transform', function (d) {
      return 'translate(' + d.y + ',' + d.x + ')';
    });
  nodeUpdate
    .select('circle')
    .attr('r', 10)
    .style('fill', function (d) {
      return d._children ? 'lightsteelblue' : '#fff';
    });
  nodeUpdate.select('text').style('fill-opacity', 1);
  // Transition exiting nodes to the parent's new position.
  const nodeExit = node
    .exit()
    .transition()
    .duration(duration)
    .attr('transform', function (d) {
      return 'translate(' + source.y + ',' + source.x + ')';
    })
    .remove();
  nodeExit.select('circle').attr('r', 1e-6);
  nodeExit.select('text').style('fill-opacity', 1e-6);
  // Update the links…
  let link = svg.selectAll('path.link').data(links, function (d) {
    return d.target.id;
  });
  // Enter any new links at the parent's previous position.
  link
    .enter()
    .insert('path', 'g')
    .attr('class', 'link')
    .attr('d', function (d) {
      const o = { x: source.x0, y: source.y0 };
      return diagonal({ source: o, target: o });
    });
  // Transition links to their new position.
  link.transition().duration(duration).attr('d', diagonal);
  // Transition exiting nodes to the parent's new position.
  link
    .exit()
    .transition()
    .duration(duration)
    .attr('d', function (d) {
      const o = { x: source.x, y: source.y };
      return diagonal({ source: o, target: o });
    })
    .remove();
  // Stash the old positions for transition.
  nodes.forEach(function (d) {
    d.x0 = d.x;
    d.y0 = d.y;
  });
}
let pathStr = '';
// Event handler for clicking a node
function click(d, node) {
  //get the node clicked on and change the color so that we know which route is being checked

  //check if d.reqParamRequired === true
  //if true, move cursor to query key box and popup alert or message saying to add params
  //if param required and key input empty
  pathStr = '';
  let input = document.querySelector('#url');
  input.value = '';
  // console.log('method', d.method);
  if (d.method) {
    const fullPath = [];
    console.log('d.parent', d.parent);
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
    // console.log('PATHSTR', pathStr);
  }
  if (d.reqParamRequired) {
    // console.log(pathStr);
    input.value = pathStr + ':ENTER PARAM HERE';
    // return addAlert();
  }

  fetch(pathStr)
    .then((data) => data.json())
    .then((data) => {
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

let bodyObj = {};

//click handler for query params - input args?
function checkRoute() {
  console.log('Pathstr', pathStr);
  const key = document.getElementById('key').value;
  console.log(key);
  document.getElementById('key').value = '';
  const value = document.getElementById('value').value;
  console.log(value);
  document.getElementById('value').value = '';

  // console.log(bodyObj);
  // console.log(pathStr);
  fetch(pathStr, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(bodyObj),
  })
    .then((data) => data.json())
    .then((data) => {
      data = JSON.stringify(data);
      codemirror.getDoc().setValue(data);
    });
}

const addParams = () => {
  const keyInfo = document.getElementById('key').value;
  document.getElementById('key').value = '';
  const valueInfo = document.getElementById('value').value;
  document.getElementById('value').value = '';
  bodyObj[keyInfo] = valueInfo;
  document.querySelector('.reqObj').innerText = JSON.stringify(bodyObj);
};

// const addAlert = function () {
//   let h2 = document.querySelector('.alert');

//   h2.innerText = 'Please enter a req param';
// };

const checkParam = () => {
  const urlPath = document.querySelector('#url').value;
  fetch(urlPath)
    .then((data) => data.json())
    .then((data) => {
      data = JSON.stringify(data);
      codemirror.getDoc().setValue(data);
    });
};
