import { Router } from 'express'
import fs from 'fs'

const router = Router()

router.get('/status', (req, res) => {
  try {
    const raw = fs.readFileSync('./data/status.json')
    res.json(JSON.parse(raw))
  } catch {
    res.status(500).json({ error: 'Status indisponível' })
  }
})

export default router
