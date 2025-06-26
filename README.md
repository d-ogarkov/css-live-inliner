# CSS Live Inliner

## Overview

This tool watches for changes in `/src/*.html`, inlines your CSS styles, replaces CSS variables with static values, and saves the result in the `/build` folder. Useful for building HTML emails, but not limited to that. Based on gulp-inline-css.

## Installation

```bash
git clone git@github.com:d-ogarkov/css-live-inliner.git
cd css-live-inliner
npm i
```

## Usage

Run the task in the background from a terminal. When a file change is detected in `/src/*.html`, the file gets processed, overwriting the existing build. There are two modes.

### 1. Default: inline the CSS, keep the `<style>` tag

You'll want to keep the `<style>` tag when using the `@import` rule to embed some Google Fonts, for example. In this case, keep your styles in external CSS files and use `@import` in the HTML; it will remain in the build, and the external styles will be inlined. To run in this mode:

```bash
gulp
```

### 2. Remove CSS completely after inlining

In this mode, `<style>` tags will be removed from your HTML completely after converting to inline styles:

```bash
gulp nostyle
```

Use Ctrl-C to exit the task.
