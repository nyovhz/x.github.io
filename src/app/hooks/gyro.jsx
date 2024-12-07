import { useRef, useEffect, useState } from 'react';

function Gyroscope() {
    const [motionData, setMotionData] = useState({
        alpha: 0,
        beta: 0,
        gamma: 0,
    });
    const [isGyroscopeAvailable, setIsGyroscopeAvailable] = useState(true);

    useEffect(() => {
        const handleOrientation = (evt) => {
            setMotionData((prev) => ({
                ...prev,
                alpha: evt.alpha,
                beta: evt.beta,
                gamma: evt.gamma,
            }));
        };

        if (window.DeviceOrientationEvent) {
            window.addEventListener("deviceorientation", handleOrientation);
        } else {
            setIsGyroscopeAvailable(false);
        }

        return () => {
            window.removeEventListener("deviceorientation", handleOrientation);
        };
    }, []);

    return {
        motionData,
        isGyroscopeAvailable,
    };
}

export default Gyroscope;
