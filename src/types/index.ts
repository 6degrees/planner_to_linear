export type IssueStatus = "Backlog" | "Not Started" | "In Progress" | "Completed" | "Canceled";
export type PlannerPriority = "Low" | "Medium" | "Important" | "Urgent";
export type plannerIssue = {
    teamId: string;
    'Task Name': string;
    Description: string;
    'projectId': string;
    Priority: PlannerPriority;
    Assignee: string;
    labels: string[];
    Progress: IssueStatus;
    'Created Date': string;
    'Due Date': string;
    'Start Date': string;
    'Completed Date': string;
};