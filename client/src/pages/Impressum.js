// client/src/pages/Impressum.js

import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Impressum() {
  return (
    <div className='body-bg'>

      <Header currentPage={null}/>

      <div className='flex-grow-1'>

        <div className="tiles-container">
              
          <div className="fixed-tile">
            <h2>Impressum</h2>

            das vom asv nehmen
            
          </div>
          <div className='fixed-tile'>
            <h2>Datenschutzerklärung</h2>
            <p className='text-start py-3'>
              TODO
            </p>
          </div>
          <div className="fixed-tile">
            <h2>Haftungsausschluss</h2>
            <p className='text-start py-3'>
              Die 'Eisbuaba Adelberg', im nachfolgenden 'Verein' genannt, übernehmen keine Gewähr für die Aktualität, Richtigkeit, Vollständigkeit oder Qualität der bereitgestellten Informationen. Haftungsansprüche gegen den Verein, die sich auf Schäden materieller oder ideeller Art beziehen, welche durch die Nutzung oder Nichtnutzung der dargebotenen Informationen bzw. durch die Nutzung fehlerhafter und unvollständiger Informationen verursacht wurden, sind grundsätzlich ausgeschlossen, sofern seitens des Vereins kein nachweislich vorsätzliches oder grob fahrlässiges Verschulden vorliegt.
              Alle Angebote sind freibleibend und unverbindlich. Der Verein behält es sich ausdrücklich vor, Teile der Seiten oder das gesamte Angebot ohne gesonderte Ankündigung zu verändern, zu ergänzen, zu löschen oder die Veröffentlichung zeitweise oder endgültig einzustellen.
            </p>
            <h2>Verweise und Links</h2>
            <p className='text-start py-3'>
              Bei direkten oder indirekten Verweisen auf fremde Internetseiten ("Links"), die außerhalb des Verantwortungsbereichs des Vereins liegen, würde eine Haftungsverpflichtung ausschließlich in dem Fall in Kraft treten, in dem der Verein von den Inhalten Kenntnis hat und es ihm technisch möglich und zumutbar wäre, die Nutzung im Falle rechtswidriger Inhalte zu verhindern.
              Der Verein erklärt hiermit ausdrücklich, dass zum Zeitpunkt der Linksetzung keine illegalen Inhalte auf den zu verlinkenden Seiten erkennbar waren. Auf die aktuelle und zukünftige Gestaltung, die Inhalte oder die Urheberschaft der verlinkten/verknüpften Seiten hat der Verein keinerlei Einfluss. Deshalb distanziert er sich hiermit ausdrücklich von allen Inhalten aller verlinkten/verknüpften Seiten, die nach der Linksetzung verändert wurden. Diese Feststellung gilt für alle innerhalb des eigenen Internetangebotes gesetzten Links und Verweise sowie für Fremdeinträge in vom Verein eingerichteten Gästebüchern, Diskussionsforen und Mailinglisten.
              Für illegale, fehlerhafte oder unvollständige Inhalte und insbesondere für Schäden, die aus der Nutzung oder Nichtnutzung solcherart dargebotener Informationen entstehen, haftet allein der Anbieter der Seite, auf welche verwiesen wurde, nicht derjenige, der über Links auf die jeweilige Veröffentlichung lediglich verweist.
            </p>
            <h2>Urheber- und Kennzeichenrecht</h2>
            <p className='text-start py-3'>
              Der Verein ist bestrebt, in allen Publikationen die Urheberrechte der verwendeten Grafiken, Tondokumente, Videosequenzen und Texte zu beachten, von ihm selbst erstellte Grafiken, Tondokumente, Videosequenzen und Texte zu nutzen oder auf lizenzfreie Grafiken, Tondokumente, Videosequenzen und Texte zurückzugreifen.
              Alle innerhalb des Internetangebotes genannten und ggf. durch Dritte geschützten Marken- und Warenzeichen unterliegen uneingeschränkt den Bestimmungen des jeweils gültigen Kennzeichenrechts und den Besitzrechten der jeweiligen eingetragenen Eigentümer. Allein aufgrund der bloßen Nennung ist nicht der Schluss zu ziehen, dass Markenzeichen nicht durch Rechte Dritter geschützt sind!
              Das Copyright für veröffentlichte, vom Verein selbst erstellte Objekte bleibt allein beim Verein. Eine Vervielfältigung oder Verwendung solcher Grafiken, Tondokumente, Videosequenzen und Texte in anderen elektronischen oder gedruckten Publikationen ist ohne ausdrückliche Zustimmung des Vereins nicht gestattet.
            </p>
            <h2>Rechtswirksamkeit dieses Haftungsausschlusses</h2>
            <p className='text-start py-3'>
              Dieser Haftungsausschluss ist als Teil des Internetangebotes zu betrachten, von dem aus auf diese Seite verwiesen wurde. Sofern Teile oder einzelne Formulierungen dieses Textes der geltenden Rechtslage nicht, nicht mehr oder nicht vollständig entsprechen sollten, bleiben die übrigen Teile des Dokumentes in ihrem Inhalt und ihrer Gültigkeit davon unberührt.
            </p>
          </div>

        </div>

      </div>   
      <Footer/>
    </div>
  )
}

export default Impressum