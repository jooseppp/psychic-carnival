import React, { useState } from "react";
import Drawer from "../Drawer/Drawer";
import { motion } from "framer-motion";
import Person from "./BoardItems/ManItem";
import { Shapes } from "../lib/intefaces";
import ShapeItem from "./BoardItems/ShapeItem";

interface HomepageProps {
    children?: JSX.Element | JSX.Element[];
}

const Homepage: React.FC<HomepageProps> = () => {
    const [components, setComponents] = useState([<Person />]);
    const [shapes, setShapes] = useState([<ShapeItem posX={100} posY={100} />]);

    const createItem = () => {
        setComponents([...components, <Person />]);
    };

    const clearItems = () => {
        setComponents([]);
        setShapes([]);
    };

    const createShape = () => {
        const randX = Math.random() * (500-100) + 100;
        const randY = Math.random() * (500-100) + 100;
        setShapes([...shapes, <ShapeItem posX={randX} posY={randY} />]);
    };

    return (
        <div>
            <Drawer />
            <div className="board" style={{zIndex: 99}}>
                <button onClick={createItem}>Create person</button>
                <button onClick={createShape}>Create Shape</button>
                <button onClick={clearItems}>Clear</button>
                {components.map((item, i) => {
                    return (
                        <>
                            <div>{item}</div>
                        </>
                    );
                })}
                {shapes.map((shape) => {
                    return <>{shape}</>;
                })}
            </div>
        </div>
    );
};

export default Homepage;
