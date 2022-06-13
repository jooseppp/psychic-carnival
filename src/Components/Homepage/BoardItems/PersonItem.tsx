import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { UserEvent } from "../../../redux/user-events";

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
        console.log(position);
    }, []);

    return (
        <>
            {position ? (
                <>
                    <motion.div
                        drag
                        dragMomentum={false}
                        style={{
                            position: "absolute",
                            marginLeft: `${position.setposX}px`,
                            marginTop: `${position.setposY}px`,
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
