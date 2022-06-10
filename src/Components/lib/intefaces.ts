export enum Shapes {
    Circle = "circle",
    Square = "square"
}

export interface Shape {
    id: number;
    type: Shapes;
}