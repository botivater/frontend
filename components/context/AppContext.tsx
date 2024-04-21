/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router'
import React, { useContext, useEffect, useState } from 'react'
import { useTenant } from '../../lib/tenant'
import AuthContext from './AuthContext'

export interface AppContextInterface {
  guildId: number
}

const AppContext = React.createContext<AppContextInterface | undefined>(
  undefined
)

type Props = {
  children: React.ReactNode
}

export const AppProvider: React.FC<Props> = ({ children }) => {
  const { data: tenantGuildId } = useTenant()
  const { user } = useContext(AuthContext)!
  const [guildId, setGuildId] = useState<number>(0)

  const router = useRouter()

  useEffect(() => {
    if (!guildId && user) {
      router.push('/tenantSwitcher')
    }
  }, [guildId, user])

  useEffect(() => {
    if (tenantGuildId) {
      setGuildId(tenantGuildId)
    }
  }, [tenantGuildId])

  return (
    <AppContext.Provider value={{ guildId }}>{children}</AppContext.Provider>
  )
}

export default AppContext
