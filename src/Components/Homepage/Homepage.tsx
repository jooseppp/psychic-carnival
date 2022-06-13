import React, { useEffect, useState } from "react";
import { RootState } from "../../redux/store";
import { connect, ConnectedProps } from "react-redux";
import { selectUserEventsArray, loadUserEvents } from "../../redux/user-events";
import Drawer from "../Drawer/Drawer";
import PersonItem from "./BoardPage/BoardItems/PersonItem";
import ShapeItem from "./BoardPage/BoardItems/ShapeItem";
import { UserEvent } from "../../redux/user-events";
import { Modal, ModalFooter, Button } from "react-bootstrap";
import BoardPage from "./BoardPage/BoardPage";
import "./Homepage.css";

const mapState = (state: RootState) => ({
    items: selectUserEventsArray(state),
});

const mapDispatch = {
    loadUserEvents,
};

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

interface Props extends PropsFromRedux {
    children?: JSX.Element | JSX.Element[];
}

const Homepage: React.FC<Props> = ({ items, loadUserEvents }) => {
    useEffect(() => {
        loadUserEvents();
        handleShow();
        setLoading(false);
        setShow(true);
    }, []);

    const [loading, setLoading] = useState(true);
    const [people, setPeople] = useState<UserEvent[]>([]);
    const [show, setShow] = useState(false);
    const [activeBoard, setActiveBoard] = useState<number>(0);
    const [activeData, setActiveData] = useState<UserEvent | undefined>(
        undefined
    );

    const handleShow = () => setShow(true);

    const handleClose = () => setShow(false);

    const onClickHanlder = (id: number): void => {
        setActiveBoard(id);
        setActiveData(items[id - 1]);
        handleClose();
    };

    return (
        <>
            <Drawer />
            <div className="homepage_container">
                <div className="on_start_modal">
                    <Modal show={show}>
                        <Modal.Header closeButton>
                            <Modal.Title>Vali tants</Modal.Title>
                        </Modal.Header>
                        <Modal.Body style={{ textAlign: "center" }}>
                            {items.map((item) => {
                                return (
                                    <>
                                        <Button
                                            key={item.id}
                                            onClick={() =>
                                                onClickHanlder(item.id)
                                            }
                                            style={{ marginLeft: 10 }}
                                            type="submit"
                                            className="primary"
                                        >
                                            {item.title}
                                        </Button>
                                    </>
                                );
                            })}
                        </Modal.Body>
                    </Modal>
                </div>
                {activeBoard == 0 && activeData ? (
                    <BoardPage key={activeBoard} />
                ) : (
                    <BoardPage key={activeBoard} danceData={activeData} />
                )}
            </div>
        </>
    );
};

export default connector(Homepage);

{
    /*  */
}
