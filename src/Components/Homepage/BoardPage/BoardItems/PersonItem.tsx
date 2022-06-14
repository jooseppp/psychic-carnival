import React, { useEffect, useState } from "react";
import { motion, PanInfo } from "framer-motion";
import { UserEvent } from "../../../../redux/user-events";

interface PersonItemProps {
    id: number;
    name: string;
    posX: number;
    posY: number;
    triggerParentUpdate(
        id: number,
        type: string,
        posX: number,
        posY: number
    ): void;
    getPosInfo(id: number, posX: number, posY: number): void;
}

const PersonItem: React.FC<PersonItemProps> = ({
    id,
    name,
    posX,
    posY,
    triggerParentUpdate,
    getPosInfo,
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
                        onDrag={(event, info) =>
                            getPosInfo(id, info.point.x, info.point.y)
                        }
                        onDragEnd={(event, info) =>
                            triggerParentUpdate(
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
                        }}
                    />
                </>
            ) : (
                <p>Loading...</p>
            )}
        </>
    );
};

export default PersonItem;
