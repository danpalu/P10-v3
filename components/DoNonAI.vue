<template>
  <div class="wrapper">
    <section id="section-1">
      <h2>Virksomhedsoplysninger</h2>
      <div class="question">
        <label for="name">Hvad er navnet på virksomheden/organisationen? </label>
        <input type="text" name="name" id="name" />
      </div>
      <div class="question">
        <label for="services">Hvilke produkter eller tjenester udbyder I? </label>
        <textarea type="text" name="services" id="services" />
      </div>
      <div class="question">
        <h3>
          Hvordan vil du beskrive jeres vision med få ord - har I evt. et slogan eller tagline, der indkapsler, hvad I
          stræber efter?
        </h3>
        <fieldset name="vision">
          <legend>Vælg nogle sætninger og færdiggør dem</legend>
          <label>Vi drømmer om en verden, hvor...<input type="text" name="dreams" /></label>
          <label>Vi tror på, at det vigtigste er...<input type="text" name="important" /></label>
          <label>Vi arbejder for at...<input type="text" name="work" /></label>
          <label>Vi vil være dem, der...<input type="text" name="identity" /></label>
          <label>Vores mål er at gøre det muligt for...<input type="text" name="goal" /></label>
          <label>Vi ønsker at ændre måden, folk tænker om...<input type="text" name="change" /></label>
          <label>Vi er drevet af en tro på, at...<input type="text" name="belief" /></label>
          <label>Vi står op om morgenen for at...<input type="text" name="motivation" /></label>
          <label>Vi håber, at vores arbejde vil føre til...<input type="text" name="impact" /></label>
          <label>Vi prøver ikke at være de største – men de mest...<input type="text" name="values" /></label>
        </fieldset>
      </div>
      <div class="question">
        <h3>
          Hvad er historien bag din virksomhed/organisation - hvorfor blev den startet og hvad har formet den undervejs?
        </h3>
        <fieldset name="history">
          <legend>Svar på spørgsmål</legend>
          <label>
            Hvilket behov, problem eller drøm førte til, at virksomheden blev startet?
            <input type="text" name="origin-need" />
          </label>

          <label>
            Hvad var den oprindelige vision eller idé – og er den ændret siden?
            <input type="text" name="original-vision" />
          </label>

          <label>
            Hvem stod bag opstarten, og hvilken baggrund havde de?
            <input type="text" name="founders" />
          </label>

          <label>
            Er der en konkret oplevelse eller aha-øjeblik, der satte gang i det hele?
            <input type="text" name="aha-moment" />
          </label>

          <label>
            Hvad har været de største milepæle eller udfordringer undervejs?
            <input type="text" name="milestones" />
          </label>

          <label>
            Hvordan har virksomheden udviklet sig siden starten – og hvorfor?
            <input type="text" name="development" />
          </label>

          <label>
            Har der været vigtige samarbejder, kundetyper eller begivenheder, der har formet jer?
            <input type="text" name="influences" />
          </label>

          <label>
            Hvordan har jeres værdier eller mission været med til at styre jeres vej?
            <input type="text" name="values-impact" />
          </label>

          <label>
            Hvilke vendepunkter har ændret jeres retning eller selvforståelse?
            <input type="text" name="turning-points" />
          </label>

          <label>
            Hvad er I særligt stolte af, når I ser tilbage på jeres rejse?
            <input type="text" name="pride" />
          </label>
        </fieldset>
      </div>
      <div class="question">
        <h3>Hvad vil du gerne have, at folk siger om Jer?</h3>
        <fieldset>
          <label>
            <input type="checkbox" name="values" value="troværdige og professionelle" />
            At vi er troværdige og professionelle
          </label>

          <label>
            <input type="checkbox" name="values" value="nytænkende og innovative" />
            At vi er nytænkende og innovative
          </label>

          <label>
            <input type="checkbox" name="values" value="positiv forskel i samfundet" />
            At vi gør en positiv forskel i samfundet
          </label>

          <label>
            <input type="checkbox" name="values" value="nemme og behagelige at samarbejde med" />
            At vi er nemme og behagelige at samarbejde med
          </label>

          <label>
            <input type="checkbox" name="values" value="passionerede og engagerede" />
            At vi er passionerede og engagerede
          </label>

          <label>
            <input type="checkbox" name="values" value="venlige og imødekommende" />
            At vi er venlige og imødekommende
          </label>

          <label>
            <input type="checkbox" name="values" value="bæredygtighed og ansvarlighed" />
            At vi har fokus på bæredygtighed og ansvarlighed
          </label>

          <label>
            <input type="checkbox" name="values" value="høj kvalitet og gode resultater" />
            At vi leverer høj kvalitet og gode resultater
          </label>

          <label>
            <input type="checkbox" name="values" value="sjove og kreative" />
            At vi er sjove og kreative
          </label>

          <label>
            <input type="checkbox" name="values" value="forstår kunders eller brugeres behov" />
            At vi forstår vores kunders/brugeres behov
          </label>
          <label
            >Andet:

            <input type="text" name="review-other" />
          </label>
        </fieldset>
      </div>
    </section>
    <section id="section-2">
      <h2>Mål og Branding</h2>
      <div class="question">
        <h3>Hvad ønsker I at opnå med en ny visuel identitet eller design?</h3>
        <fieldset>
          <label>
            <input type="checkbox" name="goals" value="stærkere og mere genkendeligt brand" />
            At skabe et stærkere og mere genkendeligt brand
          </label>

          <label>
            <input type="checkbox" name="goals" value="tiltrække ny målgruppe eller marked" />
            At tiltrække en ny målgruppe eller marked
          </label>

          <label>
            <input type="checkbox" name="goals" value="opdatere image og signalere modernitet" />
            At opdatere virksomhedens image og signalere modernitet
          </label>

          <label>
            <input type="checkbox" name="goals" value="styrke værdier og mission gennem design" />
            At styrke virksomhedens værdier og mission gennem design
          </label>

          <label>
            <input type="checkbox" name="goals" value="sammenhængende og professionel oplevelse" />
            At skabe en mere sammenhængende og professionel visuel oplevelse
          </label>

          <label>
            <input type="checkbox" name="goals" value="differentiere os fra konkurrenterne" />
            At differentiere os fra konkurrenterne i markedet
          </label>

          <label>
            <input type="checkbox" name="goals" value="lettere og mere effektiv kommunikation" />
            At gøre vores kommunikation lettere at forstå og mere effektiv
          </label>

          <label>
            <input type="checkbox" name="goals" value="formidle kultur og personlighed gennem design" />
            At formidle vores kultur og personlighed gennem design
          </label>

          <label>
            <input type="checkbox" name="goals" value="genkendelse og hukommelse af brand" />
            At gøre det lettere for kunder at genkende og huske vores brand
          </label>

          <label>
            <input type="checkbox" name="goals" value="fremme tillid og troværdighed" />
            At fremme tillid og troværdighed i vores målgrupper
          </label>
          <label
            >Andet:

            <input type="text" name="designGoal" />
          </label>
        </fieldset>
      </div>
      <div class="question">
        <h3>Hvem er jeres konkurrenter, og hvordan adskiller I jer fra dem?</h3>
        <fieldset name="competitors">
          <legend>Svar på spørgsmål</legend>

          <label>
            Vores primære konkurrenter er…
            <input type="text" name="main-competitors" />
          </label>

          <label>
            Den største forskel mellem vores virksomhed og vores konkurrenter er…
            <input type="text" name="main-difference" />
          </label>

          <label>
            Vi skiller os ud fra konkurrenterne ved at…
            <input type="text" name="unique-trait" />
          </label>

          <label>
            Kunder vælger os frem for vores konkurrenter, fordi…
            <input type="text" name="customer-reason" />
          </label>

          <label>
            Vi har en fordel i forhold til vores konkurrenter, fordi…
            <input type="text" name="competitive-advantage" />
          </label>
        </fieldset>
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
            <label><input type="radio" name="age" value="0-2" />Spædbørn (0-2 år)</label>
            <label><input type="radio" name="age" value="3-5" />Småbørn (3-5 år)</label>
            <label><input type="radio" name="age" value="6-12" />Børn (6-12 år)</label>
            <label><input type="radio" name="age" value="13-17" />Teenagere (13-17 år)</label>
            <label><input type="radio" name="age" value="18-24" />18-24 år</label>
            <label><input type="radio" name="age" value="25-34" />25-34 år</label>
            <label><input type="radio" name="age" value="35-44" />35-44 år</label>
            <label><input type="radio" name="age" value="45-54" />45-54 år</label>
            <label><input type="radio" name="age" value="55-64" />55-64 år</label>
            <label><input type="radio" name="age" value="65+" />65+ år</label>
          </fieldset>

          <fieldset>
            <legend>Køn</legend>
            <label><input type="radio" name="gender" value="mand" />Mand</label>
            <label><input type="radio" name="gender" value="kvinde" />Kvinde</label>
            <label><input type="radio" name="gender" value="begge" />Begge</label>
            <label><input type="radio" name="gender" value="nonbinaer" />Non-binær</label>
            <label><input type="radio" name="gender" value="irrelevant" />Ikke relevant</label>
          </fieldset>

          <fieldset>
            <legend>Bopæl</legend>
            <label><input type="radio" name="location" value="storby" />Storby</label>
            <label><input type="radio" name="location" value="forstad" />Forstad</label>
            <label><input type="radio" name="location" value="mindreby" />Mindre byer</label>
            <label><input type="radio" name="location" value="landet" />På landet</label>
            <label><input type="radio" name="location" value="internationalt" />Internationalt</label>
          </fieldset>

          <fieldset>
            <legend>Beskæftigelse</legend>
            <label><input type="radio" name="occupation" value="studerende" />Studerende</label>
            <label><input type="radio" name="occupation" value="fuldtid" />Fuldtidsansat</label>
            <label><input type="radio" name="occupation" value="selvstaendig" />Selvstændig</label>
            <label><input type="radio" name="occupation" value="arbejdsloes" />Arbejdsløs</label>
            <label><input type="radio" name="occupation" value="pensionist" />Pensionist</label>
            <label><input type="radio" name="occupation" value="andet" />Andet</label>
          </fieldset>

          <fieldset>
            <legend>Personlighed</legend>
            <label><input type="radio" name="personality" value="ekstrovert" />Ekstrovert, udadvendt og social</label>
            <label><input type="radio" name="personality" value="introvert" />Introvert, rolig og eftertænksom</label>
            <label><input type="radio" name="personality" value="kreativ" />Kreativ og kunstnerisk</label>
            <label><input type="radio" name="personality" value="praktisk" />Praktisk og problemløsende</label>
            <label><input type="radio" name="personality" value="ambitioes" />Ambitiøs og målrettet</label>
            <label><input type="radio" name="personality" value="afslappet" />Afslappet og laid-back</label>
            <label><input type="radio" name="personality" value="eventyrlysten" />Eventyrlysten og nysgerrig</label>
          </fieldset>

          <fieldset>
            <legend>Værdier</legend>
            <label><input type="radio" name="values" value="baeredygtighed" />Bæredygtighed og miljøvenlighed</label>
            <label><input type="radio" name="values" value="innovation" />Innovation og teknologi</label>
            <label><input type="radio" name="values" value="tradition" />Tradition og kvalitet</label>
            <label><input type="radio" name="values" value="etik" />Samfundsansvar og etik</label>
            <label><input type="radio" name="values" value="luksus" />Komfort og luksus</label>
            <label><input type="radio" name="values" value="effektivitet" />Effektivitet og produktivitet</label>
            <label><input type="radio" name="values" value="socialt_ansvar" />Socialt ansvar og fællesskab</label>
          </fieldset>

          <fieldset>
            <legend>Foretrukne brands</legend>
            <label><input type="radio" name="brands" value="apple_nike_tesla" />Apple, Nike, Tesla</label>
            <label><input type="radio" name="brands" value="patagonia_ikea" />Patagonia, IKEA, Whole Foods</label>
            <label><input type="radio" name="brands" value="fastfashion" />H&M, Zara, ASOS</label>
            <label
              ><input type="radio" name="brands" value="luksusbrands" />Luksusbrands som Chanel, Louis Vuitton</label
            >
            <label
              ><input type="radio" name="brands" value="socialevirksomheder" />Sociale virksomheder og non-profit
              organisationer</label
            >
            <label><input type="radio" name="brands" value="freelance" />Freelance- eller startup-virksomheder</label>
          </fieldset>

          <fieldset>
            <legend>Livsstil</legend>
            <label><input type="radio" name="lifestyle" value="aktiv" />Aktiv, sportsorienteret</label>
            <label><input type="radio" name="lifestyle" value="rejse" />Rejse- og eventyrlysten</label>
            <label><input type="radio" name="lifestyle" value="familie" />Fokuseret på hjemmet og familie</label>
            <label><input type="radio" name="lifestyle" value="karriere" />Karriereorienteret</label>
            <label><input type="radio" name="lifestyle" value="socialtbevidst" />Socialt bevidst og engageret</label>
            <label
              ><input type="radio" name="lifestyle" value="techinteresse" />Teknologiinteresseret og
              gadgetorienteret</label
            >
          </fieldset>

          <fieldset>
            <legend>Udfordringer</legend>
            <label><input type="radio" name="challenges" value="tidspres" />Tidspres og stress</label>
            <label><input type="radio" name="challenges" value="oekonomi" />Økonomisk usikkerhed</label>
            <label
              ><input type="radio" name="challenges" value="familietid" />Manglende tid til familieliv og hobbyer</label
            >
            <label
              ><input type="radio" name="challenges" value="manglenderviden" />Manglende viden om et bestemt
              område</label
            >
            <label><input type="radio" name="challenges" value="valg" />Forbrugernes overvældelse af valg</label>
            <label
              ><input type="radio" name="challenges" value="inspiration" />Mangel på inspiration eller ideer til
              livsstil</label
            >
          </fieldset>

          <fieldset>
            <legend>Købsprioriteter</legend>
            <label><input type="radio" name="purchase" value="pris" />Pris og værdi</label>
            <label><input type="radio" name="purchase" value="kvalitet" />Kvalitet og holdbarhed</label>
            <label><input type="radio" name="purchase" value="etik" />Bæredygtighed og etik</label>
            <label><input type="radio" name="purchase" value="status" />Eksklusivitet og status</label>
            <label
              ><input type="radio" name="purchase" value="bekvemmelighed" />Bekvemmelighed og hurtig levering</label
            >
            <label><input type="radio" name="purchase" value="anmeldelser" />Kundeanmeldelser og anbefalinger</label>
          </fieldset>
        </div>
      </div>
      <div class="question brand-card-section">
        <h3>Hvilke værdier eller følelser ønsker du, at din virksomhed/organisation udstråler?</h3>

        <div class="brand-card-scroller" ref="brand-card-scroller">
          <fieldset class="brand-card">
            <label>Venlig<input type="radio" name="friendly_professional" /></label>
            <label>Professionel<input type="radio" name="friendly_professional" /></label>
          </fieldset>

          <fieldset class="brand-card">
            <label>Modig<input type="radio" name="bold_safe" /></label>
            <label>Tryghedsskabende<input type="radio" name="bold_safe" /></label>
          </fieldset>

          <fieldset class="brand-card">
            <label>Kreativ<input type="radio" name="creative_structured" /></label>
            <label>Struktureret<input type="radio" name="creative_structured" /></label>
          </fieldset>

          <fieldset class="brand-card">
            <label>Legende<input type="radio" name="playful_serious" /></label>
            <label>Seriøs<input type="radio" name="playful_serious" /></label>
          </fieldset>

          <fieldset class="brand-card">
            <label>Traditionel<input type="radio" name="traditional_innovative" /></label>
            <label>Innovativ<input type="radio" name="traditional_innovative" /></label>
          </fieldset>

          <fieldset class="brand-card">
            <label>Personlig<input type="radio" name="personal_neutral" /></label>
            <label>Neutral<input type="radio" name="personal_neutral" /></label>
          </fieldset>

          <fieldset class="brand-card">
            <label>Eksklusiv<input type="radio" name="exclusive_accessible" /></label>
            <label>Tilgængelig<input type="radio" name="exclusive_accessible" /></label>
          </fieldset>

          <fieldset class="brand-card">
            <label>Stilren<input type="radio" name="sleek_colorful" /></label>
            <label>Farverig<input type="radio" name="sleek_colorful" /></label>
          </fieldset>

          <fieldset class="brand-card">
            <label>Direkte<input type="radio" name="direct_embracing" /></label>
            <label>Omfavnende<input type="radio" name="direct_embracing" /></label>
          </fieldset>

          <fieldset class="brand-card">
            <label>Varm<input type="radio" name="warm_cool" /></label>
            <label>Kølig<input type="radio" name="warm_cool" /></label>
          </fieldset>

          <fieldset class="brand-card">
            <label>Spontan<input type="radio" name="spontaneous_thoughtful" /></label>
            <label>Gennemtænkt<input type="radio" name="spontaneous_thoughtful" /></label>
          </fieldset>

          <fieldset class="brand-card">
            <label>Empatisk<input type="radio" name="empathetic_efficient" /></label>
            <label>Effektiv<input type="radio" name="empathetic_efficient" /></label>
          </fieldset>

          <fieldset class="brand-card">
            <label>Urban<input type="radio" name="urban_nature" /></label>
            <label>Naturnær<input type="radio" name="urban_nature" /></label>
          </fieldset>

          <fieldset class="brand-card">
            <label>Nysgerrig<input type="radio" name="curious_targeted" /></label>
            <label>Målrettet<input type="radio" name="curious_targeted" /></label>
          </fieldset>

          <fieldset class="brand-card">
            <label>Sjov<input type="radio" name="fun_sophisticated" /></label>
            <label>Sofistikeret<input type="radio" name="fun_sophisticated" /></label>
          </fieldset>

          <fieldset class="brand-card">
            <label>Praktisk<input type="radio" name="practical_inspiring" /></label>
            <label>Inspirerende<input type="radio" name="practical_inspiring" /></label>
          </fieldset>

          <fieldset class="brand-card">
            <label>Afslappet<input type="radio" name="relaxed_formal" /></label>
            <label>Formel<input type="radio" name="relaxed_formal" /></label>
          </fieldset>

          <fieldset class="brand-card">
            <label>Analog<input type="radio" name="analog_digital" /></label>
            <label>Digital<input type="radio" name="analog_digital" /></label>
          </fieldset>

          <fieldset class="brand-card">
            <label>Minimalistisk<input type="radio" name="minimalistic_detailed" /></label>
            <label>Detaljeret<input type="radio" name="minimalistic_detailed" /></label>
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
        <input type="text" name="symbols" id="symbols" />
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
        <fieldset>
          <label>
            <input type="checkbox" name="goals" value="Logo" />
            Logo
          </label>

          <label>
            <input type="checkbox" name="goals" value="Visuel identitet" />
            Visuel identitet
          </label>

          <label>
            <input type="checkbox" name="goals" value="Reklame" />
            Reklame
          </label>

          <label>
            <input type="checkbox" name="goals" value="Brandguide" />
            Brandguide
          </label>

          <label>
            <input type="checkbox" name="goals" value="Hjemmesidedesign" />
            Hjemmesidedesign
          </label>

          <label>
            <input type="checkbox" name="goals" value="Sociale medie-templates" />
            Sociale medie-templates
          </label>

          <label>
            <input type="checkbox" name="goals" value="Tryksager" />
            Tryksager (f.eks. visitkort, brochurer)
          </label>

          <label>
            <input type="checkbox" name="goals" value="Farvepalette og typografi" />
            Farvepalette og typografi
          </label>

          <label>
            <input type="checkbox" name="goals" value="Ikon-sæt" />
            Ikon-sæt
          </label>

          <label>
            <input type="checkbox" name="goals" value="Animeret grafik eller video" />
            Animeret grafik eller video
          </label>

          <label>
            <input type="checkbox" name="goals" value="Emballage design" />
            Emballage design
          </label>

          <label>
            <input type="checkbox" name="goals" value="Marketingmateriale" />
            Marketingmateriale (f.eks. bannerreklamer, flyers)
          </label>

          <label>
            <input type="checkbox" name="goals" value="Strategisk branding" />
            Strategisk branding
          </label>

          <label>
            Andet (specificér)
            <input type="text" name="goals" value="Andet" />
          </label>
        </fieldset>
      </div>
      <div class="question">
        <h3>Hvor skal virksomhedens/organisationens visuelle identitet bruges eller vises?</h3>
        <fieldset>
          <label>
            <input type="checkbox" name="visual_identity" value="Hjemmeside" />
            Hjemmeside
          </label>

          <label>
            <input type="checkbox" name="visual_identity" value="Sociale medier" />
            Sociale medier (Instagram, Facebook, LinkedIn, etc.)
          </label>

          <label>
            <input type="checkbox" name="visual_identity" value="Tryksager" />
            Tryksager (f.eks. visitkort, brochurer, plakater)
          </label>

          <label>
            <input type="checkbox" name="visual_identity" value="Emballage" />
            Emballage
          </label>

          <label>
            <input type="checkbox" name="visual_identity" value="Skilte og banners" />
            Skilte og banners
          </label>

          <label>
            <input type="checkbox" name="visual_identity" value="Produktdesign" />
            Produktdesign
          </label>

          <label>
            <input type="checkbox" name="visual_identity" value="Annoncer" />
            Annoncer (print og digital)
          </label>

          <label>
            <input type="checkbox" name="visual_identity" value="E-mail marketing" />
            E-mail marketing
          </label>

          <label>
            <input type="checkbox" name="visual_identity" value="Merchandising" />
            Merchandising (f.eks. t-shirts, krus)
          </label>

          <label>
            <input type="checkbox" name="visual_identity" value="Events og messer" />
            Events og messer
          </label>

          <label>
            <input type="checkbox" name="visual_identity" value="App design" />
            App design
          </label>

          <label>
            <input type="checkbox" name="visual_identity" value="Præsentationer" />
            Præsentationer (PowerPoint, Keynote)
          </label>

          <label>
            <input type="checkbox" name="visual_identity" value="Forretningsdokumenter" />
            Forretningsdokumenter (f.eks. brevpapir, kontrakter)
          </label>

          <label>
            Andet (specifikér)
            <input type="text" name="visual_identity" value="Andet" />
          </label>
        </fieldset>
      </div>
      <div class="question">
        <label for="deadline">Hvad er deadlinen for projektet - hvilken tidsramme arbejder vi med? </label>
        <input type="text" name="deadline" id="deadline" />
      </div>
      <div class="question">
        <label for="budget">Hvad er virksomhedens/organisationens budget til projektet? </label>
        <input type="text" name="budget" id="budget" />
      </div>
    </section>
    <section id="section-4">
      <h2>Andet</h2>
      <div class="question">
        <label for="other"
          >Er der andet, du gerne vil tilføje? - Det kan fx være noget, du synes designeren bør vide, spørgsmål til
          designeren eller noter til dig selv.
        </label>
        <input type="text" name="other" id="other" />
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
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

onMounted(() => {
  targetGroupInit();
  brandCardInit();
});
</script>

<style scoped>
h2 {
  margin-bottom: 1em;
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

  &:not(:last-child) {
    margin-bottom: 2rem;
  }

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

  & fieldset {
    padding: 1rem;

    & > label:not(".brand-card"):not(:last-child) {
      margin-bottom: 2rem;
    }
  }

  &:not(:last-child) {
    margin-bottom: 2rem;
  }
}

fieldset {
  border: none;
}

.target-group {
  position: relative;
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
      margin-bottom: 1rem;
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

h3,
.question > label {
  font-size: 1.2rem;
  font-weight: 500;
  padding-bottom: 1rem;
}
</style>
