import { Request,Response } from "express"
import schemaraces from "../model/schemaraces"
import schemaall from "../model/schemaall"
export const search = async(req:Request,res:Response)=>{
    try {
        const {country,year,skip,limit} = req.body
        const findAllYear = year.find((x:any)=> x=='allYears')
        const findAllRaces = country.find((x:any)=> x=='allRaces')
        if(findAllRaces!=undefined){
            if(findAllYear!=undefined){
                let data = await schemaall.aggregate([
                    {
                        $match:{$and:[{year:{$exists: true}},{title:"Races"}]} 
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
                    $match:{$and:[{year:{$in:year}},{title:"Races"}]} 
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
            const data = await schemaraces.aggregate([
                {
                    $match:{$and:[{year:{$exists: true}},{country:{$in:country}}]} 
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
        const data = await schemaraces.aggregate([
            {
                $match:{$and:[{year:{$in:year}},{country:{$in:country}}]} 
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