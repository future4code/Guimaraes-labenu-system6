import { Request, Response } from "express"
import connection from "../data/connection"
export const buscarHobby = async(req: Request,res: Response): Promise<void> => {
    try{
        const hobby = await connection("LabeSystem_hobby").select("*")
        res.status(201).send(hobby)

    }
    catch{(error:any)=>{
        res.send(error.message)
        }
    }
}