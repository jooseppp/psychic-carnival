import { MotionConfig, motion, PanInfo } from "framer-motion";
import React, { useEffect, useState } from "react";
import { UserEvent } from "../../../redux/user-events";
import BoundingBox from "../../../../node_modules/framer-motion/types/projection/geometry/types";
import PersonItem from "./BoardItems/PersonItem";
import ShapeItem from "./BoardItems/ShapeItem";
import { Person } from "../../lib/intefaces";
import { Shape } from "../../lib/intefaces";

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

    useEffect(() => {
        setShapePosition(danceData?.board.shapes);
        setPeoplePositions(danceData?.board.people);
    }, []);

    return (
        <>
            <div className="board">
                {danceData ? (
                    <>
                        {danceData.board.people.map((person) => {
                            return (
                                <PersonItem
                                    triggerParentUpdate={updatePosition}
                                    key={person.id}
                                    id={person.id}
                                    name={person.name}
                                    posX={person.posX}
                                    posY={person.posY}
                                />
                            );
                        })}
                        {danceData.board.shapes.map((shape) => {
                            return (
                                <ShapeItem
                                    triggerParentUpdate={updatePosition}
                                    key={shape.id}
                                    id={shape.id}
                                    shapeType="circle"
                                    posX={shape.posX}
                                    posY={shape.posY}
                                    onShape={[1]}
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
