import React from "react";

export default function Logo(props) {
    return (
        <svg
                {...props}
                viewBox="0 0 1331 266"
                xmlns="http://www.w3.org/2000/svg"
            >
                {/* <!-- Mengganti bagian ini dengan gambar raster --> */}
                <image 
                    href="/LOGOKAGEOFIKS.svg" 
                    x="0" 
                    y="0" 
                    width="1131" 
                    height="266"
                    preserveAspectRatio="xMidYMid meet" 
                />
        </svg>
    );
}
