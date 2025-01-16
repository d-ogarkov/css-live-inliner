# CSS Live Inliner

## Overview

This tool watches for changes in `/src/*.html`, inlines your CSS styles and places the result in the `/build` folder. Based on gulp-inline-css.

## Installation

```bash
git clone git@github.com:d-ogarkov/css-live-inliner.git
cd css-live-inliner
npm i
```

## Usage

Inline styles, remove links to external CSS files, and keep the `<style>` tag (default task):

```bash
gulp
```

Same, but remove the `<style>` tag:

```bash
gulp nostyle
```

Use Ctrl-C to exit the task.
