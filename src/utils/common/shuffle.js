//Algoritmo Fisher-Yates para mezclar un array

export const shuffleElements = (array) => {
  const shuffled = [...array] // Fem una còpia per no fer malbé l'array original
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}
