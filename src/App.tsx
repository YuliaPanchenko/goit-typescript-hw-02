import { useEffect, useState } from "react";
import { requestAllImages, requestAImagesBySearchValue } from "./services/api";
import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import Loader from "./components/Loader/Loader";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import ImageModal from "./components/ImageModal/ImageModal";
import { Images } from "../src/types";
function App() {
  const [images, setImages] = useState<Images[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<null>(null);
  const [searchValue, setSearchValue] = useState<null>(null);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [modalImage, setModalImage] = useState<null>(null);

  useEffect(() => {
    if (searchValue === null) return;

    const fetchImagesBySearchValue = async () => {
      try {
        setIsLoading(true);
        const data = await requestAImagesBySearchValue(searchValue, page);
        setImages((prevImages) => [...prevImages, ...data.results]);
        setTotalPages(data.total_pages);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImagesBySearchValue();
  }, [searchValue, page]);

  const onSubmit = (image) => {
    setSearchValue(image);
    setImages([]);
    setPage(1);
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleImageClick = (image) => {
    setModalImage(image);
    setIsOpenModal(true);
  };

  const closeModal = () => {
    setIsOpenModal(false);
    setModalImage(null);
  };

  return (
    <>
      <SearchBar onSubmit={onSubmit} />
      <ImageGallery images={images} onImageClick={handleImageClick} />
      {isLoading && <Loader />}
      {error !== null && <ErrorMessage error={error} />}
      {images.length > 0 && !isLoading && page < totalPages && (
        <LoadMoreBtn onClick={handleLoadMore} />
      )}
      {modalImage && (
        <ImageModal
          isOpen={isOpenModal}
          onRequestClose={closeModal}
          imageUrl={modalImage.urls.regular}
          imageAlt={modalImage.alt_description}
        />
      )}
    </>
  );
}

export default App;

// useEffect(() => {
//   const fetchImages = async () => {
//     try {
//       setIsLoading(true);
//       const data = await requestAllImages();
//       setImages(data);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   fetchImages();
// }, []);
