import { MotionConfig, motion, PanInfo } from "framer-motion";
import React, { useEffect, useState } from "react";
import { UserEvent } from "../../../redux/user-events";
import BoundingBox from "../../../../node_modules/framer-motion/types/projection/geometry/types";
import PersonItem from "../BoardItems/PersonItem";

enum ItemTypes {
    CARD = "card",
}

interface BoardPageProps {
    danceData?: UserEvent | undefined;
}

interface CustomDragConstraitsProps {
    left: number | undefined;
    top: number | undefined;
}

const BoardPage: React.FC<BoardPageProps> = ({ danceData }) => {
    const [customDragConstraits, setCustomDragConstraits] =
        useState<CustomDragConstraitsProps>();

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
