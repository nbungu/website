// Function to fetch and parse XML from a file
function fetchAndParseXML(url) {
    // Fetch the XML file
    fetch(url)
      .then(response => response.text())
      .then(xmlString => {
        // Parse the XML string
        var parser = new DOMParser();
        var xmlDoc = parser.parseFromString(xmlString, 'application/xml');

        // Process the parsed XML as needed
        processXML(xmlDoc);
      })
      .catch(error => {
        console.error('Error fetching or parsing XML:', error);
      });
  }

  // Function to process the parsed XML
  function processXML(xmlDoc) {
    // Get all <url> elements
    var urlElements = xmlDoc.getElementsByTagName('loc');

    // Create a map to store URL-title pairs
    var urlTitleMap = {};

    // Iterate through each <url> element and store data
    for (var i = 0; i < urlElements.length; i++) {
        var link = urlElements[i].getElementsByTagName('link')[0].textContent;
        var title = urlElements[i].getElementsByTagName('title')[0].textContent;
        var image = urlElements[i].getElementsByTagName('image')[0].textContent;
  
        // Store data in an object
        var urlData = {
          link: link,
          title: title,
          image: image
        };
  
        // Push the object to the array
        urlDataArray.push(urlData);
      }
  
      // Access data for a specific URL (replace with your desired URL)
      var specificURL = 'https://example.com/page1';
      var dataForURL = urlDataArray.find(urlData => urlData.link === specificURL);
  }

  // Replace 'your-file.xml' with the path to your XML file
  var xmlFileUrl = 'sitemap.xml';
  
  // Fetch and parse XML from the file
  fetchAndParseXML(xmlFileUrl);