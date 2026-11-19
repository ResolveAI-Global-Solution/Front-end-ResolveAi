import type { Integrante } from '../types'

const curso = 'Análise e Desenvolvimento de Sistemas'

// github e linkedin guardam só o usuário; a URL completa é montada na tela
export const integrantes: Integrante[] = [
  {
    rm: '573373',
    nome: 'Andrei Oliveira de Sousa',
    turma: '1TDSPW',
    curso,
    github: 'andreisou-dev',
    linkedin: 'andrei-sousa-55662825a',
  },
  {
    rm: '572133',
    nome: 'Felipe Coelho da Fonseca',
    turma: '1TDSPW',
    curso,
    github: 'devfcoelho',
    linkedin: 'felipe-coelho-80b78a394',
  },
  {
    rm: '569898',
    nome: 'Henrique Soares Pereira',
    turma: '1TDSPW',
    curso,
    github: 'Henriquesope',
    linkedin: 'henrique-soares-pereira',
  },
  {
    rm: '572576',
    nome: 'Luiz Felipe Lourenço da Silva',
    turma: '1TDSPW',
    curso,
    github: 'devlipee',
    linkedin: 'lfelipelourenco',
  },
]
