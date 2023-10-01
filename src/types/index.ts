export type IssueStatus = "Backlog" | "Not started" | "In progress" | "Completed" | "Canceled";
export type PlannerPriority = "Low" | "Medium" | "Important" | "Urgent";
export interface plannerIssue {
    teamId: string;
    'Task Name': string;
    Description: string;
    'projectId': string;
    checklist: any;
    Priority: PlannerPriority;
    Assignee: string;
    labels: string[];
    Progress: IssueStatus;
    'Created Date': string;
    'Due Date': string;
    'Start Date': string;
    'Completed Date': string;
    'Creator': string;
};