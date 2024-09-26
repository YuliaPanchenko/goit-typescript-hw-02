import toast, { Toaster } from "react-hot-toast";
import css from "../SearchBar/SearchBar.module.css";
import React, { FormEvent } from "react";

const notify = () => toast("Please enter search term!");

interface SearchBarProps {
  onSubmit: (image: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSubmit }) => {
  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const form = evt.target as HTMLFormElement;
    const image = (form.elements.namedItem("image") as HTMLInputElement).value;

    if (image.trim() === "") {
      notify();
      return;
    }
    console.log(image);

    onSubmit(image);
    form.reset();
  };

  return (
    <header className={css.formHeader}>
      <form className={css.form} onSubmit={handleSubmit}>
        <input
          className={css.formInput}
          type="text"
          name="image"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
        <button className={css.formBtn} type="submit">
          Search
        </button>
      </form>
    </header>
  );
};

export default SearchBar;
