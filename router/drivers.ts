import { Router } from "express";
import * as drivers from '../controller/drivers'
const router = Router()

router.get('/search',drivers.search)

export default router 