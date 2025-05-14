<template>
  <div class="mobile-popup center-content">
    <h2>
      Hop venligst på computeren i stedet<br /><br />
      - det virker ikke så godt på mobilen <br /><br />
      🥰
    </h2>
  </div>
  <div class="introduction">
    <div class="text-box">
      <h1>Hej!</h1>
      <p>
        Tak fordi du vil hjælpe os. <br />
        Som en del af vores specialeprojekt i interaktionsdesign undersøger vi, hvordan man kan styrke det indledende
        samarbejde mellem designere og deres kunder. I den forbindelse tester vi forskellige programmer, som skal hjælpe
        kunder med at forberede sig til deres første møde med en designer. <br /><br />
        Din opgave er nu at lade som om, du er kunden. For at gøre oplevelsen så realistisk og meningsfuld som muligt,
        vil vi bede dig om at forestille dig, at du repræsenterer en organisation, forening eller virksomhed, du har en
        form for tilknytning til. Det kan for eksempel være:
      </p>
      <ul>
        <li>Din arbejdsplads (studie-, deltids- eller fuldtidsjob)</li>
        <li>En forening, fritidsklub eller interessegruppe, du er aktiv i</li>
        <li>Et projekt du deltager i (fx frivilligt, studie-eller iværksætterprojekt)</li>
        <li>Et fiktivt projekt, du nemt kan forestille dig at være en del af</li>
      </ul>
      <p>
        Forestil dig, at din valgte organisation har besluttet at investere mere i markedsføring og er interesseret i at
        få professionel hjælp til visuel identitet og branding. Du skal derfor mødes med en designer i morgen. Som
        forberedelse til mødet, har designeren bedt dig om at gennemgå et program med en række spørgsmål og overvejelser
        om din organisation. <br /><br />
        Du er velkommen til at interagere med programmet så længe du har lyst og når du er færdig, bedes du besvare et
        kort spørgeskema om din oplevelse. <br /><br />
        Mange tak for din tid - og god fornøjelse! 😎 <br /><br />
        <span style="color: crimson"> NB: </span>Programmet er en prototype, og der kan forekomme fejl eller mangler.
        Hvis du oplever dette, bedes du fortsætte med at bruge programmet så godt som muligt. Skulle du støde på
        problemer, der forhindrer dig i at fortsætte, bedes du kontakte os.
      </p>
    </div>
    <button v-if="typeIsSet" @click="$emit('start')">Start</button>
    <button v-else style="color: tomato" disabled>Forkert link, kan ikke starte 😭</button>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  typeIsSet: boolean;
}>();
</script>

<style scoped>
.introduction {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 2rem;
  grid-column: span 2;
  grid-row: span 2;
  overflow: hidden scroll;
  padding: 5rem 1rem;
}

.text-box {
  text-align: left;
  max-width: 80ch;
  line-height: 1.8;

  & h1 {
    margin-bottom: 2rem;
  }

  li {
    list-style: disc;
    margin-left: 2rem;
    line-height: 2;
  }

  ul {
    padding: 1rem 0;
  }

  h1 {
    text-align: center;
  }
}

.mobile-popup {
  position: fixed;
  inset: 0;
  width: 100dvw;
  height: 100dvh;
  background: #111;
  color: white;
  display: none;

  & h2 {
    text-align: center;
  }
}

@media (max-width: 800px) {
  .mobile-popup {
    display: flex;
  }
}
</style>
