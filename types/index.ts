enum JobType {
    SCORER,
    OFFICIAL
}

export interface UserDto {
    id: number
    display_name: string
    email: string
}

export interface User {
    id: string
    name: string
    email: string
}

// TODO implement this base to all other Team-interfaces
export interface BasicTeamDto {
    id: number
    name: string
    admin_id: number
}

export interface BasicTeam {
    id: string
    name: string
    adminId: string
}

export interface TeamDto {
    id: number
    name: string
    is_admin: number
    is_subscribed: number
}

export interface Team {
    id: string
    name: string
    isSubscribed: boolean
    isAdmin: boolean
}

export interface PublicEvent {
    id: string
    teamId: string
    name: string
    description: string | null
    startDatetime: Date
    setupComplete: boolean
}

// TODO implement this as base to all other Event-interfaces
// TODO unused... delete?
export interface BasicEventDto {
    id: number
    name: string
    description: string | null
    start_datetime: number
    team_id: number
    complete: number
}

export interface BasicEvent {
    id: string
    name: string
    description: string | null
    startDatetime: Date
    teamId: string
    setupComplete: boolean
}

export interface EventDto {
    id: number
    team_id: number
    name: string
    description: string | null
    start_datetime: number
    complete: number
    is_volunteering: number
    is_assigned: number
}

export interface Event {
    id: string
    teamId: string
    name: string
    description: string | null
    startDatetime: Date
    setupComplete: boolean
    isVolunteering: boolean
    isAssigned: boolean
}

export interface DetailedEventDto {
    admin: UserDto
    team: BasicTeamDto
    event: EventDto
    jobs: JobAndAssigneeDto[]
}

export interface DetailedEvent {
    admin: User
    team: BasicTeam
    event: Event
    jobs: JobAndAssignee[]
}

export interface DetailedManagedEventDto {
    id: number
    team_id: number
    name: string
    description: string | null
    start_datetime: number
    complete: number
    volunteers: VolunteerDto[]
    jobs: JobDto[]
}

export interface DetailedManagedEvent {
    event: Event
    volunteers: Map<String, Volunteer>
    jobs: Map<String, Job>
}

export interface DetailedManagedEventCreator {
    event: Event
    scorers: number
    officials: number
}

export interface VolunteerDto {
    id: number
    display_name: string
}

export interface Volunteer {
    id: string
    displayName: string
    assigned: boolean
}

export interface JobDto {
    id: number
    type: string
    user_id: number | null
}

export interface Job {
    id: string
    jobName: string
    userId: string | null
}

export interface JobAndAssigneeDto {
    id: number
    type: string
    assignee_id: number | null
    assignee_name: string | null
}

export interface JobAndAssignee {
    jobId: string
    jobName: string
    assigneeId: string | null
    assigneeName: string | null
}

export interface EventListItemDto {
    id: number
    name: string
    start_datetime: number
    description: string
    team_id: number
    is_subscribed: number
    is_assigned: number
}