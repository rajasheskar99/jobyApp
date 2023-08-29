import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'
import Header from '../Header'
import JobCard from '../JobCard'
import JobFilter from '../JobFilter'
import './index.css'

class Jobs extends Component {
  state = {jobsInfo: []}

  componentDidMount() {
    this.getJobInfo()
  }

  getJobInfo = async () => {
    const token = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/jobs'
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const jobInfo = await response.json()
      const updatedData = jobInfo.jobs.map(each => ({
        id: each.id,
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        jobDescription: each.job_description,
        location: each.location,
        packagePerAnnum: each.package_per_annum,
        rating: each.rating,
        title: each.title,
      }))
      console.log(updatedData)
      this.setState({jobsInfo: updatedData})
    }
  }

  renderJobSection = () => {
    const {jobsInfo} = this.state
    return (
      <div className="jobs-container">
        <div className="job-right-sec">
          <div>
            <input type="search" className="input-search" />
            <button
              type="button"
              data-testid="searchButton"
              className="search-btn"
            >
              <BsSearch className="search-icon" />
            </button>
          </div>
          <ul className="job-list">
            {jobsInfo.map(item => (
              <JobCard jobItem={item} key={item.id} />
            ))}
          </ul>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className="jobs-section">
        <Header />
        <div className="job-main">
          <JobFilter />
          {this.renderJobSection()}
        </div>
      </div>
    )
  }
}
export default Jobs
