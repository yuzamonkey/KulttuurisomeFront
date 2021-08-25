import React, { useContext, useEffect } from 'react'
import { useApolloClient, useQuery, useLazyQuery } from "@apollo/client";
import { useHistory } from 'react-router';

import { FIND_USER_OR_GROUP, ME } from '../../../graphql/queries';
import { SESSION_TOKEN } from '../../../utils/constants';
import './Dropdown.css'
import { UserContext } from '../../UtilityComponents/UserContext';
import { LargeProfileImage, Loading, SmallProfileImage } from '../../UtilityComponents/UtilityComponents';

const ProfileDropdown = ({ show, setShow }: any) => {
  const client = useApolloClient()

  const me = useQuery(ME)
  const userContext = useContext(UserContext)

  const [findUserOrGroup, { loading, data }] = useLazyQuery(FIND_USER_OR_GROUP)
  useEffect(() => {
    userContext.sessionId && findUserOrGroup({ variables: { id: userContext.sessionId } })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const history = useHistory()

  if (loading || me.loading) {
    return <div className={show ? "dropdown active" : "dropdown"}>
      <Loading />
    </div>
  }

  const handleLogout = async () => {
    await client.resetStore()
    localStorage.clear()
    sessionStorage.clear()
    window.location.assign('/')
  }

  const handleProfileClick = () => {
    history.push(`/profiles/${data.findUserOrGroup.id}`)
    setShow(false)
  }

  const handleSettingsClick = () => {
    history.push('/settings')
    setShow(false)
  }

  const handleMeClick = () => {
    sessionStorage.setItem(SESSION_TOKEN, me.data.me.id)
    userContext.setSessionId(me.data.me.id)
    findUserOrGroup({ variables: { id: me.data.me.id } })
  }

  const handleProfileChange = (groupId) => {
    sessionStorage.setItem(SESSION_TOKEN, groupId)
    userContext.setSessionId(groupId)
    findUserOrGroup({ variables: { id: groupId } })
  }

  const handleNewGroupClick = () => {
    history.push('/creategroup')
    setShow(false)
  }

  return (
    <div className={show ? "dropdown active" : "dropdown"}>
      <div className="dropdown-profile" onClick={handleProfileClick}>
        <div>
          <LargeProfileImage image={data.findUserOrGroup.profile.image} />
        </div>
        <h3 className="profile-name">{data.findUserOrGroup.profile.name}</h3>
        <p className="secondary-text">Show profile</p>
      </div>
      {me.data.me.groups.length > 0 &&
        <div className="profile-switch-options">
          <b>Switch profile</b>
          {me.data.me.id !== userContext.sessionId &&
            <div className="dropdown-link profile-switch-profile-link" onClick={handleMeClick}>
              <div>
                <SmallProfileImage image={me.data.me.profile.image} />
              </div>
              <p>{me.data.me.profile.name}</p>
              <span />
            </div>
          }
          {me.data.me.groups.map(group =>
            group.id !== userContext.sessionId &&
            <div
              className="dropdown-link profile-switch-profile-link"
              onClick={() => handleProfileChange(group.id)}
              key={group.id}>
              <div>
                <SmallProfileImage image={group.profile.image} />
              </div>
              <p>{group.profile.name}</p>
              <span />
            </div>
          )}
        </div>
      }
      <div className="dropdown-link" onClick={handleNewGroupClick}>New group +</div>
      <div className="dropdown-link" onClick={handleSettingsClick}>Settings</div>
      <div className="dropdown-link" onClick={handleLogout}>Log out</div>
    </div>
  )
}

export default ProfileDropdown