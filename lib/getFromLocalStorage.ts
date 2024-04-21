const getFromLocalStorage = (key: string): string | null => {
  return localStorage.getItem(key)
}

export default getFromLocalStorage
