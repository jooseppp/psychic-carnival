import { MotionConfig, motion, PanInfo } from "framer-motion";
import React, { useEffect, useState } from "react";
import { UserEvent } from "../../../redux/user-events";
import BoundingBox from "../../../../node_modules/framer-motion/types/projection/geometry/types";
import PersonItem from "./BoardItems/PersonItem";
import ShapeItem from "./BoardItems/ShapeItem";
import { Shape, Person, CollisionProps } from "../../lib/intefaces";
import { NumericLiteral } from "typescript";
import { has } from "immer/dist/internal";

interface BoardPageProps {
    danceData?: UserEvent | undefined;
}

const BoardPage: React.FC<BoardPageProps> = ({ danceData }) => {
    const [loading, setLoading] = useState(true);
    const [peoplePositions, setPeoplePositions] = useState<
        Person[] | undefined
    >([]);
    const [shapePositions, setShapePosition] = useState<Shape[] | undefined>(
        []
    );

    const onMoveEnd = (
        id: number,
        type: string,
        newPosX: number,
        newPosY: number,
        hasChidren?: number[] | undefined
    ) => {
        if (shapePositions !== undefined && peoplePositions !== undefined) {
            switch (type) {
                case "person": {
                    const entity = peoplePositions[id];
                    entity.posX = newPosX;
                    entity.posY = newPosY;
                    break;
                }
                case "shape": {
                    const entity = shapePositions[id];
                    entity.posX = newPosX;
                    entity.posY = newPosY;
                    console.log(entity.posX, newPosX);

                    if (hasChidren !== undefined && hasChidren.length > 0) {
                        hasChidren.forEach((childId) => {
                            // TODO Think logic for childEntities
                            const childEntity = peoplePositions[childId];
                        });
                    }
                    break;
                }
                default:
                    return;
            }
        }
    };

    const detectCollisions = (id: number, posX: number, posY: number) => {
        if (shapePositions !== undefined) {
            let shape = shapePositions[0];
            if (
                posX >= shape.posX &&
                posX <= shape.posX + shape.width &&
                posY > shape.posY &&
                posY <= shape.posY + shape.heigth
            ) {
                console.log(posX >= shape.posX);
            }
        }
    };

    const setInitBoard = () => {
        if (danceData !== undefined) {
            setShapePosition(danceData?.board.shapes);
            setPeoplePositions(danceData?.board.people);
            setLoading(false);
        } else {
            throw new Error("Couldn't load User Events");
        }
    };

    useEffect(() => {
        setInitBoard();
    }, []);

    return (
        <>
            <div className="board" style={{ width: "100vw", height: "90vh" }}>
                <svg height="1110" width="700" style={{ position: "absolute" }}>
                    <line
                        x1="500"
                        y1="0"
                        x2="500"
                        y2="500"
                        style={{ stroke: "rgb(255,0,0)" }}
                    />
                </svg>
                {danceData ? (
                    <>
                        {danceData.board.people.map((person) => {
                            return (
                                <PersonItem
                                    key={person.id}
                                    id={person.id}
                                    name={person.name}
                                    posX={person.posX}
                                    posY={person.posY}
                                    triggerPositionUpdate={onMoveEnd}
                                    triggerCollisionCheck={detectCollisions}
                                />
                            );
                        })}
                        {danceData.board.shapes.map((shape) => {
                            return (
                                <ShapeItem
                                    key={shape.id}
                                    id={shape.id}
                                    shapeType="circle"
                                    posX={shape.posX}
                                    posY={shape.posY}
                                    heigth={shape.heigth}
                                    width={shape.width}
                                    onShape={[1, 2]}
                                    // triggerPositionUpdate={onMoveEnd}
                                />
                            );
                        })}
                    </>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </>
    );
};

export default BoardPage;

// const [collisionZone, setCollisionZone] = useState<
//         Record<number | string | symbol, CollisionProps> | undefined
//     >();

// const setInitialCollisionZone = () => {
//     const init_zones: number[] = [];

//     if (shapePositions !== undefined) {
//         shapePositions.forEach((shape) => {
//             init_zones.push(shape.id);
//         });
//         calculateNewCollisionZone(null, init_zones);
//     }
// };

// const detectCollisions = (id: number, posX: number, posY: number) => {
//     // if (id !== undefined && posX !== undefined && posY !== undefined) {
//     // }
// };

// const updatePosition = (
//     id: number,
//     type: string,
//     posX: number,
//     posY: number
// ) => {
//     // Not sure if best method to update personPosition list elements onDragEnd
//     switch (type) {
//         case "person": {
//             if (posX && posY && peoplePositions !== undefined) {
//                 peoplePositions[id].posX = posX;
//                 peoplePositions[id].posY = posY;
//             }
//             break;
//         }
//         case "shape": {
//             if (posX && posY && shapePositions !== undefined) {
//                 shapePositions[id].posX = posX;
//                 shapePositions[id].posY = posY;
//             }
//             break;
//         }
//         default:
//             return;
//     }
// };

// const calculateNewCollisionZone = (
//     id?: number | null,
//     multiId?: number[] | null
// ): void => {
//     if (shapePositions !== undefined && id) {
//         console.log("singleCollisionUpdate");
//         console.log(shapePositions[id]);

//         const entity = shapePositions[id];
//         const xLeft = entity.posX;
//         const xRight = entity.posX + entity.width;
//         const yTop = entity.posY;
//         const yBottom = entity.posY + entity.heigth;
//         setCollisionZone({
//             id: { id, xLeft, xRight, yBottom, yTop },
//         });
//     }

//     if (shapePositions !== undefined && multiId) {
//         multiId.forEach((id) => {
//             console.log("multiCollisionUpdate");
//             const entity = shapePositions[id];
//             const xLeft = entity.posX;
//             const xRight = entity.posX + entity.width;
//             const yTop = entity.posY;
//             const yBottom = entity.posY + entity.heigth;
//             setCollisionZone({
//                 id: { id, xLeft, xRight, yBottom, yTop },
//             });
//             console.log("test", collisionZone);
//         });
//     }
// };
