import {Router} from 'express'
import { adminCheck } from '../authCheck'
const adminRoutes = Router()

adminRoutes.patch('/:orderId/status', adminCheck)