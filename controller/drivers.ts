import { Request,Response } from "express"
import schemadriver from "../model/schemadriver"
import schemaall from "../model/schemaall"
export const search = async(req:Request,res:Response)=>{
    try {
        const {drivers,year,skip,limit} = req.body
        const findAllYear = year.find((x:any)=> x=='allYears')
        const findAllRaces = drivers.find((x:any)=> x=='allDrivers')
        if(findAllRaces!=undefined){
            if(findAllYear!=undefined){
                let data = await schemaall.aggregate([
                    {
                        $match:{$and:[{year:{$exists: true}},{title:"Drivers"}]} 
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
                    $match:{$and:[{year:{$in:year}},{title:"Drivers"}]} 
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
            const data = await schemadriver.aggregate([
                {
                    $match:{$and:[{year:{$exists: true}},{driver:{$in:drivers}}]} 
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
        const data = await schemadriver.aggregate([
            {
                $match:{$and:[{year:{$in:year}},{driver:{$in:drivers}}]} 
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