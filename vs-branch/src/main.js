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
          method: ['GET, POST', 'DELETE', 'PUT'],
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
              reqParamRequired: 'false',
              children: null,
            },
            {
              name: 'DELETE',
              method: ['DELETE'],
              parent: 'router1',
              reqParamRequired: 'true',
              children: null,
            },
            {
              name: 'PUT',
              method: ['PUT'],
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

const displayTree = (treeData) => {
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
};

// window.addEventListener('message', msg => {displayTree(msg.data)});
window.addEventListener('message', (msg) => {
  displayTree(treeData);
});

let pathStr = '';
// Event handler for clicking a node
function click(d, node) {
  const required = document.querySelector('.required');
  
  if (d.method[0] === 'GET') {
    required.innerText = '';
    document.querySelector('.get').style.backgroundColor = 'red';
    document.querySelector('#url').style.borderColor = 'red';

    document.querySelector('.put').style.backgroundColor = '#eee5d5';
    document.querySelector('#key').style.borderColor = '#b7c5b7';
    document.querySelector('#value').style.borderColor = '#b7c5b7';
    document.querySelector('.delete').style.backgroundColor = '#eee5d5';
    document.querySelector('.post').style.backgroundColor = '#eee5d5';
    // document.querySelector('.addParam').style.backgroundColor = '#eee5d5';
  }
  if (d.method[0] === 'POST') {
    document.querySelector('#url').value = '';
    required.innerText = '';
    document.querySelector('.post').style.backgroundColor = 'red';
    document.querySelector('#key').style.borderColor = 'red';
    document.querySelector('#value').style.borderColor = 'red';
    // document.querySelector('.addParam').style.backgroundColor = 'red'

    document.querySelector('.put').style.backgroundColor = '#eee5d5';
    document.querySelector('.get').style.backgroundColor = '#eee5d5';
    document.querySelector('#url').style.borderColor = '#b7c5b7';
    document.querySelector('.delete').style.backgroundColor = '#eee5d5';
  }
  if (d.method[0] === 'PUT') {
    required.innerText = '';
    document.querySelector('.put').style.backgroundColor = 'red';
    document.querySelector('#key').style.borderColor = 'red';
    document.querySelector('#value').style.borderColor = 'red';
    document.querySelector('#url').style.borderColor = 'red';
    // document.querySelector('.addParam').style.backgroundColor = 'red'

    document.querySelector('.delete').style.backgroundColor = '#eee5d5';
    document.querySelector('.get').style.backgroundColor = '#eee5d5';
    document.querySelector('.post').style.backgroundColor = '#eee5d5';
  }
  if (d.method[0] === 'DELETE') {
    required.innerText = '';
    document.querySelector('.delete').style.backgroundColor = 'red';
    document.querySelector('#url').style.borderColor = 'red';

    document.querySelector('.put').style.backgroundColor = '#eee5d5';
    document.querySelector('#key').style.borderColor = '#b7c5b7';
    document.querySelector('#value').style.borderColor = '#b7c5b7';
    document.querySelector('.get').style.backgroundColor = '#eee5d5';
    document.querySelector('.post').style.backgroundColor = '#eee5d5';
    // document.querySelector('.addParam').style.backgroundColor = '#eee5d5';
  }

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
  if (d.reqParamRequired && d.method[0] !== 'POST') {
    // console.log(pathStr);
    input.value = pathStr + ':ENTER PARAM ID HERE';
    // return addAlert();
  }
  if(d.method[0] === 'GET' && d.reqParamRequired === false) {
  fetch(pathStr)
    .then((data) => data.json())
    .then((data) => {
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

let bodyObj = {};

//click handler for query params - input args?
// eslint-disable-next-line no-unused-vars
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

// eslint-disable-next-line no-unused-vars
const addParams = () => {
  const required = document.querySelector('.required');
  required.innerText = '';
  const keyInfo = document.getElementById('key').value;
  document.getElementById('key').value = '';
  const valueInfo = document.getElementById('value').value;
  document.getElementById('value').value = '';
  if (keyInfo !== '' && valueInfo !== '') {
    bodyObj[keyInfo] = valueInfo;
  } else {
    required.innerText = 'Please add key and value';
  }
  document.querySelector('.reqObj').innerText = JSON.stringify(bodyObj);
};

// const addAlert = function () {
//   let h2 = document.querySelector('.alert');

//   h2.innerText = 'Please enter a req param';
// };

// eslint-disable-next-line no-unused-vars
const checkParam = () => {
  document.querySelector('.get').style.backgroundColor = '#eee5d5';
  const urlPath = document.querySelector('#url').value;
  fetch(urlPath)
  // .then((data) => data.json())
  .then((data) => {
    data = JSON.stringify(data);
    codemirror.getDoc().setValue(data);
  });
};

function deleteItem() {
  document.querySelector('.delete').style.backgroundColor = '#eee5d5';
  document.querySelector('#url').style.borderColor = '#b7c5b7';
  const urlPath = document.querySelector('#url').value;
  document.getElementById('url').value = '';

  fetch(urlPath, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  // .then((data) => data.json())
  .then((data) => {
    console.log(data)
    data = JSON.stringify(data);
    codemirror.getDoc().setValue(data);
  });
}

function put() {
  document.querySelector('.put').style.backgroundColor = '#eee5d5';
  document.querySelector('#key').style.borderColor = '#b7c5b7';
  document.querySelector('#value').style.borderColor = '#b7c5b7';
  document.querySelector('#url').style.borderColor = '#b7c5b7';
  // document.querySelector('.addParam').style.backgroundColor = '#eee5d5';

  //id from req.param
  const urlPath = document.querySelector('#url').value;

  //bodyObj

  document.getElementById('key').value = '';
  document.getElementById('value').value = '';

  fetch(urlPath, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(bodyObj),
  })
    .then(data => {
    data = JSON.stringify(data.status)
    codemirror.getDoc().setValue(data);
    });
}

const deleteReqBody = () => {
  reqBody = {};
  document.querySelector('.reqObj').innerText = '';
}