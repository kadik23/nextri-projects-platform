
import {Hono} from "hono"
import marketplaceController from "./marketplaceController";


const marketplaceRoutes = new Hono();

const marketplacecontroller = new marketplaceController()

    //get projects based on the user prefrence (must provide , user_id and profile_id )
    marketplaceRoutes.get("/marketplace",(c)=>marketplacecontroller.get_Projects_Marketplace_by_Prefences(c))

    // apply to a project , i will need the project_id from the request body , profile id , i can get it from the session token 
    marketplaceRoutes.post("/marketplace",(c)=>marketplacecontroller.apply_to_project(c))

    // returns a list of bookmarked projects by the user 
    marketplaceRoutes.get("/marketplace/bookmarks",(c)=>marketplacecontroller.get_Profile_bookmarks(c))

    //add a project to the profile bookmark
    marketplaceRoutes.post("/marketplace/bookmarks",(c)=>marketplacecontroller.add_project_to_bookmarks(c))

    //remove from the bookmark
    marketplaceRoutes.delete("/marketplace/bookmarks/:id",(c)=>marketplacecontroller.delete_project_from_bookmarks(c))
