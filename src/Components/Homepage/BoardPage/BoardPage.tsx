import { MotionConfig, motion } from "framer-motion";
import React from "react";
import { UserEvent } from "../../../redux/user-events";

interface BoardPageProps {
    danceData?: UserEvent | undefined;
}

const BoardPage: React.FC<BoardPageProps> = ({ danceData }) => {

    console.log(danceData);
    return (
        <>
            <div className="board">
                {danceData ? <a>Olemas</a> : <p>Loading...</p>}
            </div>
        </>
    );
};

export default BoardPage;
