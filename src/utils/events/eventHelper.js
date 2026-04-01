export const isEventPassed = (eventDateString) => {
  const today = new Date()
  today.setHours(0, 0, 0, 0) // Netegem hores per comparar només dies

  const eventDate = new Date(eventDateString)
  return eventDate < today // Devolverá true o false
}

export const sortEventsByDate = (events) => {
  return [...events].sort((a, b) => new Date(a.date) - new Date(b.date))
}
