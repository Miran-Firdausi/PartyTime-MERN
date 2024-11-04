// Helper function to generate file path
function generateImagePath(name, prefix) {
  const timestamp = Date.now();
  return `${prefix}/${name}_${timestamp}`;
}
