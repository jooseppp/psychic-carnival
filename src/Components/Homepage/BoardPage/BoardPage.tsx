import { MotionConfig, motion, PanInfo } from "framer-motion";
import React, { useEffect, useState } from "react";
import { UserEvent } from "../../../redux/user-events";
import BoundingBox from "../../../../node_modules/framer-motion/types/projection/geometry/types";
import PersonItem from "./BoardItems/PersonItem";
import ShapeItem from "./BoardItems/ShapeItem";
import { Shape, Person, CollisionProps } from "../../lib/intefaces";

interface BoardPageProps {
    danceData?: UserEvent | undefined;
}

const BoardPage: React.FC<BoardPageProps> = ({ danceData }) => {
    const [waitingData, setWaitingData] = useState(true);
    const [peoplePositions, setPeoplePositions] = useState<
        Person[] | undefined
    >([]);
    const [shapePositions, setShapePosition] = useState<Shape[] | undefined>(
        []
    );
    const [collisionZone, setCollisionZone] = useState<
        Record<number | string | symbol, CollisionProps> | undefined
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
                if (posX && posY && peoplePositions !== undefined) {
                    console.log("updatePerson");
                    peoplePositions[id].posX = posX;
                    peoplePositions[id].posY = posY;
                }
                break;
            }
            case "shape": {
                if (posX && posY && shapePositions !== undefined) {
                    console.log(collisionZone);

                    console.log("updateShape");
                    shapePositions[id].posX = posX;
                    shapePositions[id].posY = posY;
                }
                break;
            }
            default:
                return;
        }
    };

    // TODO Change danceData definition
    const setInitialCollisionZone = (danceData: UserEvent) => {
        const init_zones: number[] = [];
        console.log("shape[]", shapePositions);
        const shapeData = danceData.board.shapes;
        shapeData.forEach((shape) => {
            init_zones.push(shape.id);
        });
        console.log("initZones", init_zones);

        calculateCollisionZone(null, init_zones);
    };

    const calculateCollisionZone = (
        id?: number | null,
        multiId?: number[] | null
    ): void => {
        console.log("collisionCalc", id);

        if (shapePositions !== undefined && id) {
            const entity = shapePositions[id];
            const xLeft = entity.posX;
            const xRight = entity.posX + entity.width;
            const yTop = entity.posY;
            const yBottom = entity.posY + entity.heigth;
            setCollisionZone({
                id: { id, xLeft, xRight, yBottom, yTop },
            });
        }
        if (shapePositions !== undefined && multiId) {
            multiId.forEach((id) => {
                console.log(id);
                const entity = shapePositions[id];
                const xLeft = entity.posX;
                const xRight = entity.posX + entity.width;
                const yTop = entity.posY;
                const yBottom = entity.posY + entity.heigth;
                setCollisionZone({
                    id: { id, xLeft, xRight, yBottom, yTop },
                });
            });
        }
    };

    const setInitBoard = (): UserEvent | undefined => {
        if (danceData !== undefined) {
            setShapePosition(danceData?.board.shapes);
            setPeoplePositions(danceData?.board.people);
            setWaitingData(false);
            return danceData;
        }
        return undefined;
    };

    const detectCollisions = (id: number, posX: number, posY: number) => {
        // if (id !== undefined && posX !== undefined && posY !== undefined) {
        // }
    };

    useEffect(() => {
        const init: any = async () => {
            setInitBoard();
            console.log("shape",shapePositions);
            
        };
        console.log("3");
        setInitialCollisionZone(init);
    }, []);

    // useEffect(() => {
    //     detectCollisions();
    // }, [updatePosition]);

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
