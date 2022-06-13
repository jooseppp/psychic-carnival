// import React, { useEffect, useState } from "react";
// import { connect, ConnectedProps } from "react-redux";
// import { RootState } from "../../redux/store";
// import { selectUserEventsArray, loadUserEvents } from "../../redux/user-events";
// import { UserEvent } from "../../redux/user-events";

// const mapStateToProps = (state: RootState) => ({
//     items: selectUserEventsArray(state),
// });

// const mapDispatchToProps = {
//     loadUserEvents,
// };

// const connector = connect(mapStateToProps, mapDispatchToProps);

// type PropsFromRedux = ConnectedProps<typeof connector>;

// interface Props extends PropsFromRedux {
//     children?: JSX.Element | JSX.Element[];
// }

// const groupItemsByBoard = (items: UserEvent[]) => {
//     const groups: Record<string, UserEvent[]> = {};

//     const addToGroups = (itemKey: number, item: UserEvent) => {
//         if (groups[itemKey] === undefined) {
//             groups[itemKey] = [];
//         }
//         groups[itemKey].push(item);
//     };

//     items.forEach((item) => {
//         const itemKey = item.id;
//         addToGroups(itemKey, item);
//     });
//     return groups;
// };

// const Testpage: React.FC<Props> = ({ items, loadUserEvents }) => {
//     const [loading, setLoading] = useState(false);
//     const [showData, setShowData] = useState(false);
//     const [activeData, setActiveData] = useState(1);

//     let groupedItems: ReturnType<typeof groupItemsByBoard> | undefined;
//     let sortedGroupKeys: string[] | undefined;
//     if (items.length) {
//         groupedItems = groupItemsByBoard(items);
//         sortedGroupKeys = Object.keys(groupedItems).sort();
//     }

//     const posChangeHanlder = (): { posX: number; posY: number } => {
//         return { posX: 200, posY: 300 };
//     };

//     const handleOnClick = (key: string) => {
//         const itemKeyNumber = +key;
//         return (event: React.MouseEvent) => {
//             setShowData(true);
//             setActiveData(itemKeyNumber);
//         };
//     };

//     useEffect(() => {
//         loadUserEvents();
//         setLoading(false);
//     }, []);

//     return (
//         <>
//             <div className="board">
//                 {sortedGroupKeys?.map((itemKey) => {
//                     const items = groupedItems ? groupedItems[itemKey] : [];
//                     return (
//                         <>
//                             <button
//                                 key={itemKey}
//                                 onClick={handleOnClick(itemKey)}
//                             >
//                                 {itemKey}
//                             </button>
//                         </>
//                     );
//                 })}
//                 <br></br>
//                 {showData ? (
//                     <div className="d-flex">
//                         {sortedGroupKeys?.map(() => {
//                             const items = groupedItems
//                                 ? groupedItems[activeData]
//                                 : [];
//                             return (
//                                 <div>
//                                     {items &&
//                                         items.map((item) => {
//                                             return (
//                                                 <>
//                                                     <h3>{item.title}</h3>
//                                                     <h4>Person</h4>
//                                                     {item.board.people.map(
//                                                         (person) => {
//                                                             return (
//                                                                 <ul>
//                                                                     <li>
//                                                                         ID:{" "}
//                                                                         {
//                                                                             person.id
//                                                                         }
//                                                                     </li>
//                                                                     <li>
//                                                                         Name:{" "}
//                                                                         {
//                                                                             person.name
//                                                                         }
//                                                                     </li>
//                                                                     <li>
//                                                                         PosX:{" "}
//                                                                         {
//                                                                             person.posX
//                                                                         }
//                                                                     </li>
//                                                                     <li>
//                                                                         PosY:{" "}
//                                                                         {
//                                                                             person.posY
//                                                                         }
//                                                                     </li>
//                                                                 </ul>
//                                                             );
//                                                         }
//                                                     )}
//                                                     <br></br>
//                                                     <h4>Shapes</h4>
//                                                     {item.board.shapes.map(
//                                                         (shape) => {
//                                                             return (
//                                                                 <ul>
//                                                                     <li>
//                                                                         ID:{" "}
//                                                                         {
//                                                                             shape.id
//                                                                         }
//                                                                     </li>
//                                                                     <li>
//                                                                         Type:{" "}
//                                                                         {
//                                                                             shape.type
//                                                                         }
//                                                                     </li>
//                                                                 </ul>
//                                                             );
//                                                         }
//                                                     )}
//                                                 </>
//                                             );
//                                         })}
//                                 </div>
//                             );
//                         })}
//                     </div>
//                 ) : (
//                     <></>
//                 )}
//             </div>
//         </>
//     );
// };

// export default connector(Testpage);
