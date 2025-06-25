# CSS Live Inliner

## Overview

This tool watches for changes in `/src/*.html`, inlines your CSS styles, replaces CSS variables with static values, and places the result in the `/build` folder. Useful for building HTML emails, but not limited to that. Based on gulp-inline-css.

## Installation

```bash
git clone git@github.com:d-ogarkov/css-live-inliner.git
cd css-live-inliner
npm i
```

## Usage

When a file change is detected in `/src/*.html`, inline styles, remove external CSS links, and keep the `<style>` tag:

```bash
gulp
```

Same, but remove the `<style>` tag:

```bash
gulp nostyle
```

Use Ctrl-C to exit the task.
