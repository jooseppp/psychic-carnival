import React, { useState } from "react";
import { Nav } from "react-bootstrap";
import "./Drawer.css";

const Drawer: React.FC = () => {
    const [isVisible, setVisible] = useState(false);

    const onClickHandler = () => {
        setVisible(!isVisible);
    };

    return (
        <Nav className="nav_container" 
        activeKey="test2">
            <Nav.Item className="nav_item" >
                <Nav.Link eventKey="test1">Test</Nav.Link>
            </Nav.Item>
            <Nav.Item className="nav_item">
                <Nav.Link eventKey="test2">Test2</Nav.Link>
            </Nav.Item>
            <Nav.Item className="nav_item">
                <Nav.Link eventKey="disabled" disabled>
                    Disabled
                </Nav.Link>
            </Nav.Item>
        </Nav>
    );
};

export default Drawer;
