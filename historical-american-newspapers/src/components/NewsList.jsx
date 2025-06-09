import axios from 'axios'
import { useState, useEffect } from 'react'


export default function NewsList() {
    
    const [news, setNews] = useState([])

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await axios.get("https://chroniclingamerica.loc.gov/search/titles/results/?terms=oakland&format=json");
                setNews(response.data.items)
            } catch (error) {
                console.error('Error fetching News', error);
            }
        };
        fetchNews();
    }, [])

    return (
        <>
            <div className='row'>
                 {news.map((newH, index) => (
                    <div className='col-md-6 col-lg-10' key={index}>
                        <div className='card h-100'>
                            <div className='card-body'>
                                <h4>Title: {newH.title}</h4>
                                <p>Publisher: {newH.publisher}</p>
                                <p>Start year: {newH.start_year}</p>
                                <p>End year: {newH.end_year}</p>
                            </div>
                        </div>
                    </div>))}
            </div>      
        
        </>
    )

}