import { execSync } from 'child_process'

/**
 * Commit Guard - DC NET
 * Bloqueia commits perigosos
 */

export function validarCommit() {
  console.log('🔒 Commit Guard ativo...')

  // Arquivos proibidos
  const arquivosProibidos = [
    '.env',
    '.env.production',
    'relatorio-atendimentos.pdf'
  ]

  const staged = execSync('git diff --cached --name-only')
    .toString()
    .split('\n')
    .filter(Boolean)

  for (const file of staged) {
    if (arquivosProibidos.some(p => file.includes(p))) {
      console.error(`❌ Commit bloqueado: arquivo proibido -> ${file}`)
      process.exit(1)
    }
  }

  console.log('✅ Arquivos permitidos')

  // Verifica console.log (básico)
  const diff = execSync('git diff --cached').toString()
  if (diff.includes('console.log(')) {
    console.error('❌ Commit bloqueado: console.log encontrado')
    process.exit(1)
  }

  console.log('✅ Commit liberado')
}

