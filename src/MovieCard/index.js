import './index.css'
import {Link} from 'react-router-dom'

const MovieCard = props => {
  const {data} = props

  const {title, image, voteAvg, id, releaseDate, popularity, voteCount} = data
  // console.log(id)
  return (
    <li className="list_card_container">
      <img src={image} className="list_image" alt={title} />
      <h1 className="title">{title}</h1>
      <div className="text_container">
        <div className="details_container">
          <div className="text_container">
            <p className="details">{voteAvg}</p>
            <p className="details">{voteCount}</p>
          </div>
          <div className="text_container">
            <p className="details">{popularity}</p>
            <p className="date">{releaseDate}</p>
          </div>
        </div>
      </div>
      <Link to={`/movie/${id}`}>
        <button className="view_btn">View Details</button>
      </Link>
    </li>
  )
}

export default MovieCard
