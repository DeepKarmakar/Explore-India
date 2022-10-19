import { React, useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import axios from 'axios'

const baseUrl = 'http://localhost:3000/';
const Detail = () => {
	const [mapDetails, setMapDetails] = useState(null)
    let { id } = useParams();
    console.log(id);
	
	useEffect(() => {
		axios.get(`${baseUrl}mapData/${id}`)
			.then(res => {
				setMapDetails(res.data)
			})
	}, [])

    return(
        <>{mapDetails && mapDetails.location}</>
    )
}

export default Detail;