"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const Card = ({ children, className = '' }) => {
    return (react_1.default.createElement("div", { className: `card ${className}` }, children));
};
exports.default = Card;
//# sourceMappingURL=card.js.map