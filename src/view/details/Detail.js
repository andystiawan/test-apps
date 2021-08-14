import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Col, Container, Image, Row } from 'react-bootstrap';
import {useParams } from 'react-router-dom';
import { PATH_DETAIL_CAT } from '../../config/conf';
import './detail.css';
import rates from '../../asset/rating/rates.png';

function Detail(){
  const {id} = useParams();
  const [data, setData] = useState(null);
  const getData = async() => {
    await axios.get(PATH_DETAIL_CAT + id ).then(function(res){
      setData(res.data[0]);
    }).catch(e => {
      console.log(e);
    });
  }
  console.log(data);
  useEffect(()=>{
    if(data === null){
      getData();
    }else if(data === undefined){
        alert('Data not found !')
    }
  })
  const data_title = [
    {name: 'Name', data_name: 'name'},
    {name: 'Origin', data_name: 'origin'},
    {name: 'Country Code', data_name: 'country_codes'},
    {name: 'Description', data_name:'description'},
    {name: 'Life Span', data_name:'life_span'},
    {name: 'Wikipedia', data_name:'wikipedia_url'},
  ]
  const rating_detail = [
    {name: 'Adaptability', rating: 'adaptability'},
    {name: 'Affection Level', rating: 'affection_level'},
    {name: 'Child Friendly', rating: 'child_friendly'},
    {name: 'Cat Friendly', rating: 'cat_friendly'},
    {name: 'Dog Friendly', rating: 'dog_friendly'},
    {name: 'Energy Level', rating: 'energy_level'},
  ]
  const detail_data = data ? data.breeds[0] : null;
  return data ? (
    <div className="container-detail" >
      <div className="image-detail">
        <Image 
          className="profile-detail"
          src={data.url}
          roundedCircle/>
      </div>
      <div className="data-detail sm md">
        <Container >
          {data_title.map((item, index) => {
            return(
              <Row key={index}>
                <Col md="5"id="title">
                    <span>{item.name}</span>
                    <span>:</span>
                </Col>
                <Col md="5"id="value">
                  {detail_data[item.data_name].search("https") !== -1 ?
                    <a href={detail_data[item.data_name]} rel="noreferrer" target="_blank">
                        {item.name}
                    </a>
                  :detail_data[item.data_name]}
                </Col>
              </Row>
            )
          })}
          <Row>
            <Col md="5" id="title">
              <span>Other</span>
              <span>:</span>
            </Col>
            <Col md="5">
              <a href={detail_data.cfa_url} rel="noreferrer" target="_blank">
                CFA
              </a>
              <br/>
              <a href={detail_data.vetstreet_url} rel="noreferrer" target="_blank">
                Vetstreet
              </a>
              <br/>
              <a href={detail_data.vcahospitals_url} rel="noreferrer" target="_blank">
                Vcahospitals
              </a>
            </Col>
          </Row>
          {rating_detail.map((item, index) => {
            return(
              <Row key={index}>
                <Col md="5" id="title">
                  <span>{item.name}</span>
                  <span>:</span>
                </Col>
                <Col md="5">
                  <div>
                    {new Array(detail_data[item.rating])
                      .fill(rates)
                        .map((item,index) => {
                          return(
                            <Image 
                            style={{
                              width:'30px', 
                              height:'30px'
                            }}
                            key={index}
                            src={item} 
                            />
                          )})
                      }
                  </div>
                </Col>
              </Row>
            )
          })}
        </Container>
      </div>
    </div>
  ) : null
}

export default Detail;