import { Router } from "express";
import * as races from '../controller/races'
const router = Router()

router.get('/search',races.search)

export default router 