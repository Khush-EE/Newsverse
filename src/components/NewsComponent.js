import News from './News'
import "../stylesheets/NewsComponent.css"
import React from 'react'
import { useState , useEffect , useContext } from 'react'
import Loading from './Loading'
import ErrorPage from './ErrorPage'
import { useParams } from 'react-router-dom'
import ParamContext from '../contexts/ParamContext'

async function getData(page, category, topic, lang, country) {
  let url;
  if(category === null || country === null) {
    url = `https://newsapi.org/v2/everything?q=${topic?topic:"general"}&apiKey=25f41d7a014943f5a640c0b8a73edf9d&page=${page}&pageSize=9&language=${lang}`;
  }else {
    url = `https://newsapi.org/v2/top-headlines?category=${category}&language=en&apiKey=0683efddcc9b4d739020691b27b2a593&page=${page}&pageSize=9&language=${lang}&country=${country?country:""}`;
  }

  let res = await fetch(url);
  let data = await res.json();

  return data;

}

async function getPages(category, topic, lang, country) {
  let url;
  if(category === null || country === null) {
    url = `https://newsapi.org/v2/everything?q=${topic?topic:"general"}&apiKey=25f41d7a014943f5a640c0b8a73edf9d&page=1&pageSize=9&language=${lang}`;
  }else {
    url = `https://newsapi.org/v2/top-headlines?category=${category}&language=en&apiKey=0683efddcc9b4d739020691b27b2a593&page=1&pageSize=9&language=${lang}&country=${country?country:""}`;
  }

  let res = await fetch(url);
  let data = await res.json();

  return data;
}

//apiKey=25f41d7a014943f5a640c0b8a73edf9d&page=1&category=general

export default function NewsComponent() {

  const { topic } = useParams();
  const { category , lang , country } = useContext(ParamContext);
  const [state, setState] = useState({
    articles: {},
    loading: true,
    totalResults: 0,
    status: true
  });
  const [page, setPage] = useState(1);
  const [totalpages, setTotalpages] = useState(0);

  useEffect(() => {
    getPages(category, topic, lang, country).then((val) => setTotalpages(Number(Math.ceil(val["totalResults"]/9))));
  }, [category, lang, topic, totalpages, country])

  useEffect(() => {

    window.scrollTo(0, 0);
    setState({
      loading: true,
      status: true
    })
    let data = getData(page, category, topic, lang, country);

    data.then((val) => setState({
      articles: val['articles'],
      loading: false,
      totalResults: val['totalResults'],
      status: true
    })).catch((err) => {
      setState({
        status : false
      })
    });

  }, [page, category, lang, country]);

  let i = 0;

  return (
      <>
         <div className='container'>
          {!state.status && <ErrorPage/>}
          {state.loading && <Loading/>}
          {state.status && !state.loading && Array.from(state.articles).map((elem) => {
            const { title, content, urlToImage, url} = elem;
            return <News
               key={i++}
               title={title?((title.length < 65)?title:title.slice(0,65)+"..."):""}
               content={content?(content && (content).slice(0,content.length - 13)):elem['description']?elem['description']:"No Data Found"}
             urlToImage={urlToImage?urlToImage:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRo1lw2XoUtv1eNn-VPqax_v5lk1fB5DYu6mA&usqp=CAU"}
               url={url?url:""}/>
           })}
        </div>
         <div className='footer'>
           <button onClick={() => {
             setState({loading: true, status: true});
           setPage(page-1);
           }} disabled={page === 1}>Prev</button>
           <button onClick={() => {
             setState({loading: true, status: true});
            setPage(page + 1);
           }} disabled={page === totalpages}>Next</button>
         </div>
      </>
  )
}
