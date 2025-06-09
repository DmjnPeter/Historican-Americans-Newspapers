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
        <h1>Historical News</h1>
        <ul>
            {news.map((newH, index) => (<li key={index}>{newH.title}</li>))}
        </ul>
        </>
    )

}