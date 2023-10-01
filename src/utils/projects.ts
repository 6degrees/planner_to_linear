import { LinearClient } from '@linear/sdk';
import { ProjectCreateInput, } from '@linear/sdk/dist/_generated_documents';

const createProject = async (linearClient: LinearClient, input: ProjectCreateInput) => {
  const project = await linearClient.createProject(input);
  return project;
};

export const getProjectId = (projectsMap: any, projectName: any) => {
  return projectsMap[projectName];
};

export const createProjectsMap = async (linearClient: LinearClient, projects: any, bucketsArray: any, teamId: string) : Promise<any> => {
  let projectsMap: any = {};

  for(const bucket of bucketsArray) {
      // check if a project exists and its title is same as Bucket Name
      // if it exists, assign it to the issue
      let project = projects.nodes.find((project: any) => project.name == bucket);
      
      if (project) {
          projectsMap[bucket] = project.id;
      }
      else {
          // else create a new project with linearClient.createProject
          const project_options = {
              teamIds: [teamId],
              name: bucket,
          }

          const myproject = await createProject(linearClient, project_options);
          const lastProject: any = await myproject.project;
          projectsMap[bucket] = lastProject.id;
      }
  };
  return projectsMap;
};
