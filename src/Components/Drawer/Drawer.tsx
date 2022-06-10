import React from "react"

// interface DrawerProps {
//     // TODO Remove mousehandlerEvent from any
//     buttonClickHandler: (e: React.MouseEventHandler<HTMLButtonElement | any>) => void;
// }

const Drawer: React.FC = () => {
    const buttonClickHandler = () => {
        console.log("Clicked")
    }

    return (
        <div>
            {/* <li>
                <button onClick={buttonClickHandler}>Vajuta</button>
            </li> */}
        </div>
    )
}

export default Drawer
