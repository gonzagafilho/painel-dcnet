import fs from 'fs'
import os from 'os'
import { execSync } from 'child_process'

const DATA_DIR = './data'
const FILE = './data/status.json'

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR)
}

function getCPU() {
  return Number(os.loadavg()[0].toFixed(2))
}

function getRAM() {
  const total = os.totalmem()
  const free = os.freemem()
  return Number((((total - free) / total) * 100).toFixed(1))
}

function getDisk() {
  try {
    const out = execSync("df / | tail -1 | awk '{print $5}'").toString()
    return parseInt(out.replace('%', '').trim())
  } catch {
    return null
  }
}

function getUptime() {
  return Math.floor(os.uptime() / 60)
}

const data = {
  timestamp: new Date().toISOString(),
  uptime_min: getUptime(),
  cpu_load: getCPU(),
  ram_percent: getRAM(),
  disk_percent: getDisk()
}

let history = []

if (fs.existsSync(FILE)) {
  history = JSON.parse(fs.readFileSync(FILE))
}

history.push(data)

if (history.length > 2100) {
  history = history.slice(-2100)
}

fs.writeFileSync(FILE, JSON.stringify(history, null, 2))


