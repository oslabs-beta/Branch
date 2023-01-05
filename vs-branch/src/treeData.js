"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const treeData = {
    "name": "http://localhost:3000",
    "parent": null,
    "children": [
        {
            "name": "/router1",
            "parent": "http://localhost:3000",
            "children": [
                {
                    "name": "/",
                    "method": ["GET"],
                    "parent": "router1",
                    "children": null
                },
                {
                    "name": "/pasta",
                    "method": ["POST"],
                    "parent": "router1",
                    "children": null
                }
            ]
        },
        {
            "name": "/",
            "method": ["GET", "POST"],
            "children": null,
            "parent": "http://localhost:3000"
        }
    ]
};
exports.default = treeData;
//# sourceMappingURL=treeData.js.map