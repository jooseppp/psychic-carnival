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
    // getPosInfo(id: number): void;
}

const PersonItem: React.FC<PersonItemProps> = ({
    id,
    name,
    posX,
    posY,
    triggerPositionUpdate,
    // getPosInfo,
}) => {
    const [position, setPosition] = useState({
        setposX: posX,
        setposY: posY,
    });

    useEffect(() => {
        setPosition({ setposX: posX, setposY: posY });
    }, []);

    return (
        <>
            {position ? (
                <>
                    <motion.div
                        drag
                        dragMomentum={false}
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
                            marginLeft: `${position.setposX}px`,
                            marginTop: `${position.setposY}px`,
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
