import { React, useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { Icon } from 'leaflet'
import logo from '../logo.svg';
import axios from 'axios'
import { Link } from 'react-router-dom';

const covidIcon = new Icon({
	iconUrl: logo,
	iconSize: [35, 325]
})
const baseUrl = 'http://localhost:3000/';

const Home = () => {
	const [activeCovid, setActiveCovid] = useState(null);
	const [mapPoints, setMapPoints] = useState(null)
	
	useEffect(() => {
		axios.get(`${baseUrl}mapData/`)
			.then(res => {
				setMapPoints(res.data)
			})
	}, [])
	
    return (
        
        <MapContainer
            center={[20.593683, 78.962883]}
            zoom={5}
            scrollWheelZoom={true}

        >
            <TileLayer
                attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
                url='https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png'
            />

            {/* <TileLayer 
          attribution = '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' 
          url = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" 
        /> */}
            {mapPoints && mapPoints.map(eachData => (
                <Marker
                    key={eachData.id}
                    position={[eachData.latitude, eachData.longitude]}
                    eventHandlers={{
                        click: () => {
                            setActiveCovid(eachData)
                        }
                    }}
                    icon={covidIcon}
                />
            ))}

            {activeCovid && (
                <Popup
                    position={[activeCovid.latitude, activeCovid.longitude]}
                    onClose={() => {
                        setActiveCovid(null)
                    }}
                >
                    <div>
                        <h1>{activeCovid.location}</h1>
                        <Link to={`/detail/${activeCovid.id}`}>Detail</Link>
                    </div>
                </Popup>
            )}

        </MapContainer>
    )
}

export default Home;