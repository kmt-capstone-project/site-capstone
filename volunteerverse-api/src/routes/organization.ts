/** Routes for authentication. */
import express from "express";
import { Organization } from "../models/organization"

const organizationRoutes = express.Router()


//make get? request that returns information from database
organizationRoutes.get("/projects/:org_id", async function(req,res,next){
  const org_id = parseInt(req.params.org_id)
  const result = await Organization.fetchAllOrganizationProjectsById(org_id)
  if (result) {
  res.status(201).json({orgProjects: result})
      } else {
      res.status(404).json( { error: 'Project not found' } )
    }
 
})

/**route that returns project information given the project id */
// projectRoutes.get("/:projectId", async function (req, res, next){
//   const projectId = parseInt(req.params.projectId)
//   const project = await Projects.fetchProjectByProjectId(projectId)
//   if (project) {
//       res.status(201).json(project)
//     } else {
//       res.status(404).json( { error: 'Project not found' } )
//     }
// })

//make post request that stores organization's projects in database
// organizationRoutes.post("/project/create", async function(req,res,next){
//   const {projectInfo} = req.body
//   console.log("project info: ", projectInfo)
//   const result = await Organization.createOrganizationProject(projectInfo)
//   res.json({projectInfo: result})
// })

organizationRoutes.post("/project/update", async function(req,res,next){
  const {approved, email, project_id, orgId} = req.body
  const result = await Organization.updateApprovedVolunteers(approved, email, project_id, orgId)
  res.json({approvedVolunteer: result})
 
})

organizationRoutes.post("/project/delete", async function(req,res,next){
  const {project_id, orgId} = req.body
  console.log("project id: ", project_id)
  const result = await Organization.deleteOrganizationProject(project_id, orgId)
  res.json({deleteProject: result})
})



organizationRoutes.get("/projects/interested/:projectId", async function (req, res, next) {
       //req.body is what we put in insomnia when we test which to equate to what we put in the browser
       //that then goes into the function below 
       const projectId = parseInt(req.params.projectId)
  console.log("this is the req.body", req.params.projectId);
const result = await Organization.fetchInterestedVolunteersByProjectId(projectId);
  if (result) {
    res.status(201).json({ interested_students: result })
  } else {
    res.status(404).json( { error: 'Project not found' } )
  }
});



export {organizationRoutes}
