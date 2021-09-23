import { checkSession } from 'api'
import { useState, useEffect, Dispatch, SetStateAction } from 'react'
import { Header as HeaderDiv } from 'elements/containers'
import { UserObjectPrivate } from 'types/spotify'

interface Props {
  setIsSidebarOpen: Dispatch<SetStateAction<boolean>>
}

export const Header = (props: Props) => {
  const { setIsSidebarOpen } = props

  const [user, setUser] = useState<UserObjectPrivate | null>(null)

  useEffect(() => {
    checkSession().then((res) => {
      setUser(res.data.user)
    })
  }, [])

  return (
    <HeaderDiv>
      <button onClick={() => setIsSidebarOpen(true)}>OPEN</button>
    </HeaderDiv>
  )
}
