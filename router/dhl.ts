import { Router } from "express";
import * as dhl from '../controller/dhl'
const router = Router()

router.get('/search',dhl.search)

export default router 