function UserLogger({ logs }) {
  return (
    <div className="user-logger">
      {logs.map((log, index) => (
        <div key={index}>{log}</div>
      ))}
    </div>
  );
}

export default UserLogger;
