import {Component} from 'react'
import Cookies from 'js-cookie'
import './index.css'

class JobFilter extends Component {
  state = {profile: {}}

  componentDidMount() {
    this.getProfile()
  }

  getProfile = async () => {
    const token = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    const profileInfo = await response.json()

    const updatedProfile = {
      name: profileInfo.profile_details.name,
      profileImageUrl: profileInfo.profile_details.profile_image_url,
      shortBio: profileInfo.profile_details.short_bio,
    }
    this.setState({profile: updatedProfile})
  }

  render() {
    const {profile} = this.state

    return (
      <div className="jobs-left-sec">
        <div className="profile-card">
          <img
            src={profile.profileImageUrl}
            className="profile"
            alt=" profile"
          />
          <h1 className="name">{profile.name}</h1>
          <p className="bio">{profile.shortBio}</p>
        </div>
        <hr className="line" />
      </div>
    )
  }
}

export default JobFilter
