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
}

const PersonItem: React.FC<PersonItemProps> = ({
    id,
    name,
    posX,
    posY,
    triggerParentUpdate,
}) => {
    const [position, setPosition] = useState({
        setposX: posX,
        setposY: posY,
    });

    const testStuff = (
        event: MouseEvent | TouchEvent | PointerEvent,
        info: PanInfo
    ) => {
        let x = info.point.x;
        if (x > 500) {
            console.log("jah");
        }
    };

    useEffect(() => {
        setPosition({ setposX: posX, setposY: posY });
        // console.log(position);
    }, []);

    return (
        <>
            {position ? (
                <>
                    <motion.div
                        drag
                        dragMomentum={false}
                        onDrag={(event, info) => testStuff(event, info)}
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
