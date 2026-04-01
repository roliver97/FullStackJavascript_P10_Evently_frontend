import { getUserByIdAPI } from '../../api/users'

export const getUserContext = async (id) => {
  const userRaw = localStorage.getItem('user')
  if (!userRaw) {
    const userProfile = id ? await getUserByIdAPI(id) : null
    return {
      userProfile,
      isSelf: false,
      isAdmin: false,
      loggedUser: null
    }
  }

  const loggedUser = JSON.parse(userRaw)
  const targetId = id || loggedUser._id

  const isSelf = targetId === loggedUser._id
  const isAdmin = loggedUser.role === 'admin'

  if (isSelf) {
    // Si soy yo mismo, nos ahorramos el fetch usando los datos del localStorage
    return { userProfile: loggedUser, isSelf, isAdmin, loggedUser }
  }

  try {
    const userProfile = await getUserByIdAPI(targetId)
    return { userProfile, isSelf, isAdmin, loggedUser }
  } catch (error) {
    console.error('Error getting profile:', error)
    return { userProfile: null, isSelf, isAdmin, loggedUser }
  }
}
