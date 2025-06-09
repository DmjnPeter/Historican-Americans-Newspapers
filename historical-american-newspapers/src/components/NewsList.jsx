import axios from 'axios';
import { useState, useEffect } from 'react';

export default function NewsList() {
  const [news, setNews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const newsPerPage = 10;

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(
          'https://chroniclingamerica.loc.gov/search/titles/results/?terms=oakland&format=json'
        );
        setNews(response.data.items);
      } catch (error) {
        console.error('Error fetching News', error);
      }
    };
    fetchNews();
  }, []);

  //  Values calculated for pagination
  const indexOfLastNews = currentPage * newsPerPage;
  const indexOfFirstNews = indexOfLastNews - newsPerPage;
  const currentNews = news.slice(indexOfFirstNews, indexOfLastNews);
  const totalPages = Math.ceil(news.length / newsPerPage);

  //  Button controls
  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };
  const prevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  return (
    <>

      <div className="row">
        {currentNews.map((newH, index) => (
          <div className="col-md-6 col-lg-10" key={index}>
            <div className="card h-100 mb-3">
              <div className="card-body">
                <h4>Title: {newH.title}</h4>
                <p>Publisher: {newH.publisher}</p>
                <p>Start year: {newH.start_year}</p>
                <p>End year: {newH.end_year}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Scroll buttons */}
      <div className="d-flex justify-content-center mt-4 gap-3">
        <button
          className="btn btn-primary"
          onClick={prevPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>Page {currentPage} / {totalPages}</span>
        <button
          className="btn btn-primary"
          onClick={nextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </>
  );
}
