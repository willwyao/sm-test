import React from "react";
import { fetchDetailsAsync } from "./utils";

export const useDetails = (selectedMovie) => {
  const [details, setDetails] = React.useState({});

  const getDetails = async (selectedMovie) => {
    try {
      const data = await fetchDetailsAsync(selectedMovie);
      console.log(data);
      setDetails(data);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    if (selectedMovie === "") return;
    getDetails(selectedMovie);
  }, [selectedMovie]);

  return { details };
};
