import './index.css'

const CastDetails = props => {
  const {data} = props
  const {name, profile, department} = data
  //console.log('data', profile, name, department)
  return (
    <li className="cast_item">
      <img src={profile} alt={name} className="image_size" />
      <p className="text">{name}</p>
      <p className="text">{department}</p>
    </li>
  )
}

export default CastDetails
