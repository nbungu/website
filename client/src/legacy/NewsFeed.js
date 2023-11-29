// client/src/Featurettes.js

import React from 'react';
import FeaturetteTeaser from './FeaturetteTeaser';
import FeaturetteTeaserMirrored from './FeaturetteTeaserMirrored';

import logo from "../logo.svg";
import { Link } from 'react-router-dom';

function Featurettes() {

  return (
    <div className='px-5'>
      <FeaturetteTeaser
        header={"First featurette heading"}
        text={"Some great placeholder content for the first featurette here. Imagine some exciting prose here."}
        date={"01.11.2023"}
        imageTitle={"bildtitel"}
        imgSrc={logo}/>
      <FeaturetteTeaserMirrored
        header={"Second featurette heading"}
        text={"Some great placeholder content for the first featurette here. Imagine some exciting prose here."}
        date={"01.11.2023"}
        imageTitle={"bildtitel"}
        imgSrc={logo}/>
      <div className="row mx-auto py-5">
        <Link to="/news" className="btn btn-outline-secondary">Ältere Einträge ansehen</Link>
      </div>
    </div>
  )
}

export default Featurettes