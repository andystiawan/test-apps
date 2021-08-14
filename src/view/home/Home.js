import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Accordion, Button, Image, Spinner } from 'react-bootstrap';
import { PATH_LIST_CAT, PATH_SEARCH_CAT } from '../../config/conf';
import "./home.css";


function Home(){
	const { 
		innerHeight: height,
	} = window;
	const initialState = {
		list_cat: null,
		search:'',
		cat_detail: '',
		limit:10,
		loading: true,
		loadingMore : false,
		noMoreData:false
	};
	const [state, setState] = useState(initialState);
	const handleSearch = (e) =>{
		setState(p=>({...p,search: e.target.value}))
		if(e.target.value === ''){
			getList();
		}else{
			searchData(e.target.value);
		}
	};
	window.onscroll = () => {
		if (height + document.documentElement.scrollTop >= document.documentElement.scrollHeight){
			if(!state.noMoreData){
				fetchMoreData();
			}
		};
	};
	const fetchMoreData = async () => {
		try {
			setState(p=>({...p,loadingMore: true, limit: state.limit + 10}));
			await getList();
			setState(p=>({...p,loadingMore: false}));
		} catch (error) {
			console.log(error);
		}
	};
	const getList = async() =>{
		try {
			await axios.get(PATH_LIST_CAT + state.limit)
			.then(function (res){
				setState(prev => ({...prev, 
					list_cat: res.data,
					loading: false
				}));
				if(state.limit > 30 && 
					res.data.length === 
					state.list_cat.length 
					){
					setState(prev => ({...prev,noMoreData: true}))
				}
			});
		} catch (error) {
			console.log(error);
		}
	};
	const searchData = async(data) => {
		try {
			setState(prev => ({...prev,
				loading: true
			}));
			await axios.get(PATH_SEARCH_CAT + data)
			.then(function (res){
				setState(prev => ({...prev, 
					list_cat: res.data,
					loading: false
				}));
			});
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(()=>{
		if(state.list_cat === null){
			getList();
		}else if(state.search === ''){
			getList();
		}
	});
	
	return(
		<div className="container" style={{height: height}}>
			<div className="search-cat">
				<input
					type="text" 
					placeholder="Cari Jenis Kucing" 
					onChange={handleSearch.bind()}
					/>
			</div>
			<div>
				{state.loading ? 
					<Loading/>
					: 
					<Accordion className="list-cat-container">
						{state.list_cat ? 
							state.list_cat.map((item, index) => {
								return(
									<Accordion.Item key={item.id} eventKey={index}>
										<Accordion.Header>
											{item.image === undefined ? '':
												<Image 
													src={item.image.url} 
													className="list-image"
													roundedCircle />
											}
											<span>
												{item.name}
											</span>
										</Accordion.Header>
										<Accordion.Body>
											{item.description}
											<Button 
												onClick={() => window.open(item.wikipedia_url, '_blank', 'noopener,noreferrer')} 
												variant="primary">
												Wikipedia
											</Button>
											<Button href={'/detail/'+ item.id} variant="info">
												Detail
											</Button>
										</Accordion.Body>
									</Accordion.Item>
								)
							}) : 'TIDAK ADA DATA'}
					</Accordion>
				}
			</div>
			{state.loadingMore ?  <Loading/> : "" }
		</div>
	)
}

const Loading = () => {
  return (
    <div className="loading">
			<span>Loading</span>
			<Spinner animation="grow" className="spinner" size="sm" variant="info" />
			<Spinner animation="grow" className="spinner" size="sm" variant="info" />
			<Spinner animation="grow" className="spinner" size="sm" variant="info" />
    </div>
  );
};

export default Home;