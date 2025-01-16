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

Inline styles and keep the `<style>` tag (default task):

```bash
gulp
```

Inline styles and remove the `<style>` tag:

```bash
gulp nostyle
```
