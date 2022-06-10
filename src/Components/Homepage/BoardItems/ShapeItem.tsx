import React from "react";
import PropTypes from "prop-types";
import { Shapes } from "../../lib/intefaces";
import { Shape } from "../../lib/intefaces";
import { motion } from "framer-motion";

interface ShapeItemProps {
    posX: number;
    posY: number;
}

const ShapeItem: React.FC<ShapeItemProps> = ({ posX, posY }) => {
    const calcPosX = (400 - posX).toString();
    const calcPosY = (400 - posY).toString();

    const typeOfShape = "circle";
    return (
        <motion.div
            drag={true}
            onDragEnd={(event, info) => console.log(info.point.x, info.point.y)}
            whileHover={{ scale: 1.1 }}
            style={{
                zIndex: -2,
                position: "absolute",
                display: "flex",
                marginTop: `${calcPosY}px`,
                marginLeft: `${calcPosX}px`,
                width: "400px",
                height: "400px",
                backgroundColor: "transparent",
                borderRadius: "50%",
                border: "3px solid black",
            }}
        />
    );
};

export default ShapeItem;
