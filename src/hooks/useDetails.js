import React from "react";
import { fetchDetailsAsync } from "./utils";

export const useDetails = (selectedMovie) => {
  const [details, setDetails] = React.useState({});
  const [detailsLoading, setDetailsLoading] = React.useState(true);

  const getDetails = async (selectedMovie) => {
    try {
      const data = await fetchDetailsAsync(selectedMovie);
      console.log(data);
      setDetails(data);
      setDetailsLoading(false);
    } catch (error) {
      console.log(error);
      setDetails({});
      setDetailsLoading(false);
    }
  };

  React.useEffect(() => {
    setDetailsLoading(true);
    if (selectedMovie === "") return;
    getDetails(selectedMovie);
  }, [selectedMovie]);

  return { details, detailsLoading };
};
