import { Action, ThunkAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { ItemType } from "../Components/lib/intefaces";
import { Person } from "../Components/lib/intefaces";
import { Shape } from "../Components/lib/intefaces";

export interface UserEvent {
    id: number;
    title: string;
    board: {
        people: Person[];
        shapes: Shape[];
    };
}

interface UserEventsState {
    byIds: Record<UserEvent["id"], UserEvent>;
    allIds: UserEvent["id"][];
}

const LOAD_REQUEST = "userEvents/load_request";
const LOAD_SUCCESS = "userEvents/load_success";
const LOAD_FAILURE = "userEvents/load_failure";

interface LoadRequestAction extends Action<typeof LOAD_REQUEST> {}

interface LoadSuccessAction extends Action<typeof LOAD_SUCCESS> {
    payload: {
        events: UserEvent[];
    };
}

interface LoadFailureAction extends Action<typeof LOAD_FAILURE> {
    error: string;
}

export const loadUserEvents =
    (): ThunkAction<
        void,
        RootState,
        undefined,
        LoadRequestAction | LoadSuccessAction | LoadFailureAction
    > =>
    async (dispatch, getState) => {
        dispatch({
            type: LOAD_REQUEST,
        });
        try {
            const res = await fetch("http://localhost:3001/items");
            const events: UserEvent[] = await res.json();
            dispatch({
                type: LOAD_SUCCESS,
                payload: { events },
            });
        } catch (e) {
            dispatch({
                type: LOAD_FAILURE,
                error: "Failed to load events",
            });
        }
    };

const CREATE_REQUEST = "userEvents/create_request";
const CREATE_FAILURE = "userEvents/create_failure";
const CREATE_SUCCESS = "userEvents/create_success";

interface CreateRequestAction extends Action<typeof CREATE_REQUEST> {}

interface CreateSuccessAction extends Action<typeof CREATE_SUCCESS> {
    payload: {
        event: UserEvent;
    };
}

interface CreateFailureAction extends Action<typeof CREATE_FAILURE> {
    error: string;
}

export const createUserEvent =
    (): ThunkAction<
        Promise<void>,
        RootState,
        undefined,
        CreateRequestAction | CreateSuccessAction | CreateFailureAction
    > =>
    async (dispatch, getState) => {
        dispatch({
            type: CREATE_REQUEST,
        });
        try {
            const event: Omit<UserEvent, "id"> = {
                title: "test",
                board: {
                    people: [
                        {
                            id: 1,
                            name: "test1",
                            posX: 200,
                            posY: 200,
                        },
                        {
                            id: 2,
                            name: "test2",
                            posX: 300,
                            posY: 300,
                        },
                    ],
                    shapes: [
                        {
                            id: 1,
                            shapeType: "circle",
                            posX: 120,
                            posY: 320,
                            heigth: 300,
                            width: 300,
                            onShape: [1, 2],
                        },
                    ],
                },
            };

            const response = await fetch("http://localhost:3001/items", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(event),
            });

            const createdEvent: UserEvent = await response.json();

            dispatch({
                type: CREATE_SUCCESS,
                payload: { event: createdEvent },
            });
        } catch (e) {
            dispatch({
                type: CREATE_FAILURE,
                error: "Failed to create event",
            });
        }
    };

const selectUserEventsState = (rootState: RootState) => rootState.userEvents;

export const selectUserEventsArray = (rootState: RootState) => {
    const state = selectUserEventsState(rootState);
    return state.allIds.map((id) => state.byIds[id]);
};

const initialState: UserEventsState = {
    byIds: {},
    allIds: [],
};

const userEventsReducer = (
    state: UserEventsState = initialState,
    action: LoadSuccessAction | CreateSuccessAction
) => {
    switch (action.type) {
        case LOAD_SUCCESS:
            const { events } = action.payload;
            return {
                ...state,
                allIds: events.map(({ id }) => id),
                byIds: events.reduce<UserEventsState["byIds"]>(
                    (byIds, event) => {
                        byIds[event.id] = event;
                        return byIds;
                    },
                    {}
                ),
            };
        case CREATE_SUCCESS:
            const { event } = action.payload;
            return {
                ...state,
                allIds: [...state.allIds, event.id],
                byIds: { ...state.byIds, [event.id]: event },
            };
        default:
            return state;
    }
};

export default userEventsReducer;
