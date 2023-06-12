import { Request,Response } from "express"
import schemateam from "../model/schemateam"
import schemaall from "../model/schemaall"
export const search = async(req:Request,res:Response)=>{
    try {
        const {teams,year,skip,limit} = req.body
        const findAllYear = year.find((x:any)=> x=='allYears')
        const findAllTeam = teams.find((x:any)=> x=='allTeams')
        console.log(findAllTeam)
        if(findAllTeam!=undefined){
            if(findAllYear!=undefined){
                let data = await schemaall.aggregate([
                    {
                        $match:{$and:[{year:{$exists: true}},{title:"Teams"}]} 
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
            let data = await schemaall.aggregate([
                {
                    $match:{$and:[{year:{$in:year}},{title:"Teams"}]} 
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
        if(findAllYear!=undefined){
            const data = await schemateam.aggregate([
                {
                    $match:{$and:[{year:{$exists: true}},{nameTeam:{$in:teams}}]} 
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
        const data = await schemateam.aggregate([
            {
                $match:{$and:[{year:{$in:year}},{nameTeam:{$in:teams}}]} 
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