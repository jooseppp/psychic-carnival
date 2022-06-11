import React from "react";
import { motion } from "framer-motion";

interface PersonItemProps {
    name: string;
    posX: number;
    posY: number;
    // onChangePos?: () => {
    //     posX: number;
    //     posY: number;
    // };
}

const PersonItem: React.FC<PersonItemProps> = ({
    name,
    posX,
    posY,
    // onChangePos,
}) => {
    const setPosX = Math.abs(window.innerWidth - (window.innerWidth + posX));
    const setPosY = Math.abs(window.innerHeight - (window.innerHeight + posY));
    const onChangePos = (posX: number, posY: number): void => {
        // console.log(posX, posY);
    };


    return (
        <motion.div
            drag={true}
            onDrag={(event, info) => onChangePos(info.point.x, info.point.y)}
            style={{
                marginLeft: `${setPosX}px`,
                marginTop: `${setPosY}px`,
                width: "30px",
                height: "30px",
                backgroundColor: "red",
                borderRadius: "50%",
            }}
        ></motion.div>
    );
};

export default PersonItem;
