import 'dotenv/config'
import csv from "csvtojson";
import { LinearClient } from '@linear/sdk'
import { 
    mapIssue, 
    mapMembers, 
    createBucketsArray, 
    getProjectId, 
    createProjectsMap 
} from './utils'

// Api key authentication
const linearClient = new LinearClient({ apiKey: process.env.LINEAR_API_KEY })


const run = async () => {

    // Get Teams
    const teams = await linearClient.teams();
    const team = teams.nodes[0];

    // get states
    const states = await team.states();
    
    // Get CSV
    const plannerCsvFilePath = './data/1.csv'
    const plannerJsonArray = await csv().fromFile(plannerCsvFilePath);

    // Get projects
    let projects = await linearClient.projects();

    // get a unique list of "Bucket Name" from the plannerJsonArray
    let bucketsArray: any[] = createBucketsArray(plannerJsonArray);

    // lets create a projects map with the bucket name as key and the project id as value
    const projectsMap = await createProjectsMap(linearClient, projects, bucketsArray, team.id);


    let issuesArray: any[] = [];
    
    plannerJsonArray.forEach((issue) => {
        issue["Assignee"] = mapMembers(issue["Assigned To"].split(';'));
        issue["teamId"] = teams.nodes[0].id;
        issue["projectId"] = getProjectId(projectsMap, issue["Bucket Name"]);
        let linearIssue = mapIssue(issue);
        issuesArray.push(linearIssue);
    });

    
    console.log(issuesArray[10])
    await createMainIssue(issuesArray[10])

    process.exit(0)

    

    
    

    // get labels
    const labels = await team.labels();

    labels.nodes.forEach(label => {
        console.log(`${label.id} - ${label.name} - ${label.color}`)
    });

    

    // Get members
    // const members = await team.members();
    // let membersArray: any = [];
    
    // members.nodes.forEach(member => {
    //     membersArray.push({
    //         id: member.id,
    //         name: member.displayName,
    //         email: member.email
    //     });
    // });
    // console.log(membersArray)



    // Loop through CSV of exported Microsoft Planner tasks
    // if project is not registered with the same name, create it
    // save the project id in array
    // register issue with the project id
    // Map CSV Values to Linear Values
    // Task Name = Title
    // Description = Description
    // Priority = Priority (if priority is Important, map it to urgent id)
    // Bucket Name = Project (if it doesn't exist, create it, then map to its id)
    // Assigned To = Assignee (Map to Id from team members array), take only the first assignee from planner, split the string by ; and take the first one
    // Labels = Labels (Map to Id from team labels array in addition to the from-planner label id)
    // Progress = State (Map to Id from team states array)
    // Due Date = Due Date
    // Created Date = Created Date
    // Completed Date = Completed Date
    // Start Date = Started Date (to be assigned after issue creation in linear)
    // Checklist Items = To be added to the issue as a sub issue


    // lets loop through the first 10 issues

    const issue_options = {
        teamId: team.id,
        title: "My Created Issue 23",
        description: "This is a description of my issue\n\n## Testing\n\n- One\n- Two\n- Three",
        priority: 0,
        //assigneeId: members.nodes[1].id,
        labelIds: [labels.nodes[0].id, labels.nodes[1].id], // not tested, not needed in my case
        stateId: states.nodes[0].id,
        createdAt: new Date(new Date().setDate(new Date().getDate() - 7)),
        dueDate: new Date(),

    }

    const myissue = await createIssue(issue_options);
    console.log(myissue)
}

const createMainIssue = async (issue: any) => {
    const startedAt = issue.startedAt;
    delete issue.startedAt;
    const completedAt = issue.completedAt;
    delete issue.completedAt;

    const myissue = await linearClient.createIssue(issue);

    // set startedAt date
    const lastIssue : any = await myissue.issue;
    lastIssue.startedAt = startedAt;
    lastIssue.completedAt = completedAt;
    return lastIssue;
}

const createSubIssue = async (issue: any) => {

}

const createIssue = async (issue: any) => {
    const startedAt = issue.startedAt;
    delete issue.startedAt;

    const myissue = await linearClient.createIssue(issue);

    // set startedAt date
    const lastIssue: any = await myissue.issue;
    lastIssue.startedAt = startedAt;
    return lastIssue;
}

run()