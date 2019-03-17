const ensureAbsoluteUrl = (submittedUrl) => {
  if (/^(?:[a-z]+:)?\/\//i.test(submittedUrl)) {
    return submittedUrl;
  }

  return `http://${submittedUrl}`;
}

export default ensureAbsoluteUrl;