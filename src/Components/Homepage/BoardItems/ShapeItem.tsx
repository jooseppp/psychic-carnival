import React from "react";
import { motion } from "framer-motion";
import { UserEvent } from "../../../redux/user-events";

interface ShapeItemProps {
    id: number;
    type: string;
    posX: number;
    posY: number;
    onShape?: UserEvent["id"];
}

const ShapeItem: React.FC<ShapeItemProps> = () => {
    return (
        <motion.div
            drag
            dragMomentum={false}
            style={{
                position: "absolute",
                left: "120px",
                top: "200px",
                height: "300px",
                width: "300px",
                backgroundColor: "none",
                border: "1px solid black",
                borderRadius: "50%",
            }}
        />
    );
};

export default ShapeItem;

// left: `${posX}px`,
// top: `${posY}px`,
