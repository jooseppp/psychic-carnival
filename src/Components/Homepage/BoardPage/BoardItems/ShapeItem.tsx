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
        const center_x = width / 2;
        const center_y = heigth / 2;
        console.log("center_x", center_x);
        console.log("center_y", center_y);

        const radius = width / 2;
        const pointCount = 8;
        const renderPoints: Record<number, number[]> = {};
        const assignPoints = (): Record<number, number[]> => {
            const everyPointDiff = circleDeg / pointCount;
            let result: number = 0;
            let y: number = 0;
            let x: number = 0;
            for (let i = 0; i < pointCount; i++) {
                let distance = 1;
                result += everyPointDiff;
                x =
                    center_x +
                    radius * Math.cos((result * Math.PI) / 180) * distance;
                y =
                    center_y +
                    radius * Math.sin((result * Math.PI) / 180) * distance;
                console.log("i. x,y,deg:", i, x, y, result);
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
                {hasChildren ? (
                    <div className="sucker" style={{ width: "100%" }}>
                        {arrHelper.map((arrItem) => {
                            const data: PointsProps =
                                Object.entries(pointsOnCircle)[arrItem][1];
                            const posXY = data.posX;
                            const posYX = data.posY;
                            return (
                                <motion.div
                                    drag
                                    className="differentDiv"
                                    style={{
                                        position: "absolute",
                                        marginLeft: `${posXY}px`,
                                        marginTop: `${posYX}px`,
                                        height: "50px",
                                        width: "50px",
                                        borderRadius: "50%",
                                        backgroundColor: "black",
                                        border: "2px solid black",
                                        textAlign: "center",
                                    }}
                                ></motion.div>
                            );
                        })}
                    </div>
                ) : (
                    <></>
                )}

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
