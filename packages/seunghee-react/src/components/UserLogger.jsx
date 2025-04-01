function UserLogger({ logs }) {
  return (
    <div>
      {logs.map((log, index) => (
        <div key={index}>{log}</div>
      ))}
    </div>
  );
}

export default UserLogger;
