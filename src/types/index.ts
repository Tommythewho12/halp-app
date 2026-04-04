enum JobType {
    SCORER,
    OFFICIAL,
    BALLER,
    CLEANER
}

export interface UserDto {
    id: string
    displayName: string
    email: string
}

export interface User {
    id: string
    name: string
    email: string
}

// TODO implement this base to all other Team-interfaces or delete
export interface BasicTeamDto {
    id: string
    name: string
    adminId: string
}

export interface BasicTeam {
    id: string
    name: string
    adminId: string
}

export interface TeamDto {
    id: string
    name: string
    isAdmin: boolean
    isSubscribed: boolean
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

export interface BasicEventDto {
    id: string
    teamId: string
    name: string
    description: string
    startDatetime: number
    complete: boolean
}

export interface EventDto extends BasicEventDto {
    isVolunteering: boolean
    isAssigned: boolean
}

export interface BasicEvent {
    id: string
    teamId: string
    name: string
    description: string | null
    startDatetime: Date
    setupComplete: boolean
}

export interface Event extends BasicEvent {
    teamName: string
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
    id: string
    teamId: string
    name: string
    description: string | null
    startDatetime: number
    complete: boolean
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
    id: string
    displayName: string
}

export interface Volunteer {
    id: string
    displayName: string
    assigned: boolean
}

export interface JobDto {
    id: string
    type: string
    assigneeId: string | null
}

export interface Job {
    id: string
    jobName: string
    userId: string | null
}

export interface JobAndAssigneeDto {
    id: string
    type: string
    assigneeId: string | null
    assigneeName: string | null
}

export interface JobAndAssignee {
    jobId: string
    jobName: string
    assigneeId: string | null
    assigneeName: string | null
}

export interface EventListItemDto {
    id: string
    name: string
    startDatetime: number
    description: string
    teamId: string
    isSubscribed: boolean
    isAssigned: boolean
}