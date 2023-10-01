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
        Backlog: "410cb303-c836-460a-81a0-1716f6bbb28a", //backlog
        "Not started": "0d712346-1480-4894-8f2d-80b749e7ea1e", // todo
        "In progress": "cf8e9dc3-f227-48be-9f57-b3a14d65a81c", // in progress
        Completed: "03e2ce23-6db4-4fc5-b84f-3d2976bc88e8", // done
        Canceled: "281862f0-9cad-492c-af75-069729ff14ae", // cancelled
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
        labelIds: [input["labels"]],
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