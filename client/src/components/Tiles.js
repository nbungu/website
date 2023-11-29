// client/src/Tiles.js

import React from 'react';
import ButtonTile from './ButtonTile';

function Tiles() {
  
  return (   
      <div className="tiles-container-flex">

        <ButtonTile link={"/news"} icon={"bi bi-newspaper"} header={"News"} text={"Aktuelle Beiträge vom Verein, Spielberichte etc."}/>
        <ButtonTile link={"/termine"} icon={"bi bi-calendar2-week-fill"} header={"Termine"} text={"Aktuelle Trainingszeiten, Spiele & Veranstaltungen"}/>
        <ButtonTile link={"/mitgliedschaft"} icon={"bi bi-person-fill-add"} header={"Mitgliedschaft"} text={"Interesse geweckt und Lust auf Eishockey?"}/>
        <ButtonTile link={"/kontakt"} icon={"bi bi-chat-left-dots-fill"} header={"Kontakt"} text={"Bei Fragen rund um den Verein oder die Mitgliedschaft"}/>
        <ButtonTile span={2} link={"/nachwuchs"} icon={"bi bi-person-arms-up"} header={"Nachwuchstraining"} text={"Montags, 18:00 - 19:00 Uhr"}/>
        <ButtonTile span={2} link={"/eisbuaba-cup-2024"} icon={"bi bi-trophy-fill"} iconColor={"orange"} header={"Eisbuaba-Cup"}  badgeText={"2024"} text={"Freitag, 01. März 2024, ab 20:00 Uhr"}/>

      </div>
  )
}
export default Tiles