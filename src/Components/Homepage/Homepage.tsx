import React, { useEffect, useState } from "react";
import { RootState } from "../../redux/store";
import { connect, ConnectedProps } from "react-redux";
import { selectUserEventsArray, loadUserEvents } from "../../redux/user-events";
import Drawer from "../Drawer/Drawer";
import PersonItem from "./BoardItems/PersonItem";
import ShapeItem from "./BoardItems/ShapeItem";
import { UserEvent } from "../../redux/user-events";

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

const groupItemsByBoard = (items: UserEvent[]) => {
    const groups: Record<string, UserEvent[]> = {};

    const addToGroups = (itemKey: number, item: UserEvent) => {
        if (groups[itemKey] === undefined) {
            groups[itemKey] = [];
        }
        groups[itemKey].push(item);
    };

    items.forEach((item) => {
        const itemKey = item.id;
        addToGroups(itemKey, item);
    });
    return groups;
};

const Homepage: React.FC<Props> = ({ items, loadUserEvents }) => {
    const [loading, setLoading] = useState(true);
    const [people, setPeople] = useState<UserEvent[]>([]);
    let groupedItems: ReturnType<typeof groupItemsByBoard> | undefined;
    if (items.length) {
        groupedItems = groupItemsByBoard(items);
    }

    const posChangeHanlder = (): { posX: number; posY: number } => {
        return { posX: 200, posY: 300 };
    };

    useEffect(() => {
        loadUserEvents();
        setLoading(false);
    }, []);

    return (
        <>
            {loading ? (
                <p>Loading</p>
            ) : (
                <>
                    {items.length > 0 &&
                        items.map((item) => {
                            return (
                                <>
                                    {item.board.people.map((person) => {
                                        return (
                                            <>
                                                <PersonItem
                                                    key={item.id}
                                                    name={person.name}
                                                    posX={person.posX}
                                                    posY={person.posY}
                                                />
                                            </>
                                        );
                                    })}
                                </>
                            );
                        })}
                </>
            )}
        </>
    );
};

export default connector(Homepage);
