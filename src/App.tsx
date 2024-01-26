import { useEffect, useRef } from "react";

function App() {
    const websocket = useRef<WebSocket>();

    useEffect(() => {
        if (!websocket?.current && ![0, 1].includes(websocket?.current?.readyState || 3)) {
            websocket.current = new WebSocket("wss://ws.derivws.com/websockets/v3?app_id=1089");
        }
        websocket.current?.addEventListener("open", () => {
            if (websocket.current?.readyState === 1) {
                websocket.current.send(
                    JSON.stringify({
                        ping: 1,
                    })
                );
            }
        });
        websocket?.current?.addEventListener("message", (response) => {
            console.log(JSON.parse(response.data));
        });

        return () => {
            if ([0, 1].includes(websocket?.current?.readyState || 3)) {
                websocket?.current?.close();
            }
        };
    }, []);

    return (
        <>
            <div>Interview</div>
            <div>Solution goes here.</div>
        </>
    );
}

export default App;
