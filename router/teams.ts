import { Router } from "express";
import * as teams from '../controller/teams'
const router = Router()

router.get('/search',teams.search)

export default router 

