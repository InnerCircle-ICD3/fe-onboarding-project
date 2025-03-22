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

// Start the application when DOM is fully loaded
window.addEventListener("DOMContentLoaded", () => {
  const app = createApp();
  app.initialize();
});
