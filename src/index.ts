import 'dotenv/config'
import csv from "csvtojson";
import { LinearClient } from '@linear/sdk'
import {
    mapIssue,
    createMainIssue,
    mapMembers,
    createBucketsArray,
    getProjectId,
    createProjectsMap,
    mapChecklists,
    sleep
} from './utils'


const run = async () => {
    const linearClient = new LinearClient({ apiKey: process.env.LINEAR_API_KEY })
    // Get Teams
    const { nodes: [team] } = await linearClient.teams();
    
    // Get CSV
    const plannerCsvFilePath = process.env.CSV_FILE_PATH ?? "";
    const plannerJsonArray = await csv().fromFile(plannerCsvFilePath);

    // Get projects
    let projects = await linearClient.projects();

    // get a unique list of "Bucket Name" from the plannerJsonArray
    let bucketsArray: any[] = createBucketsArray(plannerJsonArray);

    // lets create a projects map with the bucket name as key and the project id as value
    const projectsMap = await createProjectsMap(linearClient, projects, bucketsArray, team.id);

    let issuesArray = plannerJsonArray.map((issue) => {
        issue["Assignee"] = mapMembers(issue["Assigned To"].split(';'));
        issue["teamId"] = team.id;
        issue["projectId"] = getProjectId(projectsMap, issue["Bucket Name"]);
        /*  if item contains Checklist Items, store it as issue["checklist"] = [ { title: "item 1", completed: true }, { title: "item 2", completed: false } ] 
            and get the completion status from the column issue["Completed Checklist Items"] where when it says "2/7" (this is the format of the completed checklist
            items field) there should be 7 checlist items and the first two are completed
        */

        issue["checklist"] = mapChecklists(issue["Checklist Items"], issue["Completed Checklist Items"])

        // delete the columns that are not needed
        delete issue["Assigned To"];
        delete issue["Completed Checklist Items"];
        delete issue["Checklist Items"];
        delete issue["Bucket Name"];

        return mapIssue(issue);

    });

    const MAX_ISSUES_TO_CREATE = 5000;
    // so the server doesn't crash
    const BATCH_SIZE = 25;
    const SLEEP_TIME = 15000; // 10 seconds

    for (let i = 0; i < Math.min(MAX_ISSUES_TO_CREATE, issuesArray.length); i += BATCH_SIZE) {
        const batch = issuesArray.slice(i, i + BATCH_SIZE);
        const issuePromises = batch.map((issue) => {
            return createMainIssue(linearClient, issue );
        });

        await Promise.all(issuePromises);
        console.log(`Created issues ${i + 1} to ${i + BATCH_SIZE}`);

        if (i + BATCH_SIZE < MAX_ISSUES_TO_CREATE) {
            console.log(`Sleeping for ${SLEEP_TIME / 1000} seconds...`);
            await sleep(SLEEP_TIME);
        }
    } console.log(`created all issues`);
}

run()