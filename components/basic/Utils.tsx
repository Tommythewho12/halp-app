import { BasicEvent, BasicEventDto, BasicTeam, BasicTeamDto, DetailedEvent, DetailedEventDto, EventDto, Event, JobAndAssignee, JobAndAssigneeDto, User, UserDto } from "@/types";


export function toDate(epoch: number): Date {
    return new Date(epoch * 1000);
}

export function sanitizeNumberInput(num: string): string {
    let newNumber: string = num.replace(`/[^0-9]/g`, '');
    return isNumber(newNumber) ? newNumber : '0';
}

export function safeBooleanConverter(bool: any): boolean {
    if (typeof bool === 'boolean') {
        return bool;
    } else if (typeof bool === 'number') {
        return bool === 1 ? true : false;
    } else if (typeof bool === 'string') {
        return (bool.trim() === '' || bool === '0') ? false : true;
    } else {
        throw new Error("unable to safely parse the value " + bool + " to a boolean");
    }
}

export function safeNumberConverter(num: any): number {
    if (typeof num === 'number') {
        return num;
    } else if (typeof num === 'string' && isNumber(num)) {
        return Number(num);
    } else {
        throw new Error("unable to safely parse the value " + num + " to a number");
    }
}

export function isNumber(num: any): boolean {
    return !isNaN(Number(num));
}

export function is2XXStatus(statusCode: number): boolean {
    return statusCode >= 200 && statusCode < 300;
}

/*
    #### Mappers ####
*/
export function toDetailedEvent(eventDto: DetailedEventDto): DetailedEvent {
    return {
        admin: toUser(eventDto.admin),
        team: toBasicTeam(eventDto.team),
        event: toEvent(eventDto.event),
        jobs: eventDto.jobs.map(j => toJobAndAssignee(j))
    };
}

export function toUser(userDto: UserDto): User {
    return {
        id: String(userDto.id),
        name: userDto.display_name,
        email: userDto.email
    };
}

export function toBasicTeam(teamDto: BasicTeamDto): BasicTeam {
    return {
        id: String(teamDto.id),
        name: teamDto.name,
        adminId: String(teamDto.admin_id)
    };
}

export function toBasicEvent(eventDto: BasicEventDto): BasicEvent {
    return {
        id: String(eventDto.id),
        name: eventDto.name,
        description: eventDto.description,
        startDatetime: toDate(eventDto.start_datetime),
        teamId: String(eventDto.team_id),
        setupComplete: safeBooleanConverter(eventDto.complete)
    };
}

export function toEvent(eventDto: EventDto): Event {
    return {
        id: String(eventDto.id),
        name: eventDto.name,
        description: eventDto.description,
        startDatetime: toDate(eventDto.start_datetime),
        teamId: String(eventDto.team_id),
        setupComplete: safeBooleanConverter(eventDto.complete),
        isVolunteering: safeBooleanConverter(eventDto.is_volunteering),
        isAssigned: safeBooleanConverter(eventDto.is_assigned)
    };
}

export function toJobAndAssignee(jobDto: JobAndAssigneeDto): JobAndAssignee {
    return {
        jobId: String(jobDto.id),
        jobName: jobDto.type,
        assigneeId: String(jobDto.assignee_id),
        assigneeName: jobDto.assignee_name
    };
}