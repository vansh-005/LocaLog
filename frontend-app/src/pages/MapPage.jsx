import React, { useState, useEffect, lazy, Suspense, useContext } from 'react'
import Map, { NavigationControl, GeolocateControl } from 'react-map-gl'
import axios from 'axios'
import 'mapbox-gl/dist/mapbox-gl.css'
import './mappage.css'
import Loader from '../components/ui/Loader' //Loader for suspense
import BottomNav from '../components/ui/BottomNav'
import ThemeToggle from '../components/ui/ThemeToggle'
import MyLocationIcon from '@mui/icons-material/MyLocation'
import MapMarker from '../components/marker/MapMarker'
import debounce from 'lodash.debounce' // Import debounce from lodash
import apiRequest from '../lib/ApiReqest'

import { AuthContext } from "../context/AuthContext"
import { LocationContext } from "../context/LocationContext"


const MarkerPopup = lazy(() => import('../components/popup/MarkerPopup'))
const UserMarkerPopup = lazy(() => import('../components/popup/UserMarkerPopup'))
const UserAuthentication = lazy(() => import('../components/authentication/UserAuthentication'))

const MapPage = () => {
  const { currentUser } = useContext(AuthContext)
  const { pins, SetPins, SetNewPlace, SetCurrentPlaceId } = useContext(LocationContext)
  const [viewport, setViewport] = useState({
    latitude: 6.927079,
    longitude: 79.861244,
    zoom: 2,
  })
  const [searchInput, setSearchInput] = useState('')
  const [suggestions, setSuggestions] = useState([])

  useEffect(() => {
    const getPins = async () => {
      try {
        const allPins = await apiRequest.get('/api/pins')
        SetPins(allPins.data)
      } catch (err) {
        console.error(err)
      }
    }
    getPins()
  }, [])



  const handleGeocodingSearch = async (query) => {
    try {
      const response = await axios.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json`,
        {
          params: {
            access_token: process.env.REACT_APP_MAPBOX,
            autocomplete: true,
            limit: 5,
          },
        }
      )
      setSuggestions(response.data.features)
    } catch (err) {
      console.error(err)
    }
  }

  const debouncedGeocodingSearch = debounce(handleGeocodingSearch, 300)

  const handleInputChange = (e) => {
    const value = e.target.value
    setSearchInput(value)
    if (value) {
      debouncedGeocodingSearch(value)
    } else {
      setSuggestions([])
    }
  }

  const handleSuggestionClick = (suggestion) => {
    const [longitude, latitude] = suggestion.center
    setViewport({ ...viewport, latitude, longitude, zoom: 12 })
    setSearchInput(suggestion.place_name)
    setSuggestions([])
  }

  const handleAddReview = () => {
    SetNewPlace({
      lat: viewport.latitude,
      long: viewport.longitude,
    })
  }

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      {/* Header containing search bar and add review button */}
      <div className="header">
        <ThemeToggle />
        <div className="search-box">
          <input
            type="text"
            value={searchInput}
            placeholder="Search for location"
            onChange={handleInputChange}
          />
          {suggestions.length > 0 && (
            <ul className="suggestions-list">
              {suggestions.map((suggestion) => (
                <li key={suggestion.id} onClick={() => handleSuggestionClick(suggestion)}>
                  {suggestion.place_name}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Add Review Button */}
        {currentUser && (
          <button onClick={handleAddReview} className="add-review-button">
            Add Review
          </button>
        )}
      </div>

      {/* Mapbox map */}
      <Map
        mapboxAccessToken={process.env.REACT_APP_MAPBOX}
        {...viewport}
        onMove={(evt) => setViewport(evt.viewState)}
        mapStyle="mapbox://styles/mapbox/streets-v9"
      >
        <NavigationControl position="top-left" />
        {currentUser && (
          <GeolocateControl
            position="top-left"
            trackUserLocation
            showUserHeading
            onGeolocate={(e) => {
              setViewport({
                latitude: e.coords.latitude,
                longitude: e.coords.longitude,
                zoom: 14,
              })
            }}
          />
        )}


        <MapMarker
          pins={pins}
          currentUser={currentUser}
          setCurrentPlaceId={SetCurrentPlaceId}
        />

        {pins.map((p) => (
          <Suspense fallback={<Loader />} key={p._id}>
            <MarkerPopup p={p} />
          </Suspense>
        ))}

        {/* User popup creation */}
        <Suspense fallback={<Loader />}>
          <UserMarkerPopup />
          {/* User Authentication - Login/Register */}
          <UserAuthentication />
        </Suspense>
      </Map>

      {/* Conditionally render Fixed Marker at the center of the screen */}
      {currentUser && (
        <div className="center-marker">
          <MyLocationIcon style={{ fontSize: 20, color: 'black' }} />
        </div>
      )}
      <BottomNav />
    </div>
  )
}

export default MapPage
