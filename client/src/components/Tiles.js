// client/src/Tiles.js

import React from 'react';
import ButtonTile from './ButtonTile';

function Tiles() {
  
  return (   
      <div className="tiles-container-flex mt-3">
        <ButtonTile link={"/eisbuaba-cup-2024"} icon={"bi bi-trophy-fill"} iconColor={"orange"} header={"Eisbuaba-Cup"} badgeText={"2024"} text={"Freitag, 01. März 2024, ab 20:00 Uhr"} z={1}/>
        <ButtonTile link={"/nachwuchs"} icon={"bi bi-person-arms-up"} header={"Nachwuchstraining"} text={"Montags, 18:00 - 19:00 Uhr"}/>
        <ButtonTile link={"/mitgliedschaft"} icon={"bi bi-person-fill-add"} header={"Mitgliedschaft"} text={"Interesse geweckt und Lust auf Eishockey?"}/>
        <ButtonTile link={"/kontakt"} icon={"bi bi-chat-left-dots-fill"} header={"Kontakt"} text={"Kontaktpersonen und Anfahrt"}/>
      </div>
  )
}
export default Tiles

/**
<ButtonTile span={2} link={"/eisbuaba-cup-2024"} icon={"bi bi-trophy-fill"} iconColor={"orange"} header={"Eisbuaba-Cup"}  badgeText={"2024"} text={"Freitag, 01. März 2024, ab 20:00 Uhr"}/>
<ButtonTile span={2} link={"/nachwuchs"} icon={"bi bi-person-arms-up"} header={"Nachwuchstraining"} text={"Montags, 18:00 - 19:00 Uhr"}/>
<ButtonTile link={"/mitgliedschaft"} icon={"bi bi-person-fill-add"} header={"Mitgliedschaft"} text={"Interesse geweckt und Lust auf Eishockey?"}/>
<ButtonTile link={"/kontakt"} icon={"bi bi-chat-left-dots-fill"} header={"Kontakt"} text={"Bei Fragen rund um den Verein oder die Mitgliedschaft"}/>

 */