import { execSync } from 'child_process'

/**
 * Commit Guard - DC NET
 * Bloqueia commits perigosos
 */

export function validarCommit() {
  console.log('🔒 Commit Guard ativo...')

  // ❌ Arquivos proibidos
  const arquivosProibidos = [
    '.env',
    '.env.production',
    'relatorio-atendimentos.pdf'
  ]

  // 📂 Arquivos no stage
  const staged = execSync('git diff --cached --name-only')
    .toString()
    .split('\n')
    .filter(Boolean)

  // 🔒 Verifica arquivos proibidos
  for (const file of staged) {
    if (arquivosProibidos.some(p => file.includes(p))) {
      console.error(`❌ Commit bloqueado: arquivo proibido -> ${file}`)
      process.exit(1)
    }
  }

  // 🔒 Verificações de código
  for (const file of staged) {
    // ignora o próprio Commit Guard
    if (file.includes('backend/agent/commit.guard.js')) continue

    const diff = execSync(`git diff --cached ${file}`)
      .toString()
      .split('\n')
      .filter(line => line.startsWith('+') && !line.startsWith('+++'))
      .join('\n')

    // ❌ Bloqueia console.log
    if (diff.includes('console.log(')) {
      console.error(`❌ Commit bloqueado: console.log encontrado em ${file}`)
      process.exit(1)
    }

    // ❌ Bloqueia debugger (REGEX CORRETA)
    if (/\bdebugger\b/.test(diff)) {
      console.error(`❌ Commit bloqueado: debugger encontrado em ${file}`)
      process.exit(1)
    }

    // ❌ Bloqueia console.error fora de controllers
    if (
      diff.includes('console.error(') &&
      !file.includes('controllers')
    ) {
      console.error(
        `❌ Commit bloqueado: console.error só é permitido em controllers (${file})`
      )
      process.exit(1)
    }
  }

  console.log('✅ Arquivos permitidos')
  console.log('✅ Commit liberado')
}
