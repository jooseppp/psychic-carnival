import React, { useEffect, useState } from "react";
import { motion, PanInfo } from "framer-motion";
import { UserEvent } from "../../../../redux/user-events";

export interface PersonItemProps {
    id: number;
    name: string;
    posX: number;
    posY: number;
    triggerPositionUpdate(
        id: number,
        type: string,
        posX: number,
        posY: number
    ): void;
    triggerCollisionCheck(id: number, posX: number, posY: number): void;
}

const PersonItem: React.FC<PersonItemProps> = ({
    id,
    name,
    posX,
    posY,
    triggerPositionUpdate,
    triggerCollisionCheck,
}) => {
    const [position, setPosition] = useState({
        setPosX: posX,
        setPosY: posY,
    });

    useEffect(() => {
        setPosition({ setPosX: posX, setPosY: posY });
    }, []);

    return (
        <>
            {position ? (
                <>
                    <motion.div
                        drag
                        dragMomentum={false}
                        onDrag={(event, info) =>
                            triggerCollisionCheck(
                                id,
                                info.point.x,
                                info.point.y
                            )
                        }
                        onDragEnd={(event, info) =>
                            triggerPositionUpdate(
                                id,
                                "person",
                                info.point.x,
                                info.point.y
                            )
                        }
                        style={{
                            position: "absolute",
                            left: `${position.setPosX}px`,
                            top: `${position.setPosY}px`,
                            height: "50px",
                            width: "50px",
                            borderRadius: "50%",
                            backgroundColor: "red",
                            border: "2px solid black",
                            textAlign: "center",
                        }}
                    >
                        {id}
                    </motion.div>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </>
    );
};

export default PersonItem;
