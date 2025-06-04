const requiredMajor = 20;
const { versions } = process;
const major = parseInt(versions.node.split('.')[0], 10);
if (major !== requiredMajor) {
  console.error(`Error: Node.js ${requiredMajor}.x is required. Detected ${versions.node}.`);
  process.exit(1);
}
