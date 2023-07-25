/** Routes for the project model */

import express from "express";
import { Projects } from "../models/projects";

export const projectRoutes = express.Router()


projectRoutes.post("/register", async function (req, res, next){
    try{
        const project = await Projects.registerProject(req.body)
        return res.status(201).json(project)
    } catch (error){
        next(error)
    }
})


/**route that returns project information given the project id */
projectRoutes.get("/:projectId", async function (req, res, next){
    const projectId = parseInt(req.params.projectId)
    try {
        const project = await Projects.fetchProjectByProjectId(projectId)
        res.status(201).json(project)
      } catch(error) {
        next(error)
      }
})



/**route that gets all projects with given tag */
projectRoutes.get("/tag/:tag_name", async function(req, res, next){
    const tag = req.params.tag_name
    const projects = await Projects.getProjectsWithTag(tag)
    if (projects) {
        res.status(201).json({projects: projects})
      } else {
        res.status(404).json( { error: 'Projects with given tag not found' } )
      }
})


/**route that handles searching by a term */
projectRoutes.get("/search/:searchTerm", async function(req, res, next){
  const search = req.params.searchTerm
  try{
    const projects = await Projects.searchProjects(search)
    res.status(201).json(projects)
  }catch (error){
    next(error)
  }
})