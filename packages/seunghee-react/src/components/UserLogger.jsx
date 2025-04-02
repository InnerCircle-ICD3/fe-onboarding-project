import { useEffect, useRef } from "react";

function UserLogger({ logs }) {
  const logRef = useRef(null);

  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div ref={logRef} className="user-logger">
      {logs.map((log, index) => (
        <div key={index}>{log}</div>
      ))}
    </div>
  );
}

export default UserLogger;
