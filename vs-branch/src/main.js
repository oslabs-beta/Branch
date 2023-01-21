/* eslint-disable no-unused-vars */
// deno-lint-ignore-file no-unused-vars
/* eslint-disable no-undef */
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
  // ************** Generate the tree diagram	 *****************
  const margin = { top: 20, right: 120, bottom: 20, left: 175 },
    width = 800 - margin.right - margin.left,
    height = 400 - margin.top - margin.bottom;

  let i = 0;
  const duration = 750;
  const root = treeData;

  const tree = d3.layout.tree().size([height, width]);

  const diagonal = d3.svg.diagonal().projection(function (d) {
    return [d.y, d.x];
  });

  const svg = d3
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
    const link = svg.selectAll('path.link').data(links, function (d) {
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
// deno-lint-ignore no-window-prefix
window.addEventListener('message', (msg) => {
  displayTree(treeData);
});

//string that we will use to build/rebuild our path
let pathStr = '';
// Event handler for clicking a node
function click(d, node) {
  //saving html elements into variables for easier access
  const required = document.querySelector('.required');
  const get = document.querySelector('.get');
  const post = document.querySelector('.post');
  const url = document.querySelector('#url');
  const put = document.querySelector('.put');
  const delete1 = document.querySelector('.delete');
  const key = document.querySelector('#key');
  const value = document.querySelector('#value');



  /*highlight the required fields based on the request type and 
  ensure that all non-required fields are changed back to their original color*/
  if (d.method[0] === 'GET') {
    //required fields 
    required.innerText = '';
    get.style.backgroundColor = 'red';
    url.style.borderColor = 'red';
    //unnecessary fields
    put.style.backgroundColor = '#eee5d5';
    key.style.borderColor = '#b7c5b7';
    value.style.borderColor = '#b7c5b7';
    delete1.style.backgroundColor = '#eee5d5';
    post.style.backgroundColor = '#eee5d5';
    // document.querySelector('.addParam').style.backgroundColor = '#eee5d5';
  }
  if (d.method[0] === 'POST') {
    url.value = '';
    required.innerText = '';
    post.style.backgroundColor = 'red';
    key.style.borderColor = 'red';
    value.style.borderColor = 'red';
    // document.querySelector('.addParam').style.backgroundColor = 'red'

    put.style.backgroundColor = '#eee5d5';
    get.style.backgroundColor = '#eee5d5';
    url.style.borderColor = '#b7c5b7';
    delete1.style.backgroundColor = '#eee5d5';
  }
  if (d.method[0] === 'PUT') {
    required.innerText = '';
    put.style.backgroundColor = 'red';
    key.style.borderColor = 'red';
    value.style.borderColor = 'red';
    url.style.borderColor = 'red';
    // document.querySelector('.addParam').style.backgroundColor = 'red'

    delete1.style.backgroundColor = '#eee5d5';
    get.style.backgroundColor = '#eee5d5';
    post.style.backgroundColor = '#eee5d5';
  }
  if (d.method[0] === 'DELETE') {
    required.innerText = '';
    delete1.style.backgroundColor = 'red';
    url.style.borderColor = 'red';

    put.style.backgroundColor = '#eee5d5';
    key.style.borderColor = '#b7c5b7';
    value.style.borderColor = '#b7c5b7';
    get.style.backgroundColor = '#eee5d5';
    post.style.backgroundColor = '#eee5d5';
    // document.querySelector('.addParam').style.backgroundColor = '#eee5d5';
  }

  
  pathStr = '';
  const input = document.querySelector('#url');
  input.value = '';

  //if the node has a method property, it is an endpoint and we need to construct our urlpath for the fetch
  if (d.method) {
    const fullPath = [];
    //save node to temp variable so we don't mutate orignal object
    const tempD = structuredClone(d);
    //push each part of url path into an array using each node's parent to find the next route
    while (tempD.parent) {
      fullPath.unshift(tempD.parent);
      tempD.parent = tempD.parent.parent;
    }
    //loop through path array to create url string called pathStr
    for (let i = 0; i < fullPath.length; i++) {
      if (fullPath[i].name) {
        pathStr += fullPath[i].name;
      }
    }
  }
  //if a param is required - generate the urlpath and add instructions then populate the url input
  if (d.reqParamRequired && d.method[0] !== 'POST') {
    input.value = pathStr + ':ENTER PARAM ID HERE';
  } else {
    input.value = pathStr;
  }

  //if there is no param required for the GET request, fetch all 
  if (d.method[0] === 'GET' && d.reqParamRequired === false) {
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

//The bodyObj will store the request body for post and put requests and reset after each request
let bodyObj = {};

//click handler to be used for checking POST request routes
function checkRoute() {
  const key = document.getElementById('key').value;
  document.getElementById('key').value = '';
  const value = document.getElementById('value').value;
  document.getElementById('value').value = '';
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

// click handler to be used for adding information to the schema for put and post requests
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

//click handler to be used for GET requests
const checkParam = () => {
  document.querySelector('.get').style.backgroundColor = '#eee5d5';
  const urlPath = document.querySelector('#url').value;
  fetch(urlPath)
    .then((data) => data.json())
    .then((data) => {
      data = JSON.stringify(data);
      codemirror.getDoc().setValue(data);
    });
};

//reusable object to store status information to be sent to codemirror for PUT and DELETE
const statusInfo = {};
//click handler to be used for delete requests
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
      // console.log(data.status, data.body, data);
      statusInfo['status code'] = data.status;
      statusInfo['status'] = data.statusText;
      data = JSON.stringify(statusInfo);
      codemirror.getDoc().setValue(data);
    });
}

//click handler to be used for PUT requests
function put() {
  document.querySelector('.put').style.backgroundColor = '#eee5d5';
  document.querySelector('#key').style.borderColor = '#b7c5b7';
  document.querySelector('#value').style.borderColor = '#b7c5b7';
  document.querySelector('#url').style.borderColor = '#b7c5b7';
  // document.querySelector('.addParam').style.backgroundColor = '#eee5d5';
  const urlPath = document.querySelector('#url').value;
  document.getElementById('key').value = '';
  document.getElementById('value').value = '';
  fetch(urlPath, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(bodyObj),
  }).then((data) => {
    statusInfo['status code'] = data.status;
    statusInfo['status'] = data.statusText;
    data = JSON.stringify(statusInfo);
    codemirror.getDoc().setValue(status);
  });
}

//click handler for clearing the bodyObj using the X button (for typos)
const deleteReqBody = () => {
  bodyObj = {};
  document.querySelector('.reqObj').innerText = '';
};

function sum(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

module.exports = {sum, subtract, click, checkRoute, addParams, checkParam, deleteItem, put, deleteReqBody};

// export default main