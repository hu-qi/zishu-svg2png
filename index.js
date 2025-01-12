const fs = require('fs');
const path = require('path');
const { Resvg } = require('@resvg/resvg-js');

// Create results directory
const resultsDir = 'results';


if (!fs.existsSync(resultsDir)) {
  fs.mkdirSync(resultsDir);
}

function logError(error) {
  const resultsFile = path.join(resultsDir, 'errors.txt');
  if (!fs.existsSync(resultsFile)) {
    fs.writeFileSync(resultsFile, '');
  }
  const timestamp = new Date().toISOString();
  fs.appendFileSync(resultsFile, `[${timestamp}] ${error}\n`);
}

async function convertSvgToPng(svgPath) {
  try {
    const svgContent = fs.readFileSync(svgPath, 'utf8');
    const resvg = new Resvg(svgContent);
    const pngData = resvg.render();
    const pngBuffer = pngData.asPng();
    
    // Create output path in results directory
    const relativePath = path.relative(process.cwd(), svgPath);
    const outputPath = path.join(resultsDir, relativePath).replace(/\.svg$/, '.png');
    
    // Create output directory if needed
    const outputDir = path.dirname(outputPath);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    fs.writeFileSync(outputPath, pngBuffer);
    console.log(`Converted: ${svgPath} -> ${outputPath}`);
  } catch (error) {
    logError(`Failed to convert ${svgPath}: ${error.message}`);
  }
}

async function processPath(inputPath) {
  try {
    const stats = fs.statSync(inputPath);
    
    if (stats.isFile() && inputPath.endsWith('.svg')) {
      await convertSvgToPng(inputPath);
    } else if (stats.isDirectory()) {
      const files = fs.readdirSync(inputPath);
      for (const file of files) {
        if (file.endsWith('.svg')) {
          await convertSvgToPng(path.join(inputPath, file));
        }
      }
    } else {
      logError(`Invalid input: ${inputPath} is not an SVG file or directory`);
    }
  } catch (error) {
    logError(`Error processing ${inputPath}: ${error.message}`);
  }
}

// Main execution
if (process.argv.length < 3) {
  console.log('Usage: node index.js <file.svg or directory>');
  process.exit(1);
}

const inputPath = process.argv[2];
processPath(inputPath);
