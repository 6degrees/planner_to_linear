import { IssueStatus, PlannerPriority, plannerIssue } from '../types'

export const mapPriority = (input: PlannerPriority): number => {
    const priorityMap = {
        "": 0,
        Urgent: 1,
        Important: 2,
        Medium: 3,
        Low: 4,
    };

    return priorityMap[input] || 0;
};

export const mapStatus = (input: IssueStatus): string | undefined => {
    const IssueStatusMap = {
        Backlog: "1725f59a-a891-415e-8cfc-5a6051157696",
        "Not Started": "83297d79-f6ff-4b39-aa0a-19ec00cb50ea",
        "In Progress": "83ce19be-9ba2-4a34-8006-536944f5af6b",
        Completed: "6cb59d04-f2c2-4d8f-bed9-b7fab0eff902",
        Canceled: "4fe36aab-525e-4eb9-90a9-83c96bc873f0",
    };

    return IssueStatusMap[input] || undefined;
};

const mapDate = (input: string): Date | undefined => {
    // if input is empty, return undefined
    if (input == "") return undefined;
    const [month, day, year] = input.split("/").map(str => parseInt(str, 10)); // Specify base 10
    
    return new Date(Date.UTC(year, month - 1, day, 12, 0, 0));
}

export const mapIssue = (input: plannerIssue): any => {
    const linearIssue: any = {
        teamId: input["teamId"],
        title: input["Task Name"],
        description: input["Description"],
        projectId: input["projectId"],
        priority: mapPriority(input["Priority"]),
        assigneeId: input["Assignee"],
        labelIds: input["labels"],
        stateId: mapStatus(input["Progress"]),
        createdAt: mapDate(input["Created Date"]),
        dueDate: mapDate(input["Due Date"]),
        startedAt: mapDate(input["Start Date"]),
        completedAt: mapDate(input["Completed Date"]),
    };

    return linearIssue;
};
