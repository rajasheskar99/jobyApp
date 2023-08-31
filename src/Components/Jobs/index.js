import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'
import Header from '../Header'
import JobCard from '../JobCard'
import JobFilter from '../JobFilter'
import './index.css'

class Jobs extends Component {
  state = {jobsInfo: [], searchInput: '', employeeId: '', salaryId: ''}

  componentDidMount() {
    this.getJobInfo()
  }

  getJobInfo = async () => {
    const token = Cookies.get('jwt_token')
    const {searchInput, employeeId, salaryId} = this.state
    const url = `https://apis.ccbp.in/jobs?employment_type=${employeeId}&minimum_package=${salaryId}&search=${searchInput}`
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

  getSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  renderJobSection = () => {
    const {jobsInfo, searchInput} = this.state
    return (
      <div className="jobs-container">
        <div className="job-right-sec">
          <div>
            <input
              type="search"
              className="input-search"
              onChange={this.getSearchInput}
              value={searchInput}
            />
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

  getId = (empId, salId) => {
    this.setState({employeeId: empId, salaryId: salId})
  }

  render() {
    const {searchInput, employeeId, salaryId} = this.state
    console.log(searchInput, employeeId, salaryId)

    return (
      <div className="jobs-section">
        <Header />
        <div className="job-main">
          <JobFilter getId={this.getId} />
          {this.renderJobSection()}
        </div>
      </div>
    )
  }
}
export default Jobs
