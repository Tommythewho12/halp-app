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
    start_datetime: Date,
    complete: boolean,
};

export interface DetailedManagedEventDto {
    id: string,
    team_id: string,
    name: string,
    description: string | null,
    start_datetime: number,
    complete: boolean,
    volunteers: Volunteer[]
    jobs: JobDto[]
};

export interface DetailedManagedEvent {
    id: string,
    team_id: string,
    name: string,
    description: string | null,
    start_datetime: Date,
    complete: boolean,
    volunteers: Volunteer[]
    jobs: Job[]
};

export interface Volunteer {
    id: string,
    display_name: string
};

export interface JobDto {
    id: string,
    type: string,
    user_id: string | null
};

export interface Job {
    id: string,
    jobName: string,
    userName: string | null
};

// DTOs
export interface EventListItemDto {
    id: string;
    name: string;
    start_datetime: number;
    description: string;
    team_id: number,
    is_subscribed: boolean,
    is_assigned: boolean
}