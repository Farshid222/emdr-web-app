const canvas = document.getElementById("lightCanvas");
const ctx = canvas.getContext("2d");

const stepTitle = document.getElementById("stepTitle");
const instructionText = document.getElementById("instructionText");
const statusText = document.getElementById("statusText");
const progressText = document.getElementById("progressText");
const timerText = document.getElementById("timerText");

const speedSlider = document.getElementById("speedSlider");
const speedValue = document.getElementById("speedValue");
const speechRateSlider = document.getElementById("speechRateSlider");
const speechRateValue = document.getElementById("speechRateValue");

const beforeDiscomfort = document.getElementById("beforeDiscomfort");
const beforeSafety = document.getElementById("beforeSafety");
const afterDiscomfort = document.getElementById("afterDiscomfort");
const afterSafety = document.getElementById("afterSafety");

const beforeDiscomfortValue = document.getElementById("beforeDiscomfortValue");
const beforeSafetyValue = document.getElementById("beforeSafetyValue");
const afterDiscomfortValue = document.getElementById("afterDiscomfortValue");
const afterSafetyValue = document.getElementById("afterSafetyValue");

const introDialog = document.getElementById("introDialog");
const introContent = document.getElementById("introContent");
const analysisDialog = document.getElementById("analysisDialog");
const analysisContent = document.getElementById("analysisContent");

const introductionText = `Barn, unge og voksne som har opplevd traumer i livet, for eksempel på grunn av krig, vold, seksuelle overgrep, mobbing, skilsmisse, trakassering, diskriminering eller andre belastende hendelser, kan oppleve mange sterke symptomer. Slike symptomer kan gi både psykiske og fysiske belastninger, som psykosomatiske symptomer, migrene, magesmerter, anspenthet, irritabilitet, flashbacks, frykt, aggressivitet, sinne, håpløshet, skyldfølelse, uforutsigbarhet, søvnproblemer, mareritt, stress, angst og depresjon.

Noen ganger kan symptomene bli så sterke at de tar mye plass i hverdagen, og personen kan føle seg maktesløs. Da kan det være viktig å få hjelp til å håndtere tanker og følelser på en trygg måte.

Denne appen er laget som en prototype og et forebyggende selvhjelpsverktøy. Den kan støtte deg i å arbeide med vanskelige minner gjennom trygghet, selvstyrke og veiledning. Dette kan ses som en empowerment-metode, eller hjelp til selvhjelp. Appen er ikke en erstatning for behandling hos psykolog, lege eller EMDR-terapeut, men kan være et støttende verktøy på veien mot mer styrke, balanse og ro i hverdagen.

Du er ikke alene. Gå rolig fram, stopp hvis det blir for ubehagelig, og søk profesjonell hjelp dersom reaksjonene blir sterke eller vanskelige å håndtere.`;

const steps = [
  {
    title: "Steg 1: Verste bilde og vanskelig tanke",
    color: "red",
    duration: 120,
    status: "Verste bilde og vanskelig tanke → rødt lystog",
    instruction:
      "Ta fram det verste bildet i forhold til den vanskelige tanken du har. Når du ser dette verste bildet for deg, gir det tanker om mindreverd, utrygghet eller maktesløshet? Hva slags følelser får du av denne tanken? Er det angst, redsel eller skyldfølelse? Gi følelsen du får av dette verste bildet og de vanskelige tankene en skår fra null til ti. Hvor sitter denne følelsen i kroppen? Er den i hodet, halsen, brystet eller magen? Kjenn godt på denne følelsen, og legg merke til den. Legg godt merke til hva du kjenner i kroppen. Når stemmen er ferdig, starter det røde lyset. Da kan du følge lyset med øynene, uten å bevege hodet, i cirka to minutter."
  },
  {
    title: "Steg 2: Første observasjon",
    color: "blue",
    duration: 120,
    status: "Observasjon av endring → blått lystog",
    instruction:
      "Stopp litt opp. Hva legger du merke til nå? Er følelsen sterkere? Er den svakere? Eller er den annerledes? Bare observer det som kommer. Når stemmen er ferdig, starter det blå lyset. Da kan du følge lyset med øynene i cirka to minutter. Stopp deretter litt opp igjen. Hva legger du merke til nå? Er følelsen sterkere, svakere eller annerledes? Bare observer det som kommer. Hvor sterk er følelsen nå, fra null til ti?"
  },
  {
    title: "Steg 3: Tilbake til verste bilde",
    color: "blue",
    duration: 120,
    status: "Verste bilde igjen → blått lystog",
    instruction:
      "Ta fram det verste bildet igjen. Ta også fram de vanskelige tankene og følelsen du får. Legg godt merke til hva du kjenner i kroppen. Når stemmen er ferdig, starter det blå lyset igjen. Følg lyset med øynene i cirka to minutter."
  },
  {
    title: "Steg 4: Mestring og tryggere tanke",
    color: "green",
    duration: 60,
    status: "Mestring og trygg tanke → grønt lystog",
    instruction:
      "Nå kan du flytte oppmerksomheten til en mestringsfølelse og en tryggere tanke som du har hatt tidligere i livet. Tenk for eksempel: Jeg er trygg nå. Jeg klarer dette. Det som skjedde, er over nå. Pust rolig. Gi den positive følelsen en skår fra null til ti. Når stemmen er ferdig, starter det grønne lyset. Da kan du følge lyset med øynene i cirka ett minutt."
  },
  {
    title: "Steg 5: Mestring og trygghet igjen",
    color: "green",
    duration: 60,
    status: "Mestring og trygghet igjen → grønt lystog",
    instruction:
      "Fortsett med den samme mestringsfølelsen og den tryggere tanken. Legg merke til kroppen mens du holder fast ved følelsen av trygghet. Pust rolig. Når stemmen er ferdig, starter det grønne lyset en gang til. Følg lyset med øynene i cirka ett minutt, på samme måte."
  },
  {
    title: "Steg 6: Sjekk verste bilde igjen",
    color: "red",
    duration: 120,
    status: "Sjekk verste bilde igjen → rødt lystog",
    instruction:
      "Nå kan du ta fram igjen det verste bildet og de vanskelige tankene. Hva legger du merke til nå? Er følelsen sterkere? Er den svakere? Eller er den annerledes? Bare observer det som kommer. Hvor sterk er følelsen nå, fra null til ti? Selv om tallet er null, starter det røde lyset igjen når stemmen er ferdig. Da kan du følge lyset med øynene i cirka to minutter."
  }
];

const closingText =
  "Økten er ferdig. Ta et øyeblikk og lukk øynene. Pust rolig. Se for deg at du står på toppen av et fjell. Solen skinner over deg, og du føler deg lettet og avslappet. Analysen vises nå i et eget vindu.";

let runningSession = false;
let runningLight = false;
let currentStep = 0;
let remainingSeconds = 0;
let countdownTimer = null;
let animationFrame = null;
let direction = 1;
let speed = 25;
let x = 120;
let y = 75;
let trainGap = 44;
let ledCount = 35;
let blinkOn = true;

function resizeCanvas() {
  const dpr = window.devicePixelRatio || 1;
  canvas.width = Math.floor(window.innerWidth * dpr);
  canvas.height = Math.floor(150 * dpr);
  canvas.style.width = `${window.innerWidth}px`;
  canvas.style.height = "150px";
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  drawLightBar();
}

function getLimits() {
  return {
    left: 25,
    right: Math.max(window.innerWidth - 25, 225)
  };
}

function palette(color) {
  if (color === "red") return { main: "#ff1744", mid: "#c62828", dim: "#7f0000", glow: "#ff5252" };
  if (color === "blue") return { main: "#40c4ff", mid: "#0288d1", dim: "#01579b", glow: "#80d8ff" };
  if (color === "green") return { main: "#69f0ae", mid: "#00c853", dim: "#1b5e20", glow: "#b9f6ca" };
  return { main: "#ffffff", mid: "#bbbbbb", dim: "#555555", glow: "#ffffff" };
}

function drawCircle(cx, cy, radius, fill, stroke, lineWidth = 1) {
  ctx.beginPath();
  ctx.arc(cx, cy, radius, 0, Math.PI * 2);
  ctx.fillStyle = fill;
  ctx.fill();
  ctx.strokeStyle = stroke;
  ctx.lineWidth = lineWidth;
  ctx.stroke();
}

function drawLightBar() {
  const width = window.innerWidth;
  const limits = getLimits();
  const current = steps[currentStep] || steps[0];
  const p = palette(current.color);

  ctx.clearRect(0, 0, width, 150);

  ctx.fillStyle = "#050505";
  ctx.strokeStyle = "#333333";
  ctx.lineWidth = 2;
  ctx.fillRect(0, y - 38, width, 76);
  ctx.strokeRect(0, y - 38, width, 76);

  ctx.strokeStyle = "#222222";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(limits.left, y);
  ctx.lineTo(limits.right, y);
  ctx.stroke();

  const spacing = (limits.right - limits.left) / (ledCount - 1);
  for (let i = 0; i < ledCount; i++) {
    const ledX = limits.left + i * spacing;
    drawCircle(ledX, y, 5, "#202020", "#3a3a3a", 1);
  }

  if (!blinkOn) return;

  const active = [
    { px: x - trainGap, color: p.dim, r: 13 },
    { px: x, color: p.main, r: 18 },
    { px: x + trainGap, color: p.mid, r: 13 }
  ];

  for (const lamp of active) {
    ctx.beginPath();
    ctx.arc(lamp.px, y, lamp.r + 14, 0, Math.PI * 2);
    ctx.strokeStyle = p.glow;
    ctx.lineWidth = 2;
    ctx.stroke();

    drawCircle(lamp.px, y, lamp.r, lamp.color, "#ffffff", 2);
    drawCircle(lamp.px, y, 5, "#ffffff", lamp.color, 1);
  }
}

function animateLight() {
  if (!runningLight) return;

  const limits = getLimits();
  x += speed * direction;

  if (x >= limits.right - trainGap) {
    x = limits.right - trainGap;
    direction = -1;
  }

  if (x <= limits.left + trainGap) {
    x = limits.left + trainGap;
    direction = 1;
  }

  blinkOn = !blinkOn;
  drawLightBar();

  animationFrame = setTimeout(animateLight, 60);
}

function speak(text, onEnd = null) {
  stopVoice();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "no-NO";
  utterance.rate = Number(speechRateSlider.value);
  utterance.pitch = 1.0;
  utterance.volume = 1.0;

  utterance.onend = () => {
    if (typeof onEnd === "function") onEnd();
  };

  speechSynthesis.speak(utterance);
}

function stopVoice() {
  if ("speechSynthesis" in window) {
    speechSynthesis.cancel();
  }
}

function applyStep() {
  const step = steps[currentStep];
  stepTitle.textContent = step.title;
  stepTitle.style.color = step.color;
  instructionText.textContent = step.instruction;
  statusText.textContent = step.status;
  statusText.style.color = step.color;
  progressText.textContent = `Steg ${currentStep + 1} av ${steps.length}`;
  remainingSeconds = step.duration;

  const limits = getLimits();
  x = limits.left + trainGap;
  direction = 1;
  blinkOn = true;
  timerText.textContent = `Klar. Lysvarighet i dette steget: ${step.duration} sekunder`;
  drawLightBar();
}

function startSession() {
  if (runningSession) return;

  runningSession = true;
  runningLight = false;
  currentStep = 0;
  stopVoice();
  clearTimers();

  applyStep();
  startVoiceThenLight();
}

function startVoiceThenLight() {
  if (!runningSession) return;

  const step = steps[currentStep];
  runningLight = false;
  timerText.textContent = "Stemmen leser først. Lyset starter automatisk etterpå.";

  speak(step.instruction, () => {
    if (!runningSession) return;
    startLight();
  });
}

function startLight() {
  if (!runningSession) return;

  runningLight = true;
  remainingSeconds = steps[currentStep].duration;
  timerText.textContent = `Lyset kjører. Neste steg om ${remainingSeconds} sekunder.`;

  animateLight();
  countdown();
}

function countdown() {
  if (!runningSession) return;

  timerText.textContent = `Lyset kjører. Neste steg om ${remainingSeconds} sekunder.`;

  if (remainingSeconds <= 0) {
    finishCurrentLightPeriod();
    return;
  }

  remainingSeconds -= 1;
  countdownTimer = setTimeout(countdown, 1000);
}

function finishCurrentLightPeriod() {
  runningLight = false;
  clearTimers();
  blinkOn = true;
  drawLightBar();

  if (currentStep < steps.length - 1) {
    currentStep += 1;
    applyStep();
    startVoiceThenLight();
  } else {
    finishSession();
  }
}

function finishSession() {
  runningSession = false;
  runningLight = false;
  clearTimers();
  blinkOn = true;
  drawLightBar();

  stepTitle.textContent = "Økten er ferdig";
  stepTitle.style.color = "#ffffff";
  instructionText.textContent = closingText;
  statusText.textContent = "Ferdig → lys stoppet automatisk";
  statusText.style.color = "#ffffff";
  progressText.textContent = `Steg ${steps.length} av ${steps.length} fullført`;
  timerText.textContent = "Automatisk økt fullført.";

  showAnalysis();
  speak(closingText);
}

function stopSession() {
  runningSession = false;
  runningLight = false;
  stopVoice();
  clearTimers();
  currentStep = 0;
  applyStep();
  statusText.textContent = "Økten er stoppet og satt tilbake til start.";
}

function resetApp() {
  stopSession();
  beforeDiscomfort.value = 6;
  beforeSafety.value = 4;
  afterDiscomfort.value = 3;
  afterSafety.value = 6;
  speedSlider.value = 25;
  speechRateSlider.value = 0.8;
  updateValues();
  applyStep();
  statusText.textContent = "Nullstilt. Klar til ny automatisk økt.";
}

function clearTimers() {
  if (countdownTimer) {
    clearTimeout(countdownTimer);
    countdownTimer = null;
  }
  if (animationFrame) {
    clearTimeout(animationFrame);
    animationFrame = null;
  }
}

function showIntro() {
  introContent.textContent = introductionText;
  introDialog.showModal();
}

function showAnalysis() {
  const bd = Number(beforeDiscomfort.value);
  const ad = Number(afterDiscomfort.value);
  const bs = Number(beforeSafety.value);
  const as = Number(afterSafety.value);

  const discomfortChange = bd - ad;
  const safetyChange = as - bs;

  let interpretation = "";

  if (discomfortChange >= 3 && safetyChange >= 2) {
    interpretation =
      "Det ser ut som personen har beveget seg i retning av bedre emosjonell regulering. Ubehaget er tydelig redusert, samtidig som trygghetsfølelsen har økt. Dette kan tyde på at den negative tanken oppleves mindre aktiverende etter økten.";
  } else if (discomfortChange >= 1 || safetyChange >= 1) {
    interpretation =
      "Det ser ut som det har skjedd en mild positiv endring. Personen kan ha fått litt mer avstand til den vanskelige tanken, men reaksjonen er ikke nødvendigvis ferdig bearbeidet.";
  } else if (ad >= bd) {
    interpretation =
      "Ubehaget er ikke redusert, eller kan ha økt. Dette kan bety at temaet fortsatt er aktivt eller sensitivt. Ved sterkt ubehag bør øvelsen stoppes, og videre arbeid bør skje sammen med kvalifisert fagperson.";
  } else {
    interpretation =
      "Endringen er liten eller uklar. Personen kan trenge mer tid, lavere tempo, eller en tryggere positiv tanke før videre arbeid.";
  }

  analysisContent.textContent =
    `Kort refleksjonsanalyse\n\n` +
    `Ubehag før: ${bd}/10 → etter: ${ad}/10.\n` +
    `Trygghet før: ${bs}/10 → etter: ${as}/10.\n\n` +
    `${interpretation}\n\n` +
    `Avslutt gjerne med rolig pust, blikket på et trygt punkt i rommet, og en enkel setning som: Jeg er her nå, og jeg er trygg nok akkurat nå.\n\n` +
    `Merk: Dette er ikke en klinisk diagnose. Det er en enkel refleksjon basert på egenvurdering.`;

  analysisDialog.showModal();
}

function repeatInstruction() {
  if (steps[currentStep]) {
    speak(steps[currentStep].instruction);
  }
}

function updateValues() {
  beforeDiscomfortValue.textContent = beforeDiscomfort.value;
  beforeSafetyValue.textContent = beforeSafety.value;
  afterDiscomfortValue.textContent = afterDiscomfort.value;
  afterSafetyValue.textContent = afterSafety.value;
  speedValue.textContent = speedSlider.value;
  speechRateValue.textContent = speechRateSlider.value;
  speed = Number(speedSlider.value);
}

document.getElementById("startBtn").addEventListener("click", startSession);
document.getElementById("introBtn").addEventListener("click", showIntro);
document.getElementById("stopBtn").addEventListener("click", stopSession);
document.getElementById("repeatBtn").addEventListener("click", repeatInstruction);
document.getElementById("stopVoiceBtn").addEventListener("click", stopVoice);
document.getElementById("analysisBtn").addEventListener("click", showAnalysis);
document.getElementById("resetBtn").addEventListener("click", resetApp);

document.getElementById("readIntroBtn").addEventListener("click", () => speak(introductionText));
document.getElementById("closeIntroBtn").addEventListener("click", () => introDialog.close());
document.getElementById("closeAnalysisBtn").addEventListener("click", () => analysisDialog.close());

[
  beforeDiscomfort,
  beforeSafety,
  afterDiscomfort,
  afterSafety,
  speedSlider,
  speechRateSlider
].forEach((el) => {
  el.addEventListener("input", updateValues);
});

window.addEventListener("resize", resizeCanvas);

introContent.textContent = introductionText;
resizeCanvas();
updateValues();
applyStep();

setTimeout(showIntro, 600);
