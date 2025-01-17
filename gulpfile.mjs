import gulp from 'gulp';
const { watch } = gulp;
import inlineCss from 'gulp-inline-css'; // https://www.npmjs.com/package/inline-css

function processFiles(files, optionsSrc, optionsInlineCss) {
  return gulp.src(files, optionsSrc)
    // Move styles from head to inline style=..., then remove the <style> section, except for media queries
    .pipe(inlineCss(optionsInlineCss))

    // Put the result to the destination folder
    .pipe(gulp.dest('build/'));
}

function run(optionsInlineCss) {
  watch(
    ['src/**/*.htm', 'src/**/*.html'], // Files to watch
    { ignoreInitial: false } // Force to run the task on startup
  )
  .on('change', function(files) {
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
