export type Area = { height: number, width: number }
export type FdropToolbarIcon = (Step) => (Event) => void
export type FselectStep = (boolean) => void
export type Point = { x: number, y: number }

export type Rectangle = Point & Area
