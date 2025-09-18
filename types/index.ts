export interface Team {
    id: string,
    name: string,
    is_admin: boolean,
    is_subscribed: boolean,
};

export interface ManagedTeam {
    id: string,
    name: string,
    events: ManagedEvent[]
};

export interface ManagedEvent {
    id: string,
    team_id: string,
    name: string,
    description: string | null,
    startDateTime: string,
    complete: boolean,
}