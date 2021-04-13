import React from 'react';
import { useQuery } from '@apollo/client';
import { useParams } from "react-router-dom";
import Loader from "react-loader-spinner";
import TvSeriesCard from '../components/TvSeriesCard';
import {
  GET_TVSERIES_ID,
  GET_ENTERTAINME
 } from '../queries';

export default function DetailtvSeries () {
  const { id } = useParams();
  const { data, loading } = useQuery(GET_TVSERIES_ID, {
    variables: { id }
  })

  const { data: entertainmeData, loading: entertainmeLoading } = useQuery(GET_ENTERTAINME);

  if (loading || entertainmeLoading) {
    return (
      <div className="body">
        <div className="center-mid">
          <Loader type="Rings" color="#C01E2B" height={80} width={80} />
        </div>
      </div>
    );
  }
  return (
    <div className="body">
      <div className="container">
        <div className="detail">
          <div>
            <img className="detail-img" src={data.tvSerie.poster_path} alt={data.tvSerie.title} />
          </div>
          <div className="detail-info">
            <p className="detail-title">{data.tvSerie.title}</p>
            <hr/>
            <h3 className="detail-overview">OVERVIEW</h3> 
            <p>{data.tvSerie.overview}</p>
            <p><span className="detail-sub">Tags</span> : {data.tvSerie.tags.join(', ')}</p>
            <p><span className="detail-sub">Popularity</span> : {data.tvSerie.popularity}</p>
          </div>
        </div>
        <h3 className="sub-title">Other tvSerie</h3>
        <div className="flex-container">
          {
            entertainmeData.tvSeries.map(tvSeries => (
              <div className="flex-item">
                <TvSeriesCard
                  tvSeries={tvSeries}
                  key={tvSeries._id}
                />
              </div>
            ))
          }
        </div>
      </div>
    </div>
   )
 }