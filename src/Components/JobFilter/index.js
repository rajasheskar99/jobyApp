import {Component} from 'react'
import Cookies from 'js-cookie'

import FilterItem from '../FilterItem'
import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class JobFilter extends Component {
  state = {
    profile: {},
    activeSalId: salaryRangesList[0].salaryRangeId,
    activeEmpId: employmentTypesList[0].employmentTypeId,
  }

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

  empInputId = id => {
    this.setState({activeEmpId: id})
  }

  salInputId = salId => {
    this.setState({activeSalId: salId})
  }

  render() {
    const {profile, activeEmpId, activeSalId} = this.state
    console.log(employmentTypesList, salaryRangesList, activeEmpId, activeSalId)
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
        <h2 className="filter-title">Type of Employment</h2>
        <FilterItem
          empInputId={this.empInputId}
          employmentTypes={employmentTypesList}
          salaryRanges={salaryRangesList}
          salInputId={this.salInputId}
        />
      </div>
    )
  }
}

export default JobFilter
