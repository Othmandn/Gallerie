import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AuthContext from "../context/AuthContext";
import SortBy from "../components/SortBy";
import Remove from "../assets/x-lg.svg";

function UserFavorite() {
  const [artworksToMap, setArtworksToMap] = useState([]);
  const [dataArtist, setDataArtist] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [filter, setFilter] = useState("");
  const [filteredAndSortedData, setFilteredAndSortedData] = useState([]);
  const [favoritesCount, setFavoritesCount] = useState(0);
  const [deleteFavorite, setDeleteFavorite] = useState(false);
  const { userId, headers } = React.useContext(AuthContext);
  const favoriteArtworksPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);
  const [currentFavoriteArtworks, setCurrentFavoriteArtworks] = useState([]);

  useEffect(() => {
    axios
      .get(
        `${import.meta.env.VITE_BACKEND_URL}/user/${userId}/artworks/favorites`,
        { headers }
      )
      .then((response) => {
        const favData = response.data;
        setFavoritesCount(favData.length);
        const fetchArtworksPromises = favData.map((fav) =>
          axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/artworks/${fav.artwork_id}`
          )
        );
        Promise.all(fetchArtworksPromises)
          .then((artworksResponses) => {
            const artworksData = artworksResponses.map((res) => res.data[0]);
            setArtworksToMap(artworksData);
            setIsLoaded(true);
          })
          .catch((error) => {
            console.error(error);
            setIsLoaded(true);
          });
      })
      .catch((error) => {
        console.error(error);
        setIsLoaded(true);
      });
  }, [deleteFavorite]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/artists`)
      .then((res) => {
        setDataArtist(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const disableRightClick = (e) => {
    e.preventDefault();
  };

  const handleChange = (e) => {
    setFilter(e.target.value);
  };

  const filterAndSortData = () => {
    const sortedData = [...artworksToMap];
    if (filter === "asc") {
      sortedData.sort((a, b) => a.name.localeCompare(b.name));
    } else if (filter === "desc") {
      sortedData.sort((a, b) => b.name.localeCompare(a.name));
    }
    return sortedData;
  };

  useEffect(() => {
    const filteredAndSorted = filterAndSortData();
    setFilteredAndSortedData(filteredAndSorted);
  }, [artworksToMap, filter]);

  useEffect(() => {
    const indexOfLastFavoriteArtwork = currentPage * favoriteArtworksPerPage;
    const indexOfFirstFavoriteArtwork =
      indexOfLastFavoriteArtwork - favoriteArtworksPerPage;
    setCurrentFavoriteArtworks(
      filteredAndSortedData.slice(
        indexOfFirstFavoriteArtwork,
        indexOfLastFavoriteArtwork
      )
    );
  }, [filteredAndSortedData, currentPage]);

  const removeFavorite = (artworkId) => {
    axios
      .delete(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/user/${userId}/artwork/${artworkId}/favorite`,
        {
          headers,
        }
      )
      .then(() => {
        setFilteredAndSortedData((prevData) =>
          prevData.filter((item) => item.id !== artworkId)
        );
        setArtworksToMap((prevData) =>
          prevData.filter((item) => item.id !== artworkId)
        );
        setFavoritesCount((prevCount) => prevCount - 1);
        setDeleteFavorite(!deleteFavorite);
        if (currentFavoriteArtworks.length - 1 === 0) {
          if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
          } else {
            setCurrentPage(1);
          }
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const totalPages = Math.ceil(
    filteredAndSortedData.length / favoriteArtworksPerPage
  );

  const handlePageClick = (pageNumber) => {
    window.scrollTo(0, 0);
    setCurrentPage(pageNumber);
  };

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i += 1) {
    pageNumbers.push(i);
  }

  return (
    isLoaded && (
      <div className="px-[20px] flex flex-col justify-center pt-[70px]">
        <div className="flex flex-col justify-between md:flex-row md:justify-between md:items-center">
          <h1 className="font-semibold text-4xl pt-2 pb-4 text-slate-300">
            Mes Favoris ({favoritesCount})
          </h1>
          <SortBy handleChange={handleChange} />
        </div>
        <div className="flex flex-col md:grid md:grid-cols-4 md:gap-5 md:pt-6">
          {currentFavoriteArtworks.map((item) => {
            return (
              <div
                key={item.id}
                className="flex flex-col md:justify-center lg:justify-start items-center"
              >
                <div>
                  <Link to={`/gallery/${item.id}`}>
                    <div className="flex flex-col justify-center items-center">
                      <img
                        src={item.image_url_medium}
                        alt="artwork"
                        className="flex justify-center shadow-xl max-h-[600px]"
                        onContextMenu={disableRightClick}
                      />
                    </div>
                  </Link>
                  <div className="flex flex-row justify-between w-[100%] mt-3">
                    <div className="flex flex-col">
                      <p className="text-left">{`${item.name}, ${item.year}`}</p>
                      {dataArtist.map((artist) => {
                        if (artist.id === item.artist_id) {
                          return (
                            <p
                              key={artist.id}
                              className="text-left mb-4 text-gray-600"
                            >
                              {artist.nickname}
                            </p>
                          );
                        }
                        return null;
                      })}
                    </div>
                    <div>
                      <button
                        onClick={() => removeFavorite(item.id)}
                        type="button"
                        className="h-6 w-6"
                      >
                        <img
                          src={Remove}
                          alt="supprimer"
                          className="h-6 w-6 md:h-8 md:w-8"
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {pageNumbers.length > 1 && (
          <div className="flex justify-center items-center mt-4">
            {pageNumbers.map((pageNumber) => (
              <button
                type="button"
                key={pageNumber}
                onClick={() => handlePageClick(pageNumber)}
                className={`${
                  currentPage === pageNumber
                    ? `bg-[#7F253E] text-white`
                    : "bg-white"
                } border border-[#7F253E] px-6 py-2 mx-2 rounded mb-8`}
              >
                {pageNumber}
              </button>
            ))}
          </div>
        )}
      </div>
    )
  );
}

export default UserFavorite;
