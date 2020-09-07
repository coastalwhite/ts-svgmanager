import V2D from "./v2d";
import SVGNode from "./Node";

const DEFINITION_PREFIX = "figure-";
const NAME_PREFIX = "named-";

export default class SVGManager {
	private _rootId: string;
	private _defintions: string[];
	private _names: string[];

	private getRoot(): HTMLElement {
		const root = document.getElementById(this._rootId);

		if (root === null) throw new Error("SVG Root not found!");

		return root;
	}

	private getSVG(): HTMLElement {
		const svg = this.getRoot().firstChild;

		if (svg === null) throw new Error("SVG not found within root!");
		if ((svg as HTMLElement).tagName !== "svg")
			throw new Error("SVG not contained in root!");

		return svg as HTMLElement;
	}

	private getDefs(): HTMLElement {
		const defs = this.getSVG().firstChild;

		if (defs === null) throw new Error("Defs not found within svg!");
		if ((defs as HTMLElement).tagName !== "defs")
			throw new Error("Defs not contained in svg!");

		return defs as HTMLElement;
	}

	private toDefId(elementId: string): string {
		return DEFINITION_PREFIX + elementId;
	}

	private getName(name: string): string {
		return NAME_PREFIX + name;
	}

	private doesDefExist(elementId: string): boolean {
		return this._defintions.includes(elementId);
	}

	private doesNameExist(name: string): boolean {
		return this._names.includes(name);
	}

	private addDefintion(element: SVGNode): string {
		const elementId = element.toHash();

		this._defintions.push(elementId);

		this.getDefs().appendChild(
			element.set("id", this.toDefId(elementId)).toHTML()
		);

		return elementId;
	}

	private addFigure(elementId: string, position: V2D) {
		this.getSVG().appendChild(
			new SVGNode("use")
				.set("href", elementId)
				.set("x", position.x().toString())
				.set("y", position.y().toString())
				.toHTML()
		);
	}

	private addNamedFigure(name: string, elementId: string, position: V2D) {
		if (this.doesNameExist(name)) throw new Error("Name already exists!");

		this.getSVG().appendChild(
			new SVGNode("use")
				.set("href", elementId)
				.set("x", position.x().toString())
				.set("y", position.y().toString())
				.set("id", this.getName(name))
				.toHTML()
		);

		this._names.push(name);
	}

	public init() {
		this._defintions = [];
		this._names = [];

		const svgElement = new SVGNode("svg")
			.set("viewBox", "0 0 100 100")
			.set("width", "500px")
			.set("height", "500px")
			.append(new SVGNode("defs"))
			// .append(dropShadowFilter)
			.toHTML();

		this.getRoot().appendChild(svgElement);
	}

	public constructor(rootId: string) {
		this._rootId = rootId;
		this._defintions = [];
		this._names = [];
	}

	public moveViewBox(x: number, y: number) {
		const viewBox = this.get("viewBox").split(" ");

		const minX = parseInt(viewBox[0]) + x;
		const minY = parseInt(viewBox[1]) + y;
		const width = parseInt(viewBox[2]);
		const height = parseInt(viewBox[3]);

		this.set("viewBox", `${minX} ${minY} ${width} ${height}`);
	}

	public addPureDefinition(element: SVGNode) {
		this.getDefs().appendChild(element.toHTML());
	}

	public ensureDefinition(element: SVGNode): string {
		const elementId = element.toHash();

		if (!this.doesDefExist(elementId)) {
			this.addDefintion(element);
		}

		return elementId;
	}

	public renderPureId(elementId: string, position: V2D) {
		this.addFigure(elementId, position);
	}

	public renderId(elementId: string, position: V2D) {
		if (!this.doesDefExist(elementId))
			throw new Error("Tried to render an Id that doesn't exist");

		this.addFigure("#" + this.toDefId(elementId), position);
	}

	public render(element: SVGNode, position: V2D): string {
		const elementId = element.toHash();

		if (!this.doesDefExist(elementId)) {
			this.addDefintion(element);
		}

		this.addFigure("#" + this.toDefId(elementId), position);

		return elementId;
	}

	public renderNamed(name: string, element: SVGNode, position: V2D) {
		const elementId = element.toHash();

		if (this.doesNameExist(name)) {
			console.log(
				'Element not added, name "' + name + '" already exists'
			);
			return;
		}

		if (!this.doesDefExist(elementId)) {
			this.addDefintion(element);
		}

		this.addNamedFigure(name, "#" + this.toDefId(elementId), position);
	}

	public renderNamedId(name: string, elementId: string, position: V2D) {
		if (!this.doesDefExist(elementId))
			throw new Error("Tried to render an Id that doesn't exist");

		this.addNamedFigure(name, "#" + this.toDefId(elementId), position);
	}

	public renderNamedPureId(name: string, elementId: string, position: V2D) {
		this.addNamedFigure(name, elementId, position);
	}

	public moveNamed(name: string, x: number, y: number) {
		const elem = document.getElementById(this.getName(name));

		if (elem === null) return;

		if (elem.tagName === "g") {
			elem.setAttribute("transform", `translate(${x}, ${y})`);
		} else {
			elem.setAttribute("x", `${x}`);
			elem.setAttribute("y", `${y}`);
		}
	}

	public removeNamed(name: string) {
		const item = document.getElementById(this.getName(name));

		if (item !== null) this.getSVG().removeChild(item);
		this._names = this._names.filter((x) => x !== name);
	}

	public rerenderNamed(name: string, element: SVGNode, position: V2D) {
		const elementId = element.toHash();

		const item = document.getElementById(this.getName(name));

		if (!this.doesDefExist(elementId)) {
			this.addDefintion(element);
		}

		item?.setAttribute("href", "#" + this.toDefId(elementId));
		item?.setAttribute("x", position.x().toString());
		item?.setAttribute("y", position.y().toString());
	}

	public rerenderNamedPureId(name: string, elementId: string, position: V2D) {
		const item = document.getElementById(this.getName(name));

		item?.setAttribute("href", elementId);
		item?.setAttribute("x", position.x().toString());
		item?.setAttribute("y", position.y().toString());
	}

	public noDefRenderNamed(name: string, element: SVGNode, position: V2D) {
		this.getSVG().appendChild(
			element
				.set("id", this.getName(name))
				.set("x", position.x().toString())
				.set("y", position.y().toString())
				.toHTML()
		);
	}

	public get(attr: string): string {
		return this.getSVG().getAttribute(attr) || "";
	}

	public set(attr: string, value: string): SVGManager {
		this.getSVG().setAttribute(attr, value);

		return this;
	}

	public toDomId(figureId: string): string {
		return "#" + this.toDefId(figureId);
	}
}
