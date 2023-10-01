import { LinearClient } from '@linear/sdk';
import { mapStatus,} from './'

export const createMainIssue = async (linearClient: LinearClient, issue: any) => {
    const startedAt = issue.startedAt;
    const completedAt = issue.completedAt;
    const checklist = issue.checklist;
    
    delete issue.startedAt;
    delete issue.completedAt;
    delete issue.checklist;

    const myissue = await linearClient.createIssue(issue);

    const lastIssue : any = await myissue.issue;
    lastIssue.startedAt = startedAt;
    lastIssue.completedAt = completedAt;

    console.log(`created issue ${lastIssue.title} ${lastIssue.id}`)
    
    // if issue contained checklists, create sub issues
    if(checklist != undefined){
        const subIssuePromises = checklist.map((item: any) => {
            item.parentId = lastIssue.id;
            item.assigneeId = issue.assigneeId;
            item.teamId = issue.teamId;
            item.priority = issue.priority;
            item.labelIds = issue.labelIds;
            item.projectId = issue.projectId;
            return createSubIssue(linearClient, item);
          });
          await Promise.all(subIssuePromises);
    }
    return lastIssue;
}

export const createSubIssue = async (linearClient: LinearClient, issue: any) => {
    const issueObject = {
        teamId: issue.teamId,
        title: issue.title,
        description: issue.description,
        priority: issue.priority,
        labelIds: issue.labelIds,
        projectId: issue.projectId,
        assigneeId: issue.assigneeId,
        stateId: (issue.completed) ? mapStatus("Completed") : mapStatus("In progress"),
        parentId: issue.parentId,
    }

    const myissue = await linearClient.createIssue(issueObject);
    const lastIssue: any = await myissue.issue;

    console.log(`${issueObject.parentId}-created sub issue ${lastIssue.title} ${lastIssue.id}`)

    return myissue;
}