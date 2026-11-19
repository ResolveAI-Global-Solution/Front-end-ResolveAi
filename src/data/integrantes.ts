import type { Integrante } from '../types'
import fotoAndrei from '../assets/images/integrantes/andrei.jpg'
import fotoFelipe from '../assets/images/integrantes/felipe.jpg'
import fotoHenrique from '../assets/images/integrantes/henrique.jpg'
import fotoLuiz from '../assets/images/integrantes/luiz.jpg'

const curso = 'Análise e Desenvolvimento de Sistemas'

// github e linkedin guardam só o usuário; a URL completa é montada na tela
export const integrantes: Integrante[] = [
  {
    rm: '573373',
    nome: 'Andrei Oliveira de Sousa',
    turma: '1TDSPW',
    curso,
    foto: fotoAndrei,
    github: 'andreisou-dev',
    linkedin: 'andrei-sousa-55662825a',
  },
  {
    rm: '572133',
    nome: 'Felipe Coelho da Fonseca',
    turma: '1TDSPW',
    curso,
    foto: fotoFelipe,
    github: 'devfcoelho',
    linkedin: 'felipe-coelho-80b78a394',
  },
  {
    rm: '569898',
    nome: 'Henrique Soares Pereira',
    turma: '1TDSPW',
    curso,
    foto: fotoHenrique,
    github: 'Henriquesope',
    linkedin: 'henrique-soares-pereira',
  },
  {
    rm: '572576',
    nome: 'Luiz Felipe Lourenço da Silva',
    turma: '1TDSPW',
    curso,
    foto: fotoLuiz,
    github: 'devlipee',
    linkedin: 'lfelipelourenco',
  },
]
