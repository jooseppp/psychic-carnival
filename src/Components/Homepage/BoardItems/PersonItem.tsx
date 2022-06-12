import React, { useEffect } from "react";
import {
    animate,
    motion,
    useMotionValue,
    useSpring,
    useVelocity,
} from "framer-motion";

interface PersonItemProps {
    name: string;
    posX: number;
    posY: number;
    onClick?: (e: React.MouseEventHandler<HTMLDivElement>) => void;
}

const PersonItem: React.FC<PersonItemProps> = ({
    name,
    posX,
    posY,
    // onChangePos,
}) => {
    // const setPosX = Math.abs(window.innerWidth - (window.innerWidth + posX));
    // const setPosY = Math.abs(window.innerHeight - (window.innerHeight + posY));
    // const onChangePos = (posX: number, posY: number): void => {
    //     console.log(x.getVelocity());
    // };


    let x = useMotionValue(0);

    const onDragEndHandler = () => {};

    // const spring = {
    //     gentle: {
    //         mass: 20,
    //         friction: 180,
    //     },
    // };

    // const container = {
    //     expanded: {
    //         transition: spring.gentle,
    //     },
    // };

    const onClickHandler = (info: any) => {
        // console.log(name, "X: ", info.pageX, " Y: ", info.pageY);
    };

    return (
        <motion.div
            drag={true}
            animate="expanded"
            // variants={container}
            // onDrag={(event, info) => onChangePos(info.point.x, info.point.y)}
            onDragEnd={(event) => onDragEndHandler}
            style={{
                left: `${posX}px`,
                top: `${posY}px`,
                position: "absolute",
                width: "30px",
                height: "30px",
                backgroundColor: "red",
                borderRadius: "50%",
            }}
        ></motion.div>
    );
};

export default PersonItem;
