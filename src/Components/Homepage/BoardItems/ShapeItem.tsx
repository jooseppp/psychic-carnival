import React from "react";
import { motion } from "framer-motion";

interface ShapeItemProps {}

const ShapeItem: React.FC<ShapeItemProps> = () => {
    return (
        <motion.div
            drag
            dragMomentum={false}
            style={{
                position: "absolute",
                left: "120px",
                top: "200px",
                height: "100px",
                width: "100px",
                backgroundColor: "none",
                border: "1px solid black",
            }}
        />
    );
};

export default ShapeItem;

// left: `${posX}px`,
// top: `${posY}px`,
