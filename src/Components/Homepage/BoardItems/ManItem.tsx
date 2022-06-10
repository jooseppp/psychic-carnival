import React from "react";
import { motion } from "framer-motion";


const Person: React.FC = () => {
    const enterHandler = () => {
        console.log("spawned");
    };
    return (
        <>
            <motion.div
                drag={true}
                onViewportEnter={enterHandler}
                dragConstraints={{ left: 0, right: 1820 }}
                whileDrag={{ scale: 1 }}
                style={{
                    position: "absolute",
                    zIndex: 10,
                    width: "50px",
                    height: "50px",
                    backgroundColor: "red",
                }}
                whileHover={{  }}
            />
        </>
    );
};

export default Person;
