/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../../dist/PathData.js":
/*!**********************************************************************************!*\
  !*** /Users/gijsburghoorn/Documents/Programmeren/ts-svgmanager/dist/PathData.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * A JS Class representing the HTML-Path D attribute
 */
class PathData {
    constructor() {
        this._inner = '';
    }
    /**
     * Appends a move to a certain point to the PathData
     *
     * # Note / Arguments
     * For further information: [Look here](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths#Line_commands)
     */
    moveTo(x, y) {
        this._inner += ` M ${x} ${y}`;
        return this;
    }
    /**
     * Appends a line to a certain point to the PathData
     *
     * # Note / Arguments
     * For further information: [Look here](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths#Line_commands)
     */
    lineTo(x, y) {
        this._inner += ` L ${x} ${y}`;
        return this;
    }
    /**
     * Appends a horizontal line to a certain x-value to the PathData
     *
     * # Note / Arguments
     * For further information: [Look here](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths#Line_commands)
     */
    horizontalLineTo(x) {
        this._inner += ` H ${x}`;
        return this;
    }
    /**
     * Appends a vertical line to a certain y-value to the PathData
     *
     * # Note / Arguments
     * For further information: [Look here](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths#Line_commands)
     */
    verticalLineTo(y) {
        this._inner += ` V ${y}`;
        return this;
    }
    /**
     * Appends a line to a certain point relative to where the last action ended to the PathData
     *
     * # Note / Arguments
     * For further information: [Look here](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths#Line_commands)
     */
    lineRelativeTo(x, y) {
        this._inner += ` l ${x} ${y}`;
        return this;
    }
    /**
     * Appends a horizontal line to a certain x-value relative to where the last action ended to the PathData
     *
     * # Note / Arguments
     * For further information: [Look here](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths#Line_commands)
     */
    horizontalLineRelativeTo(x) {
        this._inner += ` h ${x}`;
        return this;
    }
    /**
     * Appends a vertical line to a certain y-value relative to where the last action ended to the PathData
     *
     * # Note / Arguments
     * For further information: [Look here](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths#Line_commands)
     */
    verticalLineRelativeTo(y) {
        this._inner += ` v ${y}`;
        return this;
    }
    /**
     * Appends a curve to a certain point to the PathData, using control point 1 & 2
     *
     * # Note / Arguments
     * For further information: [Look here](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths#Bezier_Curves)
     */
    curveTo(endX, endY, control1X, control1Y, control2X, control2Y) {
        this._inner += ` C ${control1X} ${control1Y}, ${control2X} ${control2Y}, ${endX} ${endY}`;
        return this;
    }
    /**
     * Appends a curve to a certain point relative to where the last action ended to the PathData, using control point 1 & 2
     *
     * # Note / Arguments
     * For further information: [Look here](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths#Bezier_Curves)
     */
    curveRelativeTo(endX, endY, control1X, control1Y, control2X, control2Y) {
        this._inner += ` c ${control1X} ${control1Y}, ${control2X} ${control2Y}, ${endX} ${endY}`;
        return this;
    }
    /**
     * Appends a smooth curve (following a normal curve) to a certain point to the PathData, using control point 2
     *
     * # Note / Arguments
     * For further information: [Look here](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths#Bezier_Curves)
     */
    smoothCurveTo(endX, endY, control1X, control1Y, control2X, control2Y) {
        this._inner += ` S ${control1X} ${control1Y}, ${control2X} ${control2Y}, ${endX} ${endY}`;
        return this;
    }
    /**
     * Appends a smooth curve (following a normal curve) to a certain point
     * relative to where the last action ended to the PathData, using control point 2
     *
     * # Note / Arguments
     * For further information: [Look here](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths#Bezier_Curves)
     */
    smoothCurveRelativeTo(endX, endY, controlX, controlY) {
        this._inner += ` s ${controlX} ${controlY}, ${endX} ${endY}`;
        return this;
    }
    /**
     * Appends a quadratic curve to a certain point
     * to the PathData, using control point 1
     *
     * # Note / Arguments
     * For further information: [Look here](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths#Bezier_Curves)
     */
    quadraticCurveTo(endX, endY, controlX, controlY) {
        this._inner += ` Q ${controlX} ${controlY}, ${endX} ${endY}`;
        return this;
    }
    /**
     * Appends a quadratic curve to a certain point
     * relative to where the last action ended to the PathData, using control point 1
     *
     * # Note / Arguments
     * For further information: [Look here](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths#Bezier_Curves)
     */
    quadraticCurveRelativeTo(endX, endY, controlX, controlY) {
        this._inner += ` q ${controlX} ${controlY}, ${endX} ${endY}`;
        return this;
    }
    /**
     * Appends a quadratic curve (following a quadratic curve) to a certain point
     * to the PathData,
     * smoothing out the curve using the previous quadratic curve
     *
     * # Note / Arguments
     * For further information: [Look here](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths#Bezier_Curves)
     */
    quadraticStringTo(x, y) {
        this._inner += ` T ${x} ${y}`;
        return this;
    }
    /**
     * Appends a quadratic curve (following a quadratic curve) to a certain point
     * relative to where the last action ended to the PathData,
     * smoothing out the curve using the previous quadratic curve
     *
     * # Note / Arguments
     * For further information: [Look here](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths#Bezier_Curves)
     */
    quadraticStringRelativeTo(x, y) {
        this._inner += ` t ${x} ${y}`;
        return this;
    }
    /**
     * Appends an arc to a certain point to the PathData
     *
     * # Note / Arguments
     * For further information: [Look here](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths#Arcs)
     */
    arcTo(x, y, rx, ry, xAxisRotation, largeArcFlag, sweepFlag) {
        this._inner += ` A ${rx} ${ry} ${xAxisRotation} ${largeArcFlag ? '1' : '0'} ${sweepFlag ? '1' : '0'} ${x} ${y}`;
        return this;
    }
    /**
     * Appends an arc to a certain point relative to where the last action ended to the PathData
     *
     * # Note / Arguments
     * For further information: [Look here](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths#Arcs)
     */
    arcRelativeTo(x, y, rx, ry, xAxisRotation, largeArcFlag, sweepFlag) {
        this._inner += ` a ${rx} ${ry} ${xAxisRotation} ${largeArcFlag ? '1' : '0'} ${sweepFlag ? '1' : '0'} ${x} ${y}`;
        return this;
    }
    /**
     * Closes a PathData
     *
     * # Note / Arguments
     * For further information: [Look here](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths#Line_commands)
     */
    closePath() {
        this._inner += ` Z`;
        return this;
    }
    toString() {
        return this._inner.trim();
    }
}
exports.default = PathData;


/***/ }),

/***/ "../../dist/SVGManager.js":
/*!************************************************************************************!*\
  !*** /Users/gijsburghoorn/Documents/Programmeren/ts-svgmanager/dist/SVGManager.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const V2D_1 = __webpack_require__(/*! ./V2D */ "../../dist/V2D.js");
const SVGNode_1 = __webpack_require__(/*! ./SVGNode */ "../../dist/SVGNode.js");
const uuid_1 = __webpack_require__(/*! uuid */ "../../node_modules/uuid/dist/esm-browser/index.js");
const DEFINITION_PREFIX = 'figure-';
const NAME_PREFIX = 'named-';
const DEFAULT_SVG_WIDTH = '500px';
const DEFAULT_SVG_HEIGHT = '500px';
const DEFAULT_VIEWBOX = '0 0 100 100';
/**
 * A class used to manage SVG's in order to minimize definitions
 * and make controlling it from JS/TS as easy and reliable as possible.
 */
class SVGManager {
    /**
     * Constructs a empty SVGManager object
     */
    constructor() {
        this._managerid = uuid_1.v4();
        this._defintions = [];
        this._names = [];
    }
    defsElement() {
        let defs = this._svgElement.getElementsByTagName('defs');
        return defs[0];
    }
    prefixManagerId(str) {
        return this._managerid + '-' + str;
    }
    toDefId(elementId) {
        return this.prefixManagerId(DEFINITION_PREFIX + elementId);
    }
    getName(name) {
        return this.prefixManagerId(NAME_PREFIX + name);
    }
    doesDefExist(elementId) {
        return this._defintions.includes(elementId);
    }
    doesNameExist(name) {
        return this._names.includes(name);
    }
    addDefintion(element) {
        const elementId = element.toHash();
        this._defintions.push(elementId);
        this.defsElement().appendChild(element.set('id', this.toDefId(elementId)).toHTML());
        return elementId;
    }
    addFigure(elementId, position) {
        this._svgElement.appendChild(new SVGNode_1.default('use')
            .set('href', '#' + elementId)
            .set('x', position.x().toString())
            .set('y', position.y().toString())
            .toHTML());
    }
    addNamedFigure(name, elementId, position) {
        if (this.doesNameExist(name))
            throw new Error('Name already exists!');
        this._svgElement.appendChild(new SVGNode_1.default('use')
            .set('href', '#' + elementId)
            .set('x', position.x().toString())
            .set('y', position.y().toString())
            .set('id', this.getName(name))
            .toHTML());
        this._names.push(name);
    }
    /**
     * Initializes the SVGManager to DOM within the container with id *rootId*
     *
     * # Note
     * This svg has some default styling:
     * - viewBox of '0 0 100 100'
     * - width of 500px
     * - height of 500px
     * @param rootId The parent id
     */
    init(rootId) {
        let rootElement = document.getElementById(rootId);
        this._rootElement = rootElement;
        this._defintions = [];
        this._names = [];
        const svgElement = new SVGNode_1.default('svg')
            .set('viewBox', DEFAULT_VIEWBOX)
            .set('width', DEFAULT_SVG_WIDTH)
            .set('height', DEFAULT_SVG_HEIGHT)
            .set('id', this._managerid)
            .append(new SVGNode_1.default('defs'))
            .toHTML();
        this._svgElement = this._rootElement.appendChild(svgElement);
    }
    /**
     * Adds vector to the position of minimum of the viewBox
     * @param v vector to be added
     */
    moveViewBox(v) {
        const viewBox = this.get('viewBox').split(' ');
        const minX = parseInt(viewBox[0]) + v.x();
        const minY = parseInt(viewBox[1]) + v.y();
        const width = parseInt(viewBox[2]);
        const height = parseInt(viewBox[3]);
        this.set('viewBox', `${minX} ${minY} ${width} ${height}`);
    }
    /**
     * Sets the width of the SVG root
     * @param width new width
     */
    setWidth(width) {
        this.set('width', width + 'px');
    }
    /**
     * Sets the height of the SVG root
     * @param height new height
     */
    setHeight(height) {
        this.set('height', height + 'px');
    }
    /**
     * Adds the definition of element to list of definitions,
     * So that next time, when it is used, the element can rendered using the definition.
     */
    ensureDefinition(element) {
        const elementId = element.toHash();
        if (!this.doesDefExist(elementId)) {
            this.addDefintion(element);
        }
        return elementId;
    }
    /**
     * Renders a figure to the SVG using a figure ID/Hash.
     *
     * # Note
     * Requires a definition to present for the figure ID
     * otherwise it throws a Error
     */
    renderId(elementId, position) {
        if (!this.doesDefExist(elementId))
            throw new Error("Tried to render an Id that doesn't exist");
        this.addFigure(this.toDefId(elementId), position);
    }
    /**
     * Renders a figure to the SVG using a SVGNode
     *
     * # Note
     * Will add the figure to definitions if not already there.
     */
    render(element, position) {
        const elementId = element.toHash();
        if (!this.doesDefExist(elementId)) {
            this.addDefintion(element);
        }
        this.addFigure(this.toDefId(elementId), position);
        return elementId;
    }
    /**
     * Renders a figure to the SVG using a SVGNode with a callback name.\
     * If this name already exists, it will not do anything and output this to the debug console.
     *
     * # Note
     * Will add the figure to definitions if not already there.
     */
    renderNamed(name, element, position) {
        if (this.doesNameExist(name)) {
            console.debug('SVG Manager: Tried to reuse name for named figure, stop execution. (renderNamed)');
            return;
        }
        const elementId = element.toHash();
        if (!this.doesDefExist(elementId)) {
            this.addDefintion(element);
        }
        this.addNamedFigure(name, this.toDefId(elementId), position);
    }
    /**
     * Renders a figure to the SVG using a figure ID/Hash with a callback name.\
     * If this name already exists, it will not do anything and output this to the debug console.
     *
     * # Note
     * Requires a definition to present for the figure ID
     * otherwise it throws a Error
     */
    renderNamedId(name, elementId, position) {
        if (this.doesNameExist(name)) {
            console.debug('SVG Manager: Tried to reuse name for named figure, stop execution. (renderNamedId)');
            return;
        }
        if (!this.doesDefExist(elementId))
            throw new Error("Tried to render an Id that doesn't exist");
        this.addNamedFigure(name, this.toDefId(elementId), position);
    }
    /**
     * Moves a named figure to *v*\
     * If named item does not exist, it will not do anything.
     */
    moveNamed(name, v) {
        const elem = document.getElementById(this.getName(name));
        if (elem === null)
            return;
        if (elem.tagName === 'g') {
            elem.setAttribute('transform', `translate(${v.x()}, ${v.y()})`);
        }
        else {
            elem.setAttribute('x', `${v.x()}`);
            elem.setAttribute('y', `${v.y()}`);
        }
    }
    /**
     * Fetches location of a named figure\
     * If named item does not exist, it will throw a error.
     */
    fetchNamedLocation(name) {
        const elem = document.getElementById(this.getName(name));
        if (elem === null)
            throw new Error('Named item does not exist');
        if (elem.tagName === 'g') {
            const transform_value = elem.getAttribute('transform');
            const t_translate_value = transform_value.substr('translate('.length);
            const translate_values = t_translate_value
                .substr(0, t_translate_value.length - 1)
                .split(', ');
            return new V2D_1.default(parseInt(translate_values[0]), parseInt(translate_values[1]));
        }
        else {
            return new V2D_1.default(parseInt(elem.getAttribute('x')), parseInt(elem.getAttribute('y')));
        }
    }
    /**
     * Removes a named figure from the DOM\
     * If named item does not exist, it will not do anything.
     */
    removeNamed(name) {
        const item = document.getElementById(this.getName(name));
        if (item !== null)
            this._svgElement.removeChild(item);
        this._names = this._names.filter((x) => x !== name);
    }
    /**
     * Removes a named figure from the DOM, if it exists\
     * Then will render *element* in its place.
     */
    rerenderNamed(name, element, position) {
        this.removeNamed(name);
        this.renderNamed(name, element, position);
    }
    /**
     * Renders a SVGNode *element* to the DOM without definition.
     */
    seperateRenderNamed(name, element, position) {
        this._svgElement.appendChild(element
            .set('id', this.getName(name))
            .set('x', position.x().toString())
            .set('y', position.y().toString())
            .toHTML());
    }
    /**
     * Removes the SVG from the DOM
     */
    remove() {
        this._rootElement.removeChild(this._svgElement);
    }
    /**
     * Removes all the content from the SVG in the DOM including the definitions
     */
    clean() {
        this._svgElement.innerHTML = '';
        this._defintions = [];
        this._names = [];
        this._svgElement.appendChild(new SVGNode_1.default('defs').toHTML());
    }
    /**
     * Fetch an attribute value from root SVG element
     * @param attr Attribute name
     */
    get(attr) {
        return this._svgElement.getAttribute(attr) || '';
    }
    /**
     * Set/change an attribute value from root SVG element
     * @param attr Attribute name
     * @param value Set value
     */
    set(attr, value) {
        this._svgElement.setAttribute(attr, value);
        return this;
    }
    /**
     * Returns the unique identifier connected to this SVGManager
     */
    id() {
        return this._managerid;
    }
}
exports.default = SVGManager;


/***/ }),

/***/ "../../dist/SVGNode.js":
/*!*********************************************************************************!*\
  !*** /Users/gijsburghoorn/Documents/Programmeren/ts-svgmanager/dist/SVGNode.js ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const md5_1 = __webpack_require__(/*! ts-md5/dist/md5 */ "../../node_modules/ts-md5/dist/md5.js");
const SVG_NAMESPACE = 'http://www.w3.org/2000/svg';
/**
 * A JS Representation of a HTML-Node.
 * More specifically, all the SVG Types Nodes.
 */
class SVGNode {
    /**
     * Construct a SVGNode respresenting the *tag* element
     * with no attributes, children or inner text.
     */
    constructor(tag) {
        this._tag = tag;
        this._attributes = new Map();
        this._children = [];
        this._innerText = '';
    }
    /**
     * Mutates the SVGNode to add/change an attribute *attr* to *value*.
     * Then, it returns itself, for easy programming.
     *
     * # Note
     * The id attribute is used within SVG Manager and will therefore most likely be overwritten.
     */
    set(attr, value) {
        this._attributes.set(attr, value);
        return this;
    }
    /**
     * Mutates the SVGNode to change an attribute *attr*
     * by putting its value through the function *f*.
     * Then, it returns itself, for easy programming.
     *
     * # Note
     * If the attribute was not set, the call still succeeds but does nothing.
     */
    map(attr, f) {
        const value = this._attributes.get(attr);
        if (value === undefined)
            return this;
        this._attributes.set(attr, f(value));
        return this;
    }
    /**
     * Mutates the SVGNode to append an child SVGNode *child*
     * to the children of the current SVGNode.
     * Then, it returns itself, for easy programming.
     */
    append(child) {
        this._children.push(child);
        return this;
    }
    /**
     * Mutates the SVGNode to set the inner text to *text*.
     * Then, it returns itself, for easy programming.
     */
    setText(text) {
        this._innerText = text;
        return this;
    }
    /**
     * Returns the JS SVGElement equavalent of current SVGNode
     */
    toHTML() {
        const element = document.createElementNS(SVG_NAMESPACE, this._tag);
        this._attributes.forEach((value, attr) => {
            element.setAttribute(attr, value);
        });
        element.innerHTML = this._innerText;
        this._children.forEach((child) => element.appendChild(child.toHTML()));
        return element;
    }
    /**
     * Returns the hashstring of SVGNode
     */
    toHash() {
        let md5 = new md5_1.Md5();
        md5.appendStr('tag' + this._tag);
        md5.appendStr('innertext' + this._innerText);
        const attributeArray = [];
        this._attributes.forEach((value, key) => {
            attributeArray.push(`${key} - ${value}`);
        });
        attributeArray
            .sort((a, b) => (a < b ? 1 : a === b ? 0 : -1))
            .forEach((attributeString) => {
            md5.appendStr('attribute' + attributeString);
        });
        const childrenHashes = this._children
            .map((child) => child.toHash())
            .sort((a, b) => (a < b ? 1 : a === b ? 0 : -1))
            .forEach((childHash) => md5.appendStr('child' + childHash));
        return md5.end();
    }
}
exports.default = SVGNode;


/***/ }),

/***/ "../../dist/Shapes.js":
/*!********************************************************************************!*\
  !*** /Users/gijsburghoorn/Documents/Programmeren/ts-svgmanager/dist/Shapes.js ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const V2D_1 = __webpack_require__(/*! ./V2D */ "../../dist/V2D.js");
const PathData_1 = __webpack_require__(/*! ./PathData */ "../../dist/PathData.js");
const SVGNode_1 = __webpack_require__(/*! ./SVGNode */ "../../dist/SVGNode.js");
/**
 * Returns a SVGNode containing a circle with radius *r* and
 * includes default styling
 *
 * # Note
 * Default styling includes:
 *  - cx, cy both zero
 *  - black 1px outline
 *  - transparent fill
 *
 * These can all be overwritten using the SVGNode.set() method
 */
exports.circle = (r) => new SVGNode_1.default('circle')
    .set('cx', '0')
    .set('cy', '0')
    .set('stroke', '#000')
    .set('stroke-width', '1px')
    .set('fill', 'transparent')
    .set('r', r.toString());
/**
 * Returns a SVGNode containing a line between two
 * points/vectors *from* and *to* and default styling
 *
 * # Note
 * Default styling includes:
 *  - black 1px line
 *
 * These can all be overwritten using the SVGNode.set() method
 */
exports.line = (from, to) => new SVGNode_1.default('line')
    .set('x1', from.x().toString())
    .set('y1', from.y().toString())
    .set('x2', to.x().toString())
    .set('y2', to.y().toString())
    .set('stroke', '#000')
    .set('stroke-width', '1px');
/**
 * Returns a SVGNode containing a path with lines between multiple
 * points/vectors in *points* and adds default styling
 *
 * # Note
 * Default styling includes:
 *  - black 1px lines
 *  - no filling
 *
 * These can all be overwritten using the SVGNode.set() method
 */
exports.lines = (points) => {
    const pathData = new PathData_1.default().moveTo(points[0].x(), points[0].y());
    points.shift();
    points.forEach((point) => pathData.lineTo(point.x(), point.y()));
    return new SVGNode_1.default('path')
        .set('d', pathData.toString())
        .set('stroke', '#000')
        .set('stroke-width', '1px')
        .set('fill', 'none');
};
/**
 * Returns a SVGNode containing a quadratic-curve between two
 * points/vectors *from* and *to*
 * and uses *control* as a quadratic-curve control point. Also adds default styling.
 *
 * # Note
 * Default styling includes:
 *  - black 1px lines
 *
 * These can all be overwritten using the SVGNode.set() method
 */
exports.curve = (from, to, control) => new SVGNode_1.default('path')
    .set('d', new PathData_1.default()
    .moveTo(from.x(), from.y())
    .quadraticCurveTo(to.x(), to.y(), control.x(), control.y())
    .toString())
    .set('stroke', '#000')
    .set('stroke-width', '1px');
/**
 * Returns a SVGNode containing a quadratic-curve between two
 * points/vectors *from* and *to*
 * and uses *curving* to determine the amount of the curvature.
 * Also adds default styling.
 *
 * # Note
 * Default styling includes:
 *  - black 1px lines
 *  - transparent filling
 *
 * These can all be overwritten using the SVGNode.set() method
 */
exports.curveCalc = (from, to, curving) => {
    const middle = from.middle(to);
    const dif = to.sub(from);
    let normal = new V2D_1.default(-1 * dif.y(), dif.x());
    if (!((normal.y() > 0 && curving >= 0) || (normal.y() < 0 && curving < 0)))
        normal = normal.sca(-1);
    const normalNormalized = middle.add(normal.sca((2 * curving) / normal.length()));
    return new SVGNode_1.default('path')
        .set('d', new PathData_1.default()
        .moveTo(from.x(), from.y())
        .quadraticCurveTo(to.x(), to.y(), normalNormalized.x(), normalNormalized.y())
        .toString())
        .set('fill', 'transparent')
        .set('stroke', '#000')
        .set('stroke-width', '1px');
};


/***/ }),

/***/ "../../dist/V2D.js":
/*!*****************************************************************************!*\
  !*** /Users/gijsburghoorn/Documents/Programmeren/ts-svgmanager/dist/V2D.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * # V2D
 * A 2 Dimensional Vector
 */
class V2D {
    constructor(x, y) {
        this._x = x;
        this._y = y;
    }
    /**
     * Gets the x value
     */
    x() {
        return this._x;
    }
    /**
     * Gets the y value
     */
    y() {
        return this._y;
    }
    /**
     * Checks whether a vector is equal to this vector
     * ```typescript
     * let x = new V2D(2,3);
     *
     * x.equals(new V2D(2,3)); // Will equal true!
     * x.equals(new V2D(1,2)); // Will equal false!
     * ```
     */
    equals(v) {
        return this.x() === v.x() && this.y() === v.y();
    }
    /**
     * Returns a vector is the vector *v* added from current vector\
     * V2D(x,y).add(V2D(p,q)) maps to V2D(x+p,y+q)
     *
     * # Note
     * Does not mutate *this* vector
     *
     * ```typescript
     * let x = new V2D(2,3);
     *
     * x.add(new V2D(2,3)); // Will equal V2D(4,6)!
     * x.add(new V2D(-1,-2)); // Will equal V2D(1,1)!
     * ```
     */
    add(v) {
        return new V2D(this.x() + v.x(), this.y() + v.y());
    }
    /**
     * Returns a vector is the vector *v* subtracted from current vector\
     * V2D(x,y).sub(V2D(p,q)) maps to V2D(x-p,y-q)
     *
     * # Note
     * Does not mutate *this* vector
     *
     * ```typescript
     * let x = new V2D(2,3);
     *
     * x.sub(new V2D(2,3)); // Will equal V2D(0,0)!
     * x.sub(new V2D(-1,-2)); // Will equal V2D(3,5)!
     * ```
     */
    sub(v) {
        return new V2D(this.x() - v.x(), this.y() - v.y());
    }
    /**
     * Returns a scaled current vector with factor *s*\
     * V2D(x,y).sca(s) maps to V2D(s*x,s*y)
     *
     * # Note
     * Does not mutate *this* vector
     *
     * ```typescript
     * let x = new V2D(2,3);
     *
     * x.sca(2); // Will equal V2D(4,6)!
     * x.sca(0.5); // Will equal V2D(1,1.5)!
     * ```
     */
    sca(s) {
        return new V2D(this.x() * s, this.y() * s);
    }
    /**
     * Calculates the dot-product between current vector and vector *v* and returns the result\
     * V2D(x,y).dot(V2D(p,q)) maps to x*p+y*q
     *
     * # Note
     * Does not mutate *this* vector
     *
     * ```typescript
     * let x = new V2D(3,4);
     *
     * x.dot(new V2D(3,4)); // Will equal 25!
     * x.dot(new V2D(4,-3)); // Will equal 0!
     * ```
     */
    dot(v) {
        return this.x() * v.x() + this.y() * v.y();
    }
    /**
     * Returns the stringified vector
     */
    toString() {
        return `V2D: {
            _x: ${this.x()},
            _y: ${this.y()}
        }`;
    }
    /**
     * Returns a invert version of current vector\
     * V2D(x,y).invert() maps to V2D(y,x)
     *
     * # Note
     * Does not mutate *this* vector
     *
     * ```typescript
     * let x = new V2D(2,3);
     *
     * x.invert(); // Will equal V2D(3,2)!
     * ```
     */
    invert() {
        return new V2D(this.y(), this.x());
    }
    /**
     * Returns a absoluted version of current vector\
     * V2D(x,y).abs() maps to V2D(|x|,|y|)
     *
     * # Note
     * Does not mutate *this* vector
     *
     * ```typescript
     * let x = new V2D(-2,3);
     *
     * x.abs(); // Will equal V2D(2,3)!
     * ```
     */
    abs() {
        return new V2D(this.x() < 0 ? -this.x() : this.x(), this.y() < 0 ? -this.y() : this.y());
    }
    /**
     * Returns a rounded version of current vector to the closest *sk*\
     * V2D(x,y).round(sk) maps to V2D(round(x, sk),round(y, sk))
     *
     * # Note
     * Does not mutate *this* vector
     *
     * ```typescript
     * let x = new V2D(3,6);
     *
     * x.round(10); // Will equal V2D(0,10)!
     * ```
     */
    round(sk) {
        const lowX = this.x() - (this.x() % sk), lowY = this.y() - (this.y() % sk), highX = lowX + sk, highY = lowY + sk;
        const iX = this.x() - lowX < highX - this.x() ? lowX : highX, iY = this.y() - lowY < highY - this.y() ? lowY : highY;
        return new V2D(iX, iY);
    }
    /**
     * Returns the length of the vector\
     * V2D(x,y).length() maps to |V2D(x,y)|
     *
     * # Note
     * Does not mutate *this* vector
     *
     * ```typescript
     * let x = new V2D(3,4);
     *
     * x.length(); // Will equal 5!
     * ```
     */
    length() {
        return Math.sqrt(this.dot(this));
    }
    /**
     * Returns the angle between vector *v* and current vector\
     * V2D(x,y).angle(V2D(p,q)) maps to angle(V2D(x,y),V2D(p,q))
     *
     * # Note
     * Does not mutate *this* vector
     *
     * ```typescript
     * let x = new V2D(3,4);
     *
     * x.angle(x); // Will equal 0!
     * ```
     */
    angle(v) {
        return Math.acos(this.dot(v) / (v.length() * this.length()));
    }
    /**
     * Returns the middle between vector *v* and current vector\
     * V2D(x,y).middle(V2D(p,q)) maps to V2D(x,y).add(V2D(p,q)).sca(0.5)
     *
     * # Note
     * Does not mutate *this* vector
     *
     * ```typescript
     * let x = new V2D(3,4);
     *
     * x.middle(new V2D(5,8)); // Will equal V2D(4,6)!
     * ```
     */
    middle(v) {
        return this.add(v).sca(0.5);
    }
    /**
     * Returns the tangent of current vector\
     * V2D(x,y).dydx() maps to y/x
     *
     * # Note
     * Does not mutate *this* vector
     *
     * ```typescript
     * let x = new V2D(2,4);
     *
     * x.dydx(); // Will equal 2!
     * ```
     */
    dydx() {
        return this.y() / this.x();
    }
    /**
     * Returns the sign of current vector's x
     *
     * # Note
     * Does not mutate *this* vector
     *
     * ```typescript
     * new V2D(-13,0).xSign(); // Will equal -1!
     * new V2D(-5,2).xSign(); // Will equal -1!
     * new V2D(-5,0).xSign(); // Will equal -1!
     * new V2D(0,2).xSign(); // Will equal 0!
     * new V2D(3,0).xSign(); // Will equal 1!
     * new V2D(33,0).xSign(); // Will equal 1!
     * ```
     */
    xSign() {
        return this.x() < 0 ? -1 : this.x() > 0 ? 1 : 0;
    }
    /**
     * Returns the sign of current vector's y
     *
     * # Note
     * Does not mutate *this* vector
     *
     * ```typescript
     * new V2D(0,-13).ySign(); // Will equal -1!
     * new V2D(2,-5).ySign(); // Will equal -1!
     * new V2D(0,-5).ySign(); // Will equal -1!
     * new V2D(2,0).ySign(); // Will equal 0!
     * new V2D(0,3).ySign(); // Will equal 1!
     * new V2D(0,33).ySign(); // Will equal 1!
     * ```
     */
    ySign() {
        return this.y() < 0 ? -1 : this.y() > 0 ? 1 : 0;
    }
}
exports.default = V2D;


/***/ }),

/***/ "../../dist/index.js":
/*!*******************************************************************************!*\
  !*** /Users/gijsburghoorn/Documents/Programmeren/ts-svgmanager/dist/index.js ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const SVGManager_1 = __webpack_require__(/*! ./SVGManager */ "../../dist/SVGManager.js");
exports.SVGManager = SVGManager_1.default;
const PathData_1 = __webpack_require__(/*! ./PathData */ "../../dist/PathData.js");
exports.PathData = PathData_1.default;
const SVGNode_1 = __webpack_require__(/*! ./SVGNode */ "../../dist/SVGNode.js");
exports.SVGNode = SVGNode_1.default;
const V2D_1 = __webpack_require__(/*! ./V2D */ "../../dist/V2D.js");
exports.V2D = V2D_1.default;
const Shapes_1 = __webpack_require__(/*! ./Shapes */ "../../dist/Shapes.js");
exports.line = Shapes_1.line;
exports.lines = Shapes_1.lines;
exports.circle = Shapes_1.circle;
exports.curve = Shapes_1.curve;
exports.curveCalc = Shapes_1.curveCalc;


/***/ }),

/***/ "../../node_modules/ts-md5/dist/md5.js":
/*!*************************************************************************************************!*\
  !*** /Users/gijsburghoorn/Documents/Programmeren/ts-svgmanager/node_modules/ts-md5/dist/md5.js ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*

TypeScript Md5
==============

Based on work by
* Joseph Myers: http://www.myersdaily.org/joseph/javascript/md5-text.html
* André Cruz: https://github.com/satazor/SparkMD5
* Raymond Hill: https://github.com/gorhill/yamd5.js

Effectively a TypeScrypt re-write of Raymond Hill JS Library

The MIT License (MIT)

Copyright (C) 2014 Raymond Hill

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.



            DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
                    Version 2, December 2004

 Copyright (C) 2015 André Cruz <amdfcruz@gmail.com>

 Everyone is permitted to copy and distribute verbatim or modified
 copies of this license document, and changing it is allowed as long
 as the name is changed.

            DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
   TERMS AND CONDITIONS FOR COPYING, DISTRIBUTION AND MODIFICATION

  0. You just DO WHAT THE FUCK YOU WANT TO.


*/
Object.defineProperty(exports, "__esModule", { value: true });
var Md5 = /** @class */ (function () {
    function Md5() {
        this._state = new Int32Array(4);
        this._buffer = new ArrayBuffer(68);
        this._buffer8 = new Uint8Array(this._buffer, 0, 68);
        this._buffer32 = new Uint32Array(this._buffer, 0, 17);
        this.start();
    }
    // One time hashing functions
    Md5.hashStr = function (str, raw) {
        if (raw === void 0) { raw = false; }
        return this.onePassHasher
            .start()
            .appendStr(str)
            .end(raw);
    };
    Md5.hashAsciiStr = function (str, raw) {
        if (raw === void 0) { raw = false; }
        return this.onePassHasher
            .start()
            .appendAsciiStr(str)
            .end(raw);
    };
    Md5._hex = function (x) {
        var hc = Md5.hexChars;
        var ho = Md5.hexOut;
        var n;
        var offset;
        var j;
        var i;
        for (i = 0; i < 4; i += 1) {
            offset = i * 8;
            n = x[i];
            for (j = 0; j < 8; j += 2) {
                ho[offset + 1 + j] = hc.charAt(n & 0x0F);
                n >>>= 4;
                ho[offset + 0 + j] = hc.charAt(n & 0x0F);
                n >>>= 4;
            }
        }
        return ho.join('');
    };
    Md5._md5cycle = function (x, k) {
        var a = x[0];
        var b = x[1];
        var c = x[2];
        var d = x[3];
        // ff()
        a += (b & c | ~b & d) + k[0] - 680876936 | 0;
        a = (a << 7 | a >>> 25) + b | 0;
        d += (a & b | ~a & c) + k[1] - 389564586 | 0;
        d = (d << 12 | d >>> 20) + a | 0;
        c += (d & a | ~d & b) + k[2] + 606105819 | 0;
        c = (c << 17 | c >>> 15) + d | 0;
        b += (c & d | ~c & a) + k[3] - 1044525330 | 0;
        b = (b << 22 | b >>> 10) + c | 0;
        a += (b & c | ~b & d) + k[4] - 176418897 | 0;
        a = (a << 7 | a >>> 25) + b | 0;
        d += (a & b | ~a & c) + k[5] + 1200080426 | 0;
        d = (d << 12 | d >>> 20) + a | 0;
        c += (d & a | ~d & b) + k[6] - 1473231341 | 0;
        c = (c << 17 | c >>> 15) + d | 0;
        b += (c & d | ~c & a) + k[7] - 45705983 | 0;
        b = (b << 22 | b >>> 10) + c | 0;
        a += (b & c | ~b & d) + k[8] + 1770035416 | 0;
        a = (a << 7 | a >>> 25) + b | 0;
        d += (a & b | ~a & c) + k[9] - 1958414417 | 0;
        d = (d << 12 | d >>> 20) + a | 0;
        c += (d & a | ~d & b) + k[10] - 42063 | 0;
        c = (c << 17 | c >>> 15) + d | 0;
        b += (c & d | ~c & a) + k[11] - 1990404162 | 0;
        b = (b << 22 | b >>> 10) + c | 0;
        a += (b & c | ~b & d) + k[12] + 1804603682 | 0;
        a = (a << 7 | a >>> 25) + b | 0;
        d += (a & b | ~a & c) + k[13] - 40341101 | 0;
        d = (d << 12 | d >>> 20) + a | 0;
        c += (d & a | ~d & b) + k[14] - 1502002290 | 0;
        c = (c << 17 | c >>> 15) + d | 0;
        b += (c & d | ~c & a) + k[15] + 1236535329 | 0;
        b = (b << 22 | b >>> 10) + c | 0;
        // gg()
        a += (b & d | c & ~d) + k[1] - 165796510 | 0;
        a = (a << 5 | a >>> 27) + b | 0;
        d += (a & c | b & ~c) + k[6] - 1069501632 | 0;
        d = (d << 9 | d >>> 23) + a | 0;
        c += (d & b | a & ~b) + k[11] + 643717713 | 0;
        c = (c << 14 | c >>> 18) + d | 0;
        b += (c & a | d & ~a) + k[0] - 373897302 | 0;
        b = (b << 20 | b >>> 12) + c | 0;
        a += (b & d | c & ~d) + k[5] - 701558691 | 0;
        a = (a << 5 | a >>> 27) + b | 0;
        d += (a & c | b & ~c) + k[10] + 38016083 | 0;
        d = (d << 9 | d >>> 23) + a | 0;
        c += (d & b | a & ~b) + k[15] - 660478335 | 0;
        c = (c << 14 | c >>> 18) + d | 0;
        b += (c & a | d & ~a) + k[4] - 405537848 | 0;
        b = (b << 20 | b >>> 12) + c | 0;
        a += (b & d | c & ~d) + k[9] + 568446438 | 0;
        a = (a << 5 | a >>> 27) + b | 0;
        d += (a & c | b & ~c) + k[14] - 1019803690 | 0;
        d = (d << 9 | d >>> 23) + a | 0;
        c += (d & b | a & ~b) + k[3] - 187363961 | 0;
        c = (c << 14 | c >>> 18) + d | 0;
        b += (c & a | d & ~a) + k[8] + 1163531501 | 0;
        b = (b << 20 | b >>> 12) + c | 0;
        a += (b & d | c & ~d) + k[13] - 1444681467 | 0;
        a = (a << 5 | a >>> 27) + b | 0;
        d += (a & c | b & ~c) + k[2] - 51403784 | 0;
        d = (d << 9 | d >>> 23) + a | 0;
        c += (d & b | a & ~b) + k[7] + 1735328473 | 0;
        c = (c << 14 | c >>> 18) + d | 0;
        b += (c & a | d & ~a) + k[12] - 1926607734 | 0;
        b = (b << 20 | b >>> 12) + c | 0;
        // hh()
        a += (b ^ c ^ d) + k[5] - 378558 | 0;
        a = (a << 4 | a >>> 28) + b | 0;
        d += (a ^ b ^ c) + k[8] - 2022574463 | 0;
        d = (d << 11 | d >>> 21) + a | 0;
        c += (d ^ a ^ b) + k[11] + 1839030562 | 0;
        c = (c << 16 | c >>> 16) + d | 0;
        b += (c ^ d ^ a) + k[14] - 35309556 | 0;
        b = (b << 23 | b >>> 9) + c | 0;
        a += (b ^ c ^ d) + k[1] - 1530992060 | 0;
        a = (a << 4 | a >>> 28) + b | 0;
        d += (a ^ b ^ c) + k[4] + 1272893353 | 0;
        d = (d << 11 | d >>> 21) + a | 0;
        c += (d ^ a ^ b) + k[7] - 155497632 | 0;
        c = (c << 16 | c >>> 16) + d | 0;
        b += (c ^ d ^ a) + k[10] - 1094730640 | 0;
        b = (b << 23 | b >>> 9) + c | 0;
        a += (b ^ c ^ d) + k[13] + 681279174 | 0;
        a = (a << 4 | a >>> 28) + b | 0;
        d += (a ^ b ^ c) + k[0] - 358537222 | 0;
        d = (d << 11 | d >>> 21) + a | 0;
        c += (d ^ a ^ b) + k[3] - 722521979 | 0;
        c = (c << 16 | c >>> 16) + d | 0;
        b += (c ^ d ^ a) + k[6] + 76029189 | 0;
        b = (b << 23 | b >>> 9) + c | 0;
        a += (b ^ c ^ d) + k[9] - 640364487 | 0;
        a = (a << 4 | a >>> 28) + b | 0;
        d += (a ^ b ^ c) + k[12] - 421815835 | 0;
        d = (d << 11 | d >>> 21) + a | 0;
        c += (d ^ a ^ b) + k[15] + 530742520 | 0;
        c = (c << 16 | c >>> 16) + d | 0;
        b += (c ^ d ^ a) + k[2] - 995338651 | 0;
        b = (b << 23 | b >>> 9) + c | 0;
        // ii()
        a += (c ^ (b | ~d)) + k[0] - 198630844 | 0;
        a = (a << 6 | a >>> 26) + b | 0;
        d += (b ^ (a | ~c)) + k[7] + 1126891415 | 0;
        d = (d << 10 | d >>> 22) + a | 0;
        c += (a ^ (d | ~b)) + k[14] - 1416354905 | 0;
        c = (c << 15 | c >>> 17) + d | 0;
        b += (d ^ (c | ~a)) + k[5] - 57434055 | 0;
        b = (b << 21 | b >>> 11) + c | 0;
        a += (c ^ (b | ~d)) + k[12] + 1700485571 | 0;
        a = (a << 6 | a >>> 26) + b | 0;
        d += (b ^ (a | ~c)) + k[3] - 1894986606 | 0;
        d = (d << 10 | d >>> 22) + a | 0;
        c += (a ^ (d | ~b)) + k[10] - 1051523 | 0;
        c = (c << 15 | c >>> 17) + d | 0;
        b += (d ^ (c | ~a)) + k[1] - 2054922799 | 0;
        b = (b << 21 | b >>> 11) + c | 0;
        a += (c ^ (b | ~d)) + k[8] + 1873313359 | 0;
        a = (a << 6 | a >>> 26) + b | 0;
        d += (b ^ (a | ~c)) + k[15] - 30611744 | 0;
        d = (d << 10 | d >>> 22) + a | 0;
        c += (a ^ (d | ~b)) + k[6] - 1560198380 | 0;
        c = (c << 15 | c >>> 17) + d | 0;
        b += (d ^ (c | ~a)) + k[13] + 1309151649 | 0;
        b = (b << 21 | b >>> 11) + c | 0;
        a += (c ^ (b | ~d)) + k[4] - 145523070 | 0;
        a = (a << 6 | a >>> 26) + b | 0;
        d += (b ^ (a | ~c)) + k[11] - 1120210379 | 0;
        d = (d << 10 | d >>> 22) + a | 0;
        c += (a ^ (d | ~b)) + k[2] + 718787259 | 0;
        c = (c << 15 | c >>> 17) + d | 0;
        b += (d ^ (c | ~a)) + k[9] - 343485551 | 0;
        b = (b << 21 | b >>> 11) + c | 0;
        x[0] = a + x[0] | 0;
        x[1] = b + x[1] | 0;
        x[2] = c + x[2] | 0;
        x[3] = d + x[3] | 0;
    };
    Md5.prototype.start = function () {
        this._dataLength = 0;
        this._bufferLength = 0;
        this._state.set(Md5.stateIdentity);
        return this;
    };
    // Char to code point to to array conversion:
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/charCodeAt
    // #Example.3A_Fixing_charCodeAt_to_handle_non-Basic-Multilingual-Plane_characters_if_their_presence_earlier_in_the_string_is_unknown
    Md5.prototype.appendStr = function (str) {
        var buf8 = this._buffer8;
        var buf32 = this._buffer32;
        var bufLen = this._bufferLength;
        var code;
        var i;
        for (i = 0; i < str.length; i += 1) {
            code = str.charCodeAt(i);
            if (code < 128) {
                buf8[bufLen++] = code;
            }
            else if (code < 0x800) {
                buf8[bufLen++] = (code >>> 6) + 0xC0;
                buf8[bufLen++] = code & 0x3F | 0x80;
            }
            else if (code < 0xD800 || code > 0xDBFF) {
                buf8[bufLen++] = (code >>> 12) + 0xE0;
                buf8[bufLen++] = (code >>> 6 & 0x3F) | 0x80;
                buf8[bufLen++] = (code & 0x3F) | 0x80;
            }
            else {
                code = ((code - 0xD800) * 0x400) + (str.charCodeAt(++i) - 0xDC00) + 0x10000;
                if (code > 0x10FFFF) {
                    throw new Error('Unicode standard supports code points up to U+10FFFF');
                }
                buf8[bufLen++] = (code >>> 18) + 0xF0;
                buf8[bufLen++] = (code >>> 12 & 0x3F) | 0x80;
                buf8[bufLen++] = (code >>> 6 & 0x3F) | 0x80;
                buf8[bufLen++] = (code & 0x3F) | 0x80;
            }
            if (bufLen >= 64) {
                this._dataLength += 64;
                Md5._md5cycle(this._state, buf32);
                bufLen -= 64;
                buf32[0] = buf32[16];
            }
        }
        this._bufferLength = bufLen;
        return this;
    };
    Md5.prototype.appendAsciiStr = function (str) {
        var buf8 = this._buffer8;
        var buf32 = this._buffer32;
        var bufLen = this._bufferLength;
        var i;
        var j = 0;
        for (;;) {
            i = Math.min(str.length - j, 64 - bufLen);
            while (i--) {
                buf8[bufLen++] = str.charCodeAt(j++);
            }
            if (bufLen < 64) {
                break;
            }
            this._dataLength += 64;
            Md5._md5cycle(this._state, buf32);
            bufLen = 0;
        }
        this._bufferLength = bufLen;
        return this;
    };
    Md5.prototype.appendByteArray = function (input) {
        var buf8 = this._buffer8;
        var buf32 = this._buffer32;
        var bufLen = this._bufferLength;
        var i;
        var j = 0;
        for (;;) {
            i = Math.min(input.length - j, 64 - bufLen);
            while (i--) {
                buf8[bufLen++] = input[j++];
            }
            if (bufLen < 64) {
                break;
            }
            this._dataLength += 64;
            Md5._md5cycle(this._state, buf32);
            bufLen = 0;
        }
        this._bufferLength = bufLen;
        return this;
    };
    Md5.prototype.getState = function () {
        var self = this;
        var s = self._state;
        return {
            buffer: String.fromCharCode.apply(null, self._buffer8),
            buflen: self._bufferLength,
            length: self._dataLength,
            state: [s[0], s[1], s[2], s[3]]
        };
    };
    Md5.prototype.setState = function (state) {
        var buf = state.buffer;
        var x = state.state;
        var s = this._state;
        var i;
        this._dataLength = state.length;
        this._bufferLength = state.buflen;
        s[0] = x[0];
        s[1] = x[1];
        s[2] = x[2];
        s[3] = x[3];
        for (i = 0; i < buf.length; i += 1) {
            this._buffer8[i] = buf.charCodeAt(i);
        }
    };
    Md5.prototype.end = function (raw) {
        if (raw === void 0) { raw = false; }
        var bufLen = this._bufferLength;
        var buf8 = this._buffer8;
        var buf32 = this._buffer32;
        var i = (bufLen >> 2) + 1;
        var dataBitsLen;
        this._dataLength += bufLen;
        buf8[bufLen] = 0x80;
        buf8[bufLen + 1] = buf8[bufLen + 2] = buf8[bufLen + 3] = 0;
        buf32.set(Md5.buffer32Identity.subarray(i), i);
        if (bufLen > 55) {
            Md5._md5cycle(this._state, buf32);
            buf32.set(Md5.buffer32Identity);
        }
        // Do the final computation based on the tail and length
        // Beware that the final length may not fit in 32 bits so we take care of that
        dataBitsLen = this._dataLength * 8;
        if (dataBitsLen <= 0xFFFFFFFF) {
            buf32[14] = dataBitsLen;
        }
        else {
            var matches = dataBitsLen.toString(16).match(/(.*?)(.{0,8})$/);
            if (matches === null) {
                return;
            }
            var lo = parseInt(matches[2], 16);
            var hi = parseInt(matches[1], 16) || 0;
            buf32[14] = lo;
            buf32[15] = hi;
        }
        Md5._md5cycle(this._state, buf32);
        return raw ? this._state : Md5._hex(this._state);
    };
    // Private Static Variables
    Md5.stateIdentity = new Int32Array([1732584193, -271733879, -1732584194, 271733878]);
    Md5.buffer32Identity = new Int32Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    Md5.hexChars = '0123456789abcdef';
    Md5.hexOut = [];
    // Permanent instance is to use for one-call hashing
    Md5.onePassHasher = new Md5();
    return Md5;
}());
exports.Md5 = Md5;
if (Md5.hashStr('hello') !== '5d41402abc4b2a76b9719d911017c592') {
    console.error('Md5 self test failed.');
}
//# sourceMappingURL=md5.js.map

/***/ }),

/***/ "../../node_modules/uuid/dist/esm-browser/index.js":
/*!*************************************************************************************************************!*\
  !*** /Users/gijsburghoorn/Documents/Programmeren/ts-svgmanager/node_modules/uuid/dist/esm-browser/index.js ***!
  \*************************************************************************************************************/
/*! exports provided: v1, v3, v4, v5, NIL, version, validate, stringify, parse */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _v1_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./v1.js */ "../../node_modules/uuid/dist/esm-browser/v1.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "v1", function() { return _v1_js__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _v3_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./v3.js */ "../../node_modules/uuid/dist/esm-browser/v3.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "v3", function() { return _v3_js__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _v4_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./v4.js */ "../../node_modules/uuid/dist/esm-browser/v4.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "v4", function() { return _v4_js__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _v5_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./v5.js */ "../../node_modules/uuid/dist/esm-browser/v5.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "v5", function() { return _v5_js__WEBPACK_IMPORTED_MODULE_3__["default"]; });

/* harmony import */ var _nil_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./nil.js */ "../../node_modules/uuid/dist/esm-browser/nil.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "NIL", function() { return _nil_js__WEBPACK_IMPORTED_MODULE_4__["default"]; });

/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./version.js */ "../../node_modules/uuid/dist/esm-browser/version.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "version", function() { return _version_js__WEBPACK_IMPORTED_MODULE_5__["default"]; });

/* harmony import */ var _validate_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./validate.js */ "../../node_modules/uuid/dist/esm-browser/validate.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "validate", function() { return _validate_js__WEBPACK_IMPORTED_MODULE_6__["default"]; });

/* harmony import */ var _stringify_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./stringify.js */ "../../node_modules/uuid/dist/esm-browser/stringify.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "stringify", function() { return _stringify_js__WEBPACK_IMPORTED_MODULE_7__["default"]; });

/* harmony import */ var _parse_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./parse.js */ "../../node_modules/uuid/dist/esm-browser/parse.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "parse", function() { return _parse_js__WEBPACK_IMPORTED_MODULE_8__["default"]; });











/***/ }),

/***/ "../../node_modules/uuid/dist/esm-browser/md5.js":
/*!***********************************************************************************************************!*\
  !*** /Users/gijsburghoorn/Documents/Programmeren/ts-svgmanager/node_modules/uuid/dist/esm-browser/md5.js ***!
  \***********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/*
 * Browser-compatible JavaScript MD5
 *
 * Modification of JavaScript MD5
 * https://github.com/blueimp/JavaScript-MD5
 *
 * Copyright 2011, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * https://opensource.org/licenses/MIT
 *
 * Based on
 * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
 * Digest Algorithm, as defined in RFC 1321.
 * Version 2.2 Copyright (C) Paul Johnston 1999 - 2009
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for more info.
 */
function md5(bytes) {
  if (typeof bytes === 'string') {
    var msg = unescape(encodeURIComponent(bytes)); // UTF8 escape

    bytes = new Uint8Array(msg.length);

    for (var i = 0; i < msg.length; ++i) {
      bytes[i] = msg.charCodeAt(i);
    }
  }

  return md5ToHexEncodedArray(wordsToMd5(bytesToWords(bytes), bytes.length * 8));
}
/*
 * Convert an array of little-endian words to an array of bytes
 */


function md5ToHexEncodedArray(input) {
  var output = [];
  var length32 = input.length * 32;
  var hexTab = '0123456789abcdef';

  for (var i = 0; i < length32; i += 8) {
    var x = input[i >> 5] >>> i % 32 & 0xff;
    var hex = parseInt(hexTab.charAt(x >>> 4 & 0x0f) + hexTab.charAt(x & 0x0f), 16);
    output.push(hex);
  }

  return output;
}
/**
 * Calculate output length with padding and bit length
 */


function getOutputLength(inputLength8) {
  return (inputLength8 + 64 >>> 9 << 4) + 14 + 1;
}
/*
 * Calculate the MD5 of an array of little-endian words, and a bit length.
 */


function wordsToMd5(x, len) {
  /* append padding */
  x[len >> 5] |= 0x80 << len % 32;
  x[getOutputLength(len) - 1] = len;
  var a = 1732584193;
  var b = -271733879;
  var c = -1732584194;
  var d = 271733878;

  for (var i = 0; i < x.length; i += 16) {
    var olda = a;
    var oldb = b;
    var oldc = c;
    var oldd = d;
    a = md5ff(a, b, c, d, x[i], 7, -680876936);
    d = md5ff(d, a, b, c, x[i + 1], 12, -389564586);
    c = md5ff(c, d, a, b, x[i + 2], 17, 606105819);
    b = md5ff(b, c, d, a, x[i + 3], 22, -1044525330);
    a = md5ff(a, b, c, d, x[i + 4], 7, -176418897);
    d = md5ff(d, a, b, c, x[i + 5], 12, 1200080426);
    c = md5ff(c, d, a, b, x[i + 6], 17, -1473231341);
    b = md5ff(b, c, d, a, x[i + 7], 22, -45705983);
    a = md5ff(a, b, c, d, x[i + 8], 7, 1770035416);
    d = md5ff(d, a, b, c, x[i + 9], 12, -1958414417);
    c = md5ff(c, d, a, b, x[i + 10], 17, -42063);
    b = md5ff(b, c, d, a, x[i + 11], 22, -1990404162);
    a = md5ff(a, b, c, d, x[i + 12], 7, 1804603682);
    d = md5ff(d, a, b, c, x[i + 13], 12, -40341101);
    c = md5ff(c, d, a, b, x[i + 14], 17, -1502002290);
    b = md5ff(b, c, d, a, x[i + 15], 22, 1236535329);
    a = md5gg(a, b, c, d, x[i + 1], 5, -165796510);
    d = md5gg(d, a, b, c, x[i + 6], 9, -1069501632);
    c = md5gg(c, d, a, b, x[i + 11], 14, 643717713);
    b = md5gg(b, c, d, a, x[i], 20, -373897302);
    a = md5gg(a, b, c, d, x[i + 5], 5, -701558691);
    d = md5gg(d, a, b, c, x[i + 10], 9, 38016083);
    c = md5gg(c, d, a, b, x[i + 15], 14, -660478335);
    b = md5gg(b, c, d, a, x[i + 4], 20, -405537848);
    a = md5gg(a, b, c, d, x[i + 9], 5, 568446438);
    d = md5gg(d, a, b, c, x[i + 14], 9, -1019803690);
    c = md5gg(c, d, a, b, x[i + 3], 14, -187363961);
    b = md5gg(b, c, d, a, x[i + 8], 20, 1163531501);
    a = md5gg(a, b, c, d, x[i + 13], 5, -1444681467);
    d = md5gg(d, a, b, c, x[i + 2], 9, -51403784);
    c = md5gg(c, d, a, b, x[i + 7], 14, 1735328473);
    b = md5gg(b, c, d, a, x[i + 12], 20, -1926607734);
    a = md5hh(a, b, c, d, x[i + 5], 4, -378558);
    d = md5hh(d, a, b, c, x[i + 8], 11, -2022574463);
    c = md5hh(c, d, a, b, x[i + 11], 16, 1839030562);
    b = md5hh(b, c, d, a, x[i + 14], 23, -35309556);
    a = md5hh(a, b, c, d, x[i + 1], 4, -1530992060);
    d = md5hh(d, a, b, c, x[i + 4], 11, 1272893353);
    c = md5hh(c, d, a, b, x[i + 7], 16, -155497632);
    b = md5hh(b, c, d, a, x[i + 10], 23, -1094730640);
    a = md5hh(a, b, c, d, x[i + 13], 4, 681279174);
    d = md5hh(d, a, b, c, x[i], 11, -358537222);
    c = md5hh(c, d, a, b, x[i + 3], 16, -722521979);
    b = md5hh(b, c, d, a, x[i + 6], 23, 76029189);
    a = md5hh(a, b, c, d, x[i + 9], 4, -640364487);
    d = md5hh(d, a, b, c, x[i + 12], 11, -421815835);
    c = md5hh(c, d, a, b, x[i + 15], 16, 530742520);
    b = md5hh(b, c, d, a, x[i + 2], 23, -995338651);
    a = md5ii(a, b, c, d, x[i], 6, -198630844);
    d = md5ii(d, a, b, c, x[i + 7], 10, 1126891415);
    c = md5ii(c, d, a, b, x[i + 14], 15, -1416354905);
    b = md5ii(b, c, d, a, x[i + 5], 21, -57434055);
    a = md5ii(a, b, c, d, x[i + 12], 6, 1700485571);
    d = md5ii(d, a, b, c, x[i + 3], 10, -1894986606);
    c = md5ii(c, d, a, b, x[i + 10], 15, -1051523);
    b = md5ii(b, c, d, a, x[i + 1], 21, -2054922799);
    a = md5ii(a, b, c, d, x[i + 8], 6, 1873313359);
    d = md5ii(d, a, b, c, x[i + 15], 10, -30611744);
    c = md5ii(c, d, a, b, x[i + 6], 15, -1560198380);
    b = md5ii(b, c, d, a, x[i + 13], 21, 1309151649);
    a = md5ii(a, b, c, d, x[i + 4], 6, -145523070);
    d = md5ii(d, a, b, c, x[i + 11], 10, -1120210379);
    c = md5ii(c, d, a, b, x[i + 2], 15, 718787259);
    b = md5ii(b, c, d, a, x[i + 9], 21, -343485551);
    a = safeAdd(a, olda);
    b = safeAdd(b, oldb);
    c = safeAdd(c, oldc);
    d = safeAdd(d, oldd);
  }

  return [a, b, c, d];
}
/*
 * Convert an array bytes to an array of little-endian words
 * Characters >255 have their high-byte silently ignored.
 */


function bytesToWords(input) {
  if (input.length === 0) {
    return [];
  }

  var length8 = input.length * 8;
  var output = new Uint32Array(getOutputLength(length8));

  for (var i = 0; i < length8; i += 8) {
    output[i >> 5] |= (input[i / 8] & 0xff) << i % 32;
  }

  return output;
}
/*
 * Add integers, wrapping at 2^32. This uses 16-bit operations internally
 * to work around bugs in some JS interpreters.
 */


function safeAdd(x, y) {
  var lsw = (x & 0xffff) + (y & 0xffff);
  var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
  return msw << 16 | lsw & 0xffff;
}
/*
 * Bitwise rotate a 32-bit number to the left.
 */


function bitRotateLeft(num, cnt) {
  return num << cnt | num >>> 32 - cnt;
}
/*
 * These functions implement the four basic operations the algorithm uses.
 */


function md5cmn(q, a, b, x, s, t) {
  return safeAdd(bitRotateLeft(safeAdd(safeAdd(a, q), safeAdd(x, t)), s), b);
}

function md5ff(a, b, c, d, x, s, t) {
  return md5cmn(b & c | ~b & d, a, b, x, s, t);
}

function md5gg(a, b, c, d, x, s, t) {
  return md5cmn(b & d | c & ~d, a, b, x, s, t);
}

function md5hh(a, b, c, d, x, s, t) {
  return md5cmn(b ^ c ^ d, a, b, x, s, t);
}

function md5ii(a, b, c, d, x, s, t) {
  return md5cmn(c ^ (b | ~d), a, b, x, s, t);
}

/* harmony default export */ __webpack_exports__["default"] = (md5);

/***/ }),

/***/ "../../node_modules/uuid/dist/esm-browser/nil.js":
/*!***********************************************************************************************************!*\
  !*** /Users/gijsburghoorn/Documents/Programmeren/ts-svgmanager/node_modules/uuid/dist/esm-browser/nil.js ***!
  \***********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ('00000000-0000-0000-0000-000000000000');

/***/ }),

/***/ "../../node_modules/uuid/dist/esm-browser/parse.js":
/*!*************************************************************************************************************!*\
  !*** /Users/gijsburghoorn/Documents/Programmeren/ts-svgmanager/node_modules/uuid/dist/esm-browser/parse.js ***!
  \*************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _validate_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./validate.js */ "../../node_modules/uuid/dist/esm-browser/validate.js");


function parse(uuid) {
  if (!Object(_validate_js__WEBPACK_IMPORTED_MODULE_0__["default"])(uuid)) {
    throw TypeError('Invalid UUID');
  }

  var v;
  var arr = new Uint8Array(16); // Parse ########-....-....-....-............

  arr[0] = (v = parseInt(uuid.slice(0, 8), 16)) >>> 24;
  arr[1] = v >>> 16 & 0xff;
  arr[2] = v >>> 8 & 0xff;
  arr[3] = v & 0xff; // Parse ........-####-....-....-............

  arr[4] = (v = parseInt(uuid.slice(9, 13), 16)) >>> 8;
  arr[5] = v & 0xff; // Parse ........-....-####-....-............

  arr[6] = (v = parseInt(uuid.slice(14, 18), 16)) >>> 8;
  arr[7] = v & 0xff; // Parse ........-....-....-####-............

  arr[8] = (v = parseInt(uuid.slice(19, 23), 16)) >>> 8;
  arr[9] = v & 0xff; // Parse ........-....-....-....-############
  // (Use "/" to avoid 32-bit truncation when bit-shifting high-order bytes)

  arr[10] = (v = parseInt(uuid.slice(24, 36), 16)) / 0x10000000000 & 0xff;
  arr[11] = v / 0x100000000 & 0xff;
  arr[12] = v >>> 24 & 0xff;
  arr[13] = v >>> 16 & 0xff;
  arr[14] = v >>> 8 & 0xff;
  arr[15] = v & 0xff;
  return arr;
}

/* harmony default export */ __webpack_exports__["default"] = (parse);

/***/ }),

/***/ "../../node_modules/uuid/dist/esm-browser/regex.js":
/*!*************************************************************************************************************!*\
  !*** /Users/gijsburghoorn/Documents/Programmeren/ts-svgmanager/node_modules/uuid/dist/esm-browser/regex.js ***!
  \*************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i);

/***/ }),

/***/ "../../node_modules/uuid/dist/esm-browser/rng.js":
/*!***********************************************************************************************************!*\
  !*** /Users/gijsburghoorn/Documents/Programmeren/ts-svgmanager/node_modules/uuid/dist/esm-browser/rng.js ***!
  \***********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return rng; });
// Unique ID creation requires a high quality random # generator. In the browser we therefore
// require the crypto API and do not support built-in fallback to lower quality random number
// generators (like Math.random()).
// getRandomValues needs to be invoked in a context where "this" is a Crypto implementation. Also,
// find the complete implementation of crypto (msCrypto) on IE11.
var getRandomValues = typeof crypto !== 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || typeof msCrypto !== 'undefined' && typeof msCrypto.getRandomValues === 'function' && msCrypto.getRandomValues.bind(msCrypto);
var rnds8 = new Uint8Array(16);
function rng() {
  if (!getRandomValues) {
    throw new Error('crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported');
  }

  return getRandomValues(rnds8);
}

/***/ }),

/***/ "../../node_modules/uuid/dist/esm-browser/sha1.js":
/*!************************************************************************************************************!*\
  !*** /Users/gijsburghoorn/Documents/Programmeren/ts-svgmanager/node_modules/uuid/dist/esm-browser/sha1.js ***!
  \************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// Adapted from Chris Veness' SHA1 code at
// http://www.movable-type.co.uk/scripts/sha1.html
function f(s, x, y, z) {
  switch (s) {
    case 0:
      return x & y ^ ~x & z;

    case 1:
      return x ^ y ^ z;

    case 2:
      return x & y ^ x & z ^ y & z;

    case 3:
      return x ^ y ^ z;
  }
}

function ROTL(x, n) {
  return x << n | x >>> 32 - n;
}

function sha1(bytes) {
  var K = [0x5a827999, 0x6ed9eba1, 0x8f1bbcdc, 0xca62c1d6];
  var H = [0x67452301, 0xefcdab89, 0x98badcfe, 0x10325476, 0xc3d2e1f0];

  if (typeof bytes === 'string') {
    var msg = unescape(encodeURIComponent(bytes)); // UTF8 escape

    bytes = [];

    for (var i = 0; i < msg.length; ++i) {
      bytes.push(msg.charCodeAt(i));
    }
  } else if (!Array.isArray(bytes)) {
    // Convert Array-like to Array
    bytes = Array.prototype.slice.call(bytes);
  }

  bytes.push(0x80);
  var l = bytes.length / 4 + 2;
  var N = Math.ceil(l / 16);
  var M = new Array(N);

  for (var _i = 0; _i < N; ++_i) {
    var arr = new Uint32Array(16);

    for (var j = 0; j < 16; ++j) {
      arr[j] = bytes[_i * 64 + j * 4] << 24 | bytes[_i * 64 + j * 4 + 1] << 16 | bytes[_i * 64 + j * 4 + 2] << 8 | bytes[_i * 64 + j * 4 + 3];
    }

    M[_i] = arr;
  }

  M[N - 1][14] = (bytes.length - 1) * 8 / Math.pow(2, 32);
  M[N - 1][14] = Math.floor(M[N - 1][14]);
  M[N - 1][15] = (bytes.length - 1) * 8 & 0xffffffff;

  for (var _i2 = 0; _i2 < N; ++_i2) {
    var W = new Uint32Array(80);

    for (var t = 0; t < 16; ++t) {
      W[t] = M[_i2][t];
    }

    for (var _t = 16; _t < 80; ++_t) {
      W[_t] = ROTL(W[_t - 3] ^ W[_t - 8] ^ W[_t - 14] ^ W[_t - 16], 1);
    }

    var a = H[0];
    var b = H[1];
    var c = H[2];
    var d = H[3];
    var e = H[4];

    for (var _t2 = 0; _t2 < 80; ++_t2) {
      var s = Math.floor(_t2 / 20);
      var T = ROTL(a, 5) + f(s, b, c, d) + e + K[s] + W[_t2] >>> 0;
      e = d;
      d = c;
      c = ROTL(b, 30) >>> 0;
      b = a;
      a = T;
    }

    H[0] = H[0] + a >>> 0;
    H[1] = H[1] + b >>> 0;
    H[2] = H[2] + c >>> 0;
    H[3] = H[3] + d >>> 0;
    H[4] = H[4] + e >>> 0;
  }

  return [H[0] >> 24 & 0xff, H[0] >> 16 & 0xff, H[0] >> 8 & 0xff, H[0] & 0xff, H[1] >> 24 & 0xff, H[1] >> 16 & 0xff, H[1] >> 8 & 0xff, H[1] & 0xff, H[2] >> 24 & 0xff, H[2] >> 16 & 0xff, H[2] >> 8 & 0xff, H[2] & 0xff, H[3] >> 24 & 0xff, H[3] >> 16 & 0xff, H[3] >> 8 & 0xff, H[3] & 0xff, H[4] >> 24 & 0xff, H[4] >> 16 & 0xff, H[4] >> 8 & 0xff, H[4] & 0xff];
}

/* harmony default export */ __webpack_exports__["default"] = (sha1);

/***/ }),

/***/ "../../node_modules/uuid/dist/esm-browser/stringify.js":
/*!*****************************************************************************************************************!*\
  !*** /Users/gijsburghoorn/Documents/Programmeren/ts-svgmanager/node_modules/uuid/dist/esm-browser/stringify.js ***!
  \*****************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _validate_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./validate.js */ "../../node_modules/uuid/dist/esm-browser/validate.js");

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */

var byteToHex = [];

for (var i = 0; i < 256; ++i) {
  byteToHex.push((i + 0x100).toString(16).substr(1));
}

function stringify(arr) {
  var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  // Note: Be careful editing this code!  It's been tuned for performance
  // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434
  var uuid = (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + '-' + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + '-' + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + '-' + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + '-' + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase(); // Consistency check for valid UUID.  If this throws, it's likely due to one
  // of the following:
  // - One or more input array values don't map to a hex octet (leading to
  // "undefined" in the uuid)
  // - Invalid input values for the RFC `version` or `variant` fields

  if (!Object(_validate_js__WEBPACK_IMPORTED_MODULE_0__["default"])(uuid)) {
    throw TypeError('Stringified UUID is invalid');
  }

  return uuid;
}

/* harmony default export */ __webpack_exports__["default"] = (stringify);

/***/ }),

/***/ "../../node_modules/uuid/dist/esm-browser/v1.js":
/*!**********************************************************************************************************!*\
  !*** /Users/gijsburghoorn/Documents/Programmeren/ts-svgmanager/node_modules/uuid/dist/esm-browser/v1.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _rng_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./rng.js */ "../../node_modules/uuid/dist/esm-browser/rng.js");
/* harmony import */ var _stringify_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./stringify.js */ "../../node_modules/uuid/dist/esm-browser/stringify.js");

 // **`v1()` - Generate time-based UUID**
//
// Inspired by https://github.com/LiosK/UUID.js
// and http://docs.python.org/library/uuid.html

var _nodeId;

var _clockseq; // Previous uuid creation time


var _lastMSecs = 0;
var _lastNSecs = 0; // See https://github.com/uuidjs/uuid for API details

function v1(options, buf, offset) {
  var i = buf && offset || 0;
  var b = buf || new Array(16);
  options = options || {};
  var node = options.node || _nodeId;
  var clockseq = options.clockseq !== undefined ? options.clockseq : _clockseq; // node and clockseq need to be initialized to random values if they're not
  // specified.  We do this lazily to minimize issues related to insufficient
  // system entropy.  See #189

  if (node == null || clockseq == null) {
    var seedBytes = options.random || (options.rng || _rng_js__WEBPACK_IMPORTED_MODULE_0__["default"])();

    if (node == null) {
      // Per 4.5, create and 48-bit node id, (47 random bits + multicast bit = 1)
      node = _nodeId = [seedBytes[0] | 0x01, seedBytes[1], seedBytes[2], seedBytes[3], seedBytes[4], seedBytes[5]];
    }

    if (clockseq == null) {
      // Per 4.2.2, randomize (14 bit) clockseq
      clockseq = _clockseq = (seedBytes[6] << 8 | seedBytes[7]) & 0x3fff;
    }
  } // UUID timestamps are 100 nano-second units since the Gregorian epoch,
  // (1582-10-15 00:00).  JSNumbers aren't precise enough for this, so
  // time is handled internally as 'msecs' (integer milliseconds) and 'nsecs'
  // (100-nanoseconds offset from msecs) since unix epoch, 1970-01-01 00:00.


  var msecs = options.msecs !== undefined ? options.msecs : Date.now(); // Per 4.2.1.2, use count of uuid's generated during the current clock
  // cycle to simulate higher resolution clock

  var nsecs = options.nsecs !== undefined ? options.nsecs : _lastNSecs + 1; // Time since last uuid creation (in msecs)

  var dt = msecs - _lastMSecs + (nsecs - _lastNSecs) / 10000; // Per 4.2.1.2, Bump clockseq on clock regression

  if (dt < 0 && options.clockseq === undefined) {
    clockseq = clockseq + 1 & 0x3fff;
  } // Reset nsecs if clock regresses (new clockseq) or we've moved onto a new
  // time interval


  if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === undefined) {
    nsecs = 0;
  } // Per 4.2.1.2 Throw error if too many uuids are requested


  if (nsecs >= 10000) {
    throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
  }

  _lastMSecs = msecs;
  _lastNSecs = nsecs;
  _clockseq = clockseq; // Per 4.1.4 - Convert from unix epoch to Gregorian epoch

  msecs += 12219292800000; // `time_low`

  var tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;
  b[i++] = tl >>> 24 & 0xff;
  b[i++] = tl >>> 16 & 0xff;
  b[i++] = tl >>> 8 & 0xff;
  b[i++] = tl & 0xff; // `time_mid`

  var tmh = msecs / 0x100000000 * 10000 & 0xfffffff;
  b[i++] = tmh >>> 8 & 0xff;
  b[i++] = tmh & 0xff; // `time_high_and_version`

  b[i++] = tmh >>> 24 & 0xf | 0x10; // include version

  b[i++] = tmh >>> 16 & 0xff; // `clock_seq_hi_and_reserved` (Per 4.2.2 - include variant)

  b[i++] = clockseq >>> 8 | 0x80; // `clock_seq_low`

  b[i++] = clockseq & 0xff; // `node`

  for (var n = 0; n < 6; ++n) {
    b[i + n] = node[n];
  }

  return buf || Object(_stringify_js__WEBPACK_IMPORTED_MODULE_1__["default"])(b);
}

/* harmony default export */ __webpack_exports__["default"] = (v1);

/***/ }),

/***/ "../../node_modules/uuid/dist/esm-browser/v3.js":
/*!**********************************************************************************************************!*\
  !*** /Users/gijsburghoorn/Documents/Programmeren/ts-svgmanager/node_modules/uuid/dist/esm-browser/v3.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _v35_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./v35.js */ "../../node_modules/uuid/dist/esm-browser/v35.js");
/* harmony import */ var _md5_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./md5.js */ "../../node_modules/uuid/dist/esm-browser/md5.js");


var v3 = Object(_v35_js__WEBPACK_IMPORTED_MODULE_0__["default"])('v3', 0x30, _md5_js__WEBPACK_IMPORTED_MODULE_1__["default"]);
/* harmony default export */ __webpack_exports__["default"] = (v3);

/***/ }),

/***/ "../../node_modules/uuid/dist/esm-browser/v35.js":
/*!***********************************************************************************************************!*\
  !*** /Users/gijsburghoorn/Documents/Programmeren/ts-svgmanager/node_modules/uuid/dist/esm-browser/v35.js ***!
  \***********************************************************************************************************/
/*! exports provided: DNS, URL, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DNS", function() { return DNS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "URL", function() { return URL; });
/* harmony import */ var _stringify_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./stringify.js */ "../../node_modules/uuid/dist/esm-browser/stringify.js");
/* harmony import */ var _parse_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./parse.js */ "../../node_modules/uuid/dist/esm-browser/parse.js");



function stringToBytes(str) {
  str = unescape(encodeURIComponent(str)); // UTF8 escape

  var bytes = [];

  for (var i = 0; i < str.length; ++i) {
    bytes.push(str.charCodeAt(i));
  }

  return bytes;
}

var DNS = '6ba7b810-9dad-11d1-80b4-00c04fd430c8';
var URL = '6ba7b811-9dad-11d1-80b4-00c04fd430c8';
/* harmony default export */ __webpack_exports__["default"] = (function (name, version, hashfunc) {
  function generateUUID(value, namespace, buf, offset) {
    if (typeof value === 'string') {
      value = stringToBytes(value);
    }

    if (typeof namespace === 'string') {
      namespace = Object(_parse_js__WEBPACK_IMPORTED_MODULE_1__["default"])(namespace);
    }

    if (namespace.length !== 16) {
      throw TypeError('Namespace must be array-like (16 iterable integer values, 0-255)');
    } // Compute hash of namespace and value, Per 4.3
    // Future: Use spread syntax when supported on all platforms, e.g. `bytes =
    // hashfunc([...namespace, ... value])`


    var bytes = new Uint8Array(16 + value.length);
    bytes.set(namespace);
    bytes.set(value, namespace.length);
    bytes = hashfunc(bytes);
    bytes[6] = bytes[6] & 0x0f | version;
    bytes[8] = bytes[8] & 0x3f | 0x80;

    if (buf) {
      offset = offset || 0;

      for (var i = 0; i < 16; ++i) {
        buf[offset + i] = bytes[i];
      }

      return buf;
    }

    return Object(_stringify_js__WEBPACK_IMPORTED_MODULE_0__["default"])(bytes);
  } // Function#name is not settable on some platforms (#270)


  try {
    generateUUID.name = name; // eslint-disable-next-line no-empty
  } catch (err) {} // For CommonJS default export support


  generateUUID.DNS = DNS;
  generateUUID.URL = URL;
  return generateUUID;
});

/***/ }),

/***/ "../../node_modules/uuid/dist/esm-browser/v4.js":
/*!**********************************************************************************************************!*\
  !*** /Users/gijsburghoorn/Documents/Programmeren/ts-svgmanager/node_modules/uuid/dist/esm-browser/v4.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _rng_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./rng.js */ "../../node_modules/uuid/dist/esm-browser/rng.js");
/* harmony import */ var _stringify_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./stringify.js */ "../../node_modules/uuid/dist/esm-browser/stringify.js");



function v4(options, buf, offset) {
  options = options || {};
  var rnds = options.random || (options.rng || _rng_js__WEBPACK_IMPORTED_MODULE_0__["default"])(); // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`

  rnds[6] = rnds[6] & 0x0f | 0x40;
  rnds[8] = rnds[8] & 0x3f | 0x80; // Copy bytes to buffer, if provided

  if (buf) {
    offset = offset || 0;

    for (var i = 0; i < 16; ++i) {
      buf[offset + i] = rnds[i];
    }

    return buf;
  }

  return Object(_stringify_js__WEBPACK_IMPORTED_MODULE_1__["default"])(rnds);
}

/* harmony default export */ __webpack_exports__["default"] = (v4);

/***/ }),

/***/ "../../node_modules/uuid/dist/esm-browser/v5.js":
/*!**********************************************************************************************************!*\
  !*** /Users/gijsburghoorn/Documents/Programmeren/ts-svgmanager/node_modules/uuid/dist/esm-browser/v5.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _v35_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./v35.js */ "../../node_modules/uuid/dist/esm-browser/v35.js");
/* harmony import */ var _sha1_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./sha1.js */ "../../node_modules/uuid/dist/esm-browser/sha1.js");


var v5 = Object(_v35_js__WEBPACK_IMPORTED_MODULE_0__["default"])('v5', 0x50, _sha1_js__WEBPACK_IMPORTED_MODULE_1__["default"]);
/* harmony default export */ __webpack_exports__["default"] = (v5);

/***/ }),

/***/ "../../node_modules/uuid/dist/esm-browser/validate.js":
/*!****************************************************************************************************************!*\
  !*** /Users/gijsburghoorn/Documents/Programmeren/ts-svgmanager/node_modules/uuid/dist/esm-browser/validate.js ***!
  \****************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _regex_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./regex.js */ "../../node_modules/uuid/dist/esm-browser/regex.js");


function validate(uuid) {
  return typeof uuid === 'string' && _regex_js__WEBPACK_IMPORTED_MODULE_0__["default"].test(uuid);
}

/* harmony default export */ __webpack_exports__["default"] = (validate);

/***/ }),

/***/ "../../node_modules/uuid/dist/esm-browser/version.js":
/*!***************************************************************************************************************!*\
  !*** /Users/gijsburghoorn/Documents/Programmeren/ts-svgmanager/node_modules/uuid/dist/esm-browser/version.js ***!
  \***************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _validate_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./validate.js */ "../../node_modules/uuid/dist/esm-browser/validate.js");


function version(uuid) {
  if (!Object(_validate_js__WEBPACK_IMPORTED_MODULE_0__["default"])(uuid)) {
    throw TypeError('Invalid UUID');
  }

  return parseInt(uuid.substr(14, 1), 16);
}

/* harmony default export */ __webpack_exports__["default"] = (version);

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var dist_1 = __webpack_require__(/*! ../../../dist */ "../../dist/index.js");
function example1() {
    var manager = new dist_1.SVGManager();
    manager.init('svg-root');
    manager.render(dist_1.circle(25), new dist_1.V2D(50, 50));
}
function example2() {
    var manager = new dist_1.SVGManager();
    manager.init('svg-root');
    var gradient = 'linear-gradient(0deg, rgb(72, 60, 102) 0%, rgb(136, 169, 197) 100%)';
    manager.renderNamed('pentagon', new dist_1.SVGNode('path')
        .set('d', new dist_1.PathData()
        .moveTo(100, 100)
        .lineTo(300, 100)
        .lineTo(400, 300)
        .lineTo(200, 400)
        .lineTo(400, 300)
        .lineTo(200, 400)
        .closePath()
        .toString())
        .set('stroke', '#ccc')
        .set('stroke-width', '1px')
        .set('fill', gradient), new dist_1.V2D(0, 0));
}
function example3() {
    var manager = new dist_1.SVGManager();
    manager.init('svg-root');
    var gradient = 'linear-gradient(0deg, rgb(72, 60, 102) 0%, rgb(136, 169, 197) 100%)';
    manager.renderNamed('pentagon', new dist_1.SVGNode('path')
        .set('d', new dist_1.PathData()
        .moveTo(100, 100)
        .lineTo(300, 100)
        .lineTo(400, 300)
        .lineTo(200, 400)
        .lineTo(400, 300)
        .lineTo(200, 400)
        .closePath()
        .toString())
        .set('stroke', '#ccc')
        .set('stroke-width', '1px')
        .set('fill', gradient), new dist_1.V2D(0, 0));
    var time = 0;
    setInterval(function () {
        var x = Math.cos(time) * 30 - 15;
        var y = Math.sin(time) * 30 - 15;
        manager.moveNamed('pentagon', new dist_1.V2D(x, y));
        time += (2 * Math.PI) / 1000;
    }, 1);
}
example1();
example2();
example3();


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy9Vc2Vycy9naWpzYnVyZ2hvb3JuL0RvY3VtZW50cy9Qcm9ncmFtbWVyZW4vdHMtc3ZnbWFuYWdlci9kaXN0L1BhdGhEYXRhLmpzIiwid2VicGFjazovLy8vVXNlcnMvZ2lqc2J1cmdob29ybi9Eb2N1bWVudHMvUHJvZ3JhbW1lcmVuL3RzLXN2Z21hbmFnZXIvZGlzdC9TVkdNYW5hZ2VyLmpzIiwid2VicGFjazovLy8vVXNlcnMvZ2lqc2J1cmdob29ybi9Eb2N1bWVudHMvUHJvZ3JhbW1lcmVuL3RzLXN2Z21hbmFnZXIvZGlzdC9TVkdOb2RlLmpzIiwid2VicGFjazovLy8vVXNlcnMvZ2lqc2J1cmdob29ybi9Eb2N1bWVudHMvUHJvZ3JhbW1lcmVuL3RzLXN2Z21hbmFnZXIvZGlzdC9TaGFwZXMuanMiLCJ3ZWJwYWNrOi8vLy9Vc2Vycy9naWpzYnVyZ2hvb3JuL0RvY3VtZW50cy9Qcm9ncmFtbWVyZW4vdHMtc3ZnbWFuYWdlci9kaXN0L1YyRC5qcyIsIndlYnBhY2s6Ly8vL1VzZXJzL2dpanNidXJnaG9vcm4vRG9jdW1lbnRzL1Byb2dyYW1tZXJlbi90cy1zdmdtYW5hZ2VyL2Rpc3QvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy9Vc2Vycy9naWpzYnVyZ2hvb3JuL0RvY3VtZW50cy9Qcm9ncmFtbWVyZW4vdHMtc3ZnbWFuYWdlci9ub2RlX21vZHVsZXMvdHMtbWQ1L2Rpc3QvbWQ1LmpzIiwid2VicGFjazovLy8vVXNlcnMvZ2lqc2J1cmdob29ybi9Eb2N1bWVudHMvUHJvZ3JhbW1lcmVuL3RzLXN2Z21hbmFnZXIvbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9lc20tYnJvd3Nlci9pbmRleC5qcyIsIndlYnBhY2s6Ly8vL1VzZXJzL2dpanNidXJnaG9vcm4vRG9jdW1lbnRzL1Byb2dyYW1tZXJlbi90cy1zdmdtYW5hZ2VyL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvZXNtLWJyb3dzZXIvbWQ1LmpzIiwid2VicGFjazovLy8vVXNlcnMvZ2lqc2J1cmdob29ybi9Eb2N1bWVudHMvUHJvZ3JhbW1lcmVuL3RzLXN2Z21hbmFnZXIvbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9lc20tYnJvd3Nlci9uaWwuanMiLCJ3ZWJwYWNrOi8vLy9Vc2Vycy9naWpzYnVyZ2hvb3JuL0RvY3VtZW50cy9Qcm9ncmFtbWVyZW4vdHMtc3ZnbWFuYWdlci9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2VzbS1icm93c2VyL3BhcnNlLmpzIiwid2VicGFjazovLy8vVXNlcnMvZ2lqc2J1cmdob29ybi9Eb2N1bWVudHMvUHJvZ3JhbW1lcmVuL3RzLXN2Z21hbmFnZXIvbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9lc20tYnJvd3Nlci9yZWdleC5qcyIsIndlYnBhY2s6Ly8vL1VzZXJzL2dpanNidXJnaG9vcm4vRG9jdW1lbnRzL1Byb2dyYW1tZXJlbi90cy1zdmdtYW5hZ2VyL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvZXNtLWJyb3dzZXIvcm5nLmpzIiwid2VicGFjazovLy8vVXNlcnMvZ2lqc2J1cmdob29ybi9Eb2N1bWVudHMvUHJvZ3JhbW1lcmVuL3RzLXN2Z21hbmFnZXIvbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9lc20tYnJvd3Nlci9zaGExLmpzIiwid2VicGFjazovLy8vVXNlcnMvZ2lqc2J1cmdob29ybi9Eb2N1bWVudHMvUHJvZ3JhbW1lcmVuL3RzLXN2Z21hbmFnZXIvbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9lc20tYnJvd3Nlci9zdHJpbmdpZnkuanMiLCJ3ZWJwYWNrOi8vLy9Vc2Vycy9naWpzYnVyZ2hvb3JuL0RvY3VtZW50cy9Qcm9ncmFtbWVyZW4vdHMtc3ZnbWFuYWdlci9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2VzbS1icm93c2VyL3YxLmpzIiwid2VicGFjazovLy8vVXNlcnMvZ2lqc2J1cmdob29ybi9Eb2N1bWVudHMvUHJvZ3JhbW1lcmVuL3RzLXN2Z21hbmFnZXIvbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9lc20tYnJvd3Nlci92My5qcyIsIndlYnBhY2s6Ly8vL1VzZXJzL2dpanNidXJnaG9vcm4vRG9jdW1lbnRzL1Byb2dyYW1tZXJlbi90cy1zdmdtYW5hZ2VyL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvZXNtLWJyb3dzZXIvdjM1LmpzIiwid2VicGFjazovLy8vVXNlcnMvZ2lqc2J1cmdob29ybi9Eb2N1bWVudHMvUHJvZ3JhbW1lcmVuL3RzLXN2Z21hbmFnZXIvbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9lc20tYnJvd3Nlci92NC5qcyIsIndlYnBhY2s6Ly8vL1VzZXJzL2dpanNidXJnaG9vcm4vRG9jdW1lbnRzL1Byb2dyYW1tZXJlbi90cy1zdmdtYW5hZ2VyL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvZXNtLWJyb3dzZXIvdjUuanMiLCJ3ZWJwYWNrOi8vLy9Vc2Vycy9naWpzYnVyZ2hvb3JuL0RvY3VtZW50cy9Qcm9ncmFtbWVyZW4vdHMtc3ZnbWFuYWdlci9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2VzbS1icm93c2VyL3ZhbGlkYXRlLmpzIiwid2VicGFjazovLy8vVXNlcnMvZ2lqc2J1cmdob29ybi9Eb2N1bWVudHMvUHJvZ3JhbW1lcmVuL3RzLXN2Z21hbmFnZXIvbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9lc20tYnJvd3Nlci92ZXJzaW9uLmpzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFD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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3REFBd0QsTUFBTSxJQUFJLE1BQU07QUFDeEU7QUFDQTtBQUNBLHNDQUFzQyxNQUFNO0FBQzVDLHNDQUFzQyxNQUFNO0FBQzVDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNsU2E7QUFDYiw4Q0FBOEMsY0FBYztBQUM1RCxjQUFjLG1CQUFPLENBQUMsOERBQWlCO0FB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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsZ0JBQWdCO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsZ0JBQWdCO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCLGFBQWE7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtFQUFrRSxJQUFJO0FBQ3RFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0I7Ozs7Ozs7Ozs7OztBQ2paQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUF3QztBQUNBO0FBQ0E7QUFDQTtBQUNFO0FBQ1E7QUFDRTtBQUNFOzs7Ozs7Ozs7Ozs7O0FDUHREO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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ZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXgudHNcIik7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbi8qKlxuICogQSBKUyBDbGFzcyByZXByZXNlbnRpbmcgdGhlIEhUTUwtUGF0aCBEIGF0dHJpYnV0ZVxuICovXG5jbGFzcyBQYXRoRGF0YSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuX2lubmVyID0gJyc7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEFwcGVuZHMgYSBtb3ZlIHRvIGEgY2VydGFpbiBwb2ludCB0byB0aGUgUGF0aERhdGFcbiAgICAgKlxuICAgICAqICMgTm90ZSAvIEFyZ3VtZW50c1xuICAgICAqIEZvciBmdXJ0aGVyIGluZm9ybWF0aW9uOiBbTG9vayBoZXJlXShodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9TVkcvVHV0b3JpYWwvUGF0aHMjTGluZV9jb21tYW5kcylcbiAgICAgKi9cbiAgICBtb3ZlVG8oeCwgeSkge1xuICAgICAgICB0aGlzLl9pbm5lciArPSBgIE0gJHt4fSAke3l9YDtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEFwcGVuZHMgYSBsaW5lIHRvIGEgY2VydGFpbiBwb2ludCB0byB0aGUgUGF0aERhdGFcbiAgICAgKlxuICAgICAqICMgTm90ZSAvIEFyZ3VtZW50c1xuICAgICAqIEZvciBmdXJ0aGVyIGluZm9ybWF0aW9uOiBbTG9vayBoZXJlXShodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9TVkcvVHV0b3JpYWwvUGF0aHMjTGluZV9jb21tYW5kcylcbiAgICAgKi9cbiAgICBsaW5lVG8oeCwgeSkge1xuICAgICAgICB0aGlzLl9pbm5lciArPSBgIEwgJHt4fSAke3l9YDtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEFwcGVuZHMgYSBob3Jpem9udGFsIGxpbmUgdG8gYSBjZXJ0YWluIHgtdmFsdWUgdG8gdGhlIFBhdGhEYXRhXG4gICAgICpcbiAgICAgKiAjIE5vdGUgLyBBcmd1bWVudHNcbiAgICAgKiBGb3IgZnVydGhlciBpbmZvcm1hdGlvbjogW0xvb2sgaGVyZV0oaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvU1ZHL1R1dG9yaWFsL1BhdGhzI0xpbmVfY29tbWFuZHMpXG4gICAgICovXG4gICAgaG9yaXpvbnRhbExpbmVUbyh4KSB7XG4gICAgICAgIHRoaXMuX2lubmVyICs9IGAgSCAke3h9YDtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEFwcGVuZHMgYSB2ZXJ0aWNhbCBsaW5lIHRvIGEgY2VydGFpbiB5LXZhbHVlIHRvIHRoZSBQYXRoRGF0YVxuICAgICAqXG4gICAgICogIyBOb3RlIC8gQXJndW1lbnRzXG4gICAgICogRm9yIGZ1cnRoZXIgaW5mb3JtYXRpb246IFtMb29rIGhlcmVdKGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL1NWRy9UdXRvcmlhbC9QYXRocyNMaW5lX2NvbW1hbmRzKVxuICAgICAqL1xuICAgIHZlcnRpY2FsTGluZVRvKHkpIHtcbiAgICAgICAgdGhpcy5faW5uZXIgKz0gYCBWICR7eX1gO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogQXBwZW5kcyBhIGxpbmUgdG8gYSBjZXJ0YWluIHBvaW50IHJlbGF0aXZlIHRvIHdoZXJlIHRoZSBsYXN0IGFjdGlvbiBlbmRlZCB0byB0aGUgUGF0aERhdGFcbiAgICAgKlxuICAgICAqICMgTm90ZSAvIEFyZ3VtZW50c1xuICAgICAqIEZvciBmdXJ0aGVyIGluZm9ybWF0aW9uOiBbTG9vayBoZXJlXShodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9TVkcvVHV0b3JpYWwvUGF0aHMjTGluZV9jb21tYW5kcylcbiAgICAgKi9cbiAgICBsaW5lUmVsYXRpdmVUbyh4LCB5KSB7XG4gICAgICAgIHRoaXMuX2lubmVyICs9IGAgbCAke3h9ICR7eX1gO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogQXBwZW5kcyBhIGhvcml6b250YWwgbGluZSB0byBhIGNlcnRhaW4geC12YWx1ZSByZWxhdGl2ZSB0byB3aGVyZSB0aGUgbGFzdCBhY3Rpb24gZW5kZWQgdG8gdGhlIFBhdGhEYXRhXG4gICAgICpcbiAgICAgKiAjIE5vdGUgLyBBcmd1bWVudHNcbiAgICAgKiBGb3IgZnVydGhlciBpbmZvcm1hdGlvbjogW0xvb2sgaGVyZV0oaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvU1ZHL1R1dG9yaWFsL1BhdGhzI0xpbmVfY29tbWFuZHMpXG4gICAgICovXG4gICAgaG9yaXpvbnRhbExpbmVSZWxhdGl2ZVRvKHgpIHtcbiAgICAgICAgdGhpcy5faW5uZXIgKz0gYCBoICR7eH1gO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogQXBwZW5kcyBhIHZlcnRpY2FsIGxpbmUgdG8gYSBjZXJ0YWluIHktdmFsdWUgcmVsYXRpdmUgdG8gd2hlcmUgdGhlIGxhc3QgYWN0aW9uIGVuZGVkIHRvIHRoZSBQYXRoRGF0YVxuICAgICAqXG4gICAgICogIyBOb3RlIC8gQXJndW1lbnRzXG4gICAgICogRm9yIGZ1cnRoZXIgaW5mb3JtYXRpb246IFtMb29rIGhlcmVdKGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL1NWRy9UdXRvcmlhbC9QYXRocyNMaW5lX2NvbW1hbmRzKVxuICAgICAqL1xuICAgIHZlcnRpY2FsTGluZVJlbGF0aXZlVG8oeSkge1xuICAgICAgICB0aGlzLl9pbm5lciArPSBgIHYgJHt5fWA7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBcHBlbmRzIGEgY3VydmUgdG8gYSBjZXJ0YWluIHBvaW50IHRvIHRoZSBQYXRoRGF0YSwgdXNpbmcgY29udHJvbCBwb2ludCAxICYgMlxuICAgICAqXG4gICAgICogIyBOb3RlIC8gQXJndW1lbnRzXG4gICAgICogRm9yIGZ1cnRoZXIgaW5mb3JtYXRpb246IFtMb29rIGhlcmVdKGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL1NWRy9UdXRvcmlhbC9QYXRocyNCZXppZXJfQ3VydmVzKVxuICAgICAqL1xuICAgIGN1cnZlVG8oZW5kWCwgZW5kWSwgY29udHJvbDFYLCBjb250cm9sMVksIGNvbnRyb2wyWCwgY29udHJvbDJZKSB7XG4gICAgICAgIHRoaXMuX2lubmVyICs9IGAgQyAke2NvbnRyb2wxWH0gJHtjb250cm9sMVl9LCAke2NvbnRyb2wyWH0gJHtjb250cm9sMll9LCAke2VuZFh9ICR7ZW5kWX1gO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogQXBwZW5kcyBhIGN1cnZlIHRvIGEgY2VydGFpbiBwb2ludCByZWxhdGl2ZSB0byB3aGVyZSB0aGUgbGFzdCBhY3Rpb24gZW5kZWQgdG8gdGhlIFBhdGhEYXRhLCB1c2luZyBjb250cm9sIHBvaW50IDEgJiAyXG4gICAgICpcbiAgICAgKiAjIE5vdGUgLyBBcmd1bWVudHNcbiAgICAgKiBGb3IgZnVydGhlciBpbmZvcm1hdGlvbjogW0xvb2sgaGVyZV0oaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvU1ZHL1R1dG9yaWFsL1BhdGhzI0Jlemllcl9DdXJ2ZXMpXG4gICAgICovXG4gICAgY3VydmVSZWxhdGl2ZVRvKGVuZFgsIGVuZFksIGNvbnRyb2wxWCwgY29udHJvbDFZLCBjb250cm9sMlgsIGNvbnRyb2wyWSkge1xuICAgICAgICB0aGlzLl9pbm5lciArPSBgIGMgJHtjb250cm9sMVh9ICR7Y29udHJvbDFZfSwgJHtjb250cm9sMlh9ICR7Y29udHJvbDJZfSwgJHtlbmRYfSAke2VuZFl9YDtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEFwcGVuZHMgYSBzbW9vdGggY3VydmUgKGZvbGxvd2luZyBhIG5vcm1hbCBjdXJ2ZSkgdG8gYSBjZXJ0YWluIHBvaW50IHRvIHRoZSBQYXRoRGF0YSwgdXNpbmcgY29udHJvbCBwb2ludCAyXG4gICAgICpcbiAgICAgKiAjIE5vdGUgLyBBcmd1bWVudHNcbiAgICAgKiBGb3IgZnVydGhlciBpbmZvcm1hdGlvbjogW0xvb2sgaGVyZV0oaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvU1ZHL1R1dG9yaWFsL1BhdGhzI0Jlemllcl9DdXJ2ZXMpXG4gICAgICovXG4gICAgc21vb3RoQ3VydmVUbyhlbmRYLCBlbmRZLCBjb250cm9sMVgsIGNvbnRyb2wxWSwgY29udHJvbDJYLCBjb250cm9sMlkpIHtcbiAgICAgICAgdGhpcy5faW5uZXIgKz0gYCBTICR7Y29udHJvbDFYfSAke2NvbnRyb2wxWX0sICR7Y29udHJvbDJYfSAke2NvbnRyb2wyWX0sICR7ZW5kWH0gJHtlbmRZfWA7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBcHBlbmRzIGEgc21vb3RoIGN1cnZlIChmb2xsb3dpbmcgYSBub3JtYWwgY3VydmUpIHRvIGEgY2VydGFpbiBwb2ludFxuICAgICAqIHJlbGF0aXZlIHRvIHdoZXJlIHRoZSBsYXN0IGFjdGlvbiBlbmRlZCB0byB0aGUgUGF0aERhdGEsIHVzaW5nIGNvbnRyb2wgcG9pbnQgMlxuICAgICAqXG4gICAgICogIyBOb3RlIC8gQXJndW1lbnRzXG4gICAgICogRm9yIGZ1cnRoZXIgaW5mb3JtYXRpb246IFtMb29rIGhlcmVdKGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL1NWRy9UdXRvcmlhbC9QYXRocyNCZXppZXJfQ3VydmVzKVxuICAgICAqL1xuICAgIHNtb290aEN1cnZlUmVsYXRpdmVUbyhlbmRYLCBlbmRZLCBjb250cm9sWCwgY29udHJvbFkpIHtcbiAgICAgICAgdGhpcy5faW5uZXIgKz0gYCBzICR7Y29udHJvbFh9ICR7Y29udHJvbFl9LCAke2VuZFh9ICR7ZW5kWX1gO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogQXBwZW5kcyBhIHF1YWRyYXRpYyBjdXJ2ZSB0byBhIGNlcnRhaW4gcG9pbnRcbiAgICAgKiB0byB0aGUgUGF0aERhdGEsIHVzaW5nIGNvbnRyb2wgcG9pbnQgMVxuICAgICAqXG4gICAgICogIyBOb3RlIC8gQXJndW1lbnRzXG4gICAgICogRm9yIGZ1cnRoZXIgaW5mb3JtYXRpb246IFtMb29rIGhlcmVdKGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL1NWRy9UdXRvcmlhbC9QYXRocyNCZXppZXJfQ3VydmVzKVxuICAgICAqL1xuICAgIHF1YWRyYXRpY0N1cnZlVG8oZW5kWCwgZW5kWSwgY29udHJvbFgsIGNvbnRyb2xZKSB7XG4gICAgICAgIHRoaXMuX2lubmVyICs9IGAgUSAke2NvbnRyb2xYfSAke2NvbnRyb2xZfSwgJHtlbmRYfSAke2VuZFl9YDtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEFwcGVuZHMgYSBxdWFkcmF0aWMgY3VydmUgdG8gYSBjZXJ0YWluIHBvaW50XG4gICAgICogcmVsYXRpdmUgdG8gd2hlcmUgdGhlIGxhc3QgYWN0aW9uIGVuZGVkIHRvIHRoZSBQYXRoRGF0YSwgdXNpbmcgY29udHJvbCBwb2ludCAxXG4gICAgICpcbiAgICAgKiAjIE5vdGUgLyBBcmd1bWVudHNcbiAgICAgKiBGb3IgZnVydGhlciBpbmZvcm1hdGlvbjogW0xvb2sgaGVyZV0oaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvU1ZHL1R1dG9yaWFsL1BhdGhzI0Jlemllcl9DdXJ2ZXMpXG4gICAgICovXG4gICAgcXVhZHJhdGljQ3VydmVSZWxhdGl2ZVRvKGVuZFgsIGVuZFksIGNvbnRyb2xYLCBjb250cm9sWSkge1xuICAgICAgICB0aGlzLl9pbm5lciArPSBgIHEgJHtjb250cm9sWH0gJHtjb250cm9sWX0sICR7ZW5kWH0gJHtlbmRZfWA7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBcHBlbmRzIGEgcXVhZHJhdGljIGN1cnZlIChmb2xsb3dpbmcgYSBxdWFkcmF0aWMgY3VydmUpIHRvIGEgY2VydGFpbiBwb2ludFxuICAgICAqIHRvIHRoZSBQYXRoRGF0YSxcbiAgICAgKiBzbW9vdGhpbmcgb3V0IHRoZSBjdXJ2ZSB1c2luZyB0aGUgcHJldmlvdXMgcXVhZHJhdGljIGN1cnZlXG4gICAgICpcbiAgICAgKiAjIE5vdGUgLyBBcmd1bWVudHNcbiAgICAgKiBGb3IgZnVydGhlciBpbmZvcm1hdGlvbjogW0xvb2sgaGVyZV0oaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvU1ZHL1R1dG9yaWFsL1BhdGhzI0Jlemllcl9DdXJ2ZXMpXG4gICAgICovXG4gICAgcXVhZHJhdGljU3RyaW5nVG8oeCwgeSkge1xuICAgICAgICB0aGlzLl9pbm5lciArPSBgIFQgJHt4fSAke3l9YDtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEFwcGVuZHMgYSBxdWFkcmF0aWMgY3VydmUgKGZvbGxvd2luZyBhIHF1YWRyYXRpYyBjdXJ2ZSkgdG8gYSBjZXJ0YWluIHBvaW50XG4gICAgICogcmVsYXRpdmUgdG8gd2hlcmUgdGhlIGxhc3QgYWN0aW9uIGVuZGVkIHRvIHRoZSBQYXRoRGF0YSxcbiAgICAgKiBzbW9vdGhpbmcgb3V0IHRoZSBjdXJ2ZSB1c2luZyB0aGUgcHJldmlvdXMgcXVhZHJhdGljIGN1cnZlXG4gICAgICpcbiAgICAgKiAjIE5vdGUgLyBBcmd1bWVudHNcbiAgICAgKiBGb3IgZnVydGhlciBpbmZvcm1hdGlvbjogW0xvb2sgaGVyZV0oaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvU1ZHL1R1dG9yaWFsL1BhdGhzI0Jlemllcl9DdXJ2ZXMpXG4gICAgICovXG4gICAgcXVhZHJhdGljU3RyaW5nUmVsYXRpdmVUbyh4LCB5KSB7XG4gICAgICAgIHRoaXMuX2lubmVyICs9IGAgdCAke3h9ICR7eX1gO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogQXBwZW5kcyBhbiBhcmMgdG8gYSBjZXJ0YWluIHBvaW50IHRvIHRoZSBQYXRoRGF0YVxuICAgICAqXG4gICAgICogIyBOb3RlIC8gQXJndW1lbnRzXG4gICAgICogRm9yIGZ1cnRoZXIgaW5mb3JtYXRpb246IFtMb29rIGhlcmVdKGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL1NWRy9UdXRvcmlhbC9QYXRocyNBcmNzKVxuICAgICAqL1xuICAgIGFyY1RvKHgsIHksIHJ4LCByeSwgeEF4aXNSb3RhdGlvbiwgbGFyZ2VBcmNGbGFnLCBzd2VlcEZsYWcpIHtcbiAgICAgICAgdGhpcy5faW5uZXIgKz0gYCBBICR7cnh9ICR7cnl9ICR7eEF4aXNSb3RhdGlvbn0gJHtsYXJnZUFyY0ZsYWcgPyAnMScgOiAnMCd9ICR7c3dlZXBGbGFnID8gJzEnIDogJzAnfSAke3h9ICR7eX1gO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogQXBwZW5kcyBhbiBhcmMgdG8gYSBjZXJ0YWluIHBvaW50IHJlbGF0aXZlIHRvIHdoZXJlIHRoZSBsYXN0IGFjdGlvbiBlbmRlZCB0byB0aGUgUGF0aERhdGFcbiAgICAgKlxuICAgICAqICMgTm90ZSAvIEFyZ3VtZW50c1xuICAgICAqIEZvciBmdXJ0aGVyIGluZm9ybWF0aW9uOiBbTG9vayBoZXJlXShodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9TVkcvVHV0b3JpYWwvUGF0aHMjQXJjcylcbiAgICAgKi9cbiAgICBhcmNSZWxhdGl2ZVRvKHgsIHksIHJ4LCByeSwgeEF4aXNSb3RhdGlvbiwgbGFyZ2VBcmNGbGFnLCBzd2VlcEZsYWcpIHtcbiAgICAgICAgdGhpcy5faW5uZXIgKz0gYCBhICR7cnh9ICR7cnl9ICR7eEF4aXNSb3RhdGlvbn0gJHtsYXJnZUFyY0ZsYWcgPyAnMScgOiAnMCd9ICR7c3dlZXBGbGFnID8gJzEnIDogJzAnfSAke3h9ICR7eX1gO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2xvc2VzIGEgUGF0aERhdGFcbiAgICAgKlxuICAgICAqICMgTm90ZSAvIEFyZ3VtZW50c1xuICAgICAqIEZvciBmdXJ0aGVyIGluZm9ybWF0aW9uOiBbTG9vayBoZXJlXShodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9TVkcvVHV0b3JpYWwvUGF0aHMjTGluZV9jb21tYW5kcylcbiAgICAgKi9cbiAgICBjbG9zZVBhdGgoKSB7XG4gICAgICAgIHRoaXMuX2lubmVyICs9IGAgWmA7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICB0b1N0cmluZygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lubmVyLnRyaW0oKTtcbiAgICB9XG59XG5leHBvcnRzLmRlZmF1bHQgPSBQYXRoRGF0YTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgVjJEXzEgPSByZXF1aXJlKFwiLi9WMkRcIik7XG5jb25zdCBTVkdOb2RlXzEgPSByZXF1aXJlKFwiLi9TVkdOb2RlXCIpO1xuY29uc3QgdXVpZF8xID0gcmVxdWlyZShcInV1aWRcIik7XG5jb25zdCBERUZJTklUSU9OX1BSRUZJWCA9ICdmaWd1cmUtJztcbmNvbnN0IE5BTUVfUFJFRklYID0gJ25hbWVkLSc7XG5jb25zdCBERUZBVUxUX1NWR19XSURUSCA9ICc1MDBweCc7XG5jb25zdCBERUZBVUxUX1NWR19IRUlHSFQgPSAnNTAwcHgnO1xuY29uc3QgREVGQVVMVF9WSUVXQk9YID0gJzAgMCAxMDAgMTAwJztcbi8qKlxuICogQSBjbGFzcyB1c2VkIHRvIG1hbmFnZSBTVkcncyBpbiBvcmRlciB0byBtaW5pbWl6ZSBkZWZpbml0aW9uc1xuICogYW5kIG1ha2UgY29udHJvbGxpbmcgaXQgZnJvbSBKUy9UUyBhcyBlYXN5IGFuZCByZWxpYWJsZSBhcyBwb3NzaWJsZS5cbiAqL1xuY2xhc3MgU1ZHTWFuYWdlciB7XG4gICAgLyoqXG4gICAgICogQ29uc3RydWN0cyBhIGVtcHR5IFNWR01hbmFnZXIgb2JqZWN0XG4gICAgICovXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuX21hbmFnZXJpZCA9IHV1aWRfMS52NCgpO1xuICAgICAgICB0aGlzLl9kZWZpbnRpb25zID0gW107XG4gICAgICAgIHRoaXMuX25hbWVzID0gW107XG4gICAgfVxuICAgIGRlZnNFbGVtZW50KCkge1xuICAgICAgICBsZXQgZGVmcyA9IHRoaXMuX3N2Z0VsZW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2RlZnMnKTtcbiAgICAgICAgcmV0dXJuIGRlZnNbMF07XG4gICAgfVxuICAgIHByZWZpeE1hbmFnZXJJZChzdHIpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21hbmFnZXJpZCArICctJyArIHN0cjtcbiAgICB9XG4gICAgdG9EZWZJZChlbGVtZW50SWQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucHJlZml4TWFuYWdlcklkKERFRklOSVRJT05fUFJFRklYICsgZWxlbWVudElkKTtcbiAgICB9XG4gICAgZ2V0TmFtZShuYW1lKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnByZWZpeE1hbmFnZXJJZChOQU1FX1BSRUZJWCArIG5hbWUpO1xuICAgIH1cbiAgICBkb2VzRGVmRXhpc3QoZWxlbWVudElkKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kZWZpbnRpb25zLmluY2x1ZGVzKGVsZW1lbnRJZCk7XG4gICAgfVxuICAgIGRvZXNOYW1lRXhpc3QobmFtZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbmFtZXMuaW5jbHVkZXMobmFtZSk7XG4gICAgfVxuICAgIGFkZERlZmludGlvbihlbGVtZW50KSB7XG4gICAgICAgIGNvbnN0IGVsZW1lbnRJZCA9IGVsZW1lbnQudG9IYXNoKCk7XG4gICAgICAgIHRoaXMuX2RlZmludGlvbnMucHVzaChlbGVtZW50SWQpO1xuICAgICAgICB0aGlzLmRlZnNFbGVtZW50KCkuYXBwZW5kQ2hpbGQoZWxlbWVudC5zZXQoJ2lkJywgdGhpcy50b0RlZklkKGVsZW1lbnRJZCkpLnRvSFRNTCgpKTtcbiAgICAgICAgcmV0dXJuIGVsZW1lbnRJZDtcbiAgICB9XG4gICAgYWRkRmlndXJlKGVsZW1lbnRJZCwgcG9zaXRpb24pIHtcbiAgICAgICAgdGhpcy5fc3ZnRWxlbWVudC5hcHBlbmRDaGlsZChuZXcgU1ZHTm9kZV8xLmRlZmF1bHQoJ3VzZScpXG4gICAgICAgICAgICAuc2V0KCdocmVmJywgJyMnICsgZWxlbWVudElkKVxuICAgICAgICAgICAgLnNldCgneCcsIHBvc2l0aW9uLngoKS50b1N0cmluZygpKVxuICAgICAgICAgICAgLnNldCgneScsIHBvc2l0aW9uLnkoKS50b1N0cmluZygpKVxuICAgICAgICAgICAgLnRvSFRNTCgpKTtcbiAgICB9XG4gICAgYWRkTmFtZWRGaWd1cmUobmFtZSwgZWxlbWVudElkLCBwb3NpdGlvbikge1xuICAgICAgICBpZiAodGhpcy5kb2VzTmFtZUV4aXN0KG5hbWUpKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdOYW1lIGFscmVhZHkgZXhpc3RzIScpO1xuICAgICAgICB0aGlzLl9zdmdFbGVtZW50LmFwcGVuZENoaWxkKG5ldyBTVkdOb2RlXzEuZGVmYXVsdCgndXNlJylcbiAgICAgICAgICAgIC5zZXQoJ2hyZWYnLCAnIycgKyBlbGVtZW50SWQpXG4gICAgICAgICAgICAuc2V0KCd4JywgcG9zaXRpb24ueCgpLnRvU3RyaW5nKCkpXG4gICAgICAgICAgICAuc2V0KCd5JywgcG9zaXRpb24ueSgpLnRvU3RyaW5nKCkpXG4gICAgICAgICAgICAuc2V0KCdpZCcsIHRoaXMuZ2V0TmFtZShuYW1lKSlcbiAgICAgICAgICAgIC50b0hUTUwoKSk7XG4gICAgICAgIHRoaXMuX25hbWVzLnB1c2gobmFtZSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEluaXRpYWxpemVzIHRoZSBTVkdNYW5hZ2VyIHRvIERPTSB3aXRoaW4gdGhlIGNvbnRhaW5lciB3aXRoIGlkICpyb290SWQqXG4gICAgICpcbiAgICAgKiAjIE5vdGVcbiAgICAgKiBUaGlzIHN2ZyBoYXMgc29tZSBkZWZhdWx0IHN0eWxpbmc6XG4gICAgICogLSB2aWV3Qm94IG9mICcwIDAgMTAwIDEwMCdcbiAgICAgKiAtIHdpZHRoIG9mIDUwMHB4XG4gICAgICogLSBoZWlnaHQgb2YgNTAwcHhcbiAgICAgKiBAcGFyYW0gcm9vdElkIFRoZSBwYXJlbnQgaWRcbiAgICAgKi9cbiAgICBpbml0KHJvb3RJZCkge1xuICAgICAgICBsZXQgcm9vdEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChyb290SWQpO1xuICAgICAgICB0aGlzLl9yb290RWxlbWVudCA9IHJvb3RFbGVtZW50O1xuICAgICAgICB0aGlzLl9kZWZpbnRpb25zID0gW107XG4gICAgICAgIHRoaXMuX25hbWVzID0gW107XG4gICAgICAgIGNvbnN0IHN2Z0VsZW1lbnQgPSBuZXcgU1ZHTm9kZV8xLmRlZmF1bHQoJ3N2ZycpXG4gICAgICAgICAgICAuc2V0KCd2aWV3Qm94JywgREVGQVVMVF9WSUVXQk9YKVxuICAgICAgICAgICAgLnNldCgnd2lkdGgnLCBERUZBVUxUX1NWR19XSURUSClcbiAgICAgICAgICAgIC5zZXQoJ2hlaWdodCcsIERFRkFVTFRfU1ZHX0hFSUdIVClcbiAgICAgICAgICAgIC5zZXQoJ2lkJywgdGhpcy5fbWFuYWdlcmlkKVxuICAgICAgICAgICAgLmFwcGVuZChuZXcgU1ZHTm9kZV8xLmRlZmF1bHQoJ2RlZnMnKSlcbiAgICAgICAgICAgIC50b0hUTUwoKTtcbiAgICAgICAgdGhpcy5fc3ZnRWxlbWVudCA9IHRoaXMuX3Jvb3RFbGVtZW50LmFwcGVuZENoaWxkKHN2Z0VsZW1lbnQpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBZGRzIHZlY3RvciB0byB0aGUgcG9zaXRpb24gb2YgbWluaW11bSBvZiB0aGUgdmlld0JveFxuICAgICAqIEBwYXJhbSB2IHZlY3RvciB0byBiZSBhZGRlZFxuICAgICAqL1xuICAgIG1vdmVWaWV3Qm94KHYpIHtcbiAgICAgICAgY29uc3Qgdmlld0JveCA9IHRoaXMuZ2V0KCd2aWV3Qm94Jykuc3BsaXQoJyAnKTtcbiAgICAgICAgY29uc3QgbWluWCA9IHBhcnNlSW50KHZpZXdCb3hbMF0pICsgdi54KCk7XG4gICAgICAgIGNvbnN0IG1pblkgPSBwYXJzZUludCh2aWV3Qm94WzFdKSArIHYueSgpO1xuICAgICAgICBjb25zdCB3aWR0aCA9IHBhcnNlSW50KHZpZXdCb3hbMl0pO1xuICAgICAgICBjb25zdCBoZWlnaHQgPSBwYXJzZUludCh2aWV3Qm94WzNdKTtcbiAgICAgICAgdGhpcy5zZXQoJ3ZpZXdCb3gnLCBgJHttaW5YfSAke21pbll9ICR7d2lkdGh9ICR7aGVpZ2h0fWApO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSB3aWR0aCBvZiB0aGUgU1ZHIHJvb3RcbiAgICAgKiBAcGFyYW0gd2lkdGggbmV3IHdpZHRoXG4gICAgICovXG4gICAgc2V0V2lkdGgod2lkdGgpIHtcbiAgICAgICAgdGhpcy5zZXQoJ3dpZHRoJywgd2lkdGggKyAncHgnKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgaGVpZ2h0IG9mIHRoZSBTVkcgcm9vdFxuICAgICAqIEBwYXJhbSBoZWlnaHQgbmV3IGhlaWdodFxuICAgICAqL1xuICAgIHNldEhlaWdodChoZWlnaHQpIHtcbiAgICAgICAgdGhpcy5zZXQoJ2hlaWdodCcsIGhlaWdodCArICdweCcpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBZGRzIHRoZSBkZWZpbml0aW9uIG9mIGVsZW1lbnQgdG8gbGlzdCBvZiBkZWZpbml0aW9ucyxcbiAgICAgKiBTbyB0aGF0IG5leHQgdGltZSwgd2hlbiBpdCBpcyB1c2VkLCB0aGUgZWxlbWVudCBjYW4gcmVuZGVyZWQgdXNpbmcgdGhlIGRlZmluaXRpb24uXG4gICAgICovXG4gICAgZW5zdXJlRGVmaW5pdGlvbihlbGVtZW50KSB7XG4gICAgICAgIGNvbnN0IGVsZW1lbnRJZCA9IGVsZW1lbnQudG9IYXNoKCk7XG4gICAgICAgIGlmICghdGhpcy5kb2VzRGVmRXhpc3QoZWxlbWVudElkKSkge1xuICAgICAgICAgICAgdGhpcy5hZGREZWZpbnRpb24oZWxlbWVudCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGVsZW1lbnRJZDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmVuZGVycyBhIGZpZ3VyZSB0byB0aGUgU1ZHIHVzaW5nIGEgZmlndXJlIElEL0hhc2guXG4gICAgICpcbiAgICAgKiAjIE5vdGVcbiAgICAgKiBSZXF1aXJlcyBhIGRlZmluaXRpb24gdG8gcHJlc2VudCBmb3IgdGhlIGZpZ3VyZSBJRFxuICAgICAqIG90aGVyd2lzZSBpdCB0aHJvd3MgYSBFcnJvclxuICAgICAqL1xuICAgIHJlbmRlcklkKGVsZW1lbnRJZCwgcG9zaXRpb24pIHtcbiAgICAgICAgaWYgKCF0aGlzLmRvZXNEZWZFeGlzdChlbGVtZW50SWQpKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVHJpZWQgdG8gcmVuZGVyIGFuIElkIHRoYXQgZG9lc24ndCBleGlzdFwiKTtcbiAgICAgICAgdGhpcy5hZGRGaWd1cmUodGhpcy50b0RlZklkKGVsZW1lbnRJZCksIHBvc2l0aW9uKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmVuZGVycyBhIGZpZ3VyZSB0byB0aGUgU1ZHIHVzaW5nIGEgU1ZHTm9kZVxuICAgICAqXG4gICAgICogIyBOb3RlXG4gICAgICogV2lsbCBhZGQgdGhlIGZpZ3VyZSB0byBkZWZpbml0aW9ucyBpZiBub3QgYWxyZWFkeSB0aGVyZS5cbiAgICAgKi9cbiAgICByZW5kZXIoZWxlbWVudCwgcG9zaXRpb24pIHtcbiAgICAgICAgY29uc3QgZWxlbWVudElkID0gZWxlbWVudC50b0hhc2goKTtcbiAgICAgICAgaWYgKCF0aGlzLmRvZXNEZWZFeGlzdChlbGVtZW50SWQpKSB7XG4gICAgICAgICAgICB0aGlzLmFkZERlZmludGlvbihlbGVtZW50KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmFkZEZpZ3VyZSh0aGlzLnRvRGVmSWQoZWxlbWVudElkKSwgcG9zaXRpb24pO1xuICAgICAgICByZXR1cm4gZWxlbWVudElkO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZW5kZXJzIGEgZmlndXJlIHRvIHRoZSBTVkcgdXNpbmcgYSBTVkdOb2RlIHdpdGggYSBjYWxsYmFjayBuYW1lLlxcXG4gICAgICogSWYgdGhpcyBuYW1lIGFscmVhZHkgZXhpc3RzLCBpdCB3aWxsIG5vdCBkbyBhbnl0aGluZyBhbmQgb3V0cHV0IHRoaXMgdG8gdGhlIGRlYnVnIGNvbnNvbGUuXG4gICAgICpcbiAgICAgKiAjIE5vdGVcbiAgICAgKiBXaWxsIGFkZCB0aGUgZmlndXJlIHRvIGRlZmluaXRpb25zIGlmIG5vdCBhbHJlYWR5IHRoZXJlLlxuICAgICAqL1xuICAgIHJlbmRlck5hbWVkKG5hbWUsIGVsZW1lbnQsIHBvc2l0aW9uKSB7XG4gICAgICAgIGlmICh0aGlzLmRvZXNOYW1lRXhpc3QobmFtZSkpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZGVidWcoJ1NWRyBNYW5hZ2VyOiBUcmllZCB0byByZXVzZSBuYW1lIGZvciBuYW1lZCBmaWd1cmUsIHN0b3AgZXhlY3V0aW9uLiAocmVuZGVyTmFtZWQpJyk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgZWxlbWVudElkID0gZWxlbWVudC50b0hhc2goKTtcbiAgICAgICAgaWYgKCF0aGlzLmRvZXNEZWZFeGlzdChlbGVtZW50SWQpKSB7XG4gICAgICAgICAgICB0aGlzLmFkZERlZmludGlvbihlbGVtZW50KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmFkZE5hbWVkRmlndXJlKG5hbWUsIHRoaXMudG9EZWZJZChlbGVtZW50SWQpLCBwb3NpdGlvbik7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJlbmRlcnMgYSBmaWd1cmUgdG8gdGhlIFNWRyB1c2luZyBhIGZpZ3VyZSBJRC9IYXNoIHdpdGggYSBjYWxsYmFjayBuYW1lLlxcXG4gICAgICogSWYgdGhpcyBuYW1lIGFscmVhZHkgZXhpc3RzLCBpdCB3aWxsIG5vdCBkbyBhbnl0aGluZyBhbmQgb3V0cHV0IHRoaXMgdG8gdGhlIGRlYnVnIGNvbnNvbGUuXG4gICAgICpcbiAgICAgKiAjIE5vdGVcbiAgICAgKiBSZXF1aXJlcyBhIGRlZmluaXRpb24gdG8gcHJlc2VudCBmb3IgdGhlIGZpZ3VyZSBJRFxuICAgICAqIG90aGVyd2lzZSBpdCB0aHJvd3MgYSBFcnJvclxuICAgICAqL1xuICAgIHJlbmRlck5hbWVkSWQobmFtZSwgZWxlbWVudElkLCBwb3NpdGlvbikge1xuICAgICAgICBpZiAodGhpcy5kb2VzTmFtZUV4aXN0KG5hbWUpKSB7XG4gICAgICAgICAgICBjb25zb2xlLmRlYnVnKCdTVkcgTWFuYWdlcjogVHJpZWQgdG8gcmV1c2UgbmFtZSBmb3IgbmFtZWQgZmlndXJlLCBzdG9wIGV4ZWN1dGlvbi4gKHJlbmRlck5hbWVkSWQpJyk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF0aGlzLmRvZXNEZWZFeGlzdChlbGVtZW50SWQpKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVHJpZWQgdG8gcmVuZGVyIGFuIElkIHRoYXQgZG9lc24ndCBleGlzdFwiKTtcbiAgICAgICAgdGhpcy5hZGROYW1lZEZpZ3VyZShuYW1lLCB0aGlzLnRvRGVmSWQoZWxlbWVudElkKSwgcG9zaXRpb24pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBNb3ZlcyBhIG5hbWVkIGZpZ3VyZSB0byAqdipcXFxuICAgICAqIElmIG5hbWVkIGl0ZW0gZG9lcyBub3QgZXhpc3QsIGl0IHdpbGwgbm90IGRvIGFueXRoaW5nLlxuICAgICAqL1xuICAgIG1vdmVOYW1lZChuYW1lLCB2KSB7XG4gICAgICAgIGNvbnN0IGVsZW0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLmdldE5hbWUobmFtZSkpO1xuICAgICAgICBpZiAoZWxlbSA9PT0gbnVsbClcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgaWYgKGVsZW0udGFnTmFtZSA9PT0gJ2cnKSB7XG4gICAgICAgICAgICBlbGVtLnNldEF0dHJpYnV0ZSgndHJhbnNmb3JtJywgYHRyYW5zbGF0ZSgke3YueCgpfSwgJHt2LnkoKX0pYCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBlbGVtLnNldEF0dHJpYnV0ZSgneCcsIGAke3YueCgpfWApO1xuICAgICAgICAgICAgZWxlbS5zZXRBdHRyaWJ1dGUoJ3knLCBgJHt2LnkoKX1gKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBGZXRjaGVzIGxvY2F0aW9uIG9mIGEgbmFtZWQgZmlndXJlXFxcbiAgICAgKiBJZiBuYW1lZCBpdGVtIGRvZXMgbm90IGV4aXN0LCBpdCB3aWxsIHRocm93IGEgZXJyb3IuXG4gICAgICovXG4gICAgZmV0Y2hOYW1lZExvY2F0aW9uKG5hbWUpIHtcbiAgICAgICAgY29uc3QgZWxlbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMuZ2V0TmFtZShuYW1lKSk7XG4gICAgICAgIGlmIChlbGVtID09PSBudWxsKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdOYW1lZCBpdGVtIGRvZXMgbm90IGV4aXN0Jyk7XG4gICAgICAgIGlmIChlbGVtLnRhZ05hbWUgPT09ICdnJykge1xuICAgICAgICAgICAgY29uc3QgdHJhbnNmb3JtX3ZhbHVlID0gZWxlbS5nZXRBdHRyaWJ1dGUoJ3RyYW5zZm9ybScpO1xuICAgICAgICAgICAgY29uc3QgdF90cmFuc2xhdGVfdmFsdWUgPSB0cmFuc2Zvcm1fdmFsdWUuc3Vic3RyKCd0cmFuc2xhdGUoJy5sZW5ndGgpO1xuICAgICAgICAgICAgY29uc3QgdHJhbnNsYXRlX3ZhbHVlcyA9IHRfdHJhbnNsYXRlX3ZhbHVlXG4gICAgICAgICAgICAgICAgLnN1YnN0cigwLCB0X3RyYW5zbGF0ZV92YWx1ZS5sZW5ndGggLSAxKVxuICAgICAgICAgICAgICAgIC5zcGxpdCgnLCAnKTtcbiAgICAgICAgICAgIHJldHVybiBuZXcgVjJEXzEuZGVmYXVsdChwYXJzZUludCh0cmFuc2xhdGVfdmFsdWVzWzBdKSwgcGFyc2VJbnQodHJhbnNsYXRlX3ZhbHVlc1sxXSkpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBWMkRfMS5kZWZhdWx0KHBhcnNlSW50KGVsZW0uZ2V0QXR0cmlidXRlKCd4JykpLCBwYXJzZUludChlbGVtLmdldEF0dHJpYnV0ZSgneScpKSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyBhIG5hbWVkIGZpZ3VyZSBmcm9tIHRoZSBET01cXFxuICAgICAqIElmIG5hbWVkIGl0ZW0gZG9lcyBub3QgZXhpc3QsIGl0IHdpbGwgbm90IGRvIGFueXRoaW5nLlxuICAgICAqL1xuICAgIHJlbW92ZU5hbWVkKG5hbWUpIHtcbiAgICAgICAgY29uc3QgaXRlbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMuZ2V0TmFtZShuYW1lKSk7XG4gICAgICAgIGlmIChpdGVtICE9PSBudWxsKVxuICAgICAgICAgICAgdGhpcy5fc3ZnRWxlbWVudC5yZW1vdmVDaGlsZChpdGVtKTtcbiAgICAgICAgdGhpcy5fbmFtZXMgPSB0aGlzLl9uYW1lcy5maWx0ZXIoKHgpID0+IHggIT09IG5hbWUpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIGEgbmFtZWQgZmlndXJlIGZyb20gdGhlIERPTSwgaWYgaXQgZXhpc3RzXFxcbiAgICAgKiBUaGVuIHdpbGwgcmVuZGVyICplbGVtZW50KiBpbiBpdHMgcGxhY2UuXG4gICAgICovXG4gICAgcmVyZW5kZXJOYW1lZChuYW1lLCBlbGVtZW50LCBwb3NpdGlvbikge1xuICAgICAgICB0aGlzLnJlbW92ZU5hbWVkKG5hbWUpO1xuICAgICAgICB0aGlzLnJlbmRlck5hbWVkKG5hbWUsIGVsZW1lbnQsIHBvc2l0aW9uKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmVuZGVycyBhIFNWR05vZGUgKmVsZW1lbnQqIHRvIHRoZSBET00gd2l0aG91dCBkZWZpbml0aW9uLlxuICAgICAqL1xuICAgIHNlcGVyYXRlUmVuZGVyTmFtZWQobmFtZSwgZWxlbWVudCwgcG9zaXRpb24pIHtcbiAgICAgICAgdGhpcy5fc3ZnRWxlbWVudC5hcHBlbmRDaGlsZChlbGVtZW50XG4gICAgICAgICAgICAuc2V0KCdpZCcsIHRoaXMuZ2V0TmFtZShuYW1lKSlcbiAgICAgICAgICAgIC5zZXQoJ3gnLCBwb3NpdGlvbi54KCkudG9TdHJpbmcoKSlcbiAgICAgICAgICAgIC5zZXQoJ3knLCBwb3NpdGlvbi55KCkudG9TdHJpbmcoKSlcbiAgICAgICAgICAgIC50b0hUTUwoKSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgdGhlIFNWRyBmcm9tIHRoZSBET01cbiAgICAgKi9cbiAgICByZW1vdmUoKSB7XG4gICAgICAgIHRoaXMuX3Jvb3RFbGVtZW50LnJlbW92ZUNoaWxkKHRoaXMuX3N2Z0VsZW1lbnQpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIGFsbCB0aGUgY29udGVudCBmcm9tIHRoZSBTVkcgaW4gdGhlIERPTSBpbmNsdWRpbmcgdGhlIGRlZmluaXRpb25zXG4gICAgICovXG4gICAgY2xlYW4oKSB7XG4gICAgICAgIHRoaXMuX3N2Z0VsZW1lbnQuaW5uZXJIVE1MID0gJyc7XG4gICAgICAgIHRoaXMuX2RlZmludGlvbnMgPSBbXTtcbiAgICAgICAgdGhpcy5fbmFtZXMgPSBbXTtcbiAgICAgICAgdGhpcy5fc3ZnRWxlbWVudC5hcHBlbmRDaGlsZChuZXcgU1ZHTm9kZV8xLmRlZmF1bHQoJ2RlZnMnKS50b0hUTUwoKSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEZldGNoIGFuIGF0dHJpYnV0ZSB2YWx1ZSBmcm9tIHJvb3QgU1ZHIGVsZW1lbnRcbiAgICAgKiBAcGFyYW0gYXR0ciBBdHRyaWJ1dGUgbmFtZVxuICAgICAqL1xuICAgIGdldChhdHRyKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zdmdFbGVtZW50LmdldEF0dHJpYnV0ZShhdHRyKSB8fCAnJztcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2V0L2NoYW5nZSBhbiBhdHRyaWJ1dGUgdmFsdWUgZnJvbSByb290IFNWRyBlbGVtZW50XG4gICAgICogQHBhcmFtIGF0dHIgQXR0cmlidXRlIG5hbWVcbiAgICAgKiBAcGFyYW0gdmFsdWUgU2V0IHZhbHVlXG4gICAgICovXG4gICAgc2V0KGF0dHIsIHZhbHVlKSB7XG4gICAgICAgIHRoaXMuX3N2Z0VsZW1lbnQuc2V0QXR0cmlidXRlKGF0dHIsIHZhbHVlKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIHVuaXF1ZSBpZGVudGlmaWVyIGNvbm5lY3RlZCB0byB0aGlzIFNWR01hbmFnZXJcbiAgICAgKi9cbiAgICBpZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21hbmFnZXJpZDtcbiAgICB9XG59XG5leHBvcnRzLmRlZmF1bHQgPSBTVkdNYW5hZ2VyO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBtZDVfMSA9IHJlcXVpcmUoXCJ0cy1tZDUvZGlzdC9tZDVcIik7XG5jb25zdCBTVkdfTkFNRVNQQUNFID0gJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJztcbi8qKlxuICogQSBKUyBSZXByZXNlbnRhdGlvbiBvZiBhIEhUTUwtTm9kZS5cbiAqIE1vcmUgc3BlY2lmaWNhbGx5LCBhbGwgdGhlIFNWRyBUeXBlcyBOb2Rlcy5cbiAqL1xuY2xhc3MgU1ZHTm9kZSB7XG4gICAgLyoqXG4gICAgICogQ29uc3RydWN0IGEgU1ZHTm9kZSByZXNwcmVzZW50aW5nIHRoZSAqdGFnKiBlbGVtZW50XG4gICAgICogd2l0aCBubyBhdHRyaWJ1dGVzLCBjaGlsZHJlbiBvciBpbm5lciB0ZXh0LlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHRhZykge1xuICAgICAgICB0aGlzLl90YWcgPSB0YWc7XG4gICAgICAgIHRoaXMuX2F0dHJpYnV0ZXMgPSBuZXcgTWFwKCk7XG4gICAgICAgIHRoaXMuX2NoaWxkcmVuID0gW107XG4gICAgICAgIHRoaXMuX2lubmVyVGV4dCA9ICcnO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBNdXRhdGVzIHRoZSBTVkdOb2RlIHRvIGFkZC9jaGFuZ2UgYW4gYXR0cmlidXRlICphdHRyKiB0byAqdmFsdWUqLlxuICAgICAqIFRoZW4sIGl0IHJldHVybnMgaXRzZWxmLCBmb3IgZWFzeSBwcm9ncmFtbWluZy5cbiAgICAgKlxuICAgICAqICMgTm90ZVxuICAgICAqIFRoZSBpZCBhdHRyaWJ1dGUgaXMgdXNlZCB3aXRoaW4gU1ZHIE1hbmFnZXIgYW5kIHdpbGwgdGhlcmVmb3JlIG1vc3QgbGlrZWx5IGJlIG92ZXJ3cml0dGVuLlxuICAgICAqL1xuICAgIHNldChhdHRyLCB2YWx1ZSkge1xuICAgICAgICB0aGlzLl9hdHRyaWJ1dGVzLnNldChhdHRyLCB2YWx1ZSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBNdXRhdGVzIHRoZSBTVkdOb2RlIHRvIGNoYW5nZSBhbiBhdHRyaWJ1dGUgKmF0dHIqXG4gICAgICogYnkgcHV0dGluZyBpdHMgdmFsdWUgdGhyb3VnaCB0aGUgZnVuY3Rpb24gKmYqLlxuICAgICAqIFRoZW4sIGl0IHJldHVybnMgaXRzZWxmLCBmb3IgZWFzeSBwcm9ncmFtbWluZy5cbiAgICAgKlxuICAgICAqICMgTm90ZVxuICAgICAqIElmIHRoZSBhdHRyaWJ1dGUgd2FzIG5vdCBzZXQsIHRoZSBjYWxsIHN0aWxsIHN1Y2NlZWRzIGJ1dCBkb2VzIG5vdGhpbmcuXG4gICAgICovXG4gICAgbWFwKGF0dHIsIGYpIHtcbiAgICAgICAgY29uc3QgdmFsdWUgPSB0aGlzLl9hdHRyaWJ1dGVzLmdldChhdHRyKTtcbiAgICAgICAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQpXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgdGhpcy5fYXR0cmlidXRlcy5zZXQoYXR0ciwgZih2YWx1ZSkpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogTXV0YXRlcyB0aGUgU1ZHTm9kZSB0byBhcHBlbmQgYW4gY2hpbGQgU1ZHTm9kZSAqY2hpbGQqXG4gICAgICogdG8gdGhlIGNoaWxkcmVuIG9mIHRoZSBjdXJyZW50IFNWR05vZGUuXG4gICAgICogVGhlbiwgaXQgcmV0dXJucyBpdHNlbGYsIGZvciBlYXN5IHByb2dyYW1taW5nLlxuICAgICAqL1xuICAgIGFwcGVuZChjaGlsZCkge1xuICAgICAgICB0aGlzLl9jaGlsZHJlbi5wdXNoKGNoaWxkKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIE11dGF0ZXMgdGhlIFNWR05vZGUgdG8gc2V0IHRoZSBpbm5lciB0ZXh0IHRvICp0ZXh0Ki5cbiAgICAgKiBUaGVuLCBpdCByZXR1cm5zIGl0c2VsZiwgZm9yIGVhc3kgcHJvZ3JhbW1pbmcuXG4gICAgICovXG4gICAgc2V0VGV4dCh0ZXh0KSB7XG4gICAgICAgIHRoaXMuX2lubmVyVGV4dCA9IHRleHQ7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBKUyBTVkdFbGVtZW50IGVxdWF2YWxlbnQgb2YgY3VycmVudCBTVkdOb2RlXG4gICAgICovXG4gICAgdG9IVE1MKCkge1xuICAgICAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKFNWR19OQU1FU1BBQ0UsIHRoaXMuX3RhZyk7XG4gICAgICAgIHRoaXMuX2F0dHJpYnV0ZXMuZm9yRWFjaCgodmFsdWUsIGF0dHIpID0+IHtcbiAgICAgICAgICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKGF0dHIsIHZhbHVlKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGVsZW1lbnQuaW5uZXJIVE1MID0gdGhpcy5faW5uZXJUZXh0O1xuICAgICAgICB0aGlzLl9jaGlsZHJlbi5mb3JFYWNoKChjaGlsZCkgPT4gZWxlbWVudC5hcHBlbmRDaGlsZChjaGlsZC50b0hUTUwoKSkpO1xuICAgICAgICByZXR1cm4gZWxlbWVudDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgaGFzaHN0cmluZyBvZiBTVkdOb2RlXG4gICAgICovXG4gICAgdG9IYXNoKCkge1xuICAgICAgICBsZXQgbWQ1ID0gbmV3IG1kNV8xLk1kNSgpO1xuICAgICAgICBtZDUuYXBwZW5kU3RyKCd0YWcnICsgdGhpcy5fdGFnKTtcbiAgICAgICAgbWQ1LmFwcGVuZFN0cignaW5uZXJ0ZXh0JyArIHRoaXMuX2lubmVyVGV4dCk7XG4gICAgICAgIGNvbnN0IGF0dHJpYnV0ZUFycmF5ID0gW107XG4gICAgICAgIHRoaXMuX2F0dHJpYnV0ZXMuZm9yRWFjaCgodmFsdWUsIGtleSkgPT4ge1xuICAgICAgICAgICAgYXR0cmlidXRlQXJyYXkucHVzaChgJHtrZXl9IC0gJHt2YWx1ZX1gKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGF0dHJpYnV0ZUFycmF5XG4gICAgICAgICAgICAuc29ydCgoYSwgYikgPT4gKGEgPCBiID8gMSA6IGEgPT09IGIgPyAwIDogLTEpKVxuICAgICAgICAgICAgLmZvckVhY2goKGF0dHJpYnV0ZVN0cmluZykgPT4ge1xuICAgICAgICAgICAgbWQ1LmFwcGVuZFN0cignYXR0cmlidXRlJyArIGF0dHJpYnV0ZVN0cmluZyk7XG4gICAgICAgIH0pO1xuICAgICAgICBjb25zdCBjaGlsZHJlbkhhc2hlcyA9IHRoaXMuX2NoaWxkcmVuXG4gICAgICAgICAgICAubWFwKChjaGlsZCkgPT4gY2hpbGQudG9IYXNoKCkpXG4gICAgICAgICAgICAuc29ydCgoYSwgYikgPT4gKGEgPCBiID8gMSA6IGEgPT09IGIgPyAwIDogLTEpKVxuICAgICAgICAgICAgLmZvckVhY2goKGNoaWxkSGFzaCkgPT4gbWQ1LmFwcGVuZFN0cignY2hpbGQnICsgY2hpbGRIYXNoKSk7XG4gICAgICAgIHJldHVybiBtZDUuZW5kKCk7XG4gICAgfVxufVxuZXhwb3J0cy5kZWZhdWx0ID0gU1ZHTm9kZTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgVjJEXzEgPSByZXF1aXJlKFwiLi9WMkRcIik7XG5jb25zdCBQYXRoRGF0YV8xID0gcmVxdWlyZShcIi4vUGF0aERhdGFcIik7XG5jb25zdCBTVkdOb2RlXzEgPSByZXF1aXJlKFwiLi9TVkdOb2RlXCIpO1xuLyoqXG4gKiBSZXR1cm5zIGEgU1ZHTm9kZSBjb250YWluaW5nIGEgY2lyY2xlIHdpdGggcmFkaXVzICpyKiBhbmRcbiAqIGluY2x1ZGVzIGRlZmF1bHQgc3R5bGluZ1xuICpcbiAqICMgTm90ZVxuICogRGVmYXVsdCBzdHlsaW5nIGluY2x1ZGVzOlxuICogIC0gY3gsIGN5IGJvdGggemVyb1xuICogIC0gYmxhY2sgMXB4IG91dGxpbmVcbiAqICAtIHRyYW5zcGFyZW50IGZpbGxcbiAqXG4gKiBUaGVzZSBjYW4gYWxsIGJlIG92ZXJ3cml0dGVuIHVzaW5nIHRoZSBTVkdOb2RlLnNldCgpIG1ldGhvZFxuICovXG5leHBvcnRzLmNpcmNsZSA9IChyKSA9PiBuZXcgU1ZHTm9kZV8xLmRlZmF1bHQoJ2NpcmNsZScpXG4gICAgLnNldCgnY3gnLCAnMCcpXG4gICAgLnNldCgnY3knLCAnMCcpXG4gICAgLnNldCgnc3Ryb2tlJywgJyMwMDAnKVxuICAgIC5zZXQoJ3N0cm9rZS13aWR0aCcsICcxcHgnKVxuICAgIC5zZXQoJ2ZpbGwnLCAndHJhbnNwYXJlbnQnKVxuICAgIC5zZXQoJ3InLCByLnRvU3RyaW5nKCkpO1xuLyoqXG4gKiBSZXR1cm5zIGEgU1ZHTm9kZSBjb250YWluaW5nIGEgbGluZSBiZXR3ZWVuIHR3b1xuICogcG9pbnRzL3ZlY3RvcnMgKmZyb20qIGFuZCAqdG8qIGFuZCBkZWZhdWx0IHN0eWxpbmdcbiAqXG4gKiAjIE5vdGVcbiAqIERlZmF1bHQgc3R5bGluZyBpbmNsdWRlczpcbiAqICAtIGJsYWNrIDFweCBsaW5lXG4gKlxuICogVGhlc2UgY2FuIGFsbCBiZSBvdmVyd3JpdHRlbiB1c2luZyB0aGUgU1ZHTm9kZS5zZXQoKSBtZXRob2RcbiAqL1xuZXhwb3J0cy5saW5lID0gKGZyb20sIHRvKSA9PiBuZXcgU1ZHTm9kZV8xLmRlZmF1bHQoJ2xpbmUnKVxuICAgIC5zZXQoJ3gxJywgZnJvbS54KCkudG9TdHJpbmcoKSlcbiAgICAuc2V0KCd5MScsIGZyb20ueSgpLnRvU3RyaW5nKCkpXG4gICAgLnNldCgneDInLCB0by54KCkudG9TdHJpbmcoKSlcbiAgICAuc2V0KCd5MicsIHRvLnkoKS50b1N0cmluZygpKVxuICAgIC5zZXQoJ3N0cm9rZScsICcjMDAwJylcbiAgICAuc2V0KCdzdHJva2Utd2lkdGgnLCAnMXB4Jyk7XG4vKipcbiAqIFJldHVybnMgYSBTVkdOb2RlIGNvbnRhaW5pbmcgYSBwYXRoIHdpdGggbGluZXMgYmV0d2VlbiBtdWx0aXBsZVxuICogcG9pbnRzL3ZlY3RvcnMgaW4gKnBvaW50cyogYW5kIGFkZHMgZGVmYXVsdCBzdHlsaW5nXG4gKlxuICogIyBOb3RlXG4gKiBEZWZhdWx0IHN0eWxpbmcgaW5jbHVkZXM6XG4gKiAgLSBibGFjayAxcHggbGluZXNcbiAqICAtIG5vIGZpbGxpbmdcbiAqXG4gKiBUaGVzZSBjYW4gYWxsIGJlIG92ZXJ3cml0dGVuIHVzaW5nIHRoZSBTVkdOb2RlLnNldCgpIG1ldGhvZFxuICovXG5leHBvcnRzLmxpbmVzID0gKHBvaW50cykgPT4ge1xuICAgIGNvbnN0IHBhdGhEYXRhID0gbmV3IFBhdGhEYXRhXzEuZGVmYXVsdCgpLm1vdmVUbyhwb2ludHNbMF0ueCgpLCBwb2ludHNbMF0ueSgpKTtcbiAgICBwb2ludHMuc2hpZnQoKTtcbiAgICBwb2ludHMuZm9yRWFjaCgocG9pbnQpID0+IHBhdGhEYXRhLmxpbmVUbyhwb2ludC54KCksIHBvaW50LnkoKSkpO1xuICAgIHJldHVybiBuZXcgU1ZHTm9kZV8xLmRlZmF1bHQoJ3BhdGgnKVxuICAgICAgICAuc2V0KCdkJywgcGF0aERhdGEudG9TdHJpbmcoKSlcbiAgICAgICAgLnNldCgnc3Ryb2tlJywgJyMwMDAnKVxuICAgICAgICAuc2V0KCdzdHJva2Utd2lkdGgnLCAnMXB4JylcbiAgICAgICAgLnNldCgnZmlsbCcsICdub25lJyk7XG59O1xuLyoqXG4gKiBSZXR1cm5zIGEgU1ZHTm9kZSBjb250YWluaW5nIGEgcXVhZHJhdGljLWN1cnZlIGJldHdlZW4gdHdvXG4gKiBwb2ludHMvdmVjdG9ycyAqZnJvbSogYW5kICp0bypcbiAqIGFuZCB1c2VzICpjb250cm9sKiBhcyBhIHF1YWRyYXRpYy1jdXJ2ZSBjb250cm9sIHBvaW50LiBBbHNvIGFkZHMgZGVmYXVsdCBzdHlsaW5nLlxuICpcbiAqICMgTm90ZVxuICogRGVmYXVsdCBzdHlsaW5nIGluY2x1ZGVzOlxuICogIC0gYmxhY2sgMXB4IGxpbmVzXG4gKlxuICogVGhlc2UgY2FuIGFsbCBiZSBvdmVyd3JpdHRlbiB1c2luZyB0aGUgU1ZHTm9kZS5zZXQoKSBtZXRob2RcbiAqL1xuZXhwb3J0cy5jdXJ2ZSA9IChmcm9tLCB0bywgY29udHJvbCkgPT4gbmV3IFNWR05vZGVfMS5kZWZhdWx0KCdwYXRoJylcbiAgICAuc2V0KCdkJywgbmV3IFBhdGhEYXRhXzEuZGVmYXVsdCgpXG4gICAgLm1vdmVUbyhmcm9tLngoKSwgZnJvbS55KCkpXG4gICAgLnF1YWRyYXRpY0N1cnZlVG8odG8ueCgpLCB0by55KCksIGNvbnRyb2wueCgpLCBjb250cm9sLnkoKSlcbiAgICAudG9TdHJpbmcoKSlcbiAgICAuc2V0KCdzdHJva2UnLCAnIzAwMCcpXG4gICAgLnNldCgnc3Ryb2tlLXdpZHRoJywgJzFweCcpO1xuLyoqXG4gKiBSZXR1cm5zIGEgU1ZHTm9kZSBjb250YWluaW5nIGEgcXVhZHJhdGljLWN1cnZlIGJldHdlZW4gdHdvXG4gKiBwb2ludHMvdmVjdG9ycyAqZnJvbSogYW5kICp0bypcbiAqIGFuZCB1c2VzICpjdXJ2aW5nKiB0byBkZXRlcm1pbmUgdGhlIGFtb3VudCBvZiB0aGUgY3VydmF0dXJlLlxuICogQWxzbyBhZGRzIGRlZmF1bHQgc3R5bGluZy5cbiAqXG4gKiAjIE5vdGVcbiAqIERlZmF1bHQgc3R5bGluZyBpbmNsdWRlczpcbiAqICAtIGJsYWNrIDFweCBsaW5lc1xuICogIC0gdHJhbnNwYXJlbnQgZmlsbGluZ1xuICpcbiAqIFRoZXNlIGNhbiBhbGwgYmUgb3ZlcndyaXR0ZW4gdXNpbmcgdGhlIFNWR05vZGUuc2V0KCkgbWV0aG9kXG4gKi9cbmV4cG9ydHMuY3VydmVDYWxjID0gKGZyb20sIHRvLCBjdXJ2aW5nKSA9PiB7XG4gICAgY29uc3QgbWlkZGxlID0gZnJvbS5taWRkbGUodG8pO1xuICAgIGNvbnN0IGRpZiA9IHRvLnN1Yihmcm9tKTtcbiAgICBsZXQgbm9ybWFsID0gbmV3IFYyRF8xLmRlZmF1bHQoLTEgKiBkaWYueSgpLCBkaWYueCgpKTtcbiAgICBpZiAoISgobm9ybWFsLnkoKSA+IDAgJiYgY3VydmluZyA+PSAwKSB8fCAobm9ybWFsLnkoKSA8IDAgJiYgY3VydmluZyA8IDApKSlcbiAgICAgICAgbm9ybWFsID0gbm9ybWFsLnNjYSgtMSk7XG4gICAgY29uc3Qgbm9ybWFsTm9ybWFsaXplZCA9IG1pZGRsZS5hZGQobm9ybWFsLnNjYSgoMiAqIGN1cnZpbmcpIC8gbm9ybWFsLmxlbmd0aCgpKSk7XG4gICAgcmV0dXJuIG5ldyBTVkdOb2RlXzEuZGVmYXVsdCgncGF0aCcpXG4gICAgICAgIC5zZXQoJ2QnLCBuZXcgUGF0aERhdGFfMS5kZWZhdWx0KClcbiAgICAgICAgLm1vdmVUbyhmcm9tLngoKSwgZnJvbS55KCkpXG4gICAgICAgIC5xdWFkcmF0aWNDdXJ2ZVRvKHRvLngoKSwgdG8ueSgpLCBub3JtYWxOb3JtYWxpemVkLngoKSwgbm9ybWFsTm9ybWFsaXplZC55KCkpXG4gICAgICAgIC50b1N0cmluZygpKVxuICAgICAgICAuc2V0KCdmaWxsJywgJ3RyYW5zcGFyZW50JylcbiAgICAgICAgLnNldCgnc3Ryb2tlJywgJyMwMDAnKVxuICAgICAgICAuc2V0KCdzdHJva2Utd2lkdGgnLCAnMXB4Jyk7XG59O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG4vKipcbiAqICMgVjJEXG4gKiBBIDIgRGltZW5zaW9uYWwgVmVjdG9yXG4gKi9cbmNsYXNzIFYyRCB7XG4gICAgY29uc3RydWN0b3IoeCwgeSkge1xuICAgICAgICB0aGlzLl94ID0geDtcbiAgICAgICAgdGhpcy5feSA9IHk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIHggdmFsdWVcbiAgICAgKi9cbiAgICB4KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5feDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgeSB2YWx1ZVxuICAgICAqL1xuICAgIHkoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl95O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDaGVja3Mgd2hldGhlciBhIHZlY3RvciBpcyBlcXVhbCB0byB0aGlzIHZlY3RvclxuICAgICAqIGBgYHR5cGVzY3JpcHRcbiAgICAgKiBsZXQgeCA9IG5ldyBWMkQoMiwzKTtcbiAgICAgKlxuICAgICAqIHguZXF1YWxzKG5ldyBWMkQoMiwzKSk7IC8vIFdpbGwgZXF1YWwgdHJ1ZSFcbiAgICAgKiB4LmVxdWFscyhuZXcgVjJEKDEsMikpOyAvLyBXaWxsIGVxdWFsIGZhbHNlIVxuICAgICAqIGBgYFxuICAgICAqL1xuICAgIGVxdWFscyh2KSB7XG4gICAgICAgIHJldHVybiB0aGlzLngoKSA9PT0gdi54KCkgJiYgdGhpcy55KCkgPT09IHYueSgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgdmVjdG9yIGlzIHRoZSB2ZWN0b3IgKnYqIGFkZGVkIGZyb20gY3VycmVudCB2ZWN0b3JcXFxuICAgICAqIFYyRCh4LHkpLmFkZChWMkQocCxxKSkgbWFwcyB0byBWMkQoeCtwLHkrcSlcbiAgICAgKlxuICAgICAqICMgTm90ZVxuICAgICAqIERvZXMgbm90IG11dGF0ZSAqdGhpcyogdmVjdG9yXG4gICAgICpcbiAgICAgKiBgYGB0eXBlc2NyaXB0XG4gICAgICogbGV0IHggPSBuZXcgVjJEKDIsMyk7XG4gICAgICpcbiAgICAgKiB4LmFkZChuZXcgVjJEKDIsMykpOyAvLyBXaWxsIGVxdWFsIFYyRCg0LDYpIVxuICAgICAqIHguYWRkKG5ldyBWMkQoLTEsLTIpKTsgLy8gV2lsbCBlcXVhbCBWMkQoMSwxKSFcbiAgICAgKiBgYGBcbiAgICAgKi9cbiAgICBhZGQodikge1xuICAgICAgICByZXR1cm4gbmV3IFYyRCh0aGlzLngoKSArIHYueCgpLCB0aGlzLnkoKSArIHYueSgpKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhIHZlY3RvciBpcyB0aGUgdmVjdG9yICp2KiBzdWJ0cmFjdGVkIGZyb20gY3VycmVudCB2ZWN0b3JcXFxuICAgICAqIFYyRCh4LHkpLnN1YihWMkQocCxxKSkgbWFwcyB0byBWMkQoeC1wLHktcSlcbiAgICAgKlxuICAgICAqICMgTm90ZVxuICAgICAqIERvZXMgbm90IG11dGF0ZSAqdGhpcyogdmVjdG9yXG4gICAgICpcbiAgICAgKiBgYGB0eXBlc2NyaXB0XG4gICAgICogbGV0IHggPSBuZXcgVjJEKDIsMyk7XG4gICAgICpcbiAgICAgKiB4LnN1YihuZXcgVjJEKDIsMykpOyAvLyBXaWxsIGVxdWFsIFYyRCgwLDApIVxuICAgICAqIHguc3ViKG5ldyBWMkQoLTEsLTIpKTsgLy8gV2lsbCBlcXVhbCBWMkQoMyw1KSFcbiAgICAgKiBgYGBcbiAgICAgKi9cbiAgICBzdWIodikge1xuICAgICAgICByZXR1cm4gbmV3IFYyRCh0aGlzLngoKSAtIHYueCgpLCB0aGlzLnkoKSAtIHYueSgpKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhIHNjYWxlZCBjdXJyZW50IHZlY3RvciB3aXRoIGZhY3RvciAqcypcXFxuICAgICAqIFYyRCh4LHkpLnNjYShzKSBtYXBzIHRvIFYyRChzKngscyp5KVxuICAgICAqXG4gICAgICogIyBOb3RlXG4gICAgICogRG9lcyBub3QgbXV0YXRlICp0aGlzKiB2ZWN0b3JcbiAgICAgKlxuICAgICAqIGBgYHR5cGVzY3JpcHRcbiAgICAgKiBsZXQgeCA9IG5ldyBWMkQoMiwzKTtcbiAgICAgKlxuICAgICAqIHguc2NhKDIpOyAvLyBXaWxsIGVxdWFsIFYyRCg0LDYpIVxuICAgICAqIHguc2NhKDAuNSk7IC8vIFdpbGwgZXF1YWwgVjJEKDEsMS41KSFcbiAgICAgKiBgYGBcbiAgICAgKi9cbiAgICBzY2Eocykge1xuICAgICAgICByZXR1cm4gbmV3IFYyRCh0aGlzLngoKSAqIHMsIHRoaXMueSgpICogcyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENhbGN1bGF0ZXMgdGhlIGRvdC1wcm9kdWN0IGJldHdlZW4gY3VycmVudCB2ZWN0b3IgYW5kIHZlY3RvciAqdiogYW5kIHJldHVybnMgdGhlIHJlc3VsdFxcXG4gICAgICogVjJEKHgseSkuZG90KFYyRChwLHEpKSBtYXBzIHRvIHgqcCt5KnFcbiAgICAgKlxuICAgICAqICMgTm90ZVxuICAgICAqIERvZXMgbm90IG11dGF0ZSAqdGhpcyogdmVjdG9yXG4gICAgICpcbiAgICAgKiBgYGB0eXBlc2NyaXB0XG4gICAgICogbGV0IHggPSBuZXcgVjJEKDMsNCk7XG4gICAgICpcbiAgICAgKiB4LmRvdChuZXcgVjJEKDMsNCkpOyAvLyBXaWxsIGVxdWFsIDI1IVxuICAgICAqIHguZG90KG5ldyBWMkQoNCwtMykpOyAvLyBXaWxsIGVxdWFsIDAhXG4gICAgICogYGBgXG4gICAgICovXG4gICAgZG90KHYpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMueCgpICogdi54KCkgKyB0aGlzLnkoKSAqIHYueSgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBzdHJpbmdpZmllZCB2ZWN0b3JcbiAgICAgKi9cbiAgICB0b1N0cmluZygpIHtcbiAgICAgICAgcmV0dXJuIGBWMkQ6IHtcbiAgICAgICAgICAgIF94OiAke3RoaXMueCgpfSxcbiAgICAgICAgICAgIF95OiAke3RoaXMueSgpfVxuICAgICAgICB9YDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhIGludmVydCB2ZXJzaW9uIG9mIGN1cnJlbnQgdmVjdG9yXFxcbiAgICAgKiBWMkQoeCx5KS5pbnZlcnQoKSBtYXBzIHRvIFYyRCh5LHgpXG4gICAgICpcbiAgICAgKiAjIE5vdGVcbiAgICAgKiBEb2VzIG5vdCBtdXRhdGUgKnRoaXMqIHZlY3RvclxuICAgICAqXG4gICAgICogYGBgdHlwZXNjcmlwdFxuICAgICAqIGxldCB4ID0gbmV3IFYyRCgyLDMpO1xuICAgICAqXG4gICAgICogeC5pbnZlcnQoKTsgLy8gV2lsbCBlcXVhbCBWMkQoMywyKSFcbiAgICAgKiBgYGBcbiAgICAgKi9cbiAgICBpbnZlcnQoKSB7XG4gICAgICAgIHJldHVybiBuZXcgVjJEKHRoaXMueSgpLCB0aGlzLngoKSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYSBhYnNvbHV0ZWQgdmVyc2lvbiBvZiBjdXJyZW50IHZlY3RvclxcXG4gICAgICogVjJEKHgseSkuYWJzKCkgbWFwcyB0byBWMkQofHh8LHx5fClcbiAgICAgKlxuICAgICAqICMgTm90ZVxuICAgICAqIERvZXMgbm90IG11dGF0ZSAqdGhpcyogdmVjdG9yXG4gICAgICpcbiAgICAgKiBgYGB0eXBlc2NyaXB0XG4gICAgICogbGV0IHggPSBuZXcgVjJEKC0yLDMpO1xuICAgICAqXG4gICAgICogeC5hYnMoKTsgLy8gV2lsbCBlcXVhbCBWMkQoMiwzKSFcbiAgICAgKiBgYGBcbiAgICAgKi9cbiAgICBhYnMoKSB7XG4gICAgICAgIHJldHVybiBuZXcgVjJEKHRoaXMueCgpIDwgMCA/IC10aGlzLngoKSA6IHRoaXMueCgpLCB0aGlzLnkoKSA8IDAgPyAtdGhpcy55KCkgOiB0aGlzLnkoKSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYSByb3VuZGVkIHZlcnNpb24gb2YgY3VycmVudCB2ZWN0b3IgdG8gdGhlIGNsb3Nlc3QgKnNrKlxcXG4gICAgICogVjJEKHgseSkucm91bmQoc2spIG1hcHMgdG8gVjJEKHJvdW5kKHgsIHNrKSxyb3VuZCh5LCBzaykpXG4gICAgICpcbiAgICAgKiAjIE5vdGVcbiAgICAgKiBEb2VzIG5vdCBtdXRhdGUgKnRoaXMqIHZlY3RvclxuICAgICAqXG4gICAgICogYGBgdHlwZXNjcmlwdFxuICAgICAqIGxldCB4ID0gbmV3IFYyRCgzLDYpO1xuICAgICAqXG4gICAgICogeC5yb3VuZCgxMCk7IC8vIFdpbGwgZXF1YWwgVjJEKDAsMTApIVxuICAgICAqIGBgYFxuICAgICAqL1xuICAgIHJvdW5kKHNrKSB7XG4gICAgICAgIGNvbnN0IGxvd1ggPSB0aGlzLngoKSAtICh0aGlzLngoKSAlIHNrKSwgbG93WSA9IHRoaXMueSgpIC0gKHRoaXMueSgpICUgc2spLCBoaWdoWCA9IGxvd1ggKyBzaywgaGlnaFkgPSBsb3dZICsgc2s7XG4gICAgICAgIGNvbnN0IGlYID0gdGhpcy54KCkgLSBsb3dYIDwgaGlnaFggLSB0aGlzLngoKSA/IGxvd1ggOiBoaWdoWCwgaVkgPSB0aGlzLnkoKSAtIGxvd1kgPCBoaWdoWSAtIHRoaXMueSgpID8gbG93WSA6IGhpZ2hZO1xuICAgICAgICByZXR1cm4gbmV3IFYyRChpWCwgaVkpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBsZW5ndGggb2YgdGhlIHZlY3RvclxcXG4gICAgICogVjJEKHgseSkubGVuZ3RoKCkgbWFwcyB0byB8VjJEKHgseSl8XG4gICAgICpcbiAgICAgKiAjIE5vdGVcbiAgICAgKiBEb2VzIG5vdCBtdXRhdGUgKnRoaXMqIHZlY3RvclxuICAgICAqXG4gICAgICogYGBgdHlwZXNjcmlwdFxuICAgICAqIGxldCB4ID0gbmV3IFYyRCgzLDQpO1xuICAgICAqXG4gICAgICogeC5sZW5ndGgoKTsgLy8gV2lsbCBlcXVhbCA1IVxuICAgICAqIGBgYFxuICAgICAqL1xuICAgIGxlbmd0aCgpIHtcbiAgICAgICAgcmV0dXJuIE1hdGguc3FydCh0aGlzLmRvdCh0aGlzKSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIGFuZ2xlIGJldHdlZW4gdmVjdG9yICp2KiBhbmQgY3VycmVudCB2ZWN0b3JcXFxuICAgICAqIFYyRCh4LHkpLmFuZ2xlKFYyRChwLHEpKSBtYXBzIHRvIGFuZ2xlKFYyRCh4LHkpLFYyRChwLHEpKVxuICAgICAqXG4gICAgICogIyBOb3RlXG4gICAgICogRG9lcyBub3QgbXV0YXRlICp0aGlzKiB2ZWN0b3JcbiAgICAgKlxuICAgICAqIGBgYHR5cGVzY3JpcHRcbiAgICAgKiBsZXQgeCA9IG5ldyBWMkQoMyw0KTtcbiAgICAgKlxuICAgICAqIHguYW5nbGUoeCk7IC8vIFdpbGwgZXF1YWwgMCFcbiAgICAgKiBgYGBcbiAgICAgKi9cbiAgICBhbmdsZSh2KSB7XG4gICAgICAgIHJldHVybiBNYXRoLmFjb3ModGhpcy5kb3QodikgLyAodi5sZW5ndGgoKSAqIHRoaXMubGVuZ3RoKCkpKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgbWlkZGxlIGJldHdlZW4gdmVjdG9yICp2KiBhbmQgY3VycmVudCB2ZWN0b3JcXFxuICAgICAqIFYyRCh4LHkpLm1pZGRsZShWMkQocCxxKSkgbWFwcyB0byBWMkQoeCx5KS5hZGQoVjJEKHAscSkpLnNjYSgwLjUpXG4gICAgICpcbiAgICAgKiAjIE5vdGVcbiAgICAgKiBEb2VzIG5vdCBtdXRhdGUgKnRoaXMqIHZlY3RvclxuICAgICAqXG4gICAgICogYGBgdHlwZXNjcmlwdFxuICAgICAqIGxldCB4ID0gbmV3IFYyRCgzLDQpO1xuICAgICAqXG4gICAgICogeC5taWRkbGUobmV3IFYyRCg1LDgpKTsgLy8gV2lsbCBlcXVhbCBWMkQoNCw2KSFcbiAgICAgKiBgYGBcbiAgICAgKi9cbiAgICBtaWRkbGUodikge1xuICAgICAgICByZXR1cm4gdGhpcy5hZGQodikuc2NhKDAuNSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIHRhbmdlbnQgb2YgY3VycmVudCB2ZWN0b3JcXFxuICAgICAqIFYyRCh4LHkpLmR5ZHgoKSBtYXBzIHRvIHkveFxuICAgICAqXG4gICAgICogIyBOb3RlXG4gICAgICogRG9lcyBub3QgbXV0YXRlICp0aGlzKiB2ZWN0b3JcbiAgICAgKlxuICAgICAqIGBgYHR5cGVzY3JpcHRcbiAgICAgKiBsZXQgeCA9IG5ldyBWMkQoMiw0KTtcbiAgICAgKlxuICAgICAqIHguZHlkeCgpOyAvLyBXaWxsIGVxdWFsIDIhXG4gICAgICogYGBgXG4gICAgICovXG4gICAgZHlkeCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMueSgpIC8gdGhpcy54KCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIHNpZ24gb2YgY3VycmVudCB2ZWN0b3IncyB4XG4gICAgICpcbiAgICAgKiAjIE5vdGVcbiAgICAgKiBEb2VzIG5vdCBtdXRhdGUgKnRoaXMqIHZlY3RvclxuICAgICAqXG4gICAgICogYGBgdHlwZXNjcmlwdFxuICAgICAqIG5ldyBWMkQoLTEzLDApLnhTaWduKCk7IC8vIFdpbGwgZXF1YWwgLTEhXG4gICAgICogbmV3IFYyRCgtNSwyKS54U2lnbigpOyAvLyBXaWxsIGVxdWFsIC0xIVxuICAgICAqIG5ldyBWMkQoLTUsMCkueFNpZ24oKTsgLy8gV2lsbCBlcXVhbCAtMSFcbiAgICAgKiBuZXcgVjJEKDAsMikueFNpZ24oKTsgLy8gV2lsbCBlcXVhbCAwIVxuICAgICAqIG5ldyBWMkQoMywwKS54U2lnbigpOyAvLyBXaWxsIGVxdWFsIDEhXG4gICAgICogbmV3IFYyRCgzMywwKS54U2lnbigpOyAvLyBXaWxsIGVxdWFsIDEhXG4gICAgICogYGBgXG4gICAgICovXG4gICAgeFNpZ24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLngoKSA8IDAgPyAtMSA6IHRoaXMueCgpID4gMCA/IDEgOiAwO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBzaWduIG9mIGN1cnJlbnQgdmVjdG9yJ3MgeVxuICAgICAqXG4gICAgICogIyBOb3RlXG4gICAgICogRG9lcyBub3QgbXV0YXRlICp0aGlzKiB2ZWN0b3JcbiAgICAgKlxuICAgICAqIGBgYHR5cGVzY3JpcHRcbiAgICAgKiBuZXcgVjJEKDAsLTEzKS55U2lnbigpOyAvLyBXaWxsIGVxdWFsIC0xIVxuICAgICAqIG5ldyBWMkQoMiwtNSkueVNpZ24oKTsgLy8gV2lsbCBlcXVhbCAtMSFcbiAgICAgKiBuZXcgVjJEKDAsLTUpLnlTaWduKCk7IC8vIFdpbGwgZXF1YWwgLTEhXG4gICAgICogbmV3IFYyRCgyLDApLnlTaWduKCk7IC8vIFdpbGwgZXF1YWwgMCFcbiAgICAgKiBuZXcgVjJEKDAsMykueVNpZ24oKTsgLy8gV2lsbCBlcXVhbCAxIVxuICAgICAqIG5ldyBWMkQoMCwzMykueVNpZ24oKTsgLy8gV2lsbCBlcXVhbCAxIVxuICAgICAqIGBgYFxuICAgICAqL1xuICAgIHlTaWduKCkge1xuICAgICAgICByZXR1cm4gdGhpcy55KCkgPCAwID8gLTEgOiB0aGlzLnkoKSA+IDAgPyAxIDogMDtcbiAgICB9XG59XG5leHBvcnRzLmRlZmF1bHQgPSBWMkQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IFNWR01hbmFnZXJfMSA9IHJlcXVpcmUoXCIuL1NWR01hbmFnZXJcIik7XG5leHBvcnRzLlNWR01hbmFnZXIgPSBTVkdNYW5hZ2VyXzEuZGVmYXVsdDtcbmNvbnN0IFBhdGhEYXRhXzEgPSByZXF1aXJlKFwiLi9QYXRoRGF0YVwiKTtcbmV4cG9ydHMuUGF0aERhdGEgPSBQYXRoRGF0YV8xLmRlZmF1bHQ7XG5jb25zdCBTVkdOb2RlXzEgPSByZXF1aXJlKFwiLi9TVkdOb2RlXCIpO1xuZXhwb3J0cy5TVkdOb2RlID0gU1ZHTm9kZV8xLmRlZmF1bHQ7XG5jb25zdCBWMkRfMSA9IHJlcXVpcmUoXCIuL1YyRFwiKTtcbmV4cG9ydHMuVjJEID0gVjJEXzEuZGVmYXVsdDtcbmNvbnN0IFNoYXBlc18xID0gcmVxdWlyZShcIi4vU2hhcGVzXCIpO1xuZXhwb3J0cy5saW5lID0gU2hhcGVzXzEubGluZTtcbmV4cG9ydHMubGluZXMgPSBTaGFwZXNfMS5saW5lcztcbmV4cG9ydHMuY2lyY2xlID0gU2hhcGVzXzEuY2lyY2xlO1xuZXhwb3J0cy5jdXJ2ZSA9IFNoYXBlc18xLmN1cnZlO1xuZXhwb3J0cy5jdXJ2ZUNhbGMgPSBTaGFwZXNfMS5jdXJ2ZUNhbGM7XG4iLCJcInVzZSBzdHJpY3RcIjtcbi8qXG5cblR5cGVTY3JpcHQgTWQ1XG49PT09PT09PT09PT09PVxuXG5CYXNlZCBvbiB3b3JrIGJ5XG4qIEpvc2VwaCBNeWVyczogaHR0cDovL3d3dy5teWVyc2RhaWx5Lm9yZy9qb3NlcGgvamF2YXNjcmlwdC9tZDUtdGV4dC5odG1sXG4qIEFuZHLDqSBDcnV6OiBodHRwczovL2dpdGh1Yi5jb20vc2F0YXpvci9TcGFya01ENVxuKiBSYXltb25kIEhpbGw6IGh0dHBzOi8vZ2l0aHViLmNvbS9nb3JoaWxsL3lhbWQ1LmpzXG5cbkVmZmVjdGl2ZWx5IGEgVHlwZVNjcnlwdCByZS13cml0ZSBvZiBSYXltb25kIEhpbGwgSlMgTGlicmFyeVxuXG5UaGUgTUlUIExpY2Vuc2UgKE1JVClcblxuQ29weXJpZ2h0IChDKSAyMDE0IFJheW1vbmQgSGlsbFxuXG5QZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG5vZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG5pbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG50byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG5jb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbmZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG5cblRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG5hbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cblxuVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG5GSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbkFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbkxJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG5PVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG5USEUgU09GVFdBUkUuXG5cblxuXG4gICAgICAgICAgICBETyBXSEFUIFRIRSBGVUNLIFlPVSBXQU5UIFRPIFBVQkxJQyBMSUNFTlNFXG4gICAgICAgICAgICAgICAgICAgIFZlcnNpb24gMiwgRGVjZW1iZXIgMjAwNFxuXG4gQ29weXJpZ2h0IChDKSAyMDE1IEFuZHLDqSBDcnV6IDxhbWRmY3J1ekBnbWFpbC5jb20+XG5cbiBFdmVyeW9uZSBpcyBwZXJtaXR0ZWQgdG8gY29weSBhbmQgZGlzdHJpYnV0ZSB2ZXJiYXRpbSBvciBtb2RpZmllZFxuIGNvcGllcyBvZiB0aGlzIGxpY2Vuc2UgZG9jdW1lbnQsIGFuZCBjaGFuZ2luZyBpdCBpcyBhbGxvd2VkIGFzIGxvbmdcbiBhcyB0aGUgbmFtZSBpcyBjaGFuZ2VkLlxuXG4gICAgICAgICAgICBETyBXSEFUIFRIRSBGVUNLIFlPVSBXQU5UIFRPIFBVQkxJQyBMSUNFTlNFXG4gICBURVJNUyBBTkQgQ09ORElUSU9OUyBGT1IgQ09QWUlORywgRElTVFJJQlVUSU9OIEFORCBNT0RJRklDQVRJT05cblxuICAwLiBZb3UganVzdCBETyBXSEFUIFRIRSBGVUNLIFlPVSBXQU5UIFRPLlxuXG5cbiovXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgTWQ1ID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIE1kNSgpIHtcbiAgICAgICAgdGhpcy5fc3RhdGUgPSBuZXcgSW50MzJBcnJheSg0KTtcbiAgICAgICAgdGhpcy5fYnVmZmVyID0gbmV3IEFycmF5QnVmZmVyKDY4KTtcbiAgICAgICAgdGhpcy5fYnVmZmVyOCA9IG5ldyBVaW50OEFycmF5KHRoaXMuX2J1ZmZlciwgMCwgNjgpO1xuICAgICAgICB0aGlzLl9idWZmZXIzMiA9IG5ldyBVaW50MzJBcnJheSh0aGlzLl9idWZmZXIsIDAsIDE3KTtcbiAgICAgICAgdGhpcy5zdGFydCgpO1xuICAgIH1cbiAgICAvLyBPbmUgdGltZSBoYXNoaW5nIGZ1bmN0aW9uc1xuICAgIE1kNS5oYXNoU3RyID0gZnVuY3Rpb24gKHN0ciwgcmF3KSB7XG4gICAgICAgIGlmIChyYXcgPT09IHZvaWQgMCkgeyByYXcgPSBmYWxzZTsgfVxuICAgICAgICByZXR1cm4gdGhpcy5vbmVQYXNzSGFzaGVyXG4gICAgICAgICAgICAuc3RhcnQoKVxuICAgICAgICAgICAgLmFwcGVuZFN0cihzdHIpXG4gICAgICAgICAgICAuZW5kKHJhdyk7XG4gICAgfTtcbiAgICBNZDUuaGFzaEFzY2lpU3RyID0gZnVuY3Rpb24gKHN0ciwgcmF3KSB7XG4gICAgICAgIGlmIChyYXcgPT09IHZvaWQgMCkgeyByYXcgPSBmYWxzZTsgfVxuICAgICAgICByZXR1cm4gdGhpcy5vbmVQYXNzSGFzaGVyXG4gICAgICAgICAgICAuc3RhcnQoKVxuICAgICAgICAgICAgLmFwcGVuZEFzY2lpU3RyKHN0cilcbiAgICAgICAgICAgIC5lbmQocmF3KTtcbiAgICB9O1xuICAgIE1kNS5faGV4ID0gZnVuY3Rpb24gKHgpIHtcbiAgICAgICAgdmFyIGhjID0gTWQ1LmhleENoYXJzO1xuICAgICAgICB2YXIgaG8gPSBNZDUuaGV4T3V0O1xuICAgICAgICB2YXIgbjtcbiAgICAgICAgdmFyIG9mZnNldDtcbiAgICAgICAgdmFyIGo7XG4gICAgICAgIHZhciBpO1xuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgNDsgaSArPSAxKSB7XG4gICAgICAgICAgICBvZmZzZXQgPSBpICogODtcbiAgICAgICAgICAgIG4gPSB4W2ldO1xuICAgICAgICAgICAgZm9yIChqID0gMDsgaiA8IDg7IGogKz0gMikge1xuICAgICAgICAgICAgICAgIGhvW29mZnNldCArIDEgKyBqXSA9IGhjLmNoYXJBdChuICYgMHgwRik7XG4gICAgICAgICAgICAgICAgbiA+Pj49IDQ7XG4gICAgICAgICAgICAgICAgaG9bb2Zmc2V0ICsgMCArIGpdID0gaGMuY2hhckF0KG4gJiAweDBGKTtcbiAgICAgICAgICAgICAgICBuID4+Pj0gNDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaG8uam9pbignJyk7XG4gICAgfTtcbiAgICBNZDUuX21kNWN5Y2xlID0gZnVuY3Rpb24gKHgsIGspIHtcbiAgICAgICAgdmFyIGEgPSB4WzBdO1xuICAgICAgICB2YXIgYiA9IHhbMV07XG4gICAgICAgIHZhciBjID0geFsyXTtcbiAgICAgICAgdmFyIGQgPSB4WzNdO1xuICAgICAgICAvLyBmZigpXG4gICAgICAgIGEgKz0gKGIgJiBjIHwgfmIgJiBkKSArIGtbMF0gLSA2ODA4NzY5MzYgfCAwO1xuICAgICAgICBhID0gKGEgPDwgNyB8IGEgPj4+IDI1KSArIGIgfCAwO1xuICAgICAgICBkICs9IChhICYgYiB8IH5hICYgYykgKyBrWzFdIC0gMzg5NTY0NTg2IHwgMDtcbiAgICAgICAgZCA9IChkIDw8IDEyIHwgZCA+Pj4gMjApICsgYSB8IDA7XG4gICAgICAgIGMgKz0gKGQgJiBhIHwgfmQgJiBiKSArIGtbMl0gKyA2MDYxMDU4MTkgfCAwO1xuICAgICAgICBjID0gKGMgPDwgMTcgfCBjID4+PiAxNSkgKyBkIHwgMDtcbiAgICAgICAgYiArPSAoYyAmIGQgfCB+YyAmIGEpICsga1szXSAtIDEwNDQ1MjUzMzAgfCAwO1xuICAgICAgICBiID0gKGIgPDwgMjIgfCBiID4+PiAxMCkgKyBjIHwgMDtcbiAgICAgICAgYSArPSAoYiAmIGMgfCB+YiAmIGQpICsga1s0XSAtIDE3NjQxODg5NyB8IDA7XG4gICAgICAgIGEgPSAoYSA8PCA3IHwgYSA+Pj4gMjUpICsgYiB8IDA7XG4gICAgICAgIGQgKz0gKGEgJiBiIHwgfmEgJiBjKSArIGtbNV0gKyAxMjAwMDgwNDI2IHwgMDtcbiAgICAgICAgZCA9IChkIDw8IDEyIHwgZCA+Pj4gMjApICsgYSB8IDA7XG4gICAgICAgIGMgKz0gKGQgJiBhIHwgfmQgJiBiKSArIGtbNl0gLSAxNDczMjMxMzQxIHwgMDtcbiAgICAgICAgYyA9IChjIDw8IDE3IHwgYyA+Pj4gMTUpICsgZCB8IDA7XG4gICAgICAgIGIgKz0gKGMgJiBkIHwgfmMgJiBhKSArIGtbN10gLSA0NTcwNTk4MyB8IDA7XG4gICAgICAgIGIgPSAoYiA8PCAyMiB8IGIgPj4+IDEwKSArIGMgfCAwO1xuICAgICAgICBhICs9IChiICYgYyB8IH5iICYgZCkgKyBrWzhdICsgMTc3MDAzNTQxNiB8IDA7XG4gICAgICAgIGEgPSAoYSA8PCA3IHwgYSA+Pj4gMjUpICsgYiB8IDA7XG4gICAgICAgIGQgKz0gKGEgJiBiIHwgfmEgJiBjKSArIGtbOV0gLSAxOTU4NDE0NDE3IHwgMDtcbiAgICAgICAgZCA9IChkIDw8IDEyIHwgZCA+Pj4gMjApICsgYSB8IDA7XG4gICAgICAgIGMgKz0gKGQgJiBhIHwgfmQgJiBiKSArIGtbMTBdIC0gNDIwNjMgfCAwO1xuICAgICAgICBjID0gKGMgPDwgMTcgfCBjID4+PiAxNSkgKyBkIHwgMDtcbiAgICAgICAgYiArPSAoYyAmIGQgfCB+YyAmIGEpICsga1sxMV0gLSAxOTkwNDA0MTYyIHwgMDtcbiAgICAgICAgYiA9IChiIDw8IDIyIHwgYiA+Pj4gMTApICsgYyB8IDA7XG4gICAgICAgIGEgKz0gKGIgJiBjIHwgfmIgJiBkKSArIGtbMTJdICsgMTgwNDYwMzY4MiB8IDA7XG4gICAgICAgIGEgPSAoYSA8PCA3IHwgYSA+Pj4gMjUpICsgYiB8IDA7XG4gICAgICAgIGQgKz0gKGEgJiBiIHwgfmEgJiBjKSArIGtbMTNdIC0gNDAzNDExMDEgfCAwO1xuICAgICAgICBkID0gKGQgPDwgMTIgfCBkID4+PiAyMCkgKyBhIHwgMDtcbiAgICAgICAgYyArPSAoZCAmIGEgfCB+ZCAmIGIpICsga1sxNF0gLSAxNTAyMDAyMjkwIHwgMDtcbiAgICAgICAgYyA9IChjIDw8IDE3IHwgYyA+Pj4gMTUpICsgZCB8IDA7XG4gICAgICAgIGIgKz0gKGMgJiBkIHwgfmMgJiBhKSArIGtbMTVdICsgMTIzNjUzNTMyOSB8IDA7XG4gICAgICAgIGIgPSAoYiA8PCAyMiB8IGIgPj4+IDEwKSArIGMgfCAwO1xuICAgICAgICAvLyBnZygpXG4gICAgICAgIGEgKz0gKGIgJiBkIHwgYyAmIH5kKSArIGtbMV0gLSAxNjU3OTY1MTAgfCAwO1xuICAgICAgICBhID0gKGEgPDwgNSB8IGEgPj4+IDI3KSArIGIgfCAwO1xuICAgICAgICBkICs9IChhICYgYyB8IGIgJiB+YykgKyBrWzZdIC0gMTA2OTUwMTYzMiB8IDA7XG4gICAgICAgIGQgPSAoZCA8PCA5IHwgZCA+Pj4gMjMpICsgYSB8IDA7XG4gICAgICAgIGMgKz0gKGQgJiBiIHwgYSAmIH5iKSArIGtbMTFdICsgNjQzNzE3NzEzIHwgMDtcbiAgICAgICAgYyA9IChjIDw8IDE0IHwgYyA+Pj4gMTgpICsgZCB8IDA7XG4gICAgICAgIGIgKz0gKGMgJiBhIHwgZCAmIH5hKSArIGtbMF0gLSAzNzM4OTczMDIgfCAwO1xuICAgICAgICBiID0gKGIgPDwgMjAgfCBiID4+PiAxMikgKyBjIHwgMDtcbiAgICAgICAgYSArPSAoYiAmIGQgfCBjICYgfmQpICsga1s1XSAtIDcwMTU1ODY5MSB8IDA7XG4gICAgICAgIGEgPSAoYSA8PCA1IHwgYSA+Pj4gMjcpICsgYiB8IDA7XG4gICAgICAgIGQgKz0gKGEgJiBjIHwgYiAmIH5jKSArIGtbMTBdICsgMzgwMTYwODMgfCAwO1xuICAgICAgICBkID0gKGQgPDwgOSB8IGQgPj4+IDIzKSArIGEgfCAwO1xuICAgICAgICBjICs9IChkICYgYiB8IGEgJiB+YikgKyBrWzE1XSAtIDY2MDQ3ODMzNSB8IDA7XG4gICAgICAgIGMgPSAoYyA8PCAxNCB8IGMgPj4+IDE4KSArIGQgfCAwO1xuICAgICAgICBiICs9IChjICYgYSB8IGQgJiB+YSkgKyBrWzRdIC0gNDA1NTM3ODQ4IHwgMDtcbiAgICAgICAgYiA9IChiIDw8IDIwIHwgYiA+Pj4gMTIpICsgYyB8IDA7XG4gICAgICAgIGEgKz0gKGIgJiBkIHwgYyAmIH5kKSArIGtbOV0gKyA1Njg0NDY0MzggfCAwO1xuICAgICAgICBhID0gKGEgPDwgNSB8IGEgPj4+IDI3KSArIGIgfCAwO1xuICAgICAgICBkICs9IChhICYgYyB8IGIgJiB+YykgKyBrWzE0XSAtIDEwMTk4MDM2OTAgfCAwO1xuICAgICAgICBkID0gKGQgPDwgOSB8IGQgPj4+IDIzKSArIGEgfCAwO1xuICAgICAgICBjICs9IChkICYgYiB8IGEgJiB+YikgKyBrWzNdIC0gMTg3MzYzOTYxIHwgMDtcbiAgICAgICAgYyA9IChjIDw8IDE0IHwgYyA+Pj4gMTgpICsgZCB8IDA7XG4gICAgICAgIGIgKz0gKGMgJiBhIHwgZCAmIH5hKSArIGtbOF0gKyAxMTYzNTMxNTAxIHwgMDtcbiAgICAgICAgYiA9IChiIDw8IDIwIHwgYiA+Pj4gMTIpICsgYyB8IDA7XG4gICAgICAgIGEgKz0gKGIgJiBkIHwgYyAmIH5kKSArIGtbMTNdIC0gMTQ0NDY4MTQ2NyB8IDA7XG4gICAgICAgIGEgPSAoYSA8PCA1IHwgYSA+Pj4gMjcpICsgYiB8IDA7XG4gICAgICAgIGQgKz0gKGEgJiBjIHwgYiAmIH5jKSArIGtbMl0gLSA1MTQwMzc4NCB8IDA7XG4gICAgICAgIGQgPSAoZCA8PCA5IHwgZCA+Pj4gMjMpICsgYSB8IDA7XG4gICAgICAgIGMgKz0gKGQgJiBiIHwgYSAmIH5iKSArIGtbN10gKyAxNzM1MzI4NDczIHwgMDtcbiAgICAgICAgYyA9IChjIDw8IDE0IHwgYyA+Pj4gMTgpICsgZCB8IDA7XG4gICAgICAgIGIgKz0gKGMgJiBhIHwgZCAmIH5hKSArIGtbMTJdIC0gMTkyNjYwNzczNCB8IDA7XG4gICAgICAgIGIgPSAoYiA8PCAyMCB8IGIgPj4+IDEyKSArIGMgfCAwO1xuICAgICAgICAvLyBoaCgpXG4gICAgICAgIGEgKz0gKGIgXiBjIF4gZCkgKyBrWzVdIC0gMzc4NTU4IHwgMDtcbiAgICAgICAgYSA9IChhIDw8IDQgfCBhID4+PiAyOCkgKyBiIHwgMDtcbiAgICAgICAgZCArPSAoYSBeIGIgXiBjKSArIGtbOF0gLSAyMDIyNTc0NDYzIHwgMDtcbiAgICAgICAgZCA9IChkIDw8IDExIHwgZCA+Pj4gMjEpICsgYSB8IDA7XG4gICAgICAgIGMgKz0gKGQgXiBhIF4gYikgKyBrWzExXSArIDE4MzkwMzA1NjIgfCAwO1xuICAgICAgICBjID0gKGMgPDwgMTYgfCBjID4+PiAxNikgKyBkIHwgMDtcbiAgICAgICAgYiArPSAoYyBeIGQgXiBhKSArIGtbMTRdIC0gMzUzMDk1NTYgfCAwO1xuICAgICAgICBiID0gKGIgPDwgMjMgfCBiID4+PiA5KSArIGMgfCAwO1xuICAgICAgICBhICs9IChiIF4gYyBeIGQpICsga1sxXSAtIDE1MzA5OTIwNjAgfCAwO1xuICAgICAgICBhID0gKGEgPDwgNCB8IGEgPj4+IDI4KSArIGIgfCAwO1xuICAgICAgICBkICs9IChhIF4gYiBeIGMpICsga1s0XSArIDEyNzI4OTMzNTMgfCAwO1xuICAgICAgICBkID0gKGQgPDwgMTEgfCBkID4+PiAyMSkgKyBhIHwgMDtcbiAgICAgICAgYyArPSAoZCBeIGEgXiBiKSArIGtbN10gLSAxNTU0OTc2MzIgfCAwO1xuICAgICAgICBjID0gKGMgPDwgMTYgfCBjID4+PiAxNikgKyBkIHwgMDtcbiAgICAgICAgYiArPSAoYyBeIGQgXiBhKSArIGtbMTBdIC0gMTA5NDczMDY0MCB8IDA7XG4gICAgICAgIGIgPSAoYiA8PCAyMyB8IGIgPj4+IDkpICsgYyB8IDA7XG4gICAgICAgIGEgKz0gKGIgXiBjIF4gZCkgKyBrWzEzXSArIDY4MTI3OTE3NCB8IDA7XG4gICAgICAgIGEgPSAoYSA8PCA0IHwgYSA+Pj4gMjgpICsgYiB8IDA7XG4gICAgICAgIGQgKz0gKGEgXiBiIF4gYykgKyBrWzBdIC0gMzU4NTM3MjIyIHwgMDtcbiAgICAgICAgZCA9IChkIDw8IDExIHwgZCA+Pj4gMjEpICsgYSB8IDA7XG4gICAgICAgIGMgKz0gKGQgXiBhIF4gYikgKyBrWzNdIC0gNzIyNTIxOTc5IHwgMDtcbiAgICAgICAgYyA9IChjIDw8IDE2IHwgYyA+Pj4gMTYpICsgZCB8IDA7XG4gICAgICAgIGIgKz0gKGMgXiBkIF4gYSkgKyBrWzZdICsgNzYwMjkxODkgfCAwO1xuICAgICAgICBiID0gKGIgPDwgMjMgfCBiID4+PiA5KSArIGMgfCAwO1xuICAgICAgICBhICs9IChiIF4gYyBeIGQpICsga1s5XSAtIDY0MDM2NDQ4NyB8IDA7XG4gICAgICAgIGEgPSAoYSA8PCA0IHwgYSA+Pj4gMjgpICsgYiB8IDA7XG4gICAgICAgIGQgKz0gKGEgXiBiIF4gYykgKyBrWzEyXSAtIDQyMTgxNTgzNSB8IDA7XG4gICAgICAgIGQgPSAoZCA8PCAxMSB8IGQgPj4+IDIxKSArIGEgfCAwO1xuICAgICAgICBjICs9IChkIF4gYSBeIGIpICsga1sxNV0gKyA1MzA3NDI1MjAgfCAwO1xuICAgICAgICBjID0gKGMgPDwgMTYgfCBjID4+PiAxNikgKyBkIHwgMDtcbiAgICAgICAgYiArPSAoYyBeIGQgXiBhKSArIGtbMl0gLSA5OTUzMzg2NTEgfCAwO1xuICAgICAgICBiID0gKGIgPDwgMjMgfCBiID4+PiA5KSArIGMgfCAwO1xuICAgICAgICAvLyBpaSgpXG4gICAgICAgIGEgKz0gKGMgXiAoYiB8IH5kKSkgKyBrWzBdIC0gMTk4NjMwODQ0IHwgMDtcbiAgICAgICAgYSA9IChhIDw8IDYgfCBhID4+PiAyNikgKyBiIHwgMDtcbiAgICAgICAgZCArPSAoYiBeIChhIHwgfmMpKSArIGtbN10gKyAxMTI2ODkxNDE1IHwgMDtcbiAgICAgICAgZCA9IChkIDw8IDEwIHwgZCA+Pj4gMjIpICsgYSB8IDA7XG4gICAgICAgIGMgKz0gKGEgXiAoZCB8IH5iKSkgKyBrWzE0XSAtIDE0MTYzNTQ5MDUgfCAwO1xuICAgICAgICBjID0gKGMgPDwgMTUgfCBjID4+PiAxNykgKyBkIHwgMDtcbiAgICAgICAgYiArPSAoZCBeIChjIHwgfmEpKSArIGtbNV0gLSA1NzQzNDA1NSB8IDA7XG4gICAgICAgIGIgPSAoYiA8PCAyMSB8IGIgPj4+IDExKSArIGMgfCAwO1xuICAgICAgICBhICs9IChjIF4gKGIgfCB+ZCkpICsga1sxMl0gKyAxNzAwNDg1NTcxIHwgMDtcbiAgICAgICAgYSA9IChhIDw8IDYgfCBhID4+PiAyNikgKyBiIHwgMDtcbiAgICAgICAgZCArPSAoYiBeIChhIHwgfmMpKSArIGtbM10gLSAxODk0OTg2NjA2IHwgMDtcbiAgICAgICAgZCA9IChkIDw8IDEwIHwgZCA+Pj4gMjIpICsgYSB8IDA7XG4gICAgICAgIGMgKz0gKGEgXiAoZCB8IH5iKSkgKyBrWzEwXSAtIDEwNTE1MjMgfCAwO1xuICAgICAgICBjID0gKGMgPDwgMTUgfCBjID4+PiAxNykgKyBkIHwgMDtcbiAgICAgICAgYiArPSAoZCBeIChjIHwgfmEpKSArIGtbMV0gLSAyMDU0OTIyNzk5IHwgMDtcbiAgICAgICAgYiA9IChiIDw8IDIxIHwgYiA+Pj4gMTEpICsgYyB8IDA7XG4gICAgICAgIGEgKz0gKGMgXiAoYiB8IH5kKSkgKyBrWzhdICsgMTg3MzMxMzM1OSB8IDA7XG4gICAgICAgIGEgPSAoYSA8PCA2IHwgYSA+Pj4gMjYpICsgYiB8IDA7XG4gICAgICAgIGQgKz0gKGIgXiAoYSB8IH5jKSkgKyBrWzE1XSAtIDMwNjExNzQ0IHwgMDtcbiAgICAgICAgZCA9IChkIDw8IDEwIHwgZCA+Pj4gMjIpICsgYSB8IDA7XG4gICAgICAgIGMgKz0gKGEgXiAoZCB8IH5iKSkgKyBrWzZdIC0gMTU2MDE5ODM4MCB8IDA7XG4gICAgICAgIGMgPSAoYyA8PCAxNSB8IGMgPj4+IDE3KSArIGQgfCAwO1xuICAgICAgICBiICs9IChkIF4gKGMgfCB+YSkpICsga1sxM10gKyAxMzA5MTUxNjQ5IHwgMDtcbiAgICAgICAgYiA9IChiIDw8IDIxIHwgYiA+Pj4gMTEpICsgYyB8IDA7XG4gICAgICAgIGEgKz0gKGMgXiAoYiB8IH5kKSkgKyBrWzRdIC0gMTQ1NTIzMDcwIHwgMDtcbiAgICAgICAgYSA9IChhIDw8IDYgfCBhID4+PiAyNikgKyBiIHwgMDtcbiAgICAgICAgZCArPSAoYiBeIChhIHwgfmMpKSArIGtbMTFdIC0gMTEyMDIxMDM3OSB8IDA7XG4gICAgICAgIGQgPSAoZCA8PCAxMCB8IGQgPj4+IDIyKSArIGEgfCAwO1xuICAgICAgICBjICs9IChhIF4gKGQgfCB+YikpICsga1syXSArIDcxODc4NzI1OSB8IDA7XG4gICAgICAgIGMgPSAoYyA8PCAxNSB8IGMgPj4+IDE3KSArIGQgfCAwO1xuICAgICAgICBiICs9IChkIF4gKGMgfCB+YSkpICsga1s5XSAtIDM0MzQ4NTU1MSB8IDA7XG4gICAgICAgIGIgPSAoYiA8PCAyMSB8IGIgPj4+IDExKSArIGMgfCAwO1xuICAgICAgICB4WzBdID0gYSArIHhbMF0gfCAwO1xuICAgICAgICB4WzFdID0gYiArIHhbMV0gfCAwO1xuICAgICAgICB4WzJdID0gYyArIHhbMl0gfCAwO1xuICAgICAgICB4WzNdID0gZCArIHhbM10gfCAwO1xuICAgIH07XG4gICAgTWQ1LnByb3RvdHlwZS5zdGFydCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5fZGF0YUxlbmd0aCA9IDA7XG4gICAgICAgIHRoaXMuX2J1ZmZlckxlbmd0aCA9IDA7XG4gICAgICAgIHRoaXMuX3N0YXRlLnNldChNZDUuc3RhdGVJZGVudGl0eSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgLy8gQ2hhciB0byBjb2RlIHBvaW50IHRvIHRvIGFycmF5IGNvbnZlcnNpb246XG4gICAgLy8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvU3RyaW5nL2NoYXJDb2RlQXRcbiAgICAvLyAjRXhhbXBsZS4zQV9GaXhpbmdfY2hhckNvZGVBdF90b19oYW5kbGVfbm9uLUJhc2ljLU11bHRpbGluZ3VhbC1QbGFuZV9jaGFyYWN0ZXJzX2lmX3RoZWlyX3ByZXNlbmNlX2VhcmxpZXJfaW5fdGhlX3N0cmluZ19pc191bmtub3duXG4gICAgTWQ1LnByb3RvdHlwZS5hcHBlbmRTdHIgPSBmdW5jdGlvbiAoc3RyKSB7XG4gICAgICAgIHZhciBidWY4ID0gdGhpcy5fYnVmZmVyODtcbiAgICAgICAgdmFyIGJ1ZjMyID0gdGhpcy5fYnVmZmVyMzI7XG4gICAgICAgIHZhciBidWZMZW4gPSB0aGlzLl9idWZmZXJMZW5ndGg7XG4gICAgICAgIHZhciBjb2RlO1xuICAgICAgICB2YXIgaTtcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IHN0ci5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICAgICAgY29kZSA9IHN0ci5jaGFyQ29kZUF0KGkpO1xuICAgICAgICAgICAgaWYgKGNvZGUgPCAxMjgpIHtcbiAgICAgICAgICAgICAgICBidWY4W2J1ZkxlbisrXSA9IGNvZGU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChjb2RlIDwgMHg4MDApIHtcbiAgICAgICAgICAgICAgICBidWY4W2J1ZkxlbisrXSA9IChjb2RlID4+PiA2KSArIDB4QzA7XG4gICAgICAgICAgICAgICAgYnVmOFtidWZMZW4rK10gPSBjb2RlICYgMHgzRiB8IDB4ODA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChjb2RlIDwgMHhEODAwIHx8IGNvZGUgPiAweERCRkYpIHtcbiAgICAgICAgICAgICAgICBidWY4W2J1ZkxlbisrXSA9IChjb2RlID4+PiAxMikgKyAweEUwO1xuICAgICAgICAgICAgICAgIGJ1ZjhbYnVmTGVuKytdID0gKGNvZGUgPj4+IDYgJiAweDNGKSB8IDB4ODA7XG4gICAgICAgICAgICAgICAgYnVmOFtidWZMZW4rK10gPSAoY29kZSAmIDB4M0YpIHwgMHg4MDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvZGUgPSAoKGNvZGUgLSAweEQ4MDApICogMHg0MDApICsgKHN0ci5jaGFyQ29kZUF0KCsraSkgLSAweERDMDApICsgMHgxMDAwMDtcbiAgICAgICAgICAgICAgICBpZiAoY29kZSA+IDB4MTBGRkZGKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVW5pY29kZSBzdGFuZGFyZCBzdXBwb3J0cyBjb2RlIHBvaW50cyB1cCB0byBVKzEwRkZGRicpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBidWY4W2J1ZkxlbisrXSA9IChjb2RlID4+PiAxOCkgKyAweEYwO1xuICAgICAgICAgICAgICAgIGJ1ZjhbYnVmTGVuKytdID0gKGNvZGUgPj4+IDEyICYgMHgzRikgfCAweDgwO1xuICAgICAgICAgICAgICAgIGJ1ZjhbYnVmTGVuKytdID0gKGNvZGUgPj4+IDYgJiAweDNGKSB8IDB4ODA7XG4gICAgICAgICAgICAgICAgYnVmOFtidWZMZW4rK10gPSAoY29kZSAmIDB4M0YpIHwgMHg4MDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChidWZMZW4gPj0gNjQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9kYXRhTGVuZ3RoICs9IDY0O1xuICAgICAgICAgICAgICAgIE1kNS5fbWQ1Y3ljbGUodGhpcy5fc3RhdGUsIGJ1ZjMyKTtcbiAgICAgICAgICAgICAgICBidWZMZW4gLT0gNjQ7XG4gICAgICAgICAgICAgICAgYnVmMzJbMF0gPSBidWYzMlsxNl07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fYnVmZmVyTGVuZ3RoID0gYnVmTGVuO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIE1kNS5wcm90b3R5cGUuYXBwZW5kQXNjaWlTdHIgPSBmdW5jdGlvbiAoc3RyKSB7XG4gICAgICAgIHZhciBidWY4ID0gdGhpcy5fYnVmZmVyODtcbiAgICAgICAgdmFyIGJ1ZjMyID0gdGhpcy5fYnVmZmVyMzI7XG4gICAgICAgIHZhciBidWZMZW4gPSB0aGlzLl9idWZmZXJMZW5ndGg7XG4gICAgICAgIHZhciBpO1xuICAgICAgICB2YXIgaiA9IDA7XG4gICAgICAgIGZvciAoOzspIHtcbiAgICAgICAgICAgIGkgPSBNYXRoLm1pbihzdHIubGVuZ3RoIC0gaiwgNjQgLSBidWZMZW4pO1xuICAgICAgICAgICAgd2hpbGUgKGktLSkge1xuICAgICAgICAgICAgICAgIGJ1ZjhbYnVmTGVuKytdID0gc3RyLmNoYXJDb2RlQXQoaisrKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChidWZMZW4gPCA2NCkge1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fZGF0YUxlbmd0aCArPSA2NDtcbiAgICAgICAgICAgIE1kNS5fbWQ1Y3ljbGUodGhpcy5fc3RhdGUsIGJ1ZjMyKTtcbiAgICAgICAgICAgIGJ1ZkxlbiA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fYnVmZmVyTGVuZ3RoID0gYnVmTGVuO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIE1kNS5wcm90b3R5cGUuYXBwZW5kQnl0ZUFycmF5ID0gZnVuY3Rpb24gKGlucHV0KSB7XG4gICAgICAgIHZhciBidWY4ID0gdGhpcy5fYnVmZmVyODtcbiAgICAgICAgdmFyIGJ1ZjMyID0gdGhpcy5fYnVmZmVyMzI7XG4gICAgICAgIHZhciBidWZMZW4gPSB0aGlzLl9idWZmZXJMZW5ndGg7XG4gICAgICAgIHZhciBpO1xuICAgICAgICB2YXIgaiA9IDA7XG4gICAgICAgIGZvciAoOzspIHtcbiAgICAgICAgICAgIGkgPSBNYXRoLm1pbihpbnB1dC5sZW5ndGggLSBqLCA2NCAtIGJ1Zkxlbik7XG4gICAgICAgICAgICB3aGlsZSAoaS0tKSB7XG4gICAgICAgICAgICAgICAgYnVmOFtidWZMZW4rK10gPSBpbnB1dFtqKytdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGJ1ZkxlbiA8IDY0KSB7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9kYXRhTGVuZ3RoICs9IDY0O1xuICAgICAgICAgICAgTWQ1Ll9tZDVjeWNsZSh0aGlzLl9zdGF0ZSwgYnVmMzIpO1xuICAgICAgICAgICAgYnVmTGVuID0gMDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9idWZmZXJMZW5ndGggPSBidWZMZW47XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgTWQ1LnByb3RvdHlwZS5nZXRTdGF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICB2YXIgcyA9IHNlbGYuX3N0YXRlO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgYnVmZmVyOiBTdHJpbmcuZnJvbUNoYXJDb2RlLmFwcGx5KG51bGwsIHNlbGYuX2J1ZmZlcjgpLFxuICAgICAgICAgICAgYnVmbGVuOiBzZWxmLl9idWZmZXJMZW5ndGgsXG4gICAgICAgICAgICBsZW5ndGg6IHNlbGYuX2RhdGFMZW5ndGgsXG4gICAgICAgICAgICBzdGF0ZTogW3NbMF0sIHNbMV0sIHNbMl0sIHNbM11dXG4gICAgICAgIH07XG4gICAgfTtcbiAgICBNZDUucHJvdG90eXBlLnNldFN0YXRlID0gZnVuY3Rpb24gKHN0YXRlKSB7XG4gICAgICAgIHZhciBidWYgPSBzdGF0ZS5idWZmZXI7XG4gICAgICAgIHZhciB4ID0gc3RhdGUuc3RhdGU7XG4gICAgICAgIHZhciBzID0gdGhpcy5fc3RhdGU7XG4gICAgICAgIHZhciBpO1xuICAgICAgICB0aGlzLl9kYXRhTGVuZ3RoID0gc3RhdGUubGVuZ3RoO1xuICAgICAgICB0aGlzLl9idWZmZXJMZW5ndGggPSBzdGF0ZS5idWZsZW47XG4gICAgICAgIHNbMF0gPSB4WzBdO1xuICAgICAgICBzWzFdID0geFsxXTtcbiAgICAgICAgc1syXSA9IHhbMl07XG4gICAgICAgIHNbM10gPSB4WzNdO1xuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgYnVmLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgICAgICB0aGlzLl9idWZmZXI4W2ldID0gYnVmLmNoYXJDb2RlQXQoaSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIE1kNS5wcm90b3R5cGUuZW5kID0gZnVuY3Rpb24gKHJhdykge1xuICAgICAgICBpZiAocmF3ID09PSB2b2lkIDApIHsgcmF3ID0gZmFsc2U7IH1cbiAgICAgICAgdmFyIGJ1ZkxlbiA9IHRoaXMuX2J1ZmZlckxlbmd0aDtcbiAgICAgICAgdmFyIGJ1ZjggPSB0aGlzLl9idWZmZXI4O1xuICAgICAgICB2YXIgYnVmMzIgPSB0aGlzLl9idWZmZXIzMjtcbiAgICAgICAgdmFyIGkgPSAoYnVmTGVuID4+IDIpICsgMTtcbiAgICAgICAgdmFyIGRhdGFCaXRzTGVuO1xuICAgICAgICB0aGlzLl9kYXRhTGVuZ3RoICs9IGJ1ZkxlbjtcbiAgICAgICAgYnVmOFtidWZMZW5dID0gMHg4MDtcbiAgICAgICAgYnVmOFtidWZMZW4gKyAxXSA9IGJ1ZjhbYnVmTGVuICsgMl0gPSBidWY4W2J1ZkxlbiArIDNdID0gMDtcbiAgICAgICAgYnVmMzIuc2V0KE1kNS5idWZmZXIzMklkZW50aXR5LnN1YmFycmF5KGkpLCBpKTtcbiAgICAgICAgaWYgKGJ1ZkxlbiA+IDU1KSB7XG4gICAgICAgICAgICBNZDUuX21kNWN5Y2xlKHRoaXMuX3N0YXRlLCBidWYzMik7XG4gICAgICAgICAgICBidWYzMi5zZXQoTWQ1LmJ1ZmZlcjMySWRlbnRpdHkpO1xuICAgICAgICB9XG4gICAgICAgIC8vIERvIHRoZSBmaW5hbCBjb21wdXRhdGlvbiBiYXNlZCBvbiB0aGUgdGFpbCBhbmQgbGVuZ3RoXG4gICAgICAgIC8vIEJld2FyZSB0aGF0IHRoZSBmaW5hbCBsZW5ndGggbWF5IG5vdCBmaXQgaW4gMzIgYml0cyBzbyB3ZSB0YWtlIGNhcmUgb2YgdGhhdFxuICAgICAgICBkYXRhQml0c0xlbiA9IHRoaXMuX2RhdGFMZW5ndGggKiA4O1xuICAgICAgICBpZiAoZGF0YUJpdHNMZW4gPD0gMHhGRkZGRkZGRikge1xuICAgICAgICAgICAgYnVmMzJbMTRdID0gZGF0YUJpdHNMZW47XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB2YXIgbWF0Y2hlcyA9IGRhdGFCaXRzTGVuLnRvU3RyaW5nKDE2KS5tYXRjaCgvKC4qPykoLnswLDh9KSQvKTtcbiAgICAgICAgICAgIGlmIChtYXRjaGVzID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIGxvID0gcGFyc2VJbnQobWF0Y2hlc1syXSwgMTYpO1xuICAgICAgICAgICAgdmFyIGhpID0gcGFyc2VJbnQobWF0Y2hlc1sxXSwgMTYpIHx8IDA7XG4gICAgICAgICAgICBidWYzMlsxNF0gPSBsbztcbiAgICAgICAgICAgIGJ1ZjMyWzE1XSA9IGhpO1xuICAgICAgICB9XG4gICAgICAgIE1kNS5fbWQ1Y3ljbGUodGhpcy5fc3RhdGUsIGJ1ZjMyKTtcbiAgICAgICAgcmV0dXJuIHJhdyA/IHRoaXMuX3N0YXRlIDogTWQ1Ll9oZXgodGhpcy5fc3RhdGUpO1xuICAgIH07XG4gICAgLy8gUHJpdmF0ZSBTdGF0aWMgVmFyaWFibGVzXG4gICAgTWQ1LnN0YXRlSWRlbnRpdHkgPSBuZXcgSW50MzJBcnJheShbMTczMjU4NDE5MywgLTI3MTczMzg3OSwgLTE3MzI1ODQxOTQsIDI3MTczMzg3OF0pO1xuICAgIE1kNS5idWZmZXIzMklkZW50aXR5ID0gbmV3IEludDMyQXJyYXkoWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdKTtcbiAgICBNZDUuaGV4Q2hhcnMgPSAnMDEyMzQ1Njc4OWFiY2RlZic7XG4gICAgTWQ1LmhleE91dCA9IFtdO1xuICAgIC8vIFBlcm1hbmVudCBpbnN0YW5jZSBpcyB0byB1c2UgZm9yIG9uZS1jYWxsIGhhc2hpbmdcbiAgICBNZDUub25lUGFzc0hhc2hlciA9IG5ldyBNZDUoKTtcbiAgICByZXR1cm4gTWQ1O1xufSgpKTtcbmV4cG9ydHMuTWQ1ID0gTWQ1O1xuaWYgKE1kNS5oYXNoU3RyKCdoZWxsbycpICE9PSAnNWQ0MTQwMmFiYzRiMmE3NmI5NzE5ZDkxMTAxN2M1OTInKSB7XG4gICAgY29uc29sZS5lcnJvcignTWQ1IHNlbGYgdGVzdCBmYWlsZWQuJyk7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1tZDUuanMubWFwIiwiZXhwb3J0IHsgZGVmYXVsdCBhcyB2MSB9IGZyb20gJy4vdjEuanMnO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyB2MyB9IGZyb20gJy4vdjMuanMnO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyB2NCB9IGZyb20gJy4vdjQuanMnO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyB2NSB9IGZyb20gJy4vdjUuanMnO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBOSUwgfSBmcm9tICcuL25pbC5qcyc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIHZlcnNpb24gfSBmcm9tICcuL3ZlcnNpb24uanMnO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyB2YWxpZGF0ZSB9IGZyb20gJy4vdmFsaWRhdGUuanMnO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBzdHJpbmdpZnkgfSBmcm9tICcuL3N0cmluZ2lmeS5qcyc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIHBhcnNlIH0gZnJvbSAnLi9wYXJzZS5qcyc7IiwiLypcbiAqIEJyb3dzZXItY29tcGF0aWJsZSBKYXZhU2NyaXB0IE1ENVxuICpcbiAqIE1vZGlmaWNhdGlvbiBvZiBKYXZhU2NyaXB0IE1ENVxuICogaHR0cHM6Ly9naXRodWIuY29tL2JsdWVpbXAvSmF2YVNjcmlwdC1NRDVcbiAqXG4gKiBDb3B5cmlnaHQgMjAxMSwgU2ViYXN0aWFuIFRzY2hhblxuICogaHR0cHM6Ly9ibHVlaW1wLm5ldFxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZTpcbiAqIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlUXG4gKlxuICogQmFzZWQgb25cbiAqIEEgSmF2YVNjcmlwdCBpbXBsZW1lbnRhdGlvbiBvZiB0aGUgUlNBIERhdGEgU2VjdXJpdHksIEluYy4gTUQ1IE1lc3NhZ2VcbiAqIERpZ2VzdCBBbGdvcml0aG0sIGFzIGRlZmluZWQgaW4gUkZDIDEzMjEuXG4gKiBWZXJzaW9uIDIuMiBDb3B5cmlnaHQgKEMpIFBhdWwgSm9obnN0b24gMTk5OSAtIDIwMDlcbiAqIE90aGVyIGNvbnRyaWJ1dG9yczogR3JlZyBIb2x0LCBBbmRyZXcgS2VwZXJ0LCBZZG5hciwgTG9zdGluZXRcbiAqIERpc3RyaWJ1dGVkIHVuZGVyIHRoZSBCU0QgTGljZW5zZVxuICogU2VlIGh0dHA6Ly9wYWpob21lLm9yZy51ay9jcnlwdC9tZDUgZm9yIG1vcmUgaW5mby5cbiAqL1xuZnVuY3Rpb24gbWQ1KGJ5dGVzKSB7XG4gIGlmICh0eXBlb2YgYnl0ZXMgPT09ICdzdHJpbmcnKSB7XG4gICAgdmFyIG1zZyA9IHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChieXRlcykpOyAvLyBVVEY4IGVzY2FwZVxuXG4gICAgYnl0ZXMgPSBuZXcgVWludDhBcnJheShtc2cubGVuZ3RoKTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbXNnLmxlbmd0aDsgKytpKSB7XG4gICAgICBieXRlc1tpXSA9IG1zZy5jaGFyQ29kZUF0KGkpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBtZDVUb0hleEVuY29kZWRBcnJheSh3b3Jkc1RvTWQ1KGJ5dGVzVG9Xb3JkcyhieXRlcyksIGJ5dGVzLmxlbmd0aCAqIDgpKTtcbn1cbi8qXG4gKiBDb252ZXJ0IGFuIGFycmF5IG9mIGxpdHRsZS1lbmRpYW4gd29yZHMgdG8gYW4gYXJyYXkgb2YgYnl0ZXNcbiAqL1xuXG5cbmZ1bmN0aW9uIG1kNVRvSGV4RW5jb2RlZEFycmF5KGlucHV0KSB7XG4gIHZhciBvdXRwdXQgPSBbXTtcbiAgdmFyIGxlbmd0aDMyID0gaW5wdXQubGVuZ3RoICogMzI7XG4gIHZhciBoZXhUYWIgPSAnMDEyMzQ1Njc4OWFiY2RlZic7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGgzMjsgaSArPSA4KSB7XG4gICAgdmFyIHggPSBpbnB1dFtpID4+IDVdID4+PiBpICUgMzIgJiAweGZmO1xuICAgIHZhciBoZXggPSBwYXJzZUludChoZXhUYWIuY2hhckF0KHggPj4+IDQgJiAweDBmKSArIGhleFRhYi5jaGFyQXQoeCAmIDB4MGYpLCAxNik7XG4gICAgb3V0cHV0LnB1c2goaGV4KTtcbiAgfVxuXG4gIHJldHVybiBvdXRwdXQ7XG59XG4vKipcbiAqIENhbGN1bGF0ZSBvdXRwdXQgbGVuZ3RoIHdpdGggcGFkZGluZyBhbmQgYml0IGxlbmd0aFxuICovXG5cblxuZnVuY3Rpb24gZ2V0T3V0cHV0TGVuZ3RoKGlucHV0TGVuZ3RoOCkge1xuICByZXR1cm4gKGlucHV0TGVuZ3RoOCArIDY0ID4+PiA5IDw8IDQpICsgMTQgKyAxO1xufVxuLypcbiAqIENhbGN1bGF0ZSB0aGUgTUQ1IG9mIGFuIGFycmF5IG9mIGxpdHRsZS1lbmRpYW4gd29yZHMsIGFuZCBhIGJpdCBsZW5ndGguXG4gKi9cblxuXG5mdW5jdGlvbiB3b3Jkc1RvTWQ1KHgsIGxlbikge1xuICAvKiBhcHBlbmQgcGFkZGluZyAqL1xuICB4W2xlbiA+PiA1XSB8PSAweDgwIDw8IGxlbiAlIDMyO1xuICB4W2dldE91dHB1dExlbmd0aChsZW4pIC0gMV0gPSBsZW47XG4gIHZhciBhID0gMTczMjU4NDE5MztcbiAgdmFyIGIgPSAtMjcxNzMzODc5O1xuICB2YXIgYyA9IC0xNzMyNTg0MTk0O1xuICB2YXIgZCA9IDI3MTczMzg3ODtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHgubGVuZ3RoOyBpICs9IDE2KSB7XG4gICAgdmFyIG9sZGEgPSBhO1xuICAgIHZhciBvbGRiID0gYjtcbiAgICB2YXIgb2xkYyA9IGM7XG4gICAgdmFyIG9sZGQgPSBkO1xuICAgIGEgPSBtZDVmZihhLCBiLCBjLCBkLCB4W2ldLCA3LCAtNjgwODc2OTM2KTtcbiAgICBkID0gbWQ1ZmYoZCwgYSwgYiwgYywgeFtpICsgMV0sIDEyLCAtMzg5NTY0NTg2KTtcbiAgICBjID0gbWQ1ZmYoYywgZCwgYSwgYiwgeFtpICsgMl0sIDE3LCA2MDYxMDU4MTkpO1xuICAgIGIgPSBtZDVmZihiLCBjLCBkLCBhLCB4W2kgKyAzXSwgMjIsIC0xMDQ0NTI1MzMwKTtcbiAgICBhID0gbWQ1ZmYoYSwgYiwgYywgZCwgeFtpICsgNF0sIDcsIC0xNzY0MTg4OTcpO1xuICAgIGQgPSBtZDVmZihkLCBhLCBiLCBjLCB4W2kgKyA1XSwgMTIsIDEyMDAwODA0MjYpO1xuICAgIGMgPSBtZDVmZihjLCBkLCBhLCBiLCB4W2kgKyA2XSwgMTcsIC0xNDczMjMxMzQxKTtcbiAgICBiID0gbWQ1ZmYoYiwgYywgZCwgYSwgeFtpICsgN10sIDIyLCAtNDU3MDU5ODMpO1xuICAgIGEgPSBtZDVmZihhLCBiLCBjLCBkLCB4W2kgKyA4XSwgNywgMTc3MDAzNTQxNik7XG4gICAgZCA9IG1kNWZmKGQsIGEsIGIsIGMsIHhbaSArIDldLCAxMiwgLTE5NTg0MTQ0MTcpO1xuICAgIGMgPSBtZDVmZihjLCBkLCBhLCBiLCB4W2kgKyAxMF0sIDE3LCAtNDIwNjMpO1xuICAgIGIgPSBtZDVmZihiLCBjLCBkLCBhLCB4W2kgKyAxMV0sIDIyLCAtMTk5MDQwNDE2Mik7XG4gICAgYSA9IG1kNWZmKGEsIGIsIGMsIGQsIHhbaSArIDEyXSwgNywgMTgwNDYwMzY4Mik7XG4gICAgZCA9IG1kNWZmKGQsIGEsIGIsIGMsIHhbaSArIDEzXSwgMTIsIC00MDM0MTEwMSk7XG4gICAgYyA9IG1kNWZmKGMsIGQsIGEsIGIsIHhbaSArIDE0XSwgMTcsIC0xNTAyMDAyMjkwKTtcbiAgICBiID0gbWQ1ZmYoYiwgYywgZCwgYSwgeFtpICsgMTVdLCAyMiwgMTIzNjUzNTMyOSk7XG4gICAgYSA9IG1kNWdnKGEsIGIsIGMsIGQsIHhbaSArIDFdLCA1LCAtMTY1Nzk2NTEwKTtcbiAgICBkID0gbWQ1Z2coZCwgYSwgYiwgYywgeFtpICsgNl0sIDksIC0xMDY5NTAxNjMyKTtcbiAgICBjID0gbWQ1Z2coYywgZCwgYSwgYiwgeFtpICsgMTFdLCAxNCwgNjQzNzE3NzEzKTtcbiAgICBiID0gbWQ1Z2coYiwgYywgZCwgYSwgeFtpXSwgMjAsIC0zNzM4OTczMDIpO1xuICAgIGEgPSBtZDVnZyhhLCBiLCBjLCBkLCB4W2kgKyA1XSwgNSwgLTcwMTU1ODY5MSk7XG4gICAgZCA9IG1kNWdnKGQsIGEsIGIsIGMsIHhbaSArIDEwXSwgOSwgMzgwMTYwODMpO1xuICAgIGMgPSBtZDVnZyhjLCBkLCBhLCBiLCB4W2kgKyAxNV0sIDE0LCAtNjYwNDc4MzM1KTtcbiAgICBiID0gbWQ1Z2coYiwgYywgZCwgYSwgeFtpICsgNF0sIDIwLCAtNDA1NTM3ODQ4KTtcbiAgICBhID0gbWQ1Z2coYSwgYiwgYywgZCwgeFtpICsgOV0sIDUsIDU2ODQ0NjQzOCk7XG4gICAgZCA9IG1kNWdnKGQsIGEsIGIsIGMsIHhbaSArIDE0XSwgOSwgLTEwMTk4MDM2OTApO1xuICAgIGMgPSBtZDVnZyhjLCBkLCBhLCBiLCB4W2kgKyAzXSwgMTQsIC0xODczNjM5NjEpO1xuICAgIGIgPSBtZDVnZyhiLCBjLCBkLCBhLCB4W2kgKyA4XSwgMjAsIDExNjM1MzE1MDEpO1xuICAgIGEgPSBtZDVnZyhhLCBiLCBjLCBkLCB4W2kgKyAxM10sIDUsIC0xNDQ0NjgxNDY3KTtcbiAgICBkID0gbWQ1Z2coZCwgYSwgYiwgYywgeFtpICsgMl0sIDksIC01MTQwMzc4NCk7XG4gICAgYyA9IG1kNWdnKGMsIGQsIGEsIGIsIHhbaSArIDddLCAxNCwgMTczNTMyODQ3Myk7XG4gICAgYiA9IG1kNWdnKGIsIGMsIGQsIGEsIHhbaSArIDEyXSwgMjAsIC0xOTI2NjA3NzM0KTtcbiAgICBhID0gbWQ1aGgoYSwgYiwgYywgZCwgeFtpICsgNV0sIDQsIC0zNzg1NTgpO1xuICAgIGQgPSBtZDVoaChkLCBhLCBiLCBjLCB4W2kgKyA4XSwgMTEsIC0yMDIyNTc0NDYzKTtcbiAgICBjID0gbWQ1aGgoYywgZCwgYSwgYiwgeFtpICsgMTFdLCAxNiwgMTgzOTAzMDU2Mik7XG4gICAgYiA9IG1kNWhoKGIsIGMsIGQsIGEsIHhbaSArIDE0XSwgMjMsIC0zNTMwOTU1Nik7XG4gICAgYSA9IG1kNWhoKGEsIGIsIGMsIGQsIHhbaSArIDFdLCA0LCAtMTUzMDk5MjA2MCk7XG4gICAgZCA9IG1kNWhoKGQsIGEsIGIsIGMsIHhbaSArIDRdLCAxMSwgMTI3Mjg5MzM1Myk7XG4gICAgYyA9IG1kNWhoKGMsIGQsIGEsIGIsIHhbaSArIDddLCAxNiwgLTE1NTQ5NzYzMik7XG4gICAgYiA9IG1kNWhoKGIsIGMsIGQsIGEsIHhbaSArIDEwXSwgMjMsIC0xMDk0NzMwNjQwKTtcbiAgICBhID0gbWQ1aGgoYSwgYiwgYywgZCwgeFtpICsgMTNdLCA0LCA2ODEyNzkxNzQpO1xuICAgIGQgPSBtZDVoaChkLCBhLCBiLCBjLCB4W2ldLCAxMSwgLTM1ODUzNzIyMik7XG4gICAgYyA9IG1kNWhoKGMsIGQsIGEsIGIsIHhbaSArIDNdLCAxNiwgLTcyMjUyMTk3OSk7XG4gICAgYiA9IG1kNWhoKGIsIGMsIGQsIGEsIHhbaSArIDZdLCAyMywgNzYwMjkxODkpO1xuICAgIGEgPSBtZDVoaChhLCBiLCBjLCBkLCB4W2kgKyA5XSwgNCwgLTY0MDM2NDQ4Nyk7XG4gICAgZCA9IG1kNWhoKGQsIGEsIGIsIGMsIHhbaSArIDEyXSwgMTEsIC00MjE4MTU4MzUpO1xuICAgIGMgPSBtZDVoaChjLCBkLCBhLCBiLCB4W2kgKyAxNV0sIDE2LCA1MzA3NDI1MjApO1xuICAgIGIgPSBtZDVoaChiLCBjLCBkLCBhLCB4W2kgKyAyXSwgMjMsIC05OTUzMzg2NTEpO1xuICAgIGEgPSBtZDVpaShhLCBiLCBjLCBkLCB4W2ldLCA2LCAtMTk4NjMwODQ0KTtcbiAgICBkID0gbWQ1aWkoZCwgYSwgYiwgYywgeFtpICsgN10sIDEwLCAxMTI2ODkxNDE1KTtcbiAgICBjID0gbWQ1aWkoYywgZCwgYSwgYiwgeFtpICsgMTRdLCAxNSwgLTE0MTYzNTQ5MDUpO1xuICAgIGIgPSBtZDVpaShiLCBjLCBkLCBhLCB4W2kgKyA1XSwgMjEsIC01NzQzNDA1NSk7XG4gICAgYSA9IG1kNWlpKGEsIGIsIGMsIGQsIHhbaSArIDEyXSwgNiwgMTcwMDQ4NTU3MSk7XG4gICAgZCA9IG1kNWlpKGQsIGEsIGIsIGMsIHhbaSArIDNdLCAxMCwgLTE4OTQ5ODY2MDYpO1xuICAgIGMgPSBtZDVpaShjLCBkLCBhLCBiLCB4W2kgKyAxMF0sIDE1LCAtMTA1MTUyMyk7XG4gICAgYiA9IG1kNWlpKGIsIGMsIGQsIGEsIHhbaSArIDFdLCAyMSwgLTIwNTQ5MjI3OTkpO1xuICAgIGEgPSBtZDVpaShhLCBiLCBjLCBkLCB4W2kgKyA4XSwgNiwgMTg3MzMxMzM1OSk7XG4gICAgZCA9IG1kNWlpKGQsIGEsIGIsIGMsIHhbaSArIDE1XSwgMTAsIC0zMDYxMTc0NCk7XG4gICAgYyA9IG1kNWlpKGMsIGQsIGEsIGIsIHhbaSArIDZdLCAxNSwgLTE1NjAxOTgzODApO1xuICAgIGIgPSBtZDVpaShiLCBjLCBkLCBhLCB4W2kgKyAxM10sIDIxLCAxMzA5MTUxNjQ5KTtcbiAgICBhID0gbWQ1aWkoYSwgYiwgYywgZCwgeFtpICsgNF0sIDYsIC0xNDU1MjMwNzApO1xuICAgIGQgPSBtZDVpaShkLCBhLCBiLCBjLCB4W2kgKyAxMV0sIDEwLCAtMTEyMDIxMDM3OSk7XG4gICAgYyA9IG1kNWlpKGMsIGQsIGEsIGIsIHhbaSArIDJdLCAxNSwgNzE4Nzg3MjU5KTtcbiAgICBiID0gbWQ1aWkoYiwgYywgZCwgYSwgeFtpICsgOV0sIDIxLCAtMzQzNDg1NTUxKTtcbiAgICBhID0gc2FmZUFkZChhLCBvbGRhKTtcbiAgICBiID0gc2FmZUFkZChiLCBvbGRiKTtcbiAgICBjID0gc2FmZUFkZChjLCBvbGRjKTtcbiAgICBkID0gc2FmZUFkZChkLCBvbGRkKTtcbiAgfVxuXG4gIHJldHVybiBbYSwgYiwgYywgZF07XG59XG4vKlxuICogQ29udmVydCBhbiBhcnJheSBieXRlcyB0byBhbiBhcnJheSBvZiBsaXR0bGUtZW5kaWFuIHdvcmRzXG4gKiBDaGFyYWN0ZXJzID4yNTUgaGF2ZSB0aGVpciBoaWdoLWJ5dGUgc2lsZW50bHkgaWdub3JlZC5cbiAqL1xuXG5cbmZ1bmN0aW9uIGJ5dGVzVG9Xb3JkcyhpbnB1dCkge1xuICBpZiAoaW5wdXQubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIFtdO1xuICB9XG5cbiAgdmFyIGxlbmd0aDggPSBpbnB1dC5sZW5ndGggKiA4O1xuICB2YXIgb3V0cHV0ID0gbmV3IFVpbnQzMkFycmF5KGdldE91dHB1dExlbmd0aChsZW5ndGg4KSk7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg4OyBpICs9IDgpIHtcbiAgICBvdXRwdXRbaSA+PiA1XSB8PSAoaW5wdXRbaSAvIDhdICYgMHhmZikgPDwgaSAlIDMyO1xuICB9XG5cbiAgcmV0dXJuIG91dHB1dDtcbn1cbi8qXG4gKiBBZGQgaW50ZWdlcnMsIHdyYXBwaW5nIGF0IDJeMzIuIFRoaXMgdXNlcyAxNi1iaXQgb3BlcmF0aW9ucyBpbnRlcm5hbGx5XG4gKiB0byB3b3JrIGFyb3VuZCBidWdzIGluIHNvbWUgSlMgaW50ZXJwcmV0ZXJzLlxuICovXG5cblxuZnVuY3Rpb24gc2FmZUFkZCh4LCB5KSB7XG4gIHZhciBsc3cgPSAoeCAmIDB4ZmZmZikgKyAoeSAmIDB4ZmZmZik7XG4gIHZhciBtc3cgPSAoeCA+PiAxNikgKyAoeSA+PiAxNikgKyAobHN3ID4+IDE2KTtcbiAgcmV0dXJuIG1zdyA8PCAxNiB8IGxzdyAmIDB4ZmZmZjtcbn1cbi8qXG4gKiBCaXR3aXNlIHJvdGF0ZSBhIDMyLWJpdCBudW1iZXIgdG8gdGhlIGxlZnQuXG4gKi9cblxuXG5mdW5jdGlvbiBiaXRSb3RhdGVMZWZ0KG51bSwgY250KSB7XG4gIHJldHVybiBudW0gPDwgY250IHwgbnVtID4+PiAzMiAtIGNudDtcbn1cbi8qXG4gKiBUaGVzZSBmdW5jdGlvbnMgaW1wbGVtZW50IHRoZSBmb3VyIGJhc2ljIG9wZXJhdGlvbnMgdGhlIGFsZ29yaXRobSB1c2VzLlxuICovXG5cblxuZnVuY3Rpb24gbWQ1Y21uKHEsIGEsIGIsIHgsIHMsIHQpIHtcbiAgcmV0dXJuIHNhZmVBZGQoYml0Um90YXRlTGVmdChzYWZlQWRkKHNhZmVBZGQoYSwgcSksIHNhZmVBZGQoeCwgdCkpLCBzKSwgYik7XG59XG5cbmZ1bmN0aW9uIG1kNWZmKGEsIGIsIGMsIGQsIHgsIHMsIHQpIHtcbiAgcmV0dXJuIG1kNWNtbihiICYgYyB8IH5iICYgZCwgYSwgYiwgeCwgcywgdCk7XG59XG5cbmZ1bmN0aW9uIG1kNWdnKGEsIGIsIGMsIGQsIHgsIHMsIHQpIHtcbiAgcmV0dXJuIG1kNWNtbihiICYgZCB8IGMgJiB+ZCwgYSwgYiwgeCwgcywgdCk7XG59XG5cbmZ1bmN0aW9uIG1kNWhoKGEsIGIsIGMsIGQsIHgsIHMsIHQpIHtcbiAgcmV0dXJuIG1kNWNtbihiIF4gYyBeIGQsIGEsIGIsIHgsIHMsIHQpO1xufVxuXG5mdW5jdGlvbiBtZDVpaShhLCBiLCBjLCBkLCB4LCBzLCB0KSB7XG4gIHJldHVybiBtZDVjbW4oYyBeIChiIHwgfmQpLCBhLCBiLCB4LCBzLCB0KTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgbWQ1OyIsImV4cG9ydCBkZWZhdWx0ICcwMDAwMDAwMC0wMDAwLTAwMDAtMDAwMC0wMDAwMDAwMDAwMDAnOyIsImltcG9ydCB2YWxpZGF0ZSBmcm9tICcuL3ZhbGlkYXRlLmpzJztcblxuZnVuY3Rpb24gcGFyc2UodXVpZCkge1xuICBpZiAoIXZhbGlkYXRlKHV1aWQpKSB7XG4gICAgdGhyb3cgVHlwZUVycm9yKCdJbnZhbGlkIFVVSUQnKTtcbiAgfVxuXG4gIHZhciB2O1xuICB2YXIgYXJyID0gbmV3IFVpbnQ4QXJyYXkoMTYpOyAvLyBQYXJzZSAjIyMjIyMjIy0uLi4uLS4uLi4tLi4uLi0uLi4uLi4uLi4uLi5cblxuICBhcnJbMF0gPSAodiA9IHBhcnNlSW50KHV1aWQuc2xpY2UoMCwgOCksIDE2KSkgPj4+IDI0O1xuICBhcnJbMV0gPSB2ID4+PiAxNiAmIDB4ZmY7XG4gIGFyclsyXSA9IHYgPj4+IDggJiAweGZmO1xuICBhcnJbM10gPSB2ICYgMHhmZjsgLy8gUGFyc2UgLi4uLi4uLi4tIyMjIy0uLi4uLS4uLi4tLi4uLi4uLi4uLi4uXG5cbiAgYXJyWzRdID0gKHYgPSBwYXJzZUludCh1dWlkLnNsaWNlKDksIDEzKSwgMTYpKSA+Pj4gODtcbiAgYXJyWzVdID0gdiAmIDB4ZmY7IC8vIFBhcnNlIC4uLi4uLi4uLS4uLi4tIyMjIy0uLi4uLS4uLi4uLi4uLi4uLlxuXG4gIGFycls2XSA9ICh2ID0gcGFyc2VJbnQodXVpZC5zbGljZSgxNCwgMTgpLCAxNikpID4+PiA4O1xuICBhcnJbN10gPSB2ICYgMHhmZjsgLy8gUGFyc2UgLi4uLi4uLi4tLi4uLi0uLi4uLSMjIyMtLi4uLi4uLi4uLi4uXG5cbiAgYXJyWzhdID0gKHYgPSBwYXJzZUludCh1dWlkLnNsaWNlKDE5LCAyMyksIDE2KSkgPj4+IDg7XG4gIGFycls5XSA9IHYgJiAweGZmOyAvLyBQYXJzZSAuLi4uLi4uLi0uLi4uLS4uLi4tLi4uLi0jIyMjIyMjIyMjIyNcbiAgLy8gKFVzZSBcIi9cIiB0byBhdm9pZCAzMi1iaXQgdHJ1bmNhdGlvbiB3aGVuIGJpdC1zaGlmdGluZyBoaWdoLW9yZGVyIGJ5dGVzKVxuXG4gIGFyclsxMF0gPSAodiA9IHBhcnNlSW50KHV1aWQuc2xpY2UoMjQsIDM2KSwgMTYpKSAvIDB4MTAwMDAwMDAwMDAgJiAweGZmO1xuICBhcnJbMTFdID0gdiAvIDB4MTAwMDAwMDAwICYgMHhmZjtcbiAgYXJyWzEyXSA9IHYgPj4+IDI0ICYgMHhmZjtcbiAgYXJyWzEzXSA9IHYgPj4+IDE2ICYgMHhmZjtcbiAgYXJyWzE0XSA9IHYgPj4+IDggJiAweGZmO1xuICBhcnJbMTVdID0gdiAmIDB4ZmY7XG4gIHJldHVybiBhcnI7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHBhcnNlOyIsImV4cG9ydCBkZWZhdWx0IC9eKD86WzAtOWEtZl17OH0tWzAtOWEtZl17NH0tWzEtNV1bMC05YS1mXXszfS1bODlhYl1bMC05YS1mXXszfS1bMC05YS1mXXsxMn18MDAwMDAwMDAtMDAwMC0wMDAwLTAwMDAtMDAwMDAwMDAwMDAwKSQvaTsiLCIvLyBVbmlxdWUgSUQgY3JlYXRpb24gcmVxdWlyZXMgYSBoaWdoIHF1YWxpdHkgcmFuZG9tICMgZ2VuZXJhdG9yLiBJbiB0aGUgYnJvd3NlciB3ZSB0aGVyZWZvcmVcbi8vIHJlcXVpcmUgdGhlIGNyeXB0byBBUEkgYW5kIGRvIG5vdCBzdXBwb3J0IGJ1aWx0LWluIGZhbGxiYWNrIHRvIGxvd2VyIHF1YWxpdHkgcmFuZG9tIG51bWJlclxuLy8gZ2VuZXJhdG9ycyAobGlrZSBNYXRoLnJhbmRvbSgpKS5cbi8vIGdldFJhbmRvbVZhbHVlcyBuZWVkcyB0byBiZSBpbnZva2VkIGluIGEgY29udGV4dCB3aGVyZSBcInRoaXNcIiBpcyBhIENyeXB0byBpbXBsZW1lbnRhdGlvbi4gQWxzbyxcbi8vIGZpbmQgdGhlIGNvbXBsZXRlIGltcGxlbWVudGF0aW9uIG9mIGNyeXB0byAobXNDcnlwdG8pIG9uIElFMTEuXG52YXIgZ2V0UmFuZG9tVmFsdWVzID0gdHlwZW9mIGNyeXB0byAhPT0gJ3VuZGVmaW5lZCcgJiYgY3J5cHRvLmdldFJhbmRvbVZhbHVlcyAmJiBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzLmJpbmQoY3J5cHRvKSB8fCB0eXBlb2YgbXNDcnlwdG8gIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBtc0NyeXB0by5nZXRSYW5kb21WYWx1ZXMgPT09ICdmdW5jdGlvbicgJiYgbXNDcnlwdG8uZ2V0UmFuZG9tVmFsdWVzLmJpbmQobXNDcnlwdG8pO1xudmFyIHJuZHM4ID0gbmV3IFVpbnQ4QXJyYXkoMTYpO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcm5nKCkge1xuICBpZiAoIWdldFJhbmRvbVZhbHVlcykge1xuICAgIHRocm93IG5ldyBFcnJvcignY3J5cHRvLmdldFJhbmRvbVZhbHVlcygpIG5vdCBzdXBwb3J0ZWQuIFNlZSBodHRwczovL2dpdGh1Yi5jb20vdXVpZGpzL3V1aWQjZ2V0cmFuZG9tdmFsdWVzLW5vdC1zdXBwb3J0ZWQnKTtcbiAgfVxuXG4gIHJldHVybiBnZXRSYW5kb21WYWx1ZXMocm5kczgpO1xufSIsIi8vIEFkYXB0ZWQgZnJvbSBDaHJpcyBWZW5lc3MnIFNIQTEgY29kZSBhdFxuLy8gaHR0cDovL3d3dy5tb3ZhYmxlLXR5cGUuY28udWsvc2NyaXB0cy9zaGExLmh0bWxcbmZ1bmN0aW9uIGYocywgeCwgeSwgeikge1xuICBzd2l0Y2ggKHMpIHtcbiAgICBjYXNlIDA6XG4gICAgICByZXR1cm4geCAmIHkgXiB+eCAmIHo7XG5cbiAgICBjYXNlIDE6XG4gICAgICByZXR1cm4geCBeIHkgXiB6O1xuXG4gICAgY2FzZSAyOlxuICAgICAgcmV0dXJuIHggJiB5IF4geCAmIHogXiB5ICYgejtcblxuICAgIGNhc2UgMzpcbiAgICAgIHJldHVybiB4IF4geSBeIHo7XG4gIH1cbn1cblxuZnVuY3Rpb24gUk9UTCh4LCBuKSB7XG4gIHJldHVybiB4IDw8IG4gfCB4ID4+PiAzMiAtIG47XG59XG5cbmZ1bmN0aW9uIHNoYTEoYnl0ZXMpIHtcbiAgdmFyIEsgPSBbMHg1YTgyNzk5OSwgMHg2ZWQ5ZWJhMSwgMHg4ZjFiYmNkYywgMHhjYTYyYzFkNl07XG4gIHZhciBIID0gWzB4Njc0NTIzMDEsIDB4ZWZjZGFiODksIDB4OThiYWRjZmUsIDB4MTAzMjU0NzYsIDB4YzNkMmUxZjBdO1xuXG4gIGlmICh0eXBlb2YgYnl0ZXMgPT09ICdzdHJpbmcnKSB7XG4gICAgdmFyIG1zZyA9IHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChieXRlcykpOyAvLyBVVEY4IGVzY2FwZVxuXG4gICAgYnl0ZXMgPSBbXTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbXNnLmxlbmd0aDsgKytpKSB7XG4gICAgICBieXRlcy5wdXNoKG1zZy5jaGFyQ29kZUF0KGkpKTtcbiAgICB9XG4gIH0gZWxzZSBpZiAoIUFycmF5LmlzQXJyYXkoYnl0ZXMpKSB7XG4gICAgLy8gQ29udmVydCBBcnJheS1saWtlIHRvIEFycmF5XG4gICAgYnl0ZXMgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChieXRlcyk7XG4gIH1cblxuICBieXRlcy5wdXNoKDB4ODApO1xuICB2YXIgbCA9IGJ5dGVzLmxlbmd0aCAvIDQgKyAyO1xuICB2YXIgTiA9IE1hdGguY2VpbChsIC8gMTYpO1xuICB2YXIgTSA9IG5ldyBBcnJheShOKTtcblxuICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgTjsgKytfaSkge1xuICAgIHZhciBhcnIgPSBuZXcgVWludDMyQXJyYXkoMTYpO1xuXG4gICAgZm9yICh2YXIgaiA9IDA7IGogPCAxNjsgKytqKSB7XG4gICAgICBhcnJbal0gPSBieXRlc1tfaSAqIDY0ICsgaiAqIDRdIDw8IDI0IHwgYnl0ZXNbX2kgKiA2NCArIGogKiA0ICsgMV0gPDwgMTYgfCBieXRlc1tfaSAqIDY0ICsgaiAqIDQgKyAyXSA8PCA4IHwgYnl0ZXNbX2kgKiA2NCArIGogKiA0ICsgM107XG4gICAgfVxuXG4gICAgTVtfaV0gPSBhcnI7XG4gIH1cblxuICBNW04gLSAxXVsxNF0gPSAoYnl0ZXMubGVuZ3RoIC0gMSkgKiA4IC8gTWF0aC5wb3coMiwgMzIpO1xuICBNW04gLSAxXVsxNF0gPSBNYXRoLmZsb29yKE1bTiAtIDFdWzE0XSk7XG4gIE1bTiAtIDFdWzE1XSA9IChieXRlcy5sZW5ndGggLSAxKSAqIDggJiAweGZmZmZmZmZmO1xuXG4gIGZvciAodmFyIF9pMiA9IDA7IF9pMiA8IE47ICsrX2kyKSB7XG4gICAgdmFyIFcgPSBuZXcgVWludDMyQXJyYXkoODApO1xuXG4gICAgZm9yICh2YXIgdCA9IDA7IHQgPCAxNjsgKyt0KSB7XG4gICAgICBXW3RdID0gTVtfaTJdW3RdO1xuICAgIH1cblxuICAgIGZvciAodmFyIF90ID0gMTY7IF90IDwgODA7ICsrX3QpIHtcbiAgICAgIFdbX3RdID0gUk9UTChXW190IC0gM10gXiBXW190IC0gOF0gXiBXW190IC0gMTRdIF4gV1tfdCAtIDE2XSwgMSk7XG4gICAgfVxuXG4gICAgdmFyIGEgPSBIWzBdO1xuICAgIHZhciBiID0gSFsxXTtcbiAgICB2YXIgYyA9IEhbMl07XG4gICAgdmFyIGQgPSBIWzNdO1xuICAgIHZhciBlID0gSFs0XTtcblxuICAgIGZvciAodmFyIF90MiA9IDA7IF90MiA8IDgwOyArK190Mikge1xuICAgICAgdmFyIHMgPSBNYXRoLmZsb29yKF90MiAvIDIwKTtcbiAgICAgIHZhciBUID0gUk9UTChhLCA1KSArIGYocywgYiwgYywgZCkgKyBlICsgS1tzXSArIFdbX3QyXSA+Pj4gMDtcbiAgICAgIGUgPSBkO1xuICAgICAgZCA9IGM7XG4gICAgICBjID0gUk9UTChiLCAzMCkgPj4+IDA7XG4gICAgICBiID0gYTtcbiAgICAgIGEgPSBUO1xuICAgIH1cblxuICAgIEhbMF0gPSBIWzBdICsgYSA+Pj4gMDtcbiAgICBIWzFdID0gSFsxXSArIGIgPj4+IDA7XG4gICAgSFsyXSA9IEhbMl0gKyBjID4+PiAwO1xuICAgIEhbM10gPSBIWzNdICsgZCA+Pj4gMDtcbiAgICBIWzRdID0gSFs0XSArIGUgPj4+IDA7XG4gIH1cblxuICByZXR1cm4gW0hbMF0gPj4gMjQgJiAweGZmLCBIWzBdID4+IDE2ICYgMHhmZiwgSFswXSA+PiA4ICYgMHhmZiwgSFswXSAmIDB4ZmYsIEhbMV0gPj4gMjQgJiAweGZmLCBIWzFdID4+IDE2ICYgMHhmZiwgSFsxXSA+PiA4ICYgMHhmZiwgSFsxXSAmIDB4ZmYsIEhbMl0gPj4gMjQgJiAweGZmLCBIWzJdID4+IDE2ICYgMHhmZiwgSFsyXSA+PiA4ICYgMHhmZiwgSFsyXSAmIDB4ZmYsIEhbM10gPj4gMjQgJiAweGZmLCBIWzNdID4+IDE2ICYgMHhmZiwgSFszXSA+PiA4ICYgMHhmZiwgSFszXSAmIDB4ZmYsIEhbNF0gPj4gMjQgJiAweGZmLCBIWzRdID4+IDE2ICYgMHhmZiwgSFs0XSA+PiA4ICYgMHhmZiwgSFs0XSAmIDB4ZmZdO1xufVxuXG5leHBvcnQgZGVmYXVsdCBzaGExOyIsImltcG9ydCB2YWxpZGF0ZSBmcm9tICcuL3ZhbGlkYXRlLmpzJztcbi8qKlxuICogQ29udmVydCBhcnJheSBvZiAxNiBieXRlIHZhbHVlcyB0byBVVUlEIHN0cmluZyBmb3JtYXQgb2YgdGhlIGZvcm06XG4gKiBYWFhYWFhYWC1YWFhYLVhYWFgtWFhYWC1YWFhYWFhYWFhYWFhcbiAqL1xuXG52YXIgYnl0ZVRvSGV4ID0gW107XG5cbmZvciAodmFyIGkgPSAwOyBpIDwgMjU2OyArK2kpIHtcbiAgYnl0ZVRvSGV4LnB1c2goKGkgKyAweDEwMCkudG9TdHJpbmcoMTYpLnN1YnN0cigxKSk7XG59XG5cbmZ1bmN0aW9uIHN0cmluZ2lmeShhcnIpIHtcbiAgdmFyIG9mZnNldCA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDogMDtcbiAgLy8gTm90ZTogQmUgY2FyZWZ1bCBlZGl0aW5nIHRoaXMgY29kZSEgIEl0J3MgYmVlbiB0dW5lZCBmb3IgcGVyZm9ybWFuY2VcbiAgLy8gYW5kIHdvcmtzIGluIHdheXMgeW91IG1heSBub3QgZXhwZWN0LiBTZWUgaHR0cHM6Ly9naXRodWIuY29tL3V1aWRqcy91dWlkL3B1bGwvNDM0XG4gIHZhciB1dWlkID0gKGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMF1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAxXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDJdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgM11dICsgJy0nICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyA0XV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDVdXSArICctJyArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgNl1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyA3XV0gKyAnLScgKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDhdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgOV1dICsgJy0nICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAxMF1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAxMV1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAxMl1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAxM11dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAxNF1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAxNV1dKS50b0xvd2VyQ2FzZSgpOyAvLyBDb25zaXN0ZW5jeSBjaGVjayBmb3IgdmFsaWQgVVVJRC4gIElmIHRoaXMgdGhyb3dzLCBpdCdzIGxpa2VseSBkdWUgdG8gb25lXG4gIC8vIG9mIHRoZSBmb2xsb3dpbmc6XG4gIC8vIC0gT25lIG9yIG1vcmUgaW5wdXQgYXJyYXkgdmFsdWVzIGRvbid0IG1hcCB0byBhIGhleCBvY3RldCAobGVhZGluZyB0b1xuICAvLyBcInVuZGVmaW5lZFwiIGluIHRoZSB1dWlkKVxuICAvLyAtIEludmFsaWQgaW5wdXQgdmFsdWVzIGZvciB0aGUgUkZDIGB2ZXJzaW9uYCBvciBgdmFyaWFudGAgZmllbGRzXG5cbiAgaWYgKCF2YWxpZGF0ZSh1dWlkKSkge1xuICAgIHRocm93IFR5cGVFcnJvcignU3RyaW5naWZpZWQgVVVJRCBpcyBpbnZhbGlkJyk7XG4gIH1cblxuICByZXR1cm4gdXVpZDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgc3RyaW5naWZ5OyIsImltcG9ydCBybmcgZnJvbSAnLi9ybmcuanMnO1xuaW1wb3J0IHN0cmluZ2lmeSBmcm9tICcuL3N0cmluZ2lmeS5qcyc7IC8vICoqYHYxKClgIC0gR2VuZXJhdGUgdGltZS1iYXNlZCBVVUlEKipcbi8vXG4vLyBJbnNwaXJlZCBieSBodHRwczovL2dpdGh1Yi5jb20vTGlvc0svVVVJRC5qc1xuLy8gYW5kIGh0dHA6Ly9kb2NzLnB5dGhvbi5vcmcvbGlicmFyeS91dWlkLmh0bWxcblxudmFyIF9ub2RlSWQ7XG5cbnZhciBfY2xvY2tzZXE7IC8vIFByZXZpb3VzIHV1aWQgY3JlYXRpb24gdGltZVxuXG5cbnZhciBfbGFzdE1TZWNzID0gMDtcbnZhciBfbGFzdE5TZWNzID0gMDsgLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS91dWlkanMvdXVpZCBmb3IgQVBJIGRldGFpbHNcblxuZnVuY3Rpb24gdjEob3B0aW9ucywgYnVmLCBvZmZzZXQpIHtcbiAgdmFyIGkgPSBidWYgJiYgb2Zmc2V0IHx8IDA7XG4gIHZhciBiID0gYnVmIHx8IG5ldyBBcnJheSgxNik7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICB2YXIgbm9kZSA9IG9wdGlvbnMubm9kZSB8fCBfbm9kZUlkO1xuICB2YXIgY2xvY2tzZXEgPSBvcHRpb25zLmNsb2Nrc2VxICE9PSB1bmRlZmluZWQgPyBvcHRpb25zLmNsb2Nrc2VxIDogX2Nsb2Nrc2VxOyAvLyBub2RlIGFuZCBjbG9ja3NlcSBuZWVkIHRvIGJlIGluaXRpYWxpemVkIHRvIHJhbmRvbSB2YWx1ZXMgaWYgdGhleSdyZSBub3RcbiAgLy8gc3BlY2lmaWVkLiAgV2UgZG8gdGhpcyBsYXppbHkgdG8gbWluaW1pemUgaXNzdWVzIHJlbGF0ZWQgdG8gaW5zdWZmaWNpZW50XG4gIC8vIHN5c3RlbSBlbnRyb3B5LiAgU2VlICMxODlcblxuICBpZiAobm9kZSA9PSBudWxsIHx8IGNsb2Nrc2VxID09IG51bGwpIHtcbiAgICB2YXIgc2VlZEJ5dGVzID0gb3B0aW9ucy5yYW5kb20gfHwgKG9wdGlvbnMucm5nIHx8IHJuZykoKTtcblxuICAgIGlmIChub2RlID09IG51bGwpIHtcbiAgICAgIC8vIFBlciA0LjUsIGNyZWF0ZSBhbmQgNDgtYml0IG5vZGUgaWQsICg0NyByYW5kb20gYml0cyArIG11bHRpY2FzdCBiaXQgPSAxKVxuICAgICAgbm9kZSA9IF9ub2RlSWQgPSBbc2VlZEJ5dGVzWzBdIHwgMHgwMSwgc2VlZEJ5dGVzWzFdLCBzZWVkQnl0ZXNbMl0sIHNlZWRCeXRlc1szXSwgc2VlZEJ5dGVzWzRdLCBzZWVkQnl0ZXNbNV1dO1xuICAgIH1cblxuICAgIGlmIChjbG9ja3NlcSA9PSBudWxsKSB7XG4gICAgICAvLyBQZXIgNC4yLjIsIHJhbmRvbWl6ZSAoMTQgYml0KSBjbG9ja3NlcVxuICAgICAgY2xvY2tzZXEgPSBfY2xvY2tzZXEgPSAoc2VlZEJ5dGVzWzZdIDw8IDggfCBzZWVkQnl0ZXNbN10pICYgMHgzZmZmO1xuICAgIH1cbiAgfSAvLyBVVUlEIHRpbWVzdGFtcHMgYXJlIDEwMCBuYW5vLXNlY29uZCB1bml0cyBzaW5jZSB0aGUgR3JlZ29yaWFuIGVwb2NoLFxuICAvLyAoMTU4Mi0xMC0xNSAwMDowMCkuICBKU051bWJlcnMgYXJlbid0IHByZWNpc2UgZW5vdWdoIGZvciB0aGlzLCBzb1xuICAvLyB0aW1lIGlzIGhhbmRsZWQgaW50ZXJuYWxseSBhcyAnbXNlY3MnIChpbnRlZ2VyIG1pbGxpc2Vjb25kcykgYW5kICduc2VjcydcbiAgLy8gKDEwMC1uYW5vc2Vjb25kcyBvZmZzZXQgZnJvbSBtc2Vjcykgc2luY2UgdW5peCBlcG9jaCwgMTk3MC0wMS0wMSAwMDowMC5cblxuXG4gIHZhciBtc2VjcyA9IG9wdGlvbnMubXNlY3MgIT09IHVuZGVmaW5lZCA/IG9wdGlvbnMubXNlY3MgOiBEYXRlLm5vdygpOyAvLyBQZXIgNC4yLjEuMiwgdXNlIGNvdW50IG9mIHV1aWQncyBnZW5lcmF0ZWQgZHVyaW5nIHRoZSBjdXJyZW50IGNsb2NrXG4gIC8vIGN5Y2xlIHRvIHNpbXVsYXRlIGhpZ2hlciByZXNvbHV0aW9uIGNsb2NrXG5cbiAgdmFyIG5zZWNzID0gb3B0aW9ucy5uc2VjcyAhPT0gdW5kZWZpbmVkID8gb3B0aW9ucy5uc2VjcyA6IF9sYXN0TlNlY3MgKyAxOyAvLyBUaW1lIHNpbmNlIGxhc3QgdXVpZCBjcmVhdGlvbiAoaW4gbXNlY3MpXG5cbiAgdmFyIGR0ID0gbXNlY3MgLSBfbGFzdE1TZWNzICsgKG5zZWNzIC0gX2xhc3ROU2VjcykgLyAxMDAwMDsgLy8gUGVyIDQuMi4xLjIsIEJ1bXAgY2xvY2tzZXEgb24gY2xvY2sgcmVncmVzc2lvblxuXG4gIGlmIChkdCA8IDAgJiYgb3B0aW9ucy5jbG9ja3NlcSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgY2xvY2tzZXEgPSBjbG9ja3NlcSArIDEgJiAweDNmZmY7XG4gIH0gLy8gUmVzZXQgbnNlY3MgaWYgY2xvY2sgcmVncmVzc2VzIChuZXcgY2xvY2tzZXEpIG9yIHdlJ3ZlIG1vdmVkIG9udG8gYSBuZXdcbiAgLy8gdGltZSBpbnRlcnZhbFxuXG5cbiAgaWYgKChkdCA8IDAgfHwgbXNlY3MgPiBfbGFzdE1TZWNzKSAmJiBvcHRpb25zLm5zZWNzID09PSB1bmRlZmluZWQpIHtcbiAgICBuc2VjcyA9IDA7XG4gIH0gLy8gUGVyIDQuMi4xLjIgVGhyb3cgZXJyb3IgaWYgdG9vIG1hbnkgdXVpZHMgYXJlIHJlcXVlc3RlZFxuXG5cbiAgaWYgKG5zZWNzID49IDEwMDAwKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwidXVpZC52MSgpOiBDYW4ndCBjcmVhdGUgbW9yZSB0aGFuIDEwTSB1dWlkcy9zZWNcIik7XG4gIH1cblxuICBfbGFzdE1TZWNzID0gbXNlY3M7XG4gIF9sYXN0TlNlY3MgPSBuc2VjcztcbiAgX2Nsb2Nrc2VxID0gY2xvY2tzZXE7IC8vIFBlciA0LjEuNCAtIENvbnZlcnQgZnJvbSB1bml4IGVwb2NoIHRvIEdyZWdvcmlhbiBlcG9jaFxuXG4gIG1zZWNzICs9IDEyMjE5MjkyODAwMDAwOyAvLyBgdGltZV9sb3dgXG5cbiAgdmFyIHRsID0gKChtc2VjcyAmIDB4ZmZmZmZmZikgKiAxMDAwMCArIG5zZWNzKSAlIDB4MTAwMDAwMDAwO1xuICBiW2krK10gPSB0bCA+Pj4gMjQgJiAweGZmO1xuICBiW2krK10gPSB0bCA+Pj4gMTYgJiAweGZmO1xuICBiW2krK10gPSB0bCA+Pj4gOCAmIDB4ZmY7XG4gIGJbaSsrXSA9IHRsICYgMHhmZjsgLy8gYHRpbWVfbWlkYFxuXG4gIHZhciB0bWggPSBtc2VjcyAvIDB4MTAwMDAwMDAwICogMTAwMDAgJiAweGZmZmZmZmY7XG4gIGJbaSsrXSA9IHRtaCA+Pj4gOCAmIDB4ZmY7XG4gIGJbaSsrXSA9IHRtaCAmIDB4ZmY7IC8vIGB0aW1lX2hpZ2hfYW5kX3ZlcnNpb25gXG5cbiAgYltpKytdID0gdG1oID4+PiAyNCAmIDB4ZiB8IDB4MTA7IC8vIGluY2x1ZGUgdmVyc2lvblxuXG4gIGJbaSsrXSA9IHRtaCA+Pj4gMTYgJiAweGZmOyAvLyBgY2xvY2tfc2VxX2hpX2FuZF9yZXNlcnZlZGAgKFBlciA0LjIuMiAtIGluY2x1ZGUgdmFyaWFudClcblxuICBiW2krK10gPSBjbG9ja3NlcSA+Pj4gOCB8IDB4ODA7IC8vIGBjbG9ja19zZXFfbG93YFxuXG4gIGJbaSsrXSA9IGNsb2Nrc2VxICYgMHhmZjsgLy8gYG5vZGVgXG5cbiAgZm9yICh2YXIgbiA9IDA7IG4gPCA2OyArK24pIHtcbiAgICBiW2kgKyBuXSA9IG5vZGVbbl07XG4gIH1cblxuICByZXR1cm4gYnVmIHx8IHN0cmluZ2lmeShiKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgdjE7IiwiaW1wb3J0IHYzNSBmcm9tICcuL3YzNS5qcyc7XG5pbXBvcnQgbWQ1IGZyb20gJy4vbWQ1LmpzJztcbnZhciB2MyA9IHYzNSgndjMnLCAweDMwLCBtZDUpO1xuZXhwb3J0IGRlZmF1bHQgdjM7IiwiaW1wb3J0IHN0cmluZ2lmeSBmcm9tICcuL3N0cmluZ2lmeS5qcyc7XG5pbXBvcnQgcGFyc2UgZnJvbSAnLi9wYXJzZS5qcyc7XG5cbmZ1bmN0aW9uIHN0cmluZ1RvQnl0ZXMoc3RyKSB7XG4gIHN0ciA9IHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChzdHIpKTsgLy8gVVRGOCBlc2NhcGVcblxuICB2YXIgYnl0ZXMgPSBbXTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0ci5sZW5ndGg7ICsraSkge1xuICAgIGJ5dGVzLnB1c2goc3RyLmNoYXJDb2RlQXQoaSkpO1xuICB9XG5cbiAgcmV0dXJuIGJ5dGVzO1xufVxuXG5leHBvcnQgdmFyIEROUyA9ICc2YmE3YjgxMC05ZGFkLTExZDEtODBiNC0wMGMwNGZkNDMwYzgnO1xuZXhwb3J0IHZhciBVUkwgPSAnNmJhN2I4MTEtOWRhZC0xMWQxLTgwYjQtMDBjMDRmZDQzMGM4JztcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChuYW1lLCB2ZXJzaW9uLCBoYXNoZnVuYykge1xuICBmdW5jdGlvbiBnZW5lcmF0ZVVVSUQodmFsdWUsIG5hbWVzcGFjZSwgYnVmLCBvZmZzZXQpIHtcbiAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuICAgICAgdmFsdWUgPSBzdHJpbmdUb0J5dGVzKHZhbHVlKTtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIG5hbWVzcGFjZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIG5hbWVzcGFjZSA9IHBhcnNlKG5hbWVzcGFjZSk7XG4gICAgfVxuXG4gICAgaWYgKG5hbWVzcGFjZS5sZW5ndGggIT09IDE2KSB7XG4gICAgICB0aHJvdyBUeXBlRXJyb3IoJ05hbWVzcGFjZSBtdXN0IGJlIGFycmF5LWxpa2UgKDE2IGl0ZXJhYmxlIGludGVnZXIgdmFsdWVzLCAwLTI1NSknKTtcbiAgICB9IC8vIENvbXB1dGUgaGFzaCBvZiBuYW1lc3BhY2UgYW5kIHZhbHVlLCBQZXIgNC4zXG4gICAgLy8gRnV0dXJlOiBVc2Ugc3ByZWFkIHN5bnRheCB3aGVuIHN1cHBvcnRlZCBvbiBhbGwgcGxhdGZvcm1zLCBlLmcuIGBieXRlcyA9XG4gICAgLy8gaGFzaGZ1bmMoWy4uLm5hbWVzcGFjZSwgLi4uIHZhbHVlXSlgXG5cblxuICAgIHZhciBieXRlcyA9IG5ldyBVaW50OEFycmF5KDE2ICsgdmFsdWUubGVuZ3RoKTtcbiAgICBieXRlcy5zZXQobmFtZXNwYWNlKTtcbiAgICBieXRlcy5zZXQodmFsdWUsIG5hbWVzcGFjZS5sZW5ndGgpO1xuICAgIGJ5dGVzID0gaGFzaGZ1bmMoYnl0ZXMpO1xuICAgIGJ5dGVzWzZdID0gYnl0ZXNbNl0gJiAweDBmIHwgdmVyc2lvbjtcbiAgICBieXRlc1s4XSA9IGJ5dGVzWzhdICYgMHgzZiB8IDB4ODA7XG5cbiAgICBpZiAoYnVmKSB7XG4gICAgICBvZmZzZXQgPSBvZmZzZXQgfHwgMDtcblxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCAxNjsgKytpKSB7XG4gICAgICAgIGJ1ZltvZmZzZXQgKyBpXSA9IGJ5dGVzW2ldO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gYnVmO1xuICAgIH1cblxuICAgIHJldHVybiBzdHJpbmdpZnkoYnl0ZXMpO1xuICB9IC8vIEZ1bmN0aW9uI25hbWUgaXMgbm90IHNldHRhYmxlIG9uIHNvbWUgcGxhdGZvcm1zICgjMjcwKVxuXG5cbiAgdHJ5IHtcbiAgICBnZW5lcmF0ZVVVSUQubmFtZSA9IG5hbWU7IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1lbXB0eVxuICB9IGNhdGNoIChlcnIpIHt9IC8vIEZvciBDb21tb25KUyBkZWZhdWx0IGV4cG9ydCBzdXBwb3J0XG5cblxuICBnZW5lcmF0ZVVVSUQuRE5TID0gRE5TO1xuICBnZW5lcmF0ZVVVSUQuVVJMID0gVVJMO1xuICByZXR1cm4gZ2VuZXJhdGVVVUlEO1xufSIsImltcG9ydCBybmcgZnJvbSAnLi9ybmcuanMnO1xuaW1wb3J0IHN0cmluZ2lmeSBmcm9tICcuL3N0cmluZ2lmeS5qcyc7XG5cbmZ1bmN0aW9uIHY0KG9wdGlvbnMsIGJ1Ziwgb2Zmc2V0KSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICB2YXIgcm5kcyA9IG9wdGlvbnMucmFuZG9tIHx8IChvcHRpb25zLnJuZyB8fCBybmcpKCk7IC8vIFBlciA0LjQsIHNldCBiaXRzIGZvciB2ZXJzaW9uIGFuZCBgY2xvY2tfc2VxX2hpX2FuZF9yZXNlcnZlZGBcblxuICBybmRzWzZdID0gcm5kc1s2XSAmIDB4MGYgfCAweDQwO1xuICBybmRzWzhdID0gcm5kc1s4XSAmIDB4M2YgfCAweDgwOyAvLyBDb3B5IGJ5dGVzIHRvIGJ1ZmZlciwgaWYgcHJvdmlkZWRcblxuICBpZiAoYnVmKSB7XG4gICAgb2Zmc2V0ID0gb2Zmc2V0IHx8IDA7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IDE2OyArK2kpIHtcbiAgICAgIGJ1ZltvZmZzZXQgKyBpXSA9IHJuZHNbaV07XG4gICAgfVxuXG4gICAgcmV0dXJuIGJ1ZjtcbiAgfVxuXG4gIHJldHVybiBzdHJpbmdpZnkocm5kcyk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHY0OyIsImltcG9ydCB2MzUgZnJvbSAnLi92MzUuanMnO1xuaW1wb3J0IHNoYTEgZnJvbSAnLi9zaGExLmpzJztcbnZhciB2NSA9IHYzNSgndjUnLCAweDUwLCBzaGExKTtcbmV4cG9ydCBkZWZhdWx0IHY1OyIsImltcG9ydCBSRUdFWCBmcm9tICcuL3JlZ2V4LmpzJztcblxuZnVuY3Rpb24gdmFsaWRhdGUodXVpZCkge1xuICByZXR1cm4gdHlwZW9mIHV1aWQgPT09ICdzdHJpbmcnICYmIFJFR0VYLnRlc3QodXVpZCk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHZhbGlkYXRlOyIsImltcG9ydCB2YWxpZGF0ZSBmcm9tICcuL3ZhbGlkYXRlLmpzJztcblxuZnVuY3Rpb24gdmVyc2lvbih1dWlkKSB7XG4gIGlmICghdmFsaWRhdGUodXVpZCkpIHtcbiAgICB0aHJvdyBUeXBlRXJyb3IoJ0ludmFsaWQgVVVJRCcpO1xuICB9XG5cbiAgcmV0dXJuIHBhcnNlSW50KHV1aWQuc3Vic3RyKDE0LCAxKSwgMTYpO1xufVxuXG5leHBvcnQgZGVmYXVsdCB2ZXJzaW9uOyIsImltcG9ydCB7IFYyRCwgU1ZHTWFuYWdlciwgU1ZHTm9kZSwgUGF0aERhdGEsIGNpcmNsZSB9IGZyb20gJy4uLy4uLy4uL2Rpc3QnXG5cbmZ1bmN0aW9uIGV4YW1wbGUxKCkge1xuICAgIC8vIEluaXRpYWxpemUgdGhlIFNWR01hbmFnZXJcbiAgICBjb25zdCBtYW5hZ2VyID0gbmV3IFNWR01hbmFnZXIoKVxuICAgIG1hbmFnZXIuaW5pdCgnc3ZnLXJvb3QnKVxuXG4gICAgLy8gUmVuZGVyIGEgY2lyY2xlIHdpdGggYSByYWRpdXMgb2YgMjUgYXQgKDUwLCA1MClcbiAgICBtYW5hZ2VyLnJlbmRlcihjaXJjbGUoMjUpLCBuZXcgVjJEKDUwLCA1MCkpXG59XG5cbmZ1bmN0aW9uIGV4YW1wbGUyKCkge1xuICAgIC8vIEluaXRpYWxpemUgdGhlIFNWR01hbmFnZXJcbiAgICBjb25zdCBtYW5hZ2VyID0gbmV3IFNWR01hbmFnZXIoKVxuICAgIG1hbmFnZXIuaW5pdCgnc3ZnLXJvb3QnKVxuXG4gICAgY29uc3QgZ3JhZGllbnQgPVxuICAgICAgICAnbGluZWFyLWdyYWRpZW50KDBkZWcsIHJnYig3MiwgNjAsIDEwMikgMCUsIHJnYigxMzYsIDE2OSwgMTk3KSAxMDAlKSdcblxuICAgIC8vIFJlbmRlciBhIHBlbnRhZ29uIHdpdGggYSBncmFkaWVudCBhdCAoMCwwKVxuICAgIG1hbmFnZXIucmVuZGVyTmFtZWQoXG4gICAgICAgICdwZW50YWdvbicsXG4gICAgICAgIG5ldyBTVkdOb2RlKCdwYXRoJylcbiAgICAgICAgICAgIC5zZXQoXG4gICAgICAgICAgICAgICAgJ2QnLFxuICAgICAgICAgICAgICAgIG5ldyBQYXRoRGF0YSgpXG4gICAgICAgICAgICAgICAgICAgIC5tb3ZlVG8oMTAwLCAxMDApXG4gICAgICAgICAgICAgICAgICAgIC5saW5lVG8oMzAwLCAxMDApXG4gICAgICAgICAgICAgICAgICAgIC5saW5lVG8oNDAwLCAzMDApXG4gICAgICAgICAgICAgICAgICAgIC5saW5lVG8oMjAwLCA0MDApXG4gICAgICAgICAgICAgICAgICAgIC5saW5lVG8oNDAwLCAzMDApXG4gICAgICAgICAgICAgICAgICAgIC5saW5lVG8oMjAwLCA0MDApXG4gICAgICAgICAgICAgICAgICAgIC5jbG9zZVBhdGgoKVxuICAgICAgICAgICAgICAgICAgICAudG9TdHJpbmcoKSxcbiAgICAgICAgICAgIClcbiAgICAgICAgICAgIC5zZXQoJ3N0cm9rZScsICcjY2NjJylcbiAgICAgICAgICAgIC5zZXQoJ3N0cm9rZS13aWR0aCcsICcxcHgnKVxuICAgICAgICAgICAgLnNldCgnZmlsbCcsIGdyYWRpZW50KSxcbiAgICAgICAgbmV3IFYyRCgwLCAwKSxcbiAgICApXG59XG5cbmZ1bmN0aW9uIGV4YW1wbGUzKCkge1xuICAgIC8vIEluaXRpYWxpemUgdGhlIFNWR01hbmFnZXJcbiAgICBjb25zdCBtYW5hZ2VyID0gbmV3IFNWR01hbmFnZXIoKVxuICAgIG1hbmFnZXIuaW5pdCgnc3ZnLXJvb3QnKVxuXG4gICAgY29uc3QgZ3JhZGllbnQgPVxuICAgICAgICAnbGluZWFyLWdyYWRpZW50KDBkZWcsIHJnYig3MiwgNjAsIDEwMikgMCUsIHJnYigxMzYsIDE2OSwgMTk3KSAxMDAlKSdcblxuICAgIC8vIFJlbmRlciBhIHBlbnRhZ29uIHdpdGggYSBncmFkaWVudCBhdCAoMCwwKVxuICAgIG1hbmFnZXIucmVuZGVyTmFtZWQoXG4gICAgICAgICdwZW50YWdvbicsXG4gICAgICAgIG5ldyBTVkdOb2RlKCdwYXRoJylcbiAgICAgICAgICAgIC5zZXQoXG4gICAgICAgICAgICAgICAgJ2QnLFxuICAgICAgICAgICAgICAgIG5ldyBQYXRoRGF0YSgpXG4gICAgICAgICAgICAgICAgICAgIC5tb3ZlVG8oMTAwLCAxMDApXG4gICAgICAgICAgICAgICAgICAgIC5saW5lVG8oMzAwLCAxMDApXG4gICAgICAgICAgICAgICAgICAgIC5saW5lVG8oNDAwLCAzMDApXG4gICAgICAgICAgICAgICAgICAgIC5saW5lVG8oMjAwLCA0MDApXG4gICAgICAgICAgICAgICAgICAgIC5saW5lVG8oNDAwLCAzMDApXG4gICAgICAgICAgICAgICAgICAgIC5saW5lVG8oMjAwLCA0MDApXG4gICAgICAgICAgICAgICAgICAgIC5jbG9zZVBhdGgoKVxuICAgICAgICAgICAgICAgICAgICAudG9TdHJpbmcoKSxcbiAgICAgICAgICAgIClcbiAgICAgICAgICAgIC5zZXQoJ3N0cm9rZScsICcjY2NjJylcbiAgICAgICAgICAgIC5zZXQoJ3N0cm9rZS13aWR0aCcsICcxcHgnKVxuICAgICAgICAgICAgLnNldCgnZmlsbCcsIGdyYWRpZW50KSxcbiAgICAgICAgbmV3IFYyRCgwLCAwKSxcbiAgICApXG5cbiAgICBsZXQgdGltZSA9IDBcbiAgICBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgIGNvbnN0IHggPSBNYXRoLmNvcyh0aW1lKSAqIDMwIC0gMTVcbiAgICAgICAgY29uc3QgeSA9IE1hdGguc2luKHRpbWUpICogMzAgLSAxNVxuXG4gICAgICAgIG1hbmFnZXIubW92ZU5hbWVkKCdwZW50YWdvbicsIG5ldyBWMkQoeCwgeSkpXG5cbiAgICAgICAgdGltZSArPSAoMiAqIE1hdGguUEkpIC8gMTAwMFxuICAgIH0sIDEpXG59XG5cbmV4YW1wbGUxKClcbmV4YW1wbGUyKClcbmV4YW1wbGUzKClcbiJdLCJzb3VyY2VSb290IjoiIn0=