import type { Question } from '../types'

export const shortQuestions: Question[] = [
  { id: 's1', text: '¿Ha sido víctima de accidente?' },
  { id: 's2', text: '¿Ha sido sometido a intervención quirúrgica?' },
  { id: 's3', text: '¿Su capacidad de trabajo ha sido reducida?' },
  { id: 's4', text: '¿Usa drogas de prescripción médica?' },
]

export const longQuestions: Question[] = [
  { id: 'q1a', text: '¿Ha padecido enfermedades del corazón?' },
  { id: 'q1b', text: '¿Ha padecido hipertensión arterial o circulatoria?' },
  { id: 'q1c', text: '¿Ha padecido diabetes o problemas endocrinos?' },
  { id: 'q1d', text: '¿Ha padecido enfermedades respiratorias crónicas?' },
  { id: 'q1e', text: '¿Ha padecido trastornos neurológicos?' },
  { id: 'q1f', text: '¿Ha padecido enfermedades renales o urinarias?' },
  { id: 'q1g', text: '¿Ha padecido enfermedades digestivas crónicas?' },
  { id: 'q1h', text: '¿Ha padecido enfermedades autoinmunes?' },
  { id: 'q1i', text: '¿Ha padecido cáncer o tumores?' },
  { id: 'q1j', text: '¿Ha padecido enfermedades de la sangre?' },
  { id: 'q1k', text: '¿Ha padecido trastornos musculoesqueléticos graves?' },
  { id: 'q1l', text: '¿Ha padecido otra enfermedad relevante?' },
  { id: 'q2a', text: '¿Ha sido hospitalizado en los últimos 5 años?' },
  { id: 'q2b', text: '¿Se ha sometido a cirugías en los últimos 5 años?' },
  { id: 'q3', text: '¿Está actualmente bajo evaluación médica?' },
  { id: 'q4a', text: '(Mujer) ¿Está embarazada actualmente?' },
  { id: 'q4b', text: '(Mujer) ¿Tiene complicaciones ginecológicas?' },
  { id: 'q4c', text: '(Mujer) ¿Ha tenido parto o aborto reciente?' },
  { id: 'q4d', text: '(Mujer) ¿Tiene tratamiento hormonal actual?' },
  { id: 'q5', text: '¿Ha tenido diagnóstico positivo o secuelas por COVID-19?' },
]

export const shortQuestionIds = ['s1', 's2', 's3', 's4']

export const femaleQuestionIds = ['q4a', 'q4b', 'q4c', 'q4d']
