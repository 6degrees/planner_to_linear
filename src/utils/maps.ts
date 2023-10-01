import { IssueStatus, PlannerPriority, plannerIssue } from '../types'
import { onlyOneAssignee } from './helpers';
import { membersMap, priorityMap, IssueStatusMap, fromPlannerLabelId } from './constants';

export const mapMembers = (input: []): string => {
    const onlyOne = onlyOneAssignee(input);
    return membersMap[onlyOne] || undefined;
}

export const mapPriority = (input: PlannerPriority): number => {
    return priorityMap[input] ?? 0;
};

// TODO: modulrize this to automate the mapping of states
export const mapStatus = (input: IssueStatus): string | undefined => {
    return IssueStatusMap[input] ?? undefined;
};

const mapDate = (input: string): Date | undefined => {
    // get the input format of the date
    // if the input is empty, return undefined
    if (input == "") return undefined;

    // output in native new Date()

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
        labelIds: [fromPlannerLabelId],
        checklist: input["checklist"],
        stateId: mapStatus(input["Progress"]),
        createdAt: mapDate(input["Created Date"]),
        dueDate: mapDate(input["Due Date"]),
        startedAt: mapDate(input["Start Date"]),
        completedAt: mapDate(input["Completed Date"]),
        createAsUser: input["Creator"],
    };

    return linearIssue;
};

/*  if item contains Checklist Items, store it as issue["checklist"] = [ { title: "item 1", completed: true }, { title: "item 2", completed: false } ] 
    and get the completion status from the column issue["Completed Checklist Items"] where when it says "2/7" (this is the format of the completed checklist
    items field) there should be 7 checlist items and the first two are completed
*/
export const mapChecklists = (items: any, completions: any) => {
    let checklists: any = [];

    if (items != "") {
        checklists = items.split(';').map((item: string, index: number) => {
            const completedItems = parseInt(completions.split('/')[0]) - 1;

            return {
                title: item,
                completed: index <= completedItems ? true : false
            }
        });
    }

    return checklists;
}