import { useEffect, useState } from "preact/hooks";

const cache = [];

const useScript = (path) => {
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (cache.includes(path)) {
            setLoaded(true);
            setError(false);
        } else {
            cache.push(path);

            const tag = document.createElement("script");
            tag.src = path;
            tag.async = true;

            const handleLoad = () => {
                setLoaded(true);
                setError(false);
            };

            const handleError = () => {
                const index = cache.indexOf(path);
                if (index > -1) {
                    cache.splice(index, 1);
                }

                tag.remove();

                setLoaded(true);
                setError(true);
            };

            tag.addEventListener("load", handleLoad);
            tag.addEventListener("error", handleError);

            document.head.appendChild(tag);

            return () => {
                tag.removeEventListener("load", handleLoad);
                tag.removeEventListener("error", handleError);
            };
        }
    }, [path]);

    return {
        loaded,
        error,
    };
};

export default useScript;
