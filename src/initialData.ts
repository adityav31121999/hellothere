import { SiteBuilderData } from './types';

export const initialSiteData: SiteBuilderData = {
  profile: {
    name: "Aditya Vishwakarma",
    username: "adityav31121999",
    tagline: "Science enthusiast • programmer • builder",
    bio: "I have been working on my ideas for long time and want them to manifest and evolve into reality (inventions and innovations). I enjoy working on computation, maths, physics, and number theory experiments.",
    emails: ["adityav31121999@zohomail.in", "adityavishwakarma@dvyamsha.in"],
    location: "India",
    status: "Exploring number theory, machine learning, and low-precision computation",
    interests: ["Mathematics", "Number Theory", "Physics", "Computation", "Machine Learning", "Low-precision Arithmetic"]
  },
  projects: [
    {
      id: "proj-tokeniser",
      name: "tokeniser (bpe)",
      description: "A fast Byte Pair Encoding tokenizer designed for custom LLM pre-training, written with a focus on simplicity and computational efficiency.",
      status: "completed",
      vibeCoded: true,
      hardcoded: false,
      githubUrl: "https://github.com/adityav31121999/tokeniser"
    },
    {
      id: "proj-float12",
      name: "float12",
      description: "An experimental 12-bit floating point representation study exploring custom exponent and mantissa configurations for micro-computation models.",
      status: "completed",
      vibeCoded: true,
      hardcoded: false,
      githubUrl: "https://github.com/adityav31121999/float12"
    },
    {
      id: "proj-matrix",
      name: "matrix",
      description: "A lightweight, efficient matrix mathematics engine designed for numerical computing and multi-dimensional coordinate operations.",
      status: "completed",
      vibeCoded: false,
      hardcoded: true,
      githubUrl: "http://github.com/adityav31121999/matrix"
    },
    {
      id: "proj-editlatex",
      name: "editLaTeX",
      description: "A specialized LaTeX math equation live editor and parser making formatting formulas smooth and interactive.",
      status: "completed",
      vibeCoded: true,
      hardcoded: false,
      githubUrl: "https://github.com/adityav31121999/editLaTeX"
    }
  ],
  blogs: [
    {
      id: "first-entry",
      title: "Building a personal website with plain HTML",
      date: "July 7, 2026",
      excerpt: "A quick look at creating a clean static site without extra frameworks or build tools.",
      content: `<p>
  A personal website does not need a framework to feel polished. Simple HTML, a little CSS,
  and a thoughtful layout are often enough to create a strong first impression.
</p>
<p>
  This version is intentionally lightweight and easy to maintain. The blogs are stored as
  individual HTML files so they remain simple to edit and publish.
</p>
<p>
  All Coded by GitHub Copilot, and the site is hosted on GitHub Pages.
</p>`
    }
  ],
  style: {
    accentColor: "#fbbf24",
    accentStrong: "#d97706",
    bgDark: "#09090b",
    bgLight: "#fafafa",
    gridSpacing: "24px"
  }
};
