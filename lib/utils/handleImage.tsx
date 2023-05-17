import React from "react";

export const handleImage = (
  e: React.ChangeEvent<HTMLInputElement>,
  setImage: React.Dispatch<React.SetStateAction<string>>
) => {
  e.preventDefault();
  const file = e.target.files[0];

  const Reader = new FileReader();

  Reader.onload = () => {
    if (Reader.readyState === 2) {
      setImage(Reader.result as string);
    }
  };
  if (file) {
    Reader.readAsDataURL(file);
  } else {
    setImage("/blank-profile.jpg");
  }
};
