import gulp from 'gulp';
const { watch } = gulp;
import inlineCss from 'gulp-inline-css'; // https://www.npmjs.com/package/gulp-inline-css
import cheerio from 'gulp-cheerio'; // https://www.npmjs.com/package/gulp-cheerio

// Helper: Replace all var(--*) usages in a style string with values from varMap
function replaceVarsInStyle(style, varMap) {
  if (!style) return style;
  let replaced = style;
  for (const [key, value] of Object.entries(varMap)) {
    replaced = replaced.replace(new RegExp(`var\\(${key}\\)`, 'g'), value);
  }
  return replaced;
}

// Helper: Replace CSS variables in inline styles using Cheerio
function replaceCssVars($) {
  // Extract CSS variables from <html style="...">
  const htmlStyle = $('html').attr('style') || '';
  const varMap = {};
  htmlStyle.split(';').forEach(pair => {
    const [key, value] = pair.split(':').map(s => s && s.trim());
    if (key && key.startsWith('--')) varMap[key] = value;
  });

  // Replace variables in all inline style attributes (Cheerio does not always include <html>)
  $('[style]').each((i, el) => {
    let style = $(el).attr('style');
    style = replaceVarsInStyle(style, varMap);
    $(el).attr('style', style);
  });

  // Explicitly replace variables in <html> style attribute
  if (htmlStyle) {
    let replacedHtmlStyle = replaceVarsInStyle(htmlStyle, varMap);
    // Remove all CSS variable definitions from <html> style attribute
    replacedHtmlStyle = replacedHtmlStyle
      .split(';')
      .map(pair => pair.trim())
      .filter(pair => pair && !pair.startsWith('--'))
      .join('; ');
    if (replacedHtmlStyle) {
      $('html').attr('style', replacedHtmlStyle);
    } else {
      $('html').removeAttr('style');
    }
  }
}

function processFiles(files, optionsSrc, optionsInlineCss) {
  return gulp.src(files, optionsSrc)
    // Move styles from head to inline style=..., then remove the <style> section, except for media queries
    .pipe(inlineCss(optionsInlineCss))
    // Replace CSS variables in inline styles
    .pipe(cheerio({ run: replaceCssVars, parserOptions: { decodeEntities: false } }))
      // Put the result to the destination folder
    .pipe(gulp.dest('build/'));
}

function run(optionsInlineCss) {
  watch(
    ['src/**/*.htm', 'src/**/*.html'], // Files to watch
    { ignoreInitial: false } // Force to run the task on startup
  )
  .on('change', function(files) {
    let timestamp = new Date().toLocaleString();
    console.log(`${timestamp} Processing ${files}`);
    processFiles(files, { base: 'src/' }, optionsInlineCss); // Task to run on changed files
  });
}

function buildAndRemoveStyles() {
  run({
    applyLinkTags: true,
    applyStyleTags: true,
    preserveMediaQueries: true,
    removeHtmlSelectors: true,
    removeLinkTags: true,
    removeStyleTags: true,
  });
}

function buildAndKeepStyles() {
  run({
    applyLinkTags: true,
    applyStyleTags: false,
    preserveMediaQueries: true,
    removeHtmlSelectors: true,
    removeLinkTags: true,
    removeStyleTags: false,
  });
}

export { buildAndRemoveStyles as nostyle };
export default buildAndKeepStyles;
