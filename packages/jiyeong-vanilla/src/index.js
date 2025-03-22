function createApp() {
  function render() {
    const app = document.getElementById("app");
    return app;
  }

  function initialize() {
    render();
  }

  return {
    initialize,
  };
}

window.addEventListener("DOMContentLoaded", () => {
  const app = createApp();
  app.initialize();
});
