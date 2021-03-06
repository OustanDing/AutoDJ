import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { Avatar } from '@material-ui/core'

import constants from '../../constants'

import './Members.scss'

const { BACKEND_ADDRESS } = constants
const SPOTIFY_PROFILE_URL = 'https://open.spotify.com/user'

function Members({ host, members }) {
  const [membersInfo, setMembersInfo] = useState([])

  useEffect(() => {
    const getMembersInfo = async () => {
      const response = await axios({
        method: 'get',
        url: `${BACKEND_ADDRESS}/users/getUsersInfo?userIDs=${JSON.stringify(
          members,
        )}`,
      })

      setMembersInfo(response.data)
    }

    getMembersInfo()
  }, [members])

  return (
    <div className="membersListContainer">
      <table className="membersList">
        <tbody>
          {membersInfo.map((member, i) => (
            <tr className="membersListRow" key={i}>
              <td className="profilePictureCell">
                <a
                  className="profileLink"
                  href={`${SPOTIFY_PROFILE_URL}/${member.spotifyID}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {member.images.length > 0 ? (
                    <Avatar
                      className="profilePicture"
                      src={member.images[0].url}
                    />
                  ) : (
                    <Avatar
                      className="profilePicture"
                      classes={{
                        fallback: 'fallbackPicture',
                      }}
                    />
                  )}
                </a>
              </td>
              <td>
                <a
                  className="profileLink"
                  href={`${SPOTIFY_PROFILE_URL}/${member.spotifyID}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <p className="displayName">
                    {member.displayName} {host === member._id && '(host)'}
                  </p>
                </a>
              </td>
              <td className="followButtonCell">
                <iframe
                  className="followButton"
                  src={`https://open.spotify.com/follow/1/?uri=spotify:user:${member.spotifyID}&size=basic&theme=dark`}
                  width="150"
                  height="30"
                  scrolling="no"
                  frameBorder="0"
                  allowtransparency="true"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

Members.propTypes = {
  host: PropTypes.string,
  members: PropTypes.array,
}

export default Members
