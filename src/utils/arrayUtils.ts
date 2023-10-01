export const createProjectsArray = (projects: any) => {
    let projectsArray: any = [];

    projects.nodes.forEach((project: any) => {
      projectsArray.push({
        id: project.id,
        name: project.name
      });
    });

    return projectsArray;
  };
  
  export const createBucketsArray = (plannerJsonArray: any) => {
    return [...new Set(plannerJsonArray.map((issue:any) => issue["Bucket Name"]))];
  };
  