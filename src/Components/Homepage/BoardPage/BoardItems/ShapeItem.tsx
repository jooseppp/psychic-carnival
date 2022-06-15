import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { UserEvent } from "../../../../redux/user-events";
import { Shape } from "../../../lib/intefaces";
import PersonItem from "./PersonItem";
import { PersonItemProps } from "./PersonItem";

interface ShapeItemProps {
    id: number;
    shapeType: string;
    posX: number;
    posY: number;
    heigth: number;
    width: number;
    onShape: UserEvent["id"][] | [];

    triggerPositionUpdate(
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
    heigth,
    width,
    onShape,
    triggerPositionUpdate,
}) => {
    const [hasChildren, setHasChildren] = useState(false);
    const [children, setChildren] = useState<number[] | undefined>(undefined);

    const initShape = () => {
        if (onShape.length > 0) {
            setHasChildren(true);
        }
        const getChildren = (): number[] => {
            let childArr: number[] = [];
            onShape.forEach((child) => {
                childArr.push(child);
            });
            return childArr;
        };
        setChildren(onShape?.length > 0 ? undefined : getChildren());
    };

    const testFunc = () => {
        console.log("test");
    };

    useEffect(() => {
        initShape();
    }, []);

    return (
        <motion.div
            drag
            dragMomentum={false}
            onDragEnd={(event, info) => {
                if (hasChildren) {
                    triggerPositionUpdate(
                        id,
                        "shape",
                        info.point.x,
                        info.point.y,
                        [children]
                    );
                }
            }}
            style={{
                position: "absolute",
                marginLeft: `${posX}px`,
                marginTop: `${posY}px`,
                height: `${heigth}px`,
                width: `${width}px`,
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
                        triggerPositionUpdate={testFunc}
                        // Next method does nothing
                        // getPosInfo={testFunc}
                    />
                </div>
            ) : (
                <></>
            )}
        </motion.div>
    );
};

export default ShapeItem;
