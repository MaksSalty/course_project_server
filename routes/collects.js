import { Router } from 'express'
import {
  createCollect,
  getAll,
  getById,
  getMyCollects,
  removeCollect,
  updateCollect,
  getCollectComments,
} from '../controllers/collects.js'
import { checkAuth } from '../utils/checkAuth.js'

const router = new Router()

router.post('/', checkAuth, createCollect)
router.get('/', getAll)
router.get('/:id', getById)
router.get('/user/me', checkAuth, getMyCollects)
router.delete('/:id', checkAuth, removeCollect)
router.put('/:id', checkAuth, updateCollect)
router.get('/comments/:id', getCollectComments)

export default router
