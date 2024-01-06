

  // Function to fetch and parse XML from a file
  function fetchAndParseXML(xmlUrl, documentUrl) {
    fetch(xmlUrl)
        .then(response => response.text())
        .then(xmlString => {
          // Parse the XML string
          var parser = new DOMParser();
          var xmlDoc = parser.parseFromString(xmlString, 'text/xml');
          xmlDoc && console.log('xmlDoc created from: ', xmlUrl);
          setTagsForCurrentPage(xmlDoc, documentUrl);
        })
        .catch(error => {
          console.error('Error fetching or parsing XML:', error);
        });
  }
  /*function fetchAndParseXML(xmlUrl, documentUrl) {
    return new Promise((resolve, reject) => {
      // Fetch the XML file
      fetch(xmlUrl)
        .then(response => response.text())
        .then(xmlString => {
          // Parse the XML string
          var parser = new DOMParser();
          var xmlDoc = parser.parseFromString(xmlString, 'text/xml');
          setTagsForCurrentPage(xmlDoc, documentUrl);
          resolve();
        })
        .catch(error => {
          console.error('Error fetching or parsing XML:', error);
          reject(error);
        });
    });
  }*/

  // Function to process the parsed XML
  function setTagsForCurrentPage(xmlDoc, documentUrl) {
    if (!xmlDoc || !documentUrl) return;
    console.log(`Searching available Tags for ${documentUrl} in sitemap.`);
    // Get all <url> elements
    var urlElements = xmlDoc.childNodes[0].getElementsByTagName('url');
    // Find DocumentURL in List and get the Information
    for (var i = 0; i < urlElements.length; i++) {
      var url = urlElements[i].getElementsByTagName('loc')[0].textContent;
      if (url === documentUrl) {        
        console.log('Found corresponding URL in sitemap.');
        var tags = {
          title: urlElements[i].getElementsByTagName('title')[0].textContent,
          descr: urlElements[i].getElementsByTagName('descr')[0].textContent,
          image: urlElements[i].getElementsByTagName('image')[0].textContent
        };
        // Access the tag elements
        var title = document.querySelector('meta[property="og:title"]');
        var description = document.querySelector('meta[property="og:description"]');
        var imgPath = document.querySelector('meta[property="og:image"]');
        var url = document.querySelector('meta[property="og:url"]');

        // Check if tags are loaded
        if (title) {
          title.setAttribute('content', tags.title);
          description.setAttribute('content', tags.descr);
          imgPath.setAttribute('content', tags.image);
          url.setAttribute('content', document.location);

          console.log('Changed Tags in index.html');
        }
        break;
      }
    }
  }

  /*var tags = {
    title: "",
    descr: "",
    image: ""
  };*/

  // Wait for the DOM to be fully loaded
  document.addEventListener('DOMContentLoaded', function () {

    var currentURL = document.location;
    var xmlURL = './sitemap.xml';

    fetchAndParseXML(xmlURL, currentURL)

    // Use the promise to ensure that the tags are available
    /*fetchAndParseXML(xmlURL, currentURL)
      .then(() => {
        // Access the tag elements
        var tabTitle = document.querySelector('title');
        var title = document.querySelector('meta[property="og:title"]');
        var description = document.querySelector('meta[property="og:description"]');
        var imgPath = document.querySelector('meta[property="og:image"]');
        var url = document.querySelector('meta[property="og:url"]');

        // Check if tags are loaded
        if (tabTitle) {
          //tabTitle.textContent = tags.title;
          title.setAttribute('content', tags.title);
          description.setAttribute('content', tags.descr);
          imgPath.setAttribute('content', tags.image);
          url.setAttribute('content', document.location);

          console.log('set attributes');
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });*/
  });
