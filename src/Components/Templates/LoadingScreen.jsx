import React from "react";
import { RiSpinner } from "src/Assets/RemixIcon";

const LoadingScreen = () => {
    return (
        <div className="absolute z-[60] flex h-full w-full flex-col items-center justify-center bg-transparent text-gray-800">
            <RiSpinner className="mb-1 h-min w-16 text-6xl text-blue-900 dark:text-slate-100" />
        </div>
    );
};

export default LoadingScreen;
