(function () {
  const createIframe = (placeholder) => {
    if (!placeholder) return;

    const {
      embedType: type,
      embedId: id,
      mapHash,
      caption = "Embedded Strava Map"
    } = placeholder.dataset;

    // Create iframe
    const iframe = document.createElement("iframe");
    iframe.setAttribute("frameborder", "0");
    iframe.setAttribute("title", caption);
    iframe.style.cssText = `
      width: 100%;
      min-width: 10%;
      max-width: 100%;
      height: 100%;
      aspect-ratio: 1/1;
      display: block;
    `;

    let url = `https://strava-embeds.com/${type}/${id}`;
    if (mapHash) {
      url += `?mapHash=${mapHash}`;
    }
    iframe.setAttribute("src", url);
    placeholder.replaceWith(iframe);
  };

  document.querySelectorAll(".strava-embed-placeholder").forEach(createIframe);
})();