// import { SVGNode, SVGManager } from '..'
// import { V2D } from '../helpers'
// import Component from './Component'

// export default class VariableSizeComponent extends Component {
//     private _shape: (points: V2D[]) => SVGNode
//     private _points: V2D[]

//     constructor(
//         manager: SVGManager,
//         shape: (points: V2D[]) => SVGNode,
//         points: V2D[],
//     ) {

//         this._shape = shape
//         this._points = points

//         this.update(manager)
//     }

//     public get shape(): SVGNode {
//         return this._shape(this._points)
//     }

//     protected reshape(newPoints: V2D[]): void {
//         this._points = newPoints
//     }
// }
