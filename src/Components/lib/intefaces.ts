export enum ItemType {
    CIRCLE = "circle",
    SQUARE = "square",
    PERSON = "person"
}

export interface Person {
    id: number;
    name: string;
    posX: number;
    posY: number;
}

export interface Shape {
    id: number;
    type: ItemType
}


