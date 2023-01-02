// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as path from 'path';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(
		vscode.commands.registerCommand('catCoding.start', () => {
		  // Create and show panel
		  const panel = vscode.window.createWebviewPanel(
			'catCoding',
			'Cat Coding',
			vscode.ViewColumn.One,
			{
				// Enable scripts in the webview
				enableScripts: true,
				// // Only allow the webview to access resources in our extension's media directory
				// localResourceRoots: [vscode.Uri.file(path.join(context.extensionPath, 'media'))]
			}
		  );
	
			// Get path to resource on disk
			const onDiskPath = vscode.Uri.file(
				path.join(context.extensionPath, 'src', 'tree.js')
			);
		
			// And get the special URI to use with the webview
			const treeJS = panel.webview.asWebviewUri(onDiskPath);
		
			panel.webview.html = getWebviewContent(treeJS);
		})
	  );

}


function getWebviewContent() {
	return `<!DOCTYPE html>
  <html lang="en">
  <head>
	  <meta charset="UTF-8">
	  <meta name="viewport" content="width=device-width, initial-scale=1.0">
	  <title>Cat Coding</title>
	  <script src="https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.17/d3.min.js"></script>
	  <style>
	
	  .node {
		  cursor: pointer;
	  }
  
	  .node circle {
		fill: #fff;
		stroke: steelblue;
		stroke-width: 3px;
	  }
  
	  .node text {
		font: 12px sans-serif;
	  }
  
	  .link {
		fill: none;
		stroke: #ccc;
		stroke-width: 2px;
	  }
	  
	  </style>
  </head>
  <body>
	  <img src="https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif" width="300" />
	  <h1 id="lines-of-code-counter">0</h1>

	  <script>
	  var treeData = [
		{
		  "name": "LocalHost:8000",
		  "parent": "null",
		  "children": [
			{
			  "name": "/User",
			  "parent": "LocalHost:8000",
			  "children": [
			  {
				  "name": "/",
				  "method": "GET",
				  "parent": "LocalHost:8000"
				},
				{
				  "name": "/login",
				  "method": "POST",
				  "parent": "LocalHost:8000"
				},
				{
				  "name": "/createuser",
				  "method": "POST",
				  "parent": "Level 2: A"
				}
			  ]
			},
			{
			  "name": "/about",
			  "parent": "LocalHost:8000"
			}
		  ]
		}
	  ];
	  
	  
	  // ************** Generate the tree diagram	 *****************
	  var margin = {top: 20, right: 120, bottom: 20, left: 120},
		  width = 960 - margin.right - margin.left,
		  height = 500 - margin.top - margin.bottom;
		  
	  var i = 0,
		  duration = 750,
		  root;
	  
	  var tree = d3.layout.tree()
		  .size([height, width]);
	  
	  var diagonal = d3.svg.diagonal()
		  .projection(function(d) { return [d.y, d.x]; });
	  
	  var svg = d3.select("body").append("svg")
		  .attr("width", width + margin.right + margin.left)
		  .attr("height", height + margin.top + margin.bottom)
		.append("g")
		  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
	  
	  root = treeData[0];
	  root.x0 = height / 2;
	  root.y0 = 0;
		
	  update(root);
	  
	  d3.select(self.frameElement).style("height", "500px");
	  
	  function update(source) {
	  
		// Compute the new tree layout.
		var nodes = tree.nodes(root).reverse(),
			links = tree.links(nodes);
	  
		// Normalize for fixed-depth.
		nodes.forEach(function(d) { d.y = d.depth * 180; });
	  
		// Update the nodes…
		var node = svg.selectAll("g.node")
			.data(nodes, function(d) { return d.id || (d.id = ++i); });
	  
		// Enter any new nodes at the parent's previous position.
		var nodeEnter = node.enter().append("g")
			.attr("class", "node")
			.attr("transform", function(d) { return "translate(" + source.y0 + "," + source.x0 + ")"; })
			.on("click", click);
	  
		nodeEnter.append("circle")
			.attr("r", 1e-6)
			.style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });
	  
		nodeEnter.append("text")
			.attr("x", function(d) { return d.children || d._children ? -13 : 13; })
			.attr("dy", ".35em")
			.attr("text-anchor", function(d) { return d.children || d._children ? "end" : "start"; })
			.text(function(d) { return d.name; })
			.style("fill-opacity", 1e-6);
	  
		// Transition nodes to their new position.
		var nodeUpdate = node.transition()
			.duration(duration)
			.attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; });
	  
		nodeUpdate.select("circle")
			.attr("r", 10)
			.style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });
	  
		nodeUpdate.select("text")
			.style("fill-opacity", 1);
	  
		// Transition exiting nodes to the parent's new position.
		var nodeExit = node.exit().transition()
			.duration(duration)
			.attr("transform", function(d) { return "translate(" + source.y + "," + source.x + ")"; })
			.remove();
	  
		nodeExit.select("circle")
			.attr("r", 1e-6);
	  
		nodeExit.select("text")
			.style("fill-opacity", 1e-6);
	  
		// Update the links…
		var link = svg.selectAll("path.link")
			.data(links, function(d) { return d.target.id; });
	  
		// Enter any new links at the parent's previous position.
		link.enter().insert("path", "g")
			.attr("class", "link")
			.attr("d", function(d) {
			  var o = {x: source.x0, y: source.y0};
			  return diagonal({source: o, target: o});
			});
	  
		// Transition links to their new position.
		link.transition()
			.duration(duration)
			.attr("d", diagonal);
	  
		// Transition exiting nodes to the parent's new position.
		link.exit().transition()
			.duration(duration)
			.attr("d", function(d) {
			  var o = {x: source.x, y: source.y};
			  return diagonal({source: o, target: o});
			})
			.remove();
	  
		// Stash the old positions for transition.
		nodes.forEach(function(d) {
		  d.x0 = d.x;
		  d.y0 = d.y;
		});
	  }
	  
	  // Toggle children on click.
	  function click(d) {
		  console.log(d.method, d.name)
	  
		  fetch('https://swapi.dev/api/people/1')
		  .then((response) => response.json())
		  .then((data) => console.log(data));
	  
		if (d.children) {
		  d._children = d.children;
		  d.children = null;
		} else {
		  d.children = d._children;
		  d._children = null;
		}
		update(d);
	  }
	  
    </script>
</body>
  </html>`;
  }

// This method is called when your extension is deactivated
export function deactivate() {}
