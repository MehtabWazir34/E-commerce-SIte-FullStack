import { useEffect } from "react";
import { useLocation } from "react-router";

function ScrollToHash() {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      document.querySelector(hash)?.scrollIntoView();
    }
  }, [hash]);

  return null;
}

export default ScrollToHash;
