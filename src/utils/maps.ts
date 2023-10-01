import { IssueStatus, PlannerPriority, plannerIssue } from '../types'

export const mapPriority = (input: PlannerPriority): number => {
    const priorityMap = {
        "": 0,
        Urgent: 1,
        Important: 2,
        Medium: 3,
        Low: 4,
    };

    return priorityMap[input] ?? 0;

};

// TODO: modulrize this to automate the mapping of states
export const mapStatus = (input: IssueStatus): string | undefined => {
    const IssueStatusMap = {
        Backlog: "d3ee9b8a-30e4-42c3-a704-d1a3313ac800", //backlog
        "Not started": "49d318f1-31c7-4687-8029-05a603224778", // todo
        "In progress": "0a47b1cb-7d46-469e-90cf-243a97355e16", // in progress
        Completed: "2115faae-0233-4dcd-8d5c-c148e795d38b", // done
        Canceled: "f2b7030d-cd78-4e73-a307-ffdaf1e0a86c",
    };

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
        labelIds: input["labels"],
        checklist: input["checklist"],
        stateId: mapStatus(input["Progress"]),
        createdAt: mapDate(input["Created Date"]),
        dueDate: mapDate(input["Due Date"]),
        startedAt: mapDate(input["Start Date"]),
        completedAt: mapDate(input["Completed Date"]),
    };

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