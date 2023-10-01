import { IssueStatus, PlannerPriority, plannerIssue } from '../types'
import { onlyOneAssignee } from './helpers';

const fromPlannerLabelId = "755b903d-bead-49f3-b9bc-41231aa10532";

const IssueStatusMap = {
    "In progress": "ce137612-945d-41d6-aa91-eaa52ae460fb", // in progress
    Canceled: "94ac8f0d-5f81-4e28-91b7-c320212444c9", // cancelled
    Backlog: "80545467-575f-45cb-b30a-1655a44d8e68", //backlog
    "Not started": "3f16dfe2-9f83-4b3f-a3c0-4313111c64de", // todo
    Completed: "3d0132fc-ee60-41d2-b5e7-63c93515e13a", // done
};

const membersMap: any = {
    "": undefined,
    "Atheer Alotaibi": "aa28a6a1-acba-4fab-9bb5-ff618e2316fb",
    "Hussain Alsaffar": "50d5fcf0-44b9-40a0-aead-d2b75841d10d",
    "Reem Abahussian": "48db9f27-616d-4070-adbf-4cb0ee2b5850",
    "Mutlaq Aldhubaib": "5f0a2780-4f87-4c12-b12e-52c502a429c4",
    "Mohannad Otaibi": "5bf18e83-c541-447c-9bc8-43f20a79f14a",
}

const priorityMap = {
    "": 0,
    Urgent: 1,
    Important: 2,
    Medium: 3,
    Low: 4,
};

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
    };
    console.log(linearIssue)

    return linearIssue;
};

export const mapChecklists = (items: any, completions: any) =>{
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