import { UserEvent } from "../../redux/user-events";

export enum ItemType {
    CIRCLE = "circle",
    SQUARE = "square",
    PERSON = "person",
}

export interface Person {
    id: number;
    name: string;
    posX: number;
    posY: number;
}

export interface Shape {
    id: number;
    shapeType: string;
    posX: number;
    posY: number;
    onShape?: UserEvent["id"][];
}
