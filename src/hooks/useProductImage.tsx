import { useEffect, useState } from "react";
import {apiImageBlob} from "../lib/api/apiImageBlob.ts";

type Config = {
    width?: number;
    height?: number;
    quality?: number;
};

const useProductImage = (filename: string | null, config?: Config) => {
    const [image, setImage] = useState<string | undefined>();

    useEffect(() => {
        if (!filename) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setImage(undefined);
            return;
        }

        let objectUrl: string | null = null;
        let cancelled = false;

        apiImageBlob(filename, config && {
            w: config.width,
            h: config.height,
            q: config.quality,
        }).then(url => {
            if (!cancelled && url) {
                objectUrl = url;
                setImage(url);
            }
        });

        return () => {
            cancelled = true;
            if (objectUrl) {
                URL.revokeObjectURL(objectUrl);
            }
        };
    }, [filename, config]);

    return image;
};

export default useProductImage;
