// client/src/components/YoutubeEmbed.js

import React from "react";
import PropTypes from "prop-types";
import { extractYouTubeVideoId } from '../utils/Utils';

const YoutubeEmbed = ({ videoUrl }) => (
  <div className="video-responsive">
    <iframe
      width="1043"
      height="587"
      src={`https://www.youtube.com/embed/${extractYouTubeVideoId(videoUrl)}`}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title="Embedded youtube"
    />
  </div>
);

YoutubeEmbed.propTypes = {
  embedId: PropTypes.string.isRequired
};

export default YoutubeEmbed;
