import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { UserEvent } from "../../../../redux/user-events";
import { Shape } from "../../../lib/intefaces";
import PersonItem from "./PersonItem";

interface ShapeItemProps {
    id: number;
    shapeType: string;
    posX: number;
    posY: number;
    onShape?: UserEvent["id"][];
    triggerParentUpdate(
        id: number,
        shapeType: string,
        posX: number,
        posY: number
    ): void;
}

const ShapeItem: React.FC<ShapeItemProps> = ({
    id,
    shapeType,
    posX,
    posY,
    onShape,
    triggerParentUpdate,
}) => {
    const [hasChildren, setHasChildren] = useState(false);

    const checkHasChildren = () => {
        if (onShape !== undefined && onShape?.length > 0) {
            return true;
        }
        return false;
    };

    const testFunc = () => {
        console.log("test");
    };

    useEffect(() => {
        setHasChildren(checkHasChildren());
    }, []);

    return (
        <motion.div
            drag
            dragMomentum={false}
            onDragEnd={(event, info) =>
                triggerParentUpdate(id, "shape", info.point.x, info.point.y)
            }
            style={{
                position: "absolute",
                marginLeft: `${posX}px`,
                marginTop: `${posY}px`,
                height: "300px",
                width: "300px",
                backgroundColor: "none",
                border: "1px solid black",
                borderRadius: "50%",
            }}
        >
            {hasChildren ? (
                <div>
                    <PersonItem
                        key={1}
                        id={1}
                        name={"test"}
                        posX={300}
                        posY={300}
                        triggerParentUpdate={(testFunc)}
                    />
                </div>
            ) : (
                <></>
            )}
        </motion.div>
    );
};

export default ShapeItem;
