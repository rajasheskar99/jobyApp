import './index.css'

const FilterItem = props => {
  const {employmentTypes, salaryRanges} = props
  return (
    <div>
      <ul className="emp-list">
        {employmentTypes.map(empType => {
          const {empInputId} = props
          const getEmpId = () => {
            empInputId(empType.employmentTypeId)
          }

          return (
            <li className="list-item" key={empType.employmentTypeId}>
              <input
                type="checkbox"
                className="check-box"
                id={empType.employmentTypeId}
                onChange={getEmpId}
              />
              <label className="label" htmlFor={empType.employmentTypeId}>
                {empType.label}
              </label>
            </li>
          )
        })}
      </ul>
      <hr className="line" />
      <h2 className="filter-title">Salary Range</h2>
      <ul className="emp-list">
        {salaryRanges.map(salType => {
          const {salInputId} = props
          const getSalId = () => {
            salInputId(salType.salaryRangeId)
          }

          return (
            <li className="list-item" key={salType.salaryRangeId}>
              <input
                type="radio"
                className="check-box"
                id={salType.salaryRangeId}
                onChange={getSalId}
              />
              <label className="label" htmlFor={salType.salaryRangeId}>
                {salType.label}
              </label>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
export default FilterItem
