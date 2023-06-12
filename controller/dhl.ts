import { Request,Response } from "express"
import schemadhl from "../model/schemadhl"
export const search = async(req:Request,res:Response)=>{
    try {
        const {year,skip,limit} = req.body
        const findAll = year.find((x:any)=> x=='allYears')
        if(findAll!=undefined){
            const data = await schemadhl.aggregate([
                {
                    $match:{year:{$exists: true}}
                },
                {
                    $skip: skip
                },
                { 
                    $limit : limit
                }
            ])
            console.log(data.length)

            res.status(200).send({data})
            return
        }
        
        const data = await schemadhl.aggregate([
            {
                $match:{year:{$in:year}}
            },
            {
                $skip: skip
            },
            { 
                $limit : limit
            }
        ])
        console.log(data.length)

        res.status(200).send({data})
    } catch (error) {
        res.send(error)
    }
    
}