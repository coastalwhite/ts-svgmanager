import V2D from "./v2d";
import PathData from "./PathData";
import SVGNode from "./Node";

const spacing = 4;

export const circle = (radius: number): SVGNode =>
	new SVGNode("circle")
		.set("cx", "0")
		.set("cy", "0")
		.set("stroke", "#000")
		.set("stroke-width", "1px")
		.set("fill", "transparent")
		.set("r", radius.toString());

export const line = (from: V2D, to: V2D): SVGNode =>
	new SVGNode("line")
		.set("x1", from.x().toString())
		.set("y1", from.y().toString())
		.set("x2", to.x().toString())
		.set("y2", to.y().toString())
		.set("stroke", "#000")
		.set("stroke-width", "1px");

export const lines = (points: V2D[]): SVGNode => {
	const pathData = new PathData().moveTo(points[0].x(), points[0].y());

	points.shift();
	points.forEach((point) => pathData.lineTo(point.x(), point.y()));

	return new SVGNode("path")
		.set("d", pathData.toString())
		.set("stroke", "#000")
		.set("stroke-width", "1px")
		.set("fill", "none");
};

export const curve = (from: V2D, to: V2D, control: V2D): SVGNode =>
	new SVGNode("path")
		.set(
			"d",
			new PathData()
				.moveTo(from.x(), from.y())
				.quadraticCurveTo(to.x(), to.y(), control.x(), control.y())
				.toString()
		)
		.set("stroke", "#000")
		.set("stroke-width", "1px");

const CURVING = spacing * 2;

export const curveCalc = (from: V2D, to: V2D, up: boolean): SVGNode => {
	const middle = from.middle(to);
	const dif = to.sub(from);
	let normal = new V2D(-1 * dif.y(), dif.x());
	if (!((normal.y() > 0 && up) || (normal.y() < 0 && !up)))
		normal = normal.sca(-1);

	const normalNormalized = middle.add(
		normal.sca((2 * CURVING) / normal.length())
	);

	return new SVGNode("path")
		.set(
			"d",
			new PathData()
				.moveTo(from.x(), from.y())
				.quadraticCurveTo(
					to.x(),
					to.y(),
					normalNormalized.x(),
					normalNormalized.y()
				)
				.toString()
		)
		.set("fill", "transparent")
		.set("stroke", "#000")
		.set("stroke-width", "1px");
};
