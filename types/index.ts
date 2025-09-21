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
    start_datetime: string,
    complete: boolean,
};

export interface DetailedManagedEvent {
    id: string,
    team_id: string,
    name: string,
    description: string | null,
    start_datetime: string,
    complete: boolean,
    volunteers: Volunteer[]
    jobs: Job[]
};

export interface Volunteer {
    id: string,
    display_name: string
};

export interface Job {
    id: string,
    type: string,
    user_id: string
};
