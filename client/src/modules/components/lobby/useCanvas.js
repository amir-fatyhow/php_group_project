import Canvas from "./Canvas";

export default function useCanvas(render = () => { }) {
    let FPS = 0;
    let outFPS = 0;
    let lastTimeStamp = Date.now();
    const animLoop = () => {
        FPS++;
        const timeStamp = Date.now();
        if (timeStamp - lastTimeStamp >= 1000) {
            outFPS = FPS;
            FPS = 0;
            lastTimeStamp = timeStamp;
        }
        render(outFPS);
        window.requestAnimFrame(animLoop);
    };
    return (params) => {
        animLoop();
        return new Canvas(params);
    }
}