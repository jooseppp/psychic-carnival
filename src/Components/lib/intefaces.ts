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
    heigth: number;
    width: number;
    onShape?: UserEvent["id"][];
}

export type Project<T extends string | number | symbol> = Readonly<{
    dirs: Record<T, CollisionProps>
  }>

export interface CollisionProps {
    id: number;
    xLeft: number;
    xRight: number;
    yTop: number;
    yBottom: number;
}
