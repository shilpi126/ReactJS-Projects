import React from 'react'
import axios from 'axios'
import {useState, useEffect} from 'react'

function Demo() {

    const [apiData, setApiData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postPerPage, setPostPerPage] = useState(10)

    useEffect(() => {
        async function callApi (){
            const apiResult = await axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=200&page=1&sparkline=false")
            setApiData(apiResult.data);
            console.log(apiResult);
        }

        callApi();

        console.log(apiData);
    },[])

    const lastPostIndex = currentPage * postPerPage;
    const firstPostIndex = lastPostIndex - postPerPage;
    const currentPost = apiData.slice(firstPostIndex, lastPostIndex);
    const totalPosts = apiData.length;


    let pages = [];
    for(let i=1; i<totalPosts/postPerPage; i++){
        pages.push(i);
    }

  return (
    <div>
    <div className='container'>
        {currentPost && 
            (currentPost).map((data, index)=>{
                    return(
                    <div className='info'>
                        
                        key={index}
                        <img src = {data.image} alt={data.name}/>
                        <h2>
                        name={data.name}
                        </h2>
                        <h3>
                        price={data.current_price}
                        </h3>
                        
                    </div>
                    )
            })

        }
        </div>

        <div className='btn'>
            {pages.map((page, index) =>{
                return(
                    <div>
                        <button key={index} onClick={() => setCurrentPage(page)} className={page == currentPage ? "active" : " "}>{page}</button>
                    </div>
                )
            })

            }
        </div>
    </div>


  )
}

export default Demo