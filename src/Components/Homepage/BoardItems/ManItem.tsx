import React from "react";
import { motion } from "framer-motion";

const ManItem: React.FC = () => {
    const enterHandler = () => {
        console.log("spawned");
    };
    return (
        <>
            <motion.div
                drag={true}
                onViewportEnter={enterHandler}
                dragConstraints={{ left: 0, right: 500 }}
                whileDrag={{ scale: 2 }}
                style={{
                    width: "50px",
                    height: "50px",
                    backgroundColor: "red",
                }}
                whileHover={{ scale: 1.1 }}
            />
        </>
    );
};

export default ManItem;
