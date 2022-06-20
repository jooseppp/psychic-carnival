import React, { MouseEventHandler, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { UserEvent } from "../../../../redux/user-events";
import { Shape } from "../../../lib/intefaces";
import PersonItem from "./PersonItem";
import { PersonItemProps } from "./PersonItem";
import {
    Overlay,
    OverlayTrigger,
    Tooltip,
    Button,
    Popover,
} from "react-bootstrap";

interface ShapeItemProps {
    id: number;
    shapeType: string;
    posX: number;
    posY: number;
    heigth: number;
    width: number;
    onShape: UserEvent["id"][] | [];

    // triggerPositionUpdate(
    //     id: number,
    //     shapeType: string,
    //     posX: number,
    //     posY: number,
    //     children?: number[] | undefined
    // ): void;
}

interface PointsProps {
    posX: number;
    posY: number;
}

interface PointsOnCircleProps {
    id: string;
    position: PointsProps[];
}

const ShapeItem: React.FC<ShapeItemProps> = ({
    id,
    shapeType,
    posX,
    posY,
    heigth,
    width,
    onShape,
    // triggerPositionUpdate,
}) => {
    const [hasChildren, setHasChildren] = useState(true);
    const [children, setChildren] = useState<number[] | undefined>(undefined);
    const [pointsOnCircle, setPointsOnCircle] = useState<
        PointsOnCircleProps | {}
    >({});
    const [arrHelper, setArrHelper] = useState<number[]>([]);
    const [dragEnabled, setDragEnabled] = useState<boolean>(false);
    const [dragEnd, setDragEnd] = useState<boolean>(false);

    const handleClickEvent = () => {
        console.log("click");
        setDragEnabled(true);
        setDragEnd(false);
    };

    const handleButtonClick = () => {
        console.log("end");
        setDragEnd(true);
        setDragEnabled(!dragEnabled);
    };

    const initShape = (onShape: number[]) => {
        setHasChildren(true);
        const getChildren = (onShape: number[]): number[] => {
            let childArr: number[] = [];
            onShape.forEach((child) => {
                childArr.push(child);
            });
            return childArr;
        };
        setChildren(getChildren(onShape));
    };

    const renderHangPoints = () => {
        const circleDeg = 360;
        const center_x = width / 2 - 5;
        const center_y = heigth / 2 - 5;

        const radius = width / 2;
        const pointCount = 8;
        const renderPoints: Record<number, number[]> = {};
        const assignPoints = (): Record<number, number[]> => {
            const everyPointDiff = circleDeg / pointCount;
            let result: number = 0;
            let y: number = 0;
            let x: number = 0;
            for (let i = 0; i < pointCount; i++) {
                let distance = 0;
                result += everyPointDiff;
                // Calculate position of x,y on circle using trigonometry
                // Since we are using x,y positions to put them on the circle, they will align to the grid
                // from left and top, which means their position will be offset
                // by half of the size of the dot. So considering this, you should subtract half of the rendered
                // circle heigth and width from center_x and center_y
                x = center_x + radius * Math.cos((result * Math.PI) / 180); // * distance * 100) / width;
                y = center_y + radius * Math.sin((result * Math.PI) / 180); // * distance * 100 / heigth;
                renderPoints[i] = [x, y];
            }
            return renderPoints;
        };

        setPointsOnCircle(assignPoints);
    };

    const pointsHelper = (): void => {
        let arr: number[] = [];
        let helper: any;

        for (let key of Object.keys(pointsOnCircle)) {
            helper = Number(key);
            arr.push(helper);
        }

        setArrHelper(arr);
    };

    const testFunc = () => {};

    useEffect(() => {
        if (onShape.length > 0) {
            initShape(onShape);
        } else {
            console.log("Error, no items on shape");
        }
    }, []);

    useEffect(() => {
        renderHangPoints();
        pointsHelper();
    }, [children]);

    return (
        <>
            <motion.circle
                drag
                dragMomentum={false}
                onClick={handleClickEvent}
                style={{
                    position: "absolute",
                    left: `${posX}px`,
                    top: `${posY}px`,
                    height: `${heigth}px`,
                    width: `${width}px`,
                    backgroundColor: "none",
                    border: "1px solid black",
                    borderRadius: "50%",
                    zIndex: 0,
                }}
            >
                {dragEnabled ? (
                    <>
                        {dragEnd ? (
                            <></>
                        ) : (
                            <>
                                <Button
                                    className="btn-primary"
                                    onClick={handleButtonClick}
                                    style={{
                                        marginRight: "20px",
                                        zIndex: 1,
                                    }}
                                >
                                    Yes
                                </Button>
                            </>
                        )}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="36"
                            height="36"
                            fill="currentColor"
                            className="bi bi-arrows-move"
                            viewBox="0 0 16 16"
                        >
                            <path
                                fill-rule="evenodd"
                                d="M7.646.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 1.707V5.5a.5.5 0 0 1-1 0V1.707L6.354 2.854a.5.5 0 1 1-.708-.708l2-2zM8 10a.5.5 0 0 1 .5.5v3.793l1.146-1.147a.5.5 0 0 1 .708.708l-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 0 1 .708-.708L7.5 14.293V10.5A.5.5 0 0 1 8 10zM.146 8.354a.5.5 0 0 1 0-.708l2-2a.5.5 0 1 1 .708.708L1.707 7.5H5.5a.5.5 0 0 1 0 1H1.707l1.147 1.146a.5.5 0 0 1-.708.708l-2-2zM10 8a.5.5 0 0 1 .5-.5h3.793l-1.147-1.146a.5.5 0 0 1 .708-.708l2 2a.5.5 0 0 1 0 .708l-2 2a.5.5 0 0 1-.708-.708L14.293 8.5H10.5A.5.5 0 0 1 10 8z"
                            />
                        </svg>
                    </>
                ) : (
                    <></>
                )}
                <div
                    className="point_container"
                    style={{ width: "100%", height: "100%" }}
                >
                    <>
                        {arrHelper.map((arrItem) => {
                            const data =
                                Object.entries(pointsOnCircle)[arrItem][1];
                            const posX_onCircle: number = data[0];
                            const posY_onCircle: number = data[1];

                            return (
                                <motion.div
                                    drag={false}
                                    className="childOnCricle_entity"
                                    style={{
                                        position: "absolute",
                                        left: `${posX_onCircle}px`,
                                        top: `${posY_onCircle}px`,
                                        height: "10px",
                                        width: "10px",
                                        borderRadius: "50%",
                                        backgroundColor: "black",
                                        border: "2px solid black",
                                        textAlign: "center",
                                    }}
                                ></motion.div>
                            );
                        })}
                    </>
                </div>
            </motion.circle>
        </>
    );
};

export default ShapeItem;
