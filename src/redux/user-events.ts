export interface UserEvent {
    id: number;
    title: string;
}

interface UserEventsState {
    byIds: Record<UserEvent["id"], UserEvent>;
    allIds: UserEvent["id"][];
}
