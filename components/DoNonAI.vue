<template>
  <div class="wrapper">
    <section id="section-1">
      <h2>Virksomhedsoplysninger</h2>
      <p>
        Du behøver ikke svare på alle spørgsmål - svar på dem du synes er relevante for din virksomhed/organisation.
        <br /><br />
      </p>
      <div class="question">
        <label class="question-title" for="name">Hvad er navnet på virksomheden/organisationen? </label>
        <textarea name="Hvad er navnet på virksomheden/organisationen?" id="name" />
      </div>
      <div class="question">
        <label class="question-title" for="services">Hvilke produkter eller tjenester udbyder I? </label>
        <textarea
          oninput="
            this.style.height = 'auto';
            this.style.height = this.scrollHeight + 'px';
          "
          name="Hvilke produkter eller tjenester udbyder I?"
          id="services" />
      </div>
      <div class="question">
        <h3 class="question-title">
          Hvordan vil du beskrive jeres vision med få ord - har I evt. et slogan eller tagline, der indkapsler, hvad I
          stræber efter?
        </h3>
        <label
          >Vi drømmer om en verden, hvor...<textarea
            name="Hvordan vil du beskrive jeres vision med få ord - har I evt. et slogan eller tagline, der indkapsler, hvad I
          stræber efter? Vi drømmer om en verden, hvor.." />
        </label>
        <label
          >Vi tror på, at det vigtigste er...<textarea
            name="Hvordan vil du beskrive jeres vision med få ord - har I evt. et slogan eller tagline, der indkapsler, hvad I
          stræber efter? Vi tror på, at det vigtigste er..." />
        </label>
        <label
          >Vi arbejder for at...<textarea
            name="Hvordan vil du beskrive jeres vision med få ord - har I evt. et slogan eller tagline, der indkapsler, hvad I
          stræber efter? Vi arbejder for at..." />
        </label>
        <label
          >Vi vil være dem, der...<textarea
            name="Hvordan vil du beskrive jeres vision med få ord - har I evt. et slogan eller tagline, der indkapsler, hvad I
          stræber efter? Vi vil være dem, der..." />
        </label>
        <label
          >Vores mål er at gøre det muligt for...<textarea
            name="Hvordan vil du beskrive jeres vision med få ord - har I evt. et slogan eller tagline, der indkapsler, hvad I
          stræber efter? Vores mål er at gøre det muligt for..." />
        </label>
        <label
          >Vi ønsker at ændre måden, folk tænker om...<textarea
            name="Hvordan vil du beskrive jeres vision med få ord - har I evt. et slogan eller tagline, der indkapsler, hvad I
          stræber efter? Vi ønsker at ændre måden, folk tænker om.." />
        </label>
        <label
          >Vi er drevet af en tro på, at...<textarea
            name="Hvordan vil du beskrive jeres vision med få ord - har I evt. et slogan eller tagline, der indkapsler, hvad I
          stræber efter? Vi er drevet af en tro på, at..." />
        </label>
        <label
          >Vi står op om morgenen for at...<textarea
            name="Hvordan vil du beskrive jeres vision med få ord - har I evt. et slogan eller tagline, der indkapsler, hvad I
          stræber efter? Vi står op om morgenen for at.." />
        </label>
        <label
          >Vi håber, at vores arbejde vil føre til...<textarea
            name="Hvordan vil du beskrive jeres vision med få ord - har I evt. et slogan eller tagline, der indkapsler, hvad I
          stræber efter? Vi håber, at vores arbejde vil føre til..." />
        </label>
        <label
          >Vi prøver ikke at være de største - men de mest...<textarea
            name="Hvordan vil du beskrive jeres vision med få ord - har I evt. et slogan eller tagline, der indkapsler, hvad I
          stræber efter? Vi prøver ikke at være de største - men de mest..." />
        </label>
      </div>
      <div class="question">
        <h3>
          Hvad er historien bag din virksomhed/organisation - hvorfor blev den startet og hvad har formet den undervejs?
        </h3>
        <label>
          Hvilket behov, problem eller drøm førte til, at virksomheden blev startet?
          <textarea
            name="Hvad er historien bag din virksomhed/organisation - hvorfor blev den startet og hvad har formet den undervejs? Hvilket behov, problem eller drøm førte til, at virksomheden blev startet?" />
        </label>

        <label>
          Hvad var den oprindelige vision eller idé - og er den ændret siden?
          <textarea
            name="Hvad er historien bag din virksomhed/organisation - hvorfor blev den startet og hvad har formet den undervejs? Hvad var den oprindelige vision eller idé - og er den ændret siden?" />
        </label>

        <label>
          Hvem stod bag opstarten, og hvilken baggrund havde de?
          <textarea
            name="Hvad er historien bag din virksomhed/organisation - hvorfor blev den startet og hvad har formet den undervejs? Hvem stod bag opstarten, og hvilken baggrund havde de?" />
        </label>

        <label>
          Er der en konkret oplevelse eller aha-øjeblik, der satte gang i det hele?
          <textarea
            name="Hvad er historien bag din virksomhed/organisation - hvorfor blev den startet og hvad har formet den undervejs? Er der en konkret oplevelse eller aha-øjeblik, der satte gang i det hele?" />
        </label>

        <label>
          Hvad har været de største milepæle eller udfordringer undervejs?
          <textarea
            name="Hvad er historien bag din virksomhed/organisation - hvorfor blev den startet og hvad har formet den undervejs? Hvad har været de største milepæle eller udfordringer undervejs?" />
        </label>

        <label>
          Hvordan har virksomheden udviklet sig siden starten - og hvorfor?
          <textarea
            name="Hvad er historien bag din virksomhed/organisation - hvorfor blev den startet og hvad har formet den undervejs? Hvordan har virksomheden udviklet sig siden starten - og hvorfor?" />
        </label>

        <label>
          Har der været vigtige samarbejder, kundetyper eller begivenheder, der har formet jer?
          <textarea
            name="Hvad er historien bag din virksomhed/organisation - hvorfor blev den startet og hvad har formet den undervejs? Har der været vigtige samarbejder, kundetyper eller begivenheder, der har formet jer?" />
        </label>

        <label>
          Hvordan har jeres værdier eller mission været med til at styre jeres vej?
          <textarea
            name="Hvad er historien bag din virksomhed/organisation - hvorfor blev den startet og hvad har formet den undervejs? Hvordan har jeres værdier eller mission været med til at styre jeres vej?" />
        </label>

        <label>
          Hvilke vendepunkter har ændret jeres retning eller selvforståelse?
          <textarea
            name="Hvad er historien bag din virksomhed/organisation - hvorfor blev den startet og hvad har formet den undervejs? Hvilke vendepunkter har ændret jeres retning eller selvforståelse?" />
        </label>

        <label>
          Hvad er I særligt stolte af, når I ser tilbage på jeres rejse?
          <textarea
            name="Hvad er historien bag din virksomhed/organisation - hvorfor blev den startet og hvad har formet den undervejs? Hvad er I særligt stolte af, når I ser tilbage på jeres rejse?" />
        </label>
      </div>
      <div class="question">
        <h3>Hvilke farver vil du associere med jer?</h3>
        <ColorQuestion></ColorQuestion>
      </div>
      <div class="question">
        <h3>Hvad vil du gerne have, at folk siger om jer?</h3>
        <label>
          <input
            type="checkbox"
            name="Hvad vil du gerne have, at folk siger om Jer? values"
            value="troværdige og professionelle" />
          At vi er troværdige og professionelle
        </label>

        <label>
          <input
            type="checkbox"
            name="Hvad vil du gerne have, at folk siger om Jer? values"
            value="nytænkende og innovative" />
          At vi er nytænkende og innovative
        </label>

        <label>
          <input
            type="checkbox"
            name="Hvad vil du gerne have, at folk siger om Jer? values"
            value="positiv forskel i samfundet" />
          At vi gør en positiv forskel i samfundet
        </label>

        <label>
          <input
            type="checkbox"
            name="Hvad vil du gerne have, at folk siger om Jer? values"
            value="nemme og behagelige at samarbejde med" />
          At vi er nemme og behagelige at samarbejde med
        </label>

        <label>
          <input
            type="checkbox"
            name="Hvad vil du gerne have, at folk siger om Jer? values"
            value="passionerede og engagerede" />
          At vi er passionerede og engagerede
        </label>

        <label>
          <input
            type="checkbox"
            name="Hvad vil du gerne have, at folk siger om Jer? values"
            value="venlige og imødekommende" />
          At vi er venlige og imødekommende
        </label>

        <label>
          <input
            type="checkbox"
            name="Hvad vil du gerne have, at folk siger om Jer? values"
            value="bæredygtighed og ansvarlighed" />
          At vi har fokus på bæredygtighed og ansvarlighed
        </label>

        <label>
          <input
            type="checkbox"
            name="Hvad vil du gerne have, at folk siger om Jer? values"
            value="høj kvalitet og gode resultater" />
          At vi leverer høj kvalitet og gode resultater
        </label>

        <label>
          <input
            type="checkbox"
            name="Hvad vil du gerne have, at folk siger om Jer? values"
            value="sjove og kreative" />
          At vi er sjove og kreative
        </label>

        <label>
          <input
            type="checkbox"
            name="Hvad vil du gerne have, at folk siger om Jer? values"
            value="forstår kunders eller brugeres behov" />
          At vi forstår vores kunders/brugeres behov
        </label>
        <label
          >Andet:

          <textarea name="Hvad vil du gerne have, at folk siger om Jer? review-other" />
        </label>
      </div>
    </section>
    <section id="section-2">
      <h2>Mål og Branding</h2>
      <div class="question">
        <h3>Hvad ønsker I at opnå med en ny visuel identitet eller design?</h3>
        <label>
          <input
            type="checkbox"
            name="Hvad ønsker I at opnå med en ny visuel identitet eller design?"
            value="stærkere og mere genkendeligt brand" />
          At skabe et stærkere og mere genkendeligt brand
        </label>

        <label>
          <input
            type="checkbox"
            name="Hvad ønsker I at opnå med en ny visuel identitet eller design?"
            value="tiltrække ny målgruppe eller marked" />
          At tiltrække en ny målgruppe eller marked
        </label>

        <label>
          <input
            type="checkbox"
            name="Hvad ønsker I at opnå med en ny visuel identitet eller design?"
            value="opdatere image og signalere modernitet" />
          At opdatere virksomhedens image og signalere modernitet
        </label>

        <label>
          <input
            type="checkbox"
            name="Hvad ønsker I at opnå med en ny visuel identitet eller design?"
            value="styrke værdier og mission gennem design" />
          At styrke virksomhedens værdier og mission gennem design
        </label>

        <label>
          <input
            type="checkbox"
            name="Hvad ønsker I at opnå med en ny visuel identitet eller design?"
            value="sammenhængende og professionel oplevelse" />
          At skabe en mere sammenhængende og professionel visuel oplevelse
        </label>

        <label>
          <input
            type="checkbox"
            name="Hvad ønsker I at opnå med en ny visuel identitet eller design?"
            value="differentiere os fra konkurrenterne" />
          At differentiere os fra konkurrenterne i markedet
        </label>

        <label>
          <input
            type="checkbox"
            name="Hvad ønsker I at opnå med en ny visuel identitet eller design?"
            value="lettere og mere effektiv kommunikation" />
          At gøre vores kommunikation lettere at forstå og mere effektiv
        </label>

        <label>
          <input
            type="checkbox"
            name="Hvad ønsker I at opnå med en ny visuel identitet eller design?"
            value="formidle kultur og personlighed gennem design" />
          At formidle vores kultur og personlighed gennem design
        </label>

        <label>
          <input
            type="checkbox"
            name="Hvad ønsker I at opnå med en ny visuel identitet eller design?"
            value="genkendelse og hukommelse af brand" />
          At gøre det lettere for kunder at genkende og huske vores brand
        </label>

        <label>
          <input
            type="checkbox"
            name="Hvad ønsker I at opnå med en ny visuel identitet eller design?"
            value="fremme tillid og troværdighed" />
          At fremme tillid og troværdighed i vores målgrupper
        </label>
        <label
          >Andet:

          <textarea name="Hvad ønsker I at opnå med en ny visuel identitet eller design? Other" />
        </label>
      </div>
      <div class="question">
        <h3>Hvem er jeres konkurrenter, og hvordan adskiller I jer fra dem?</h3>
        <label>
          Vores primære konkurrenter er…
          <textarea
            name="Hvem er jeres konkurrenter, og hvordan adskiller I jer fra dem? Vores primære konkurrenter er…" />
        </label>

        <label>
          Den største forskel mellem vores virksomhed og vores konkurrenter er…
          <textarea
            name="Hvem er jeres konkurrenter, og hvordan adskiller I jer fra dem? Den største forskel mellem vores virksomhed og vores konkurrenter er…" />
        </label>

        <label>
          Vi skiller os ud fra konkurrenterne ved at…
          <textarea
            name="Hvem er jeres konkurrenter, og hvordan adskiller I jer fra dem? Vi skiller os ud fra konkurrenterne ved at…" />
        </label>

        <label>
          Kunder vælger os frem for vores konkurrenter, fordi…
          <textarea
            name="Hvem er jeres konkurrenter, og hvordan adskiller I jer fra dem? Kunder vælger os frem for vores konkurrenter, fordi…" />
        </label>

        <label>
          Vi har en fordel i forhold til vores konkurrenter, fordi…
          <textarea
            name="Hvem er jeres konkurrenter, og hvordan adskiller I jer fra dem? Vi har en fordel i forhold til vores konkurrenter, fordi…" />
        </label>
      </div>
      <div class="question target-group">
        <h3>Hvem er jeres målgruppe?</h3>
        <button
          ref="previous"
          class="previous hidden"
          @click.prevent="scrollToTargetGroupSection(--selectedIndexTargetGroup)">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
          </svg>
        </button>
        <button ref="next" class="next" @click.prevent="scrollToTargetGroupSection(++selectedIndexTargetGroup)">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
          </svg>
        </button>
        <div class="scroller" ref="target-group-scroller">
          <fieldset>
            <legend>Aldersgruppe</legend>
            <label><input type="radio" name="Målgruppe alder" value="0-2" />Spædbørn (0-2 år)</label>
            <label><input type="radio" name="Målgruppe alder" value="3-5" />Småbørn (3-5 år)</label>
            <label><input type="radio" name="Målgruppe alder" value="6-12" />Børn (6-12 år)</label>
            <label><input type="radio" name="Målgruppe alder" value="13-17" />Teenager (13-17 år)</label>
            <label><input type="radio" name="Målgruppe alder" value="18-24" />18-24 år</label>
            <label><input type="radio" name="Målgruppe alder" value="25-34" />25-34 år</label>
            <label><input type="radio" name="Målgruppe alder" value="35-44" />35-44 år</label>
            <label><input type="radio" name="Målgruppe alder" value="45-54" />45-54 år</label>
            <label><input type="radio" name="Målgruppe alder" value="55-64" />55-64 år</label>
            <label><input type="radio" name="Målgruppe alder" value="65+" />65+ år</label>
          </fieldset>

          <fieldset>
            <legend>Køn</legend>
            <label><input type="radio" name="Målgruppe køn" value="mand" />Mand</label>
            <label><input type="radio" name="Målgruppe køn" value="kvinde" />Kvinde</label>
            <label><input type="radio" name="Målgruppe køn" value="begge" />Begge</label>
            <label><input type="radio" name="Målgruppe køn" value="nonbinaer" />Non-binær</label>
            <label><input type="radio" name="Målgruppe køn" value="irrelevant" />Ikke relevant</label>
          </fieldset>

          <fieldset>
            <legend>Bopæl</legend>
            <label><input type="radio" name="Målgruppe bosted" value="storby" />Storby</label>
            <label><input type="radio" name="Målgruppe bosted" value="forstad" />Forstad</label>
            <label><input type="radio" name="Målgruppe bosted" value="mindreby" />Mindre byer</label>
            <label><input type="radio" name="Målgruppe bosted" value="landet" />På landet</label>
            <label><input type="radio" name="Målgruppe bosted" value="internationalt" />Internationalt</label>
          </fieldset>

          <fieldset>
            <legend>Beskæftigelse</legend>
            <label><input type="radio" name="Målgruppe beskæftigelse" value="studerende" />Studerende</label>
            <label><input type="radio" name="Målgruppe beskæftigelse" value="fuldtid" />Fuldtidsansat</label>
            <label><input type="radio" name="Målgruppe beskæftigelse" value="selvstaendig" />Selvstændig</label>
            <label><input type="radio" name="Målgruppe beskæftigelse" value="arbejdsloes" />Arbejdsløs</label>
            <label><input type="radio" name="Målgruppe beskæftigelse" value="pensionist" />Pensionist</label>
            <label><input type="radio" name="Målgruppe beskæftigelse" value="andet" />Andet</label>
          </fieldset>

          <fieldset>
            <legend>Personlighed</legend>
            <label
              ><input type="radio" name="Målgruppe personlighed" value="ekstrovert" />Ekstrovert, udadvendt og
              social</label
            >
            <label
              ><input type="radio" name="Målgruppe personlighed" value="introvert" />Introvert, rolig og
              eftertænksom</label
            >
            <label><input type="radio" name="Målgruppe personlighed" value="kreativ" />Kreativ og kunstnerisk</label>
            <label
              ><input type="radio" name="Målgruppe personlighed" value="praktisk" />Praktisk og problemløsende</label
            >
            <label><input type="radio" name="Målgruppe personlighed" value="ambitioes" />Ambitiøs og målrettet</label>
            <label><input type="radio" name="Målgruppe personlighed" value="afslappet" />Afslappet og laid-back</label>
            <label
              ><input type="radio" name="Målgruppe personlighed" value="eventyrlysten" />Eventyrlysten og
              nysgerrig</label
            >
          </fieldset>

          <fieldset>
            <legend>Værdier</legend>
            <label
              ><input type="radio" name="Målgruppe værdier" value="baeredygtighed" />Bæredygtighed og
              miljøvenlighed</label
            >
            <label><input type="radio" name="Målgruppe værdier" value="innovation" />Innovation og teknologi</label>
            <label><input type="radio" name="Målgruppe værdier" value="tradition" />Tradition og kvalitet</label>
            <label><input type="radio" name="Målgruppe værdier" value="etik" />Samfundsansvar og etik</label>
            <label><input type="radio" name="Målgruppe værdier" value="luksus" />Komfort og luksus</label>
            <label
              ><input type="radio" name="Målgruppe værdier" value="effektivitet" />Effektivitet og produktivitet</label
            >
            <label
              ><input type="radio" name="Målgruppe værdier" value="socialt_ansvar" />Socialt ansvar og fællesskab</label
            >
          </fieldset>

          <fieldset>
            <legend>Foretrukne brands</legend>
            <label
              ><input type="radio" name="Målgruppe foretrukne brands" value="apple_nike_tesla" />Apple, Nike,
              Tesla</label
            >
            <label
              ><input type="radio" name="Målgruppe foretrukne brands" value="patagonia_ikea" />Patagonia, IKEA, Whole
              Foods</label
            >
            <label><input type="radio" name="Målgruppe foretrukne brands" value="fastfashion" />H&M, Zara, ASOS</label>
            <label
              ><input type="radio" name="Målgruppe foretrukne brands" value="luksusbrands" />Luksusbrands som Chanel,
              Louis Vuitton</label
            >
            <label
              ><input type="radio" name="Målgruppe foretrukne brands" value="socialevirksomheder" />Sociale virksomheder
              og non-profit organisationer</label
            >
            <label
              ><input type="radio" name="Målgruppe foretrukne brands" value="freelance" />Freelance- eller
              startup-virksomheder</label
            >
          </fieldset>

          <fieldset>
            <legend>Livsstil</legend>
            <label><input type="radio" name="Målgruppe livsstil" value="aktiv" />Aktiv, sportsorienteret</label>
            <label><input type="radio" name="Målgruppe livsstil" value="rejse" />Rejse- og eventyrlysten</label>
            <label
              ><input type="radio" name="Målgruppe livsstil" value="familie" />Fokuseret på hjemmet og familie</label
            >
            <label><input type="radio" name="Målgruppe livsstil" value="karriere" />Karriereorienteret</label>
            <label
              ><input type="radio" name="Målgruppe livsstil" value="socialtbevidst" />Socialt bevidst og
              engageret</label
            >
            <label
              ><input type="radio" name="Målgruppe livsstil" value="techinteresse" />Teknologiinteresseret og
              gadgetorienteret</label
            >
          </fieldset>

          <fieldset>
            <legend>Udfordringer</legend>
            <label><input type="radio" name="Målgruppe udfordringer" value="tidspres" />Tidspres og stress</label>
            <label><input type="radio" name="Målgruppe udfordringer" value="oekonomi" />Økonomisk usikkerhed</label>
            <label
              ><input type="radio" name="Målgruppe udfordringer" value="familietid" />Manglende tid til familieliv og
              hobbyer</label
            >
            <label
              ><input type="radio" name="Målgruppe udfordringer" value="manglenderviden" />Manglende viden om et bestemt
              område</label
            >
            <label
              ><input type="radio" name="Målgruppe udfordringer" value="valg" />Forbrugernes overvældelse af valg</label
            >
            <label
              ><input type="radio" name="Målgruppe udfordringer" value="inspiration" />Mangel på inspiration eller ideer
              til livsstil</label
            >
          </fieldset>

          <fieldset>
            <legend>Købsprioriteter</legend>
            <label><input type="radio" name="Målgruppe købsprioriteter" value="pris" />Pris og værdi</label>
            <label
              ><input type="radio" name="Målgruppe købsprioriteter" value="kvalitet" />Kvalitet og holdbarhed</label
            >
            <label><input type="radio" name="Målgruppe købsprioriteter" value="etik" />Bæredygtighed og etik</label>
            <label><input type="radio" name="Målgruppe købsprioriteter" value="status" />Eksklusivitet og status</label>
            <label
              ><input type="radio" name="Målgruppe købsprioriteter" value="bekvemmelighed" />Bekvemmelighed og hurtig
              levering</label
            >
            <label
              ><input type="radio" name="Målgruppe købsprioriteter" value="anmeldelser" />Kundeanmeldelser og
              anbefalinger</label
            >
          </fieldset>
        </div>
      </div>
      <div class="question brand-card-section">
        <h3>Hvilke værdier eller følelser ønsker du, at din virksomhed/organisation udstråler?</h3>

        <div class="brand-card-scroller" ref="brand-card-scroller">
          <fieldset class="brand-card">
            <label>Venlig<input type="radio" name="friendly or professional" value="venlig" /></label>
            <label>Professionel<input type="radio" name="friendly or professional" value="professionel" /></label>
          </fieldset>

          <fieldset class="brand-card">
            <label>Modig<input type="radio" name="bold or safe" value="modig" /></label>
            <label>Tryghedsskabende<input type="radio" name="bold or safe" value="tryghedsskabende" /></label>
          </fieldset>

          <fieldset class="brand-card">
            <label>Kreativ<input type="radio" name="creative or structured" value="kreativ" /></label>
            <label>Struktureret<input type="radio" name="creative or structured" value="struktureret" /></label>
          </fieldset>

          <fieldset class="brand-card">
            <label>Legende<input type="radio" name="playful or serious" value="legende" /></label>
            <label>Seriøs<input type="radio" name="playful or serious" value="seriøs" /></label>
          </fieldset>

          <fieldset class="brand-card">
            <label>Traditionel<input type="radio" name="traditional or innovative" value="traditionel" /></label>
            <label>Innovativ<input type="radio" name="traditional or innovative" value="innovativ" /></label>
          </fieldset>

          <fieldset class="brand-card">
            <label>Personlig<input type="radio" name="personal or neutral" value="personlig" /></label>
            <label>Neutral<input type="radio" name="personal or neutral" value="neutral" /></label>
          </fieldset>

          <fieldset class="brand-card">
            <label>Eksklusiv<input type="radio" name="exclusive or accessible" value="eksklusiv" /></label>
            <label>Tilgængelig<input type="radio" name="exclusive or accessible" value="tilgængelig" /></label>
          </fieldset>

          <fieldset class="brand-card">
            <label>Stilren<input type="radio" name="sleek or colorful" value="stilren" /></label>
            <label>Farverig<input type="radio" name="sleek or colorful" value="farverig" /></label>
          </fieldset>

          <fieldset class="brand-card">
            <label>Direkte<input type="radio" name="direct or embracing" value="direkte" /></label>
            <label>Omfavnende<input type="radio" name="direct or embracing" value="omfavnende" /></label>
          </fieldset>

          <fieldset class="brand-card">
            <label>Varm<input type="radio" name="warm or cool" value="varm" /></label>
            <label>Kølig<input type="radio" name="warm or cool" value="kølig" /></label>
          </fieldset>

          <fieldset class="brand-card">
            <label>Spontan<input type="radio" name="spontaneous or thoughtful" value="spontan" /></label>
            <label>Gennemtænkt<input type="radio" name="spontaneous or thoughtful" value="gennemtænkt" /></label>
          </fieldset>

          <fieldset class="brand-card">
            <label>Empatisk<input type="radio" name="empathetic or efficient" value="empatisk" /></label>
            <label>Effektiv<input type="radio" name="empathetic or efficient" value="effektiv" /></label>
          </fieldset>

          <fieldset class="brand-card">
            <label>Urban<input type="radio" name="urban or nature" value="urban" /></label>
            <label>Naturnær<input type="radio" name="urban or nature" value="naturnær" /></label>
          </fieldset>

          <fieldset class="brand-card">
            <label>Nysgerrig<input type="radio" name="curious or targeted" value="nysgerrig" /></label>
            <label>Målrettet<input type="radio" name="curious or targeted" value="målrettet" /></label>
          </fieldset>

          <fieldset class="brand-card">
            <label>Sjov<input type="radio" name="fun or sophisticated" value="sjov" /></label>
            <label>Sofistikeret<input type="radio" name="fun or sophisticated" value="sofistikeret" /></label>
          </fieldset>

          <fieldset class="brand-card">
            <label>Praktisk<input type="radio" name="practical or inspiring" value="praktisk" /></label>
            <label>Inspirerende<input type="radio" name="practical or inspiring" value="inspirerende" /></label>
          </fieldset>

          <fieldset class="brand-card">
            <label>Afslappet<input type="radio" name="relaxed or formal" value="afslappet" /></label>
            <label>Formel<input type="radio" name="relaxed or formal" value="formel" /></label>
          </fieldset>

          <fieldset class="brand-card">
            <label>Analog<input type="radio" name="analog or digital" value="analog" /></label>
            <label>Digital<input type="radio" name="analog or digital" value="digital" /></label>
          </fieldset>

          <fieldset class="brand-card">
            <label>Minimalistisk<input type="radio" name="minimalistic or detailed" value="minimalistisk" /></label>
            <label>Detaljeret<input type="radio" name="minimalistic or detailed" value="detaljeret" /></label>
          </fieldset>
        </div>
        <button
          ref="brand-previous"
          class="previous"
          title="Reset"
          @click.prevent="
            () => {
              selectedIndexBrandCard = 0;
              scrollToBrandCardSection(selectedIndexBrandCard);
            }
          ">
          Start forfra
        </button>
      </div>
      <div class="question">
        <label for="symbols"
          >Er der særlige symboler, ikoner, farver eller andet visuelt, der har en særlig betydning for din
          virksomhed/organisation?
        </label>
        <textarea
          name="Er der særlige symboler, ikoner, farver eller andet visuelt, der har en særlig betydning for din
          virksomhed/organisation?"
          id="symbols" />
      </div>
      <div class="question">
        <h3>Moodboard</h3>
        <MoodboardQuestion></MoodboardQuestion>
      </div>
    </section>
    <section id="section-3">
      <h2>Praktiske Detaljer</h2>
      <div class="question">
        <h3>Hvilke leverancer forventer du?</h3>
        <label>
          <input type="checkbox" name="Hvilke leverancer forventer du?" value="Logo" />
          Logo
        </label>

        <label>
          <input type="checkbox" name="Hvilke leverancer forventer du?" value="Visuel identitet" />
          Visuel identitet
        </label>

        <label>
          <input type="checkbox" name="Hvilke leverancer forventer du?" value="Reklame" />
          Reklame
        </label>

        <label>
          <input type="checkbox" name="Hvilke leverancer forventer du?" value="Brandguide" />
          Brandguide
        </label>

        <label>
          <input type="checkbox" name="Hvilke leverancer forventer du?" value="Hjemmesidedesign" />
          Hjemmesidedesign
        </label>

        <label>
          <input type="checkbox" name="Hvilke leverancer forventer du?" value="Sociale medie-templates" />
          Sociale medie-templates
        </label>

        <label>
          <input type="checkbox" name="Hvilke leverancer forventer du?" value="Tryksager" />
          Tryksager (f.eks. visitkort, brochurer)
        </label>

        <label>
          <input type="checkbox" name="Hvilke leverancer forventer du?" value="Farvepalette og typografi" />
          Farvepalette og typografi
        </label>

        <label>
          <input type="checkbox" name="Hvilke leverancer forventer du?" value="Ikon-sæt" />
          Ikon-sæt
        </label>

        <label>
          <input type="checkbox" name="Hvilke leverancer forventer du?" value="Animeret grafik eller video" />
          Animeret grafik eller video
        </label>

        <label>
          <input type="checkbox" name="Hvilke leverancer forventer du?" value="Emballage design" />
          Emballage design
        </label>

        <label>
          <input type="checkbox" name="Hvilke leverancer forventer du?" value="Marketingmateriale" />
          Marketingmateriale (f.eks. bannerreklamer, flyers)
        </label>

        <label>
          <input type="checkbox" name="Hvilke leverancer forventer du?" value="Strategisk branding" />
          Strategisk branding
        </label>

        <label>
          Andet (specificér)
          <textarea name="Hvilke leverancer forventer du?" />
        </label>
      </div>
      <div class="question">
        <h3>Hvor skal virksomhedens/organisationens visuelle identitet bruges eller vises?</h3>
        <label>
          <input
            type="checkbox"
            name="Hvor skal virksomhedens/organisationens visuelle identitet bruges eller vises?"
            value="Hjemmeside" />
          Hjemmeside
        </label>

        <label>
          <input
            type="checkbox"
            name="Hvor skal virksomhedens/organisationens visuelle identitet bruges eller vises?"
            value="Sociale medier" />
          Sociale medier (Instagram, Facebook, LinkedIn, etc.)
        </label>

        <label>
          <input
            type="checkbox"
            name="Hvor skal virksomhedens/organisationens visuelle identitet bruges eller vises?"
            value="Tryksager" />
          Tryksager (f.eks. visitkort, brochurer, plakater)
        </label>

        <label>
          <input
            type="checkbox"
            name="Hvor skal virksomhedens/organisationens visuelle identitet bruges eller vises?"
            value="Emballage" />
          Emballage
        </label>

        <label>
          <input
            type="checkbox"
            name="Hvor skal virksomhedens/organisationens visuelle identitet bruges eller vises?"
            value="Skilte og banners" />
          Skilte og banners
        </label>

        <label>
          <input
            type="checkbox"
            name="Hvor skal virksomhedens/organisationens visuelle identitet bruges eller vises?"
            value="Produktdesign" />
          Produktdesign
        </label>

        <label>
          <input
            type="checkbox"
            name="Hvor skal virksomhedens/organisationens visuelle identitet bruges eller vises?"
            value="Annoncer" />
          Annoncer (print og digital)
        </label>

        <label>
          <input
            type="checkbox"
            name="Hvor skal virksomhedens/organisationens visuelle identitet bruges eller vises?"
            value="E-mail marketing" />
          E-mail marketing
        </label>

        <label>
          <input
            type="checkbox"
            name="Hvor skal virksomhedens/organisationens visuelle identitet bruges eller vises?"
            value="Merchandising" />
          Merchandising (f.eks. t-shirts, krus)
        </label>

        <label>
          <input
            type="checkbox"
            name="Hvor skal virksomhedens/organisationens visuelle identitet bruges eller vises?"
            value="Events og messer" />
          Events og messer
        </label>

        <label>
          <input
            type="checkbox"
            name="Hvor skal virksomhedens/organisationens visuelle identitet bruges eller vises?"
            value="App design" />
          App design
        </label>

        <label>
          <input
            type="checkbox"
            name="Hvor skal virksomhedens/organisationens visuelle identitet bruges eller vises?"
            value="Præsentationer" />
          Præsentationer (PowerPoint, Keynote)
        </label>

        <label>
          <input
            type="checkbox"
            name="Hvor skal virksomhedens/organisationens visuelle identitet bruges eller vises?"
            value="Forretningsdokumenter" />
          Forretningsdokumenter (f.eks. brevpapir, kontrakter)
        </label>

        <label>
          Andet (specifikér)
          <textarea name="Hvor skal virksomhedens/organisationens visuelle identitet bruges eller vises?" />
        </label>
      </div>
      <div class="question">
        <label for="deadline">Hvad er deadlinen for projektet - hvilken tidsramme arbejder vi med? </label>
        <textarea name="Hvad er deadlinen for projektet - hvilken tidsramme arbejder vi med?" id="deadline" />
      </div>
      <div class="question">
        <label for="budget">Hvad er virksomhedens/organisationens budget til projektet? </label>
        <textarea name="Hvad er virksomhedens/organisationens budget til projektet?" id="budget" />
      </div>
    </section>
    <section id="section-4">
      <h2>Andet</h2>
      <div class="question">
        <label for="other"
          >Er der andet, du gerne vil tilføje? - Det kan fx være noget, du synes designeren bør vide, spørgsmål til
          designeren eller noter til dig selv.
        </label>
        <textarea
          name="Er der andet, du gerne vil tilføje? - Det kan fx være noget, du synes designeren bør vide, spørgsmål til
          designeren eller noter til dig selv."
          id="other" />
        <div class="center-content button-container">
          <button class="send-form" @click.prevent="getSummary">
            <span class="text" :class="`${loadingSummary ? 'loading' : ''}`">
              <span v-if="!data.summary">Indsend</span>
              <span v-else>Indsend</span>
            </span>
            <span class="send-form-spinner" v-if="loadingSummary">
              <LoadingSpinner></LoadingSpinner>
            </span>
          </button>
        </div>
        <div v-if="data.summary">
          <h3>Opsummering</h3>
          <div v-for="section in data.summary.sections">
            <br />
            <h4>{{ section.title }}</h4>
            <p>{{ section.content }}</p>
          </div>
        </div>
      </div>
    </section>
    <section id="section-5">
      <div class="question finish-section">
        <h2>Færdig</h2>
        <p>
          Tak for at deltage i vores test 🥰🥰 Svar venligst på vores spørgeskema. <br />
          <br />Tryk "Næste" på første side - versionen er valgt på forhånd 😎
        </p>
        <iframe
          :src="`https://docs.google.com/forms/d/e/1FAIpQLSdJwOXDeLWrA0uwiUpbdRlsiivSLzyedtolIAmTt6eU0YOzXQ/viewform?embedded=true&entry.813770840=${data.questionnaire.type}`"
          frameborder="0"
          marginheight="0"
          marginwidth="0"
          class="google-form"
          >Indlæser…</iframe
        >
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
const data = useDataStore();
const targetGroupScroller = useTemplateRef("target-group-scroller");
let targetGroupSections;
let selectedIndexTargetGroup = 0;
const nextButtonTargetGroup = useTemplateRef("next");
const previousButtonTargetGroup = useTemplateRef("previous");

function scrollToTargetGroupSection(sectionIndex: number) {
  if (selectedIndexTargetGroup < 0) {
    selectedIndexTargetGroup = 0;
  }
  if (selectedIndexTargetGroup > targetGroupSections.length - 1) {
    selectedIndexTargetGroup = targetGroupSections.length - 1;
  }
  selectedIndexTargetGroup == 0
    ? previousButtonTargetGroup.value?.classList.add("hidden")
    : previousButtonTargetGroup.value?.classList.remove("hidden");
  selectedIndexTargetGroup == targetGroupSections.length - 1
    ? nextButtonTargetGroup.value?.classList.add("hidden")
    : nextButtonTargetGroup.value?.classList.remove("hidden");
  targetGroupScroller.value?.scrollTo({
    left: sectionIndex * targetGroupScroller.value.clientWidth,
    behavior: "smooth",
  });
}
function targetGroupInit() {
  targetGroupSections = targetGroupScroller.value?.querySelectorAll("fieldset");
  targetGroupScroller.value?.scrollTo({
    left: 0,
    behavior: "smooth",
  });
  targetGroupSections?.forEach((section, index) => {
    section.querySelectorAll("label input").forEach((element) =>
      element.addEventListener("click", () => {
        selectedIndexTargetGroup = index + 1;
        setTimeout(() => {
          scrollToTargetGroupSection(selectedIndexTargetGroup);
        }, 100);
      })
    );
  });
}

const brandCardScroller = useTemplateRef("brand-card-scroller");
let brandCardSections;
let selectedIndexBrandCard = 0;
const previousButtonBrandCard = useTemplateRef("brand-previous");

function brandCardInit() {
  brandCardSections = brandCardScroller.value?.querySelectorAll("fieldset");
  brandCardScroller.value?.scrollTo({
    top: 0,
    behavior: "smooth",
  });
  brandCardSections?.forEach((section, index) => {
    section.querySelectorAll("label").forEach((element) =>
      element.addEventListener("click", () => {
        selectedIndexBrandCard = index + 1;
        setTimeout(() => {
          scrollToBrandCardSection(selectedIndexBrandCard);
        }, 300);
      })
    );
  });
}

function scrollToBrandCardSection(sectionIndex: number) {
  if (selectedIndexBrandCard < 0) {
    selectedIndexBrandCard = 0;
  }
  if (selectedIndexBrandCard > brandCardSections.length - 1) {
    selectedIndexBrandCard = brandCardSections.length - 1;
  }
  selectedIndexBrandCard == 0
    ? previousButtonBrandCard.value?.classList.remove("show-button")
    : previousButtonBrandCard.value?.classList.add("show-button");
  brandCardScroller.value?.scrollTo({
    top: sectionIndex * brandCardScroller.value.clientHeight,
    behavior: "smooth",
  });
}
const loadingSummary = ref(false);

async function getSummary() {
  loadingSummary.value = true;
  const form = document.querySelector("#questionnaire-form") as HTMLFormElement;
  if (form) {
    const formDataObject = formDataToObjectWithArrays(form);
    data.summary = await fetchSummary(JSON.stringify(formDataObject));
  }
  loadingSummary.value = false;
}

function initResizeFields() {
  const textareas = document.querySelectorAll("textarea");
  textareas.forEach((textarea) => {
    textarea.rows = 1;

    textarea.addEventListener("input", () => {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    });
  });
}

onMounted(() => {
  targetGroupInit();
  brandCardInit();
  initResizeFields();
});
</script>

<style scoped>
.summary {
  white-space: pre-line;
}
.send-form {
  position: relative;

  & .text.loading {
    visibility: hidden;
  }

  & .send-form-spinner {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}

h2 {
  margin-bottom: 1em;
}

.button-container {
  padding-top: 5rem;
}

.question.finish-section {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.google-form {
  flex-grow: 1;
  width: 100%;
  border: none;
}

.wrapper {
  height: 100%;
  overflow: hidden;
  scroll-behavior: smooth;
}

section {
  height: 100%;
  overflow: hidden scroll;
  padding: 20px;
  scroll-behavior: smooth;

  &:not(:last-child) {
    margin-bottom: 100vh;
  }

  &:not(#section-5) > :first-child {
    margin-top: 4rem;
  }

  &:not(#section-5) > :last-child {
    margin-bottom: 4rem;
  }
}

.brand-card-section {
  position: relative;
  margin-bottom: 20rem;

  & button {
    display: grid;
    place-content: center;
    transition: all 0.3s ease-in-out;
    margin: 0 auto;
    opacity: 0;
    &.show-button {
      opacity: 1;
    }
  }
}

.brand-card-scroller {
  position: relative;
  height: calc(257px + 32px);
  overflow: hidden;
}
.brand-card {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  padding: 2rem;

  & label {
    align-items: center;
    gap: 1rem;
    padding: 100px 0;
    border-radius: 15px;
    box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.15);
    outline: 0px solid #729e7200;
    transition: all 0.2s ease-in-out;
    cursor: pointer;
    position: relative;

    & > input {
      display: none;
    }
    &:has(> input:checked) {
      outline: 3px solid #333;
      outline-offset: 3px;
      transform: scale(1.05);
    }

    &:active {
      transform: scale(0.96);
    }

    &:nth-child(even) {
      background: #333;
      color: #eee;
    }

    &:nth-child(odd) {
      background: #fafafa;
      color: #333;
    }
  }
}

.question {
  & label {
    display: flex;
    flex-direction: column;

    &:has(> input[type="checkbox"]) {
      flex-direction: row;
      gap: 1rem;
      align-items: baseline;
    }
  }

  & > label {
    margin-bottom: 1.4rem;

    &:has(> input[type="checkbox"]),
    &:has(> input[type="radio"]) {
      margin-bottom: 0.8rem;
    }

    &:not(:first-child) {
      font-size: 1rem;
    }
  }

  & fieldset.brand-card > label {
    margin-bottom: 0;
  }

  &:not(:last-child) {
    margin-bottom: 6rem;
  }
}

fieldset {
  border: none;
}

textarea {
  font-size: 1rem;
  padding: 0.5rem;
  overflow: hidden;
  width: 100%;
  border-radius: 8px;
  border: 1px solid #ccc;
  background: #fff;
  resize: none;
  height: 41px;
}

.target-group {
  position: relative;

  & legend {
    padding-bottom: 1rem;
    font-weight: 500;
  }

  & .scroller {
    overflow: hidden;
    height: 460px;
    display: grid;
    grid-template-columns: repeat(10, 100%);

    & fieldset {
      width: fit-content;
      height: fit-content;
      margin: auto;
    }
  }

  & label {
    flex-direction: row;
    gap: 1rem;

    &:not(:last-child) {
      margin-bottom: 0.6rem;
    }
  }

  & button {
    position: absolute;
    display: grid;
    place-content: center;
    aspect-ratio: 1;
    &.previous {
      left: 20px;
      top: 250px;
    }
    &.next {
      right: 20px;
      top: 250px;
    }
  }
}

.question > label {
  font-size: 1rem;
}

.question > :first-child {
  font-weight: 500;
  font-size: 1.2rem;
  margin-bottom: 1rem;
}
</style>
