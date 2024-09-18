
import {Hono} from "hono"
import {get_profile_preferences,getBookmarks,addToBookmarks,deleteFromBookmark,applyToProject} from "../data-access/marketplace"

const marketplaceRoutes = new Hono();




    //get projects based on the user prefrence (must provide , user_id and profile_id )
    marketplaceRoutes.get("/marketplace",async (c)=>{
        /*
            get profile id , 
            retrieve his prefrences from the database
            use his prefrences to filter the projects from the db 
            retruns it to the user 
        */ 
        //const sessionId = getCookie(c,"auth_session")?? null ; 
        let profile_id: string ;
        profile_id = " " ; 
        /*
        const profile_prefrences = await get_profile_preferences(profile_id);
        
        const filtred_projects =await  this.filter_projects(profile_prefrences)

        return c.json(filtred_projects)*/
    })




    // apply to a project , i will need the project_id from the request body , profile id , i can get it from the session token 
    marketplaceRoutes.post("/marketplace",async (c)=>{
        
        //needs to get the profile id from the seesion token 
        let profile_id= "";
        const body = await c.req.json();


        const project_id = body.project_id;

        if(!project_id){
            return c.json({status : "no project id provided"},500);
        }


        try{
            const qresult = applyToProject(profile_id,profile_id);
            
            return c.json({status : "project application done sucessfully "},201)


        }catch(err){
            console.log("error happned while applying to project : ",err);
            console.error(err);
        }
    })

    // returns a list of bookmarked projects by the user 
    marketplaceRoutes.get("/marketplace/bookmarks",async (c)=>{
        /* 
            get profile id from session_id, 
            retrieve his bookmarks from the database 
            return it to the user 
        */
            let profile_id = " ";
            const bookmarks = await getBookmarks(profile_id)
    
            return c.json(bookmarks);
    })

    //add a project to the profile bookmarks
    marketplaceRoutes.post("/marketplace/bookmarks",async (c)=>{
        
        
        /*
            get profile id from session_id
            add the project id to the profile id bookmarks 
            return the succes status , or (the fail ) 

        */
    const body = await c.req.json();
    
    const projectId = body.project_id;
    let profile_id: string = " " ;
  // Check if projectId is provided
        if (!projectId) {
            return c.json({ error: 'Project ID is required' }, 400);
        }

        try{
            const res = addToBookmarks(profile_id,profile_id);

            return c.json({status: "added with sucess "},201);
        
        }catch(error){

            console.log("error : ", error)
            console.error(error)

        }
    })

    //remove from the bookmark
    marketplaceRoutes.delete("/marketplace/bookmarks/:id",async (c)=>{
        

        /*  
            get profile id from session_id
            remove from db 
            */    
            let profile_id ="";
            const project_id = c.req.param("id") ;
    
            if(!project_id){
    
                return c.json({status:"no id provided "},400)
    
            }
    
    
            try{
    
                const qresult = await deleteFromBookmark(profile_id,project_id);
    
                return c.json({status: "deleted with sucess "},200); 
    
    
            }catch(err){
                console.log("error in deleting a bookmark", err);
                console.error(err);
    
                return c.json({status : "error in delete operation "},500)
            }
    
            
    
    })


    export default marketplaceRoutes ; 