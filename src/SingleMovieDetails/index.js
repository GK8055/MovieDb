import './index.css'
import {Component} from 'react'

import NavBar from '../NavBar'
import CastDetails from '../CastDetails'
const apiStatus = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class SingleMovieDetails extends Component {
  state = {
    list: [],
    status: apiStatus.loading,
    castStatus: apiStatus.loading,
    castList: [],
  }

  componentDidMount() {
    this.getSingleMovieDetails()
  }

  getUpdateData = data => ({
    genres: data.genres,
    title: data.title,
    id: data.id,
    releaseDate: data.release_date,
    overview: data.overview,
    voteAvg: data.vote_average,
    image: `https://image.tmdb.org/t/p/w500${data.poster_path}`,
    runtime: data.runtime,
    voteCount: data.vote_count,
  })

  getUpdateData_2 = data_1 =>
    // console.log(data_1)
    ({
      cast: data_1.map(each => ({
        id: each.id,
        name: each.name,
        profile: `https://image.tmdb.org/t/p/w500${each.profile_path}`,
        department: each.known_for_department,
      })),
    })

  getSingleMovieDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const MOVIE_ID = id
    // console.log("id",id)
    const API_KEY = '044a91987532dea4151a0022eeae663b'
    const url = `https://api.themoviedb.org/3/movie/${MOVIE_ID}?api_key=${API_KEY}&language=en-US`
    const url_2 = `https://api.themoviedb.org/3/movie/${MOVIE_ID}/credits?api_key=${API_KEY}&language=en-US`
    const response = await fetch(url)
    const response_2 = await fetch(url_2)
    const data = await response.json()
    const data_2 = await response_2.json()
    if (response.ok && response_2.ok === true) {
      //console.log(data)
      const updateData = this.getUpdateData(data)
      console.log(data_2)
      const updateData_2 = this.getUpdateData_2(data_2.cast)
      console.log('up', updateData_2)
      this.setState({
        status: apiStatus.success,
        list: updateData,
        status_2: apiStatus.success,
        castList: updateData_2.cast,
      })
    } else {
      this.setState({status: apiStatus.failure, status_2: apiStatus.failure})
    }
  }

  renderNavBar = () => {
    return <NavBar />
  }

  render() {
    const {list, castList} = this.state
    //console.log('up_123', castList)
    const {
      genres,
      title,
      overview,
      image,
      releaseDate,
      runtime,
      voteAvg,
      voteCount,
    } = list

    const li = genres === undefined ? [] : genres

    return (
      <>
        <div className="single_movie_container">
          {this.renderNavBar()}
          <img src={image} alt={title} className="movie_image" />
          <h1 className="title">{title}</h1>
          <div className="text_container">
            {li.map(each => (
              <li className="text" key={each.id}>
                {each.name}
              </li>
            ))}
          </div>
          <div className="text_container">
            <p className="text">{voteAvg}</p>
            <p className="text">{voteCount}</p>
          </div>
          <div className="text_container">
            <p className="text">{releaseDate}</p>
            <p className="text">{runtime}</p>
          </div>
          <p className="desc">{overview}</p>
          <ul className="cast_container">
            {castList.map(each => (
              <CastDetails key={each.id} data={each} />
            ))}
          </ul>
        </div>
      </>
    )
  }
}

export default SingleMovieDetails
