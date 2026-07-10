import { useEffect, useState } from "react";
import "../components/csscomponents/LoadingOverlay.css";

export default function LoadingOverlay() {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const handleStart = () => setLoading(true);
        const handleEnd = () => setLoading(false);

        window.addEventListener("loading:start", handleStart);
        window.addEventListener("loading:end", handleEnd);

        return () => {
            window.removeEventListener("loading:start", handleStart);
            window.removeEventListener("loading:end", handleEnd);
        };
    }, []);

    if (!loading) return null;

    return (
        <div className="loading-overlay">
            <div className="loading-content">
                <div className="loading-spinner"></div>
                <p>Pensando um pouco...</p> 
            </div>
        </div>
    );
}