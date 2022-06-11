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
                
            }}
        />
    );
};

export default ShapeItem;
