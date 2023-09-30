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
    let bucketsArray: any[] = [];

    plannerJsonArray.forEach((issue: any) => {
      bucketsArray.push(issue["Bucket Name"]);
    });
    //console.log(bucketsArray);
    return [...new Set(bucketsArray)];
  };
  