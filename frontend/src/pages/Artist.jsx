import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Carousel from "../components/Carousel";
import FullDescription from "../components/FullDescription";

export default function Artist() {
  const { artistId } = useParams();
  const [artist, setArtist] = useState([]);
  const [artwork, setArtwork] = useState([]);
  const [fullText, setFullText] = useState("");
  const [isLoadedArtworks, setIsLoadedArtworks] = useState(false);
  const [isLoadedArtists, setIsLoadedArtists] = useState(false);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/artists/${artistId}`)
      .then((res) => {
        const artistData = res.data[0];
        setArtist(artistData);
        setFullText(artistData.description);
        setIsLoadedArtists(true);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/artworks`)
      .then((res) => {
        const artworkData = res.data;
        setArtwork(artworkData);
        setIsLoadedArtworks(true);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const filteredArtworks = artwork.filter(
    (el) => el.artist_id === parseInt(artistId, 10)
  );
  const imageUrls = filteredArtworks.map((el) => [el.image_url_medium, el.id]);

  const disableRightClick = (e) => {
    e.preventDefault();
  };

  const partialText = `${fullText.slice(0, Math.ceil(fullText.length / 2))}...`;

  return (
    <div className="flex flex-col justify-center items-center pt-[90px] px-8">
      {isLoadedArtists && isLoadedArtworks ? (
        <section className="flex flex-col lg:gap-[100px] w-full justify-center mt-5 lg:flex-row">
          <div className="flex flex-col md:gap-5 ">
            <img
              src={artist.image_url_medium}
              alt={`artist${artistId}`}
              className="rounded-full object-cover h-[150px] w-[150px] block mx-auto"
            />
            <h1 className="text-[21px] font-semibold py-8">
              {artist.firstname}
            </h1>
          </div>
          <div className="flex flex-col justify-center gap-5 lg:w-[50%]">
            <FullDescription partialText={partialText} fullText={fullText} />
            {artist.website_url ? (
              <a href={artist.website_url} target="blank">
                <p className="flex justify-start text-[#257492] py-4">{`En savoir plus sur ${artist.nickname}`}</p>
              </a>
            ) : null}
          </div>
        </section>
      ) : (
        <p>Chargement...</p>
      )}
      <Carousel imageUrls={imageUrls} disableRightClick={disableRightClick} />
    </div>
  );
}
