import { Action, ThunkAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

export interface UserEvent {
    id: number;
    title: string;
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
            const res = await fetch("http://localhost:3001/api");
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
        event: string; // Should be UserEvent
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
            // TODO Create Request stuff
            dispatch({
                type: CREATE_SUCCESS,
                payload: { event: "tere" },
            });
        } catch (e) {
            dispatch({
                type: CREATE_FAILURE,
                error: "Failed to create event",
            });
        }
    };


const initialState: UserEventsState = {
    byIds: {},
    allIds: []
}

