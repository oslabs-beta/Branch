"use strict";
const treeData = {
    name: 'http://localhost:3000',
    parent: null,
    children: [
        {
            name: '/choresAndUsers',
            parent: 'http://localhost:3000',
            children: [
                {
                    name: '/',
                    method: ['GET'],
                    parent: 'router1',
                    children: null,
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
// ************** Generate the tree diagram	 *****************
let margin = { top: 20, right: 120, bottom: 20, left: 175 }, width = 800 - margin.right - margin.left, height = 400 - margin.top - margin.bottom;
let i = 0, duration = 750, root;
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
let zoom = d3.zoom().on('zoom', handleZoom);
function handleZoom(e) {
    d3.select('svg g').attr('transform', e.transform);
}
function initZoom() {
    d3.select('svg').call(zoom);
}
initZoom();
root = treeData;
root.x0 = height / 2;
root.y0 = 0;
update(root);
d3.select(self.frameElement).style('height', '400px');
d3.select(self.frameElement).style('width', '800px');
function update(source) {
    // Compute the new tree layout.
    let nodes = tree.nodes(root).reverse(), links = tree.links(nodes);
    // Update the nodes…
    let node = svg.selectAll('g.node').data(nodes, function (d) {
        return d.id || (d.id = ++i);
    });
    // Enter any new nodes at the parent's previous position.
    let nodeEnter = node
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
    let nodeUpdate = node
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
    let nodeExit = node
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
        let o = { x: source.x0, y: source.y0 };
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
        let o = { x: source.x, y: source.y };
        return diagonal({ source: o, target: o });
    })
        .remove();
    // Stash the old positions for transition.
    nodes.forEach(function (d) {
        d.x0 = d.x;
        d.y0 = d.y;
    });
    // svg.call(d3.zoom()
    //       .extent([[0, 0], [width, height]])
    //       .scaleExtent([1, 8])
    //       .on("zoom", zoomed));
    //   function zoomed({transform}) {
    //     g.attr("transform", transform);
    //   }
    //   return svg.node();
}
// Event handler for clicking a node
function click(d) {
    //fetch localhost3000 ${d.name} + ${method[0]}
    let pathStr = '';
    if (d.method) {
        const fullPath = [];
        while (d.parent) {
            fullPath.unshift(d.parent);
            d.parent = d.parent.parent;
        }
        for (let i = 0; i < fullPath.length; i++) {
            if (fullPath[i].name)
                pathStr += fullPath[i].name;
        }
        pathStr += d.name;
        console.log('PATHSTR', pathStr);
    }
    fetch(pathStr)
        .then((data) => data.json())
        .then((data) => {
        const dataDiv = document.createElement('div');
        dataDiv.innerText = JSON.stringify(data);
        document.querySelector('#fetch').append(dataDiv);
    });
    console.log(d.method, d.name);
    const methodData = document.getElementById('treeData');
    methodData.textContent = d.method;
    const fetchData = document.getElementById('fetch');
    if (d.children) {
        d._children = d.children;
        d.children = null;
    }
    else {
        d.children = d._children;
        d._children = null;
    }
    update(d);
}
//click handler for query params - input args?
function clickHandler() {
    //findby id and add .value
    const key = document.getElementById('key').value;
    console.log(key);
    document.getElementById('key').value = '';
    const value = document.getElementById('value').value;
    console.log(value);
    document.getElementById('value').value = '';
    const description = document.getElementById('description').value;
    console.log(description);
    document.getElementById('description').value = '';
}
//# sourceMappingURL=tree.js.map