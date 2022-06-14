import { MotionConfig, motion, PanInfo } from "framer-motion";
import React, { useEffect, useState } from "react";
import { UserEvent } from "../../../redux/user-events";
import BoundingBox from "../../../../node_modules/framer-motion/types/projection/geometry/types";
import PersonItem from "./BoardItems/PersonItem";
import ShapeItem from "./BoardItems/ShapeItem";
import { Shape, Person, CollisionInfo, CollisionProps } from "../../lib/intefaces";

interface BoardPageProps {
    danceData?: UserEvent | undefined;
}

const BoardPage: React.FC<BoardPageProps> = ({ danceData }) => {
    const [peoplePositions, setPeoplePositions] = useState<
        Person[] | undefined
    >([]);
    const [shapePositions, setShapePosition] = useState<Shape[] | undefined>(
        []
    );
    const [collisionZone, setCollisionZone] = useState<
        Record<number, CollisionProps> | undefined
    >();

    const updatePosition = (
        id: number,
        type: string,
        posX: number,
        posY: number
    ) => {
        // Not sure if best method to update personPosition list elements onDragEnd
        switch (type) {
            case "person": {
                if (id && posX && posY && peoplePositions !== undefined) {
                    console.log("person");

                    peoplePositions[id].posX = posX;
                    peoplePositions[id].posY = posY;
                }
                break;
            }
            case "shape": {
                if (id && posX && posY && shapePositions !== undefined) {
                    console.log("shape");

                    shapePositions[id].posX = posX;
                    shapePositions[id].posY = posY;
                }
                break;
            }
            default:
                return;
        }
    };

    const calculateCollisionZone = (id?: number | null, multiId?: number[]) => {
        if (shapePositions !== undefined && id) {
            const entity = shapePositions[id];
            const xRight = entity.posX + entity.width;
            const yBottom = entity.posY + entity.heigth;
        }
        if (shapePositions !== undefined && multiId) {
            multiId.forEach((id) => {
                const entity = shapePositions[id];
                const xLeft = entity.posX;
                const xRight = entity.posX + entity.width;
                const yTop = entity.posY;
                const yBottom = entity.posY + entity.heigth;
                setCollisionZone({
                    1: { id, xLeft, xRight, yBottom, yTop },
                });
            });
        }
    };

    const detectCollisions = (id: number, posX: number, posY: number) => {
        // if (id !== undefined && posX !== undefined && posY !== undefined) {
        // }
    };

    useEffect(() => {
        setShapePosition(danceData?.board.shapes);
        setPeoplePositions(danceData?.board.people);
        const setInitialCollisionZone = () => {
            const init_zones: number[] = [];
            shapePositions?.forEach((shape) => {
                init_zones.push(shape.id);
            });
            calculateCollisionZone(null, init_zones);
        };
    }, []);

    return (
        <>
            <div className="board">
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
                                    triggerParentUpdate={updatePosition}
                                    getPosInfo={detectCollisions}
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
                                    onShape={[1]}
                                    triggerParentUpdate={updatePosition}
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
