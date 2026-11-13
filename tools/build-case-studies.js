#!/usr/bin/env node
/* Generate the 10 case-study pages from assets/js/data.js (single source).
   Run:  node tools/build-case-studies.js
   Output: work/<slug>.html — real static HTML, committed alongside this script.
   No installs, no network. Re-run after any change to data.js. */
"use strict";
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.join(__dirname, "..");
const dataSrc = fs.readFileSync(path.join(ROOT, "assets/js/data.js"), "utf8");
const sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(dataSrc, sandbox);
const DATA = sandbox.window.PORTFOLIO_DATA;

function esc(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
function slugTitle(p) { return p.title + " — Case Study — Sahil Khan"; }
function desc(p) { return esc(p.title) + ": " + esc(p.tagline); }

const KNIGHT = '<svg class="knight" viewBox="0 0 16 16" width="32" height="32" role="img" aria-label="Pixel knight" shape-rendering="crispEdges"><rect x="6" y="0" width="2" height="1" fill="#8fae9b"/><rect x="5" y="1" width="4" height="1" fill="#8fae9b"/><rect x="5" y="2" width="4" height="1" fill="#8fae9b"/><rect x="4" y="3" width="6" height="1" fill="#d9c9a3"/><rect x="3" y="4" width="8" height="1" fill="#d9c9a3"/><rect x="3" y="5" width="8" height="1" fill="#d9c9a3"/><rect x="3" y="6" width="2" height="1" fill="#d9c9a3"/><rect x="5" y="6" width="4" height="1" fill="#1f2428"/><rect x="9" y="6" width="2" height="1" fill="#d9c9a3"/><rect x="3" y="7" width="8" height="1" fill="#d9c9a3"/><rect x="4" y="8" width="7" height="1" fill="#d9c9a3"/><rect x="4" y="9" width="9" height="1" fill="#d9c9a3"/><rect x="3" y="10" width="10" height="1" fill="#d9c9a3"/><rect x="2" y="11" width="12" height="1" fill="#d9c9a3"/><rect x="2" y="12" width="4" height="1" fill="#d9c9a3"/><rect x="8" y="12" width="5" height="1" fill="#d9c9a3"/><rect x="1" y="13" width="5" height="1" fill="#d9c9a3"/><rect x="8" y="13" width="6" height="1" fill="#d9c9a3"/><rect x="1" y="14" width="13" height="1" fill="#d9c9a3"/><rect x="0" y="15" width="16" height="1" fill="#d9c9a3"/></svg>';

function head(p, rel) {
  return '<!DOCTYPE html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n'
    + '<meta name="viewport" content="width=device-width, initial-scale=1">\n'
    + '<title>' + esc(slugTitle(p)) + '</title>\n'
    + '<meta name="description" content="' + desc(p) + '">\n'
    + '<meta property="og:type" content="website">\n'
    + '<meta property="og:title" content="' + esc(slugTitle(p)) + '">\n'
    + '<meta property="og:description" content="' + desc(p) + '">\n'
    + '<meta property="og:image" content="' + rel + 'assets/img/og-image.png">\n'
    + '<meta name="twitter:card" content="summary_large_image">\n'
    + '<meta name="twitter:title" content="' + esc(slugTitle(p)) + '">\n'
    + '<meta name="twitter:description" content="' + desc(p) + '">\n'
    + '<link rel="icon" type="image/svg+xml" href="' + rel + 'assets/img/favicon.svg">\n'
    + '<link rel="icon" type="image/png" sizes="32x32" href="' + rel + 'assets/img/favicon-32.png">\n'
    + '<link rel="apple-touch-icon" sizes="180x180" href="' + rel + 'assets/img/apple-touch-icon.png">\n'
    + '<link rel="stylesheet" href="' + rel + 'assets/css/main.css">\n'
    + '<link rel="stylesheet" href="' + rel + 'assets/css/print.css" media="print">\n'
    + '<script type="application/ld+json">{"@context":"https://schema.org","@type":"Person","name":"Sahil Khan","jobTitle":"Backend-leaning full-stack developer","alumniOf":{"@type":"CollegeOrUniversity","name":"Chandigarh University"},"sameAs":["https://github.com/sahilimamk","https://leetcode.com/u/sahilimamkhan098/","https://codeforces.com/profile/knight_on"]}</script>\n'
    + '</head>\n';
}

function chromeTop(rel, current) {
  const nav = [["index.html", "Home"], ["work/index.html", "Work"], ["about.html", "About"], ["contact.html", "Contact"]]
    .map(([href, label]) => {
      const h = rel === "../" && href === "index.html" ? "../index.html" : rel + href;
      const on = (current === href) ? ' aria-current="page"' : "";
      return '<a href="' + h + '"' + on + '>' + label + '</a>';
    }).join("\n      ");
  return '<body>\n<a class="skip-link" href="#main">Skip to content</a>\n'
    + '<div class="progress" aria-hidden="true"><span id="progressBar"></span></div>\n'
    + '<div class="cursor-dot" id="cursorDot" aria-hidden="true"></div>\n'
    + '<div class="cursor-label" id="cursorLabel" aria-hidden="true"></div>\n'
    + '<header class="site-header"><div class="wrap header-inner">\n'
    + '<a class="brand" href="' + rel + 'index.html" aria-label="Sahil Khan — home">' + KNIGHT + '<span class="brand-name">SAHIL&nbsp;KHAN</span></a>\n'
    + '<nav class="site-nav" aria-label="Main navigation">\n      ' + nav + '\n    </nav>\n'
    + '<div class="header-tools"><span class="clock" title="Current time in India"><span class="clock-label">IST</span> <time id="clock" datetime="">--:--</time></span>\n'
    + '<button class="theme-toggle" id="themeToggle" type="button">Theme</button></div>\n'
    + '</div></header>\n<main id="main">\n';
}

function chromeBottom(rel) {
  return '</main>\n<footer class="site-footer"><div class="wrap footer-inner">\n'
    + '<p class="footer-name">Sahil Khan — backend-leaning full-stack developer</p>\n'
    + '<nav class="footer-nav" aria-label="Footer links">\n'
    + '<a href="https://github.com/sahilimamk">GitHub</a> <a href="https://leetcode.com/u/sahilimamkhan098/">LeetCode</a> <a href="https://codeforces.com/profile/knight_on">Codeforces</a> <a href="' + rel + 'work/index.html">Work</a> <a href="' + rel + 'about.html">About</a> <a href="' + rel + 'contact.html">Contact</a>\n'
    + '</nav>\n'
    + '<p class="footer-meta">Last updated: 13 Nov 2026 &middot; <span class="clock">IST <time id="clockFooter" datetime="">--:--</time></span></p>\n'
    + '</div></footer>\n<div class="coords" id="coords" aria-hidden="true">x 0000 &middot; y 0000</div>\n'
    + '<script src="' + rel + 'assets/js/config.js" defer></script>\n'
    + '<script src="' + rel + 'assets/js/data.js" defer></script>\n'
    + '<script src="' + rel + 'assets/js/main.js" defer></script>\n'
    + '</body>\n</html>\n';
}

function caseStudy(p, idx) {
  const rel = "../";
  const projects = DATA.projects;
  const next = projects[(idx + 1) % projects.length];
  const nextLabel = idx === projects.length - 1 ? "Back to start" : "Next project";
  const nextHref = "../work/" + next.slug + ".html";
  let h = head(p, rel) + chromeTop(rel, "");
  h += '<article class="wrap case-study">\n'
    + '<p class="crumb"><a href="../work/index.html">&larr; Back to work</a></p>\n'
    + '<p class="case-num" aria-hidden="true">' + p.num + '</p>\n'
    + '<h1>' + esc(p.title) + '</h1>\n'
    + '<p><span class="chip status-chip">' + esc(p.status) + '</span>' + (p.side ? ' <span class="chip">Side project</span>' : "") + '</p>\n'
    + '<p class="lede">' + esc(p.summary) + '</p>\n';
  if (p.slug === "draftshot") {
    h += '<!-- OWNER REVIEW: "60 ticks/sec" is the design from the repo, not an independently measured figure. Confirm wording before sharing. -->\n';
  }
  if (p.problem) {
    h += '<section aria-labelledby="h-problem"><h2 id="h-problem">What it is</h2>\n<p>' + esc(p.problem) + '</p></section>\n';
  }
  h += '<section aria-labelledby="h-how"><h2 id="h-how">How it works</h2>\n<ul class="how-list">\n'
    + p.how.map((s) => "  <li>" + esc(s) + "</li>\n").join("") + '</ul></section>\n';
  h += '<section class="diagram" aria-label="How the parts fit together"><h2>How the parts fit together</h2>\n<div class="pixel-diagram">\n'
    + p.diagram.map((d, i) => '<span class="diagram-box">' + esc(d) + '</span>' + (i < p.diagram.length - 1 ? '<span class="diagram-arrow" aria-hidden="true">&darr;</span>' : "")).join("\n") + '\n</div></section>\n';
  h += '<section aria-labelledby="h-stack"><h2 id="h-stack">Stack</h2>\n<p class="stack-chips">' + p.stack.map((s) => '<span class="chip">' + esc(s) + '</span>').join(" ") + '</p></section>\n';
  if (p.notList) {
    h += '<section class="limits-box" aria-labelledby="h-not"><h2 id="h-not">What it is not</h2>\n<p>DSA Buddy is an LLM application, not a machine learning project. It does not use:</p>\n<ul>\n'
      + p.notList.map((s) => "  <li>" + esc(s) + "</li>\n").join("") + '</ul></section>\n';
  }
  if (p.limits) {
    h += '<section class="limits-box" aria-labelledby="h-limits"><h2 id="h-limits">Honest limits</h2>\n<ul>\n'
      + p.limits.map((s) => "  <li>" + esc(s) + "</li>\n").join("") + '</ul></section>\n';
  }
  h += '<section aria-labelledby="h-links"><h2 id="h-links">Links</h2>\n<ul class="link-list">\n';
  if (p.links.repo) h += '  <li><a href="' + esc(p.links.repo) + '">Repository on GitHub</a></li>\n';
  if (p.links.live) h += '  <li><a href="' + esc(p.links.live) + '">Live demo</a></li>\n';
  if (!p.links.repo && !p.links.live) h += '  <li>No public link yet. <!-- OWNER TO SUPPLY: repo URL for ' + esc(p.title) + ' if one exists --></li>\n';
  h += '</ul></section>\n';
  h += '<nav class="case-nav" aria-label="Project navigation"><a class="btn btn-ghost" href="../work/index.html">&larr; Back to work</a>\n'
    + '<a class="btn" href="' + nextHref + '">' + nextLabel + ' &rarr; ' + esc(next.title) + '</a></nav>\n';
  h += '</article>\n' + chromeBottom(rel);
  return h;
}

const outDir = path.join(ROOT, "work");
fs.mkdirSync(outDir, { recursive: true });
DATA.projects.forEach((p, i) => {
  fs.writeFileSync(path.join(outDir, p.slug + ".html"), caseStudy(p, i));
  console.log("wrote work/" + p.slug + ".html");
});
console.log("Done: " + DATA.projects.length + " case-study pages.");
