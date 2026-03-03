export interface UserDto {
    id: number,
    display_name: string,
    email: string
};

export interface User {
    id: number,
    name: string,
    email: string
};

export interface TeamDto {
    id: number,
    name: string,
    is_admin: number,
    is_subscribed: number,
};

export interface Team {
    id: number,
    name: string,
    isSubscribed: boolean,
    isAdmin: boolean
};

export interface ManagedTeam {
    id: number,
    name: string,
    events: ManagedEvent[]
};

export interface ManagedEvent {
    id: number,
    team_id: string,
    name: string,
    description: string | null,
    start_datetime: Date,
    complete: boolean,
};

export interface DetailedManagedEventDto {
    id: number,
    team_id: string,
    name: string,
    description: string | null,
    start_datetime: number,
    complete: boolean,
    volunteers: VolunteerDto[]
    jobs: JobDto[]
};

export interface DetailedManagedEvent {
    id: number,
    teamId: string,
    name: string,
    description: string | null,
    startDatetime: Date,
    complete: boolean,
    volunteers: Volunteer[]
    jobs: Job[]
};

export interface VolunteerDto {
    id: number,
    display_name: string
};

export interface Volunteer {
    id: number,
    displayName: string,
    assigned: boolean
};

export interface JobDto {
    id: number,
    type: string,
    user_id: string | undefined
};

export interface Job {
    id: number,
    jobName: string,
    userName: string | undefined
    userId: string | undefined
};

export interface EventListItemDto {
    id: number;
    name: string;
    start_datetime: number;
    description: string;
    team_id: number,
    is_subscribed: boolean,
    is_assigned: boolean
}