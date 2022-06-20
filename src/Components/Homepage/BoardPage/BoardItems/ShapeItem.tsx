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

    triggerPositionUpdate(
        id: number,
        shapeType: string,
        posX: number,
        posY: number,
        children?: number[] | undefined
    ): void;
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
    triggerPositionUpdate,
}) => {
    const [hasChildren, setHasChildren] = useState(true);
    const [children, setChildren] = useState<number[] | undefined>(undefined);
    const [pointsOnCircle, setPointsOnCircle] = useState<
        PointsOnCircleProps | {}
    >({});
    const [arrHelper, setArrHelper] = useState<number[]>([]);

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
            <motion.div
                drag
                dragMomentum={false}
                onDragEnd={(event, info) => {
                    if (hasChildren && children) {
                        triggerPositionUpdate(
                            id,
                            "shape",
                            info.point.x,
                            info.point.y,
                            [1]
                        );
                    }
                }}
                style={{
                    position: "absolute",
                    marginLeft: `${posX}px`,
                    marginTop: `${posY}px`,
                    height: `${heigth}px`,
                    width: `${width}px`,
                    backgroundColor: "none",
                    border: "1px solid black",
                    borderRadius: "50%",
                }}
            >
                <div
                    className="children_container"
                    style={{ width: "100%", height: "100%" }}
                >
                    {hasChildren ? (
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
                    ) : (
                        <></>
                    )}
                </div>

                {/* {pointsOnCircle && arrHelper.length > 0 && (
                    <>
                        {arrHelper.forEach((arrItem) => {
                            const data: PointsProps =
                                Object.entries(pointsOnCircle)[arrItem][1];
                            const posX = data.posX;
                            const posY = data.posY;
                            return (
                                <PersonItem
                                    key={1}
                                    id={1}
                                    name={"test"}
                                    posX={300}
                                    posY={300}
                                    triggerPositionUpdate={testFunc}
                                    // Next method does nothing
                                    // getPosInfo={testFunc}
                                />
                            );
                        })}
                    </>
                )} */}

                {/* {hasChildren ? (
                    <div>
                        <PersonItem
                            key={1}
                            id={1}
                            name={"test"}
                            posX={300}
                            posY={300}
                            triggerPositionUpdate={testFunc}
                            // Next method does nothing
                            // getPosInfo={testFunc}
                        />
                    </div>
                ) : (
                    <></>
                )} */}
            </motion.div>
        </>
    );
};

export default ShapeItem;
