import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface PersonItemProps {
    id: number;
    name: string;
    posX: number;
    posY: number;
}

const PersonItem: React.FC<PersonItemProps> = ({ name, posX, posY }) => {
    const [position, setPosition] = useState({
        setposX: posX,
        setposY: posY,
    });

    useEffect(() => {
        setPosition({ setposX: posX, setposY: posY });
    }, []);

    return (
        <>
            {position ? (
                <>
                    <motion.div
                        drag
                        dragMomentum={false}
                        dragConstraints={{ left: 0, right: 1000, top: 0 }}
                        style={{
                            left: `${position.setposX}px`,
                            top: `${position.setposY}px`,
                            height: "50px",
                            width: "50px",
                            borderRadius: "50%",
                            backgroundColor: "red",
                        }}
                    />
                </>
            ) : (
                <p>Loading...</p>
            )}
        </>
    );
};

export default PersonItem;
