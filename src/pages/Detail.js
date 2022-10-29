import { React, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Col, Container, Row } from "react-bootstrap";
import { MapContainer, TileLayer } from "react-leaflet";

const baseUrl = "http://localhost:3000/";
const Detail = () => {
  const [mapDetails, setMapDetails] = useState(null);
  let { id } = useParams();
  console.log(id);

  useEffect(() => {
    axios.get(`${baseUrl}mapData/${id}`).then((res) => {
      setMapDetails(res.data);
    });
  }, []);

  return (
    <div className="detail">
      <Row>
        <Col md={5}>
          <MapContainer
            center={[20.593683, 78.962883]}
            zoom={5}
            scrollWheelZoom={true}
          >
            <TileLayer
              attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
              url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
            />
          </MapContainer>
        </Col>
        <Col md={7}>details</Col>
      </Row>
    </div>
  );
};

export default Detail;
