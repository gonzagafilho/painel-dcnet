import { validarCommit } from './commit.guard.js'

try {
  validarCommit()
} catch (err) {
  console.error('❌ Erro no Commit Guard:', err.message)
  process.exit(1)
}
