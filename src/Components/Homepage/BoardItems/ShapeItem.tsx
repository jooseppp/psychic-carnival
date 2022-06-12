import React from "react";
import { motion } from "framer-motion";

interface ShapeItemProps {
    posX: number;
    posY: number;
}

const ShapeItem: React.FC<ShapeItemProps> = ({ posX, posY }) => {
    
    return (
        <motion.div
            drag={true}
            style={{
                position: "absolute",
                left: `${posX}px`,
                top: `${posY}px`,
                height: "100px",
                width: "100px",
                backgroundColor: "none",
                border: "1px solid black",
            }}
        />
    );
};

export default ShapeItem;
