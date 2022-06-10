import React, { useState } from "react"
import Drawer from "../Drawer/Drawer"
import { motion } from "framer-motion"
import ManItem from "./BoardItems/ManItem"

const ItemsComponent = (props: any) => {
    return <div>{props}</div>
}

interface HomepageProps {
    children?: JSX.Element | JSX.Element[]
}

const Homepage: React.FC<HomepageProps> = () => {
    const [components, setComponents] = useState([<ManItem />])

    const handleClick = () => {
        setComponents([...components, <ManItem />])
    }

    return (
        <div>
            <Drawer />
            <div className="board">
                <button onClick={handleClick}>Click</button>
                {components.map((item, i) => {
                    return (
                        <>
                            <div>{item}</div>
                        </>
                    )
                })}
            </div>
        </div>
    )
}

export default Homepage
