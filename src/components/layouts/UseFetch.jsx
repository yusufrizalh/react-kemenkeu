import React, { useState, useEffect } from "react";

const UseFetch = (url) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(null);

  useEffect(() => {
    // koneksi ke API & database
    setTimeout(() => {
      fetch(url)
        .then((resp) => {
          console.log(resp);
          if (!resp.ok) {
            throw Error("Could not fetch data from resource! Wrong URL!");
          }
          return resp.json();
        })
        .then((data) => {
          console.log(data);
          setData(data);
          setIsLoading(false);
          setIsError(null);
        })
        .catch((error) => {
          console.log(error);
          setIsLoading(false);
          setIsError(error.message);
        })
        .finally(() => {
          console.log("Finally is here");
        });
    }, 3000);
  }, [url]); // [url] useEffect dirender ulang ketika ada perubahan pada url

  return { data, isLoading, isError }; // props
};

export default UseFetch;
