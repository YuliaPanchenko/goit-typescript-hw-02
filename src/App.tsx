import { useEffect, useState } from "react";
import { requestAImagesBySearchValue } from "./services/api";
import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import Loader from "./components/Loader/Loader";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import ImageModal from "./components/ImageModal/ImageModal";
import { UnsplashImage, UnsplashResponse } from "../src/types";
function App() {
  const [images, setImages] = useState<UnsplashImage[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [searchValue, setSearchValue] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [modalImage, setModalImage] = useState<UnsplashImage | null>(null);

  useEffect(() => {
    if (searchValue === null) return;

    const fetchImagesBySearchValue = async (): Promise<void> => {
      try {
        setIsLoading(true);
        const data = await requestAImagesBySearchValue(searchValue, page);
        setImages((prevImages: UnsplashImage[]) => [
          ...prevImages,
          ...data.results,
        ]);
        setTotalPages(data.total_pages);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Unknown error occurred");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchImagesBySearchValue();
  }, [searchValue, page]);

  const onSubmit = (image: string) => {
    setSearchValue(image);
    setImages([]);
    setPage(1);
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleImageClick = (image: UnsplashImage) => {
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
          imageUrl={modalImage.urls?.regular ?? modalImage.urls.full}
          imageAlt={modalImage.alt_description || "No description available"}
        />
      )}
    </>
  );
}

export default App;
