# README

to migrate from planner to linear

## Logic

- Loop through CSV of exported Microsoft Planner tasks
  - if project is not registered with the same name, create it
  - save the project id in array
  - register issue with the project id
  - Map CSV Values to Linear Values
    - Task Name = Title
    - Description = Description
    - Priority = Priority (if priority is Important, map it to urgent id)
    - Bucket Name = Project (if it doesn't exist, create it, then map to its id)
    - Assigned To = Assignee (Map to Id from team members array), take only the first assignee from planner, split the string by ; and take the first one
    - Labels = Labels (Map to Id from team labels array in addition to the from-planner label id)
    - Progress = State (Map to Id from team states array)
    - Due Date = Due Date
    - Created Date = Created Date
    - Completed Date = Completed Date
    - Start Date = Started Date (to be assigned after issue creation in linear)
    - Checklist Items = To be added to the issue as a sub issue

## Todo

- [x] map users
- [x] map priorities
- [x] map statuses
- [x] map projects
- [x] map tasks
- [x] map subtasks
- [x] map dates - still glitchy
- [x] modularize
- [x] ✅ migrate
- [ ] sync project target date to the due date of the last task
- [ ] sync project lead to the assignee of the majority of tasks

## Steps

- get an API key and add it to the .env file
- get the team id and add it to the .env file, you can get it by running `pnpm getinfo`
- update team member ids in `mapMembers` function
- update a label id to be added to the migrated data
- get the states ids and copy them to `mapStates` function
