export interface UserDto {
    id: number,
    display_name: string,
    email: string
};

export interface User {
    id: string,
    name: string,
    email: string
};

export interface TeamDto {
    id: number,
    name: string,
    is_admin: number,
    is_subscribed: number
};

export interface Team {
    id: string,
    name: string,
    isSubscribed: boolean,
    isAdmin: boolean
};

export interface PublicEvent {
    id: string,
    teamId: string,
    name: string,
    description: string | null,
    startDatetime: Date,
    setupComplete: boolean
};

export interface EventDto {
    id: number,
    team_id: number,
    name: string,
    description: string | null,
    start_datetime: number,
    complete: number
};

export interface Event {
    id: string,
    teamId: string,
    name: string,
    description: string | null,
    startDatetime: Date,
    setupComplete: boolean
};

export interface DetailedManagedEventDto {
    id: number,
    team_id: number,
    name: string,
    description: string | null,
    start_datetime: number,
    complete: number,
    volunteers: VolunteerDto[]
    jobs: JobDto[]
};

export interface DetailedManagedEvent {
    id: string,
    teamId: string,
    name: string,
    description: string | null,
    startDatetime: Date,
    setupComplete: boolean,
    volunteers: Volunteer[]
    jobs: Job[]
};

export interface VolunteerDto {
    id: number,
    display_name: string
};

export interface Volunteer {
    id: string,
    displayName: string,
    assigned: boolean
};

export interface JobDto {
    id: number,
    type: string,
    user_id: string | undefined
};

export interface Job {
    id: string,
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
    is_subscribed: number,
    is_assigned: number
}