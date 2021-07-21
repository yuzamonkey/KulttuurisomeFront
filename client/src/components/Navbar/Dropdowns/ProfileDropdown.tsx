import React, { useEffect } from 'react'
import { useApolloClient, useQuery, useLazyQuery } from "@apollo/client";
import { useHistory } from 'react-router';
import { NavLink } from "react-router-dom";

import { FIND_USER_OR_GROUP, ME } from '../../../graphql/queries';
import { SESSION_TOKEN } from '../../../utils/constants';
import './Dropdown.css'

const ProfileDropdown = ({ show, setShow }: any) => {
  const client = useApolloClient()

  const me = useQuery(ME)
  const sessionId = sessionStorage.getItem(SESSION_TOKEN)
  //const currentProfile = useQuery(FIND_USER_OR_GROUP, { variables: { id: sessionId } })
  const [findUserOrGroup, { loading, data }] = useLazyQuery(FIND_USER_OR_GROUP)
  useEffect(() => {
    findUserOrGroup({ variables: { id: sessionId } })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const history = useHistory()

  if (!show) {
    return null
  }

  if (loading) {
    return <div className="dropdown">Loading...</div>
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
    findUserOrGroup({ variables: { id: me.data.me.id } })
  }

  const handleNewGroupClick = () => {
    console.log("NEW GROUP CLICKED")
  }

  const handleProfileChange = async (groupId) => {
    console.log("SWITCH PROFILE TO ", groupId)
    sessionStorage.setItem(SESSION_TOKEN, groupId)
    findUserOrGroup({ variables: { id: groupId } })
  }

  return (
    <div className="dropdown">
      <div className="dropdown-profile" onClick={handleProfileClick}>
        <div>
          <img src={me.data.me.profile.image} alt="profileimg" className="profile-image"></img>
        </div>
        <h3 className="profile-name">{data.findUserOrGroup.username || data.findUserOrGroup.name}</h3>
        <p className="secondary-text">Show profile</p>
      </div>
      <div className="dropdown-link" onClick={handleMeClick}><b>Me</b></div>
      <div className="dropdown-link" onClick={handleNewGroupClick}><b>My groups +</b></div>
      <NavLink to="/newgroup" activeClassName="active">New group</NavLink>
      {me.data.me.groups.map(group => {
        return (
          <div
            className="dropdown-link"
            onClick={() => handleProfileChange(group.id)}
            key={group.id}>
            {group.name}
          </div>
        )
      })}
      <div className="dropdown-link" onClick={handleSettingsClick}>Settings</div>
      <div className="dropdown-link" onClick={handleLogout} >Log out</div>
    </div>
  )
}

export default ProfileDropdown