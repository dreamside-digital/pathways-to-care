export const MAXIMUM_IMAGE_SIZE = 2 * 1024 * 1024; //less than 2MB in bytes

export const NOTIFICATION_MESSAGES = {
  'contact-form-success': "Thanks for your message, we'll get back to you soon!",
  'project-form-success': "Thanks for submitting your project! We will review it before publishing it on the website."
}

export const DEFAULT_COMPONENT_CONTENT = {
  "asks": {
    "ask-title": { "text": "Title" },
    "ask-description": { "text": "Description" }
  },
  "problem-items" : {
    "featured-item-title": { "text": "Placeholder" },
    "featured-item-description": { "text": "Placeholder" }
  },
  "solution-items" : {
    "featured-item-description": { "text": "Placeholder" }
  },
  "outcome-items" : {
    "featured-item-image": { "imageSrc": "https://www.nomadiclabs.ca/img/logo-03.png", "caption": "" },
    "featured-item-title": { "text": "Placeholder" },
    "featured-item-description": { "text": "Placeholder" }
  },
  "related-publications": {
    "publication-item-image": { "imageSrc": "https://www.nomadiclabs.ca/img/logo-03.png", "caption": "" },
    "publication-item-date": { "text": "Publication date" },
    "publication-item-title": { "text": "Publication title" },
    "publication-item-description": { "text": "<p>Summary</p>" },
    "publication-item-file": { "filepath": "/" },
  },
  "reports": {
    "report-item-image": { "imageSrc": "https://www.nomadiclabs.ca/img/logo-03.png", "caption": "" },
    "report-item-date": { "text": "Report date" },
    "report-item-title": { "text": "Report title" },
    "report-item-description": { "text": "<p>Summary</p>" },
    "report-item-link": { "anchor": "Read the report", "link": "/" },
  },
  "news-items": {
    "news-item-image": { "imageSrc": "https://www.nomadiclabs.ca/img/logo-03.png", "caption": "" },
    "news-item-date": { "text": "Date" },
    "news-item-link": { "anchor": "News item title", "link": "/" },
    "news-item-description": { "text": "<p>Description</p>" },
  },
  "team-members": {
    "fullBio" : {
      "text" : "<p>Full bio</p>"
    },
    "headshot" : {
      "caption" : "",
      "imageSrc" : "https://www.nomadiclabs.ca/img/logo-03.png"
    },
    "name" : {
      "text" : "Name"
    },
    "position" : {
      "text" : "Position"
    },
    "quote" : {
      "text" : "<p>Quote</p>"
    }
  },
  "values-items": {
    "description": { "text": "Value description" }
  },
  "mission-items": {
    "description": { "text": "Mission description" }
  },
  "research-goals": {
    "description": { "text": "Research goal description" }
  }
}

export const PAGE_TYPES = [
  { label: "Default page", value: { id: "default", category: null, template: "default.js" } },
  { label: "Report page", value: { id: "report_page", category: 'research', template: "report-page.js" } },
];

export const SECTION_MAP = {
  default: {
    type: "default",
    content: [
      { type: "header", content: { text: "Header text" }},
      { type: "paragraph", content: { text: "<p>Section text</p>" }},
    ]
  },
  light: {
    type: "light",
    content: [
      { type: "header", content: { text: "Header text" }},
      { type: "paragraph", content: { text: "<p>Section text</p>" }},
    ]
  },
  highlight: {
    type: "highlight",
    content: [
      { type: "header", content: { text: "Header text" }},
      { type: "paragraph", content: { text: "<p>Section text</p>" }},
    ]
  },
  report: {
    type: "report",
    content: [
      { type: "vismeReport", content: {}},
    ]
  },
  download: {
    type: "download",
    content: [
      { type: "header", content: { text: "Loved the report? You can take it with you!" }},
      { type: "fileUpload", content: {} }
    ]
  },
  research: {
    type: "research",
    content: [
      { type: "subHeading", content: { text: "Listen" }},
      { type: "publications", content: {} }
    ]
  }
}

export const CONTENT_MAP = {
  header: { type: "header", content: { text: "Header" } },
  subHeading: { type: "subHeading", content: { text: "Sub-heading" } },
  paragraph: { type: "paragraph", content: { text: "Paragraph" } },
  image: { type: "image" },
  imageCarousel: { type: "imageCarousel", content: {} },
  embeddedIframe: { type: "embeddedIframe" },
  responsiveIframe: { type: "responsiveIframe" },
  vismeReport: { type: "vismeReport" },
  fileUpload: { type: "fileUpload" },
  button: { type: "button", content: { anchor: "Button", link: "/" } },
  link: { type: "link", content: { anchor: "Link text", link: "/" } },
  expandableText: { type: "expandableText", content: { header: "Name", description: "<p>Bio</p>" } },
  readings: { type: "publications", content: {} },
}

export const PERMANENT_PAGES = [
  "home",
  "about",
  "research",
  "team",
  "contact",
]

