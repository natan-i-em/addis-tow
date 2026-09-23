/**
 * Every translatable string in the site, in one place.
 * `en` and `am` must have exactly the same shape — TypeScript enforces
 * that below with `satisfies Dict`, so a missing Amharic line fails the
 * build instead of silently falling back at runtime.
 *
 * NOTE: this Amharic was written by an AI assistant, not a certified
 * translator. Have a native speaker proofread before a real launch —
 * particularly the pricing and safety sections.
 */

export type Lang = "en" | "am";

type ServiceCopy = {
  name: string;
  short: string;
  headline: string;
  description: string;
  details: string[];
};

type AreaCopy = { name: string; note: string };
type FaqCopy = { q: string; a: string };
type StepCopy = { title: string; body: string };
type SafetyCopy = { title: string; body: string };

type Dict = {
  nav: {
    services: string;
    coverage: string;
    pricing: string;
    faq: string;
    gallery: string;
    menu: string;
    close: string;
    requestTruck: string;
  };
  hero: {
    status: string; // {trucks} placeholder
    h1a: string;
    h1b: string;
    sub: string;
    callBtn: string; // {phone} placeholder
    requestBtn: string;
    factEtaLabel: string;
    fact247: string;
    fact247Label: string;
    factYearsLabel: string;
    quickTitle: string;
    quickHint: string;
  };
  services: {
    sectionTitle: string;
    sectionLede: string;
    priceFromSuffix: string;
    startingPrice: string;
    detailsLink: string;
    otherTitle: string;
    items: Record<string, ServiceCopy>;
  };
  steps: { sectionTitle: string; sectionLede: string; items: StepCopy[] };
  coverage: {
    sectionTitle: string;
    sectionLede: string;
    etaSuffix: string;
    items: Record<string, AreaCopy>;
  };
  pricing: {
    sectionTitle: string;
    p1: string;
    p2: string;
    payingTitle: string;
    payingP1: string;
    payingP2: string;
  };
  safety: { sectionTitle: string; sectionLede: string; items: SafetyCopy[] };
  gallery: {
    sectionTitle: string;
    sectionLede: string;
    openLabel: string;
    closeLabel: string;
    prevLabel: string;
    nextLabel: string;
    videoBadge: string;
    items: Record<string, string>; // id -> caption
  };
  faq: { sectionTitle: string; items: FaqCopy[] };
  cta: { title: string; sub: string };
  footer: {
    tagline: string;
    taglineLine: string; // {tagline} {city}
    servicesHeading: string;
    areasHeading: string;
    findUsHeading: string;
    telegram: string;
    openHoursLine: string;
    sinceLine: string; // {year} {foundingYear}
  };
  actionbar: { call: string; request: string }; // {phone}
  form: {
    stepOf: string; // {n} {total}
    stepNames: string[];
    serviceLabel: string;
    servicePlaceholder: string;
    notSure: string;
    priceFromOption: string; // {price}
    vehicleLabel: string;
    vehiclePlaceholder: string;
    vehicleTypes: string[];
    locationLabel: string;
    locationPlaceholder: string;
    locationHelp: string;
    useGps: string;
    locating: string;
    pinAttached: string;
    urgencyLabel: string;
    urgencyLevels: { label: string; hint: string }[];
    scheduleLabel: string;
    nameLabel: string;
    phoneLabel: string;
    phonePlaceholder: string;
    notesLabel: string;
    notesPlaceholder: string;
    back: string;
    continue: string;
    send: string;
    sending: string;
    successTitle: string;
    successBody: string; // {eta}
    callDispatch: string;
    sendAnother: string;
    compactHint: string; // {phone}
    errors: {
      service: string;
      vehicle: string;
      location: string;
      urgency: string;
      schedule: string;
      name: string;
      phone: string;
      locationBlocked: string;
      geoUnsupported: string;
      submitFailed: string; // {phone}
    };
  };
};

// Keys must match the `slug` fields in src/lib/site.ts exactly.
export const en: Dict = {
  nav: {
    services: "Services",
    coverage: "Where we go",
    pricing: "Prices",
    faq: "Questions",
    gallery: "Gallery",
    menu: "Menu",
    close: "Close",
    requestTruck: "Request a truck",
  },
  hero: {
    status: "Dispatch open now · {trucks} trucks on shift",
    h1a: "Stuck on the road",
    h1b: "in {city}?",
    sub: "Tell us the nearest landmark and a truck starts moving. You get the driver's name, his plate number, and the price — before he sets off.",
    callBtn: "Call {phone}",
    requestBtn: "Request a truck",
    factEtaLabel: "Average arrival inside the ring road",
    fact247: "24/7",
    fact247Label: "Night calls cost the same as day calls",
    factYearsLabel: "Recovering cars across the city",
    quickTitle: "Request a truck",
    quickHint: "Three short steps. No account, no payment up front.",
  },
  services: {
    sectionTitle: "What we get called for",
    sectionLede:
      "Most calls end one of two ways: fixed where you stand, or loaded and taken to the garage you name.",
    priceFromSuffix: "birr",
    startingPrice: "starting price",
    detailsLink: "Details",
    otherTitle: "Other things we handle",
    items: {
      "flatbed-towing": {
        name: "Flatbed towing",
        short: "Full-body loading for low, luxury and non-rolling cars",
        headline: "Flatbed towing in Addis Ababa",
        description:
          "All four wheels off the ground. The safest way to move low-clearance cars, all-wheel-drive cars, and any vehicle that can no longer roll.",
        details: [
          "Hydraulic tilt bed, winch-loaded — no lifting damage",
          "Correct for AWD, 4x4 and cars with a locked gearbox",
          "Soft straps on alloy wheels, never on the body",
          "Two cars on one bed for dealership and garage moves",
        ],
      },
      "accident-recovery": {
        name: "Accident recovery",
        short: "Collision scenes, insurance paperwork, secure storage",
        headline: "Accident and collision recovery",
        description:
          "We clear the scene quickly, photograph the vehicle for your insurer, and store it under guard until the claim is settled.",
        details: [
          "Scene photographs and a timestamped condition report",
          "Works with Nyala, Awash, Ethio Life and other insurers",
          "Fenced, guarded yard with CCTV",
          "Debris cleared so traffic can move again",
        ],
      },
      "heavy-duty-towing": {
        name: "Heavy duty towing",
        short: "Minibuses, trucks, machinery and containers",
        headline: "Heavy duty towing and equipment moves",
        description:
          "Rotator and heavy wrecker capacity for minibuses, Isuzu trucks, construction plant and overturned loads.",
        details: [
          "Up to 25 tonnes recovered and righted",
          "Overturned truck uprighting with load transfer",
          "Low-loader for excavators and generators",
          "Quoted per job after a photo assessment",
        ],
      },
    },
  },
  steps: {
    sectionTitle: "From your call to your garage",
    sectionLede: "Four things happen, in this order, every time.",
    items: [
      {
        title: "Tell us where you are",
        body: "Call, or send your live location on Telegram. A landmark is enough — 'Bole, opposite Millennium Hall' works better than an address.",
      },
      {
        title: "Get a price and a name",
        body: "Dispatch quotes the job before the truck moves, and sends you the driver's name, plate number and phone.",
      },
      {
        title: "Track the truck in",
        body: "The driver shares his location as he approaches, so you know whether to wait in the car or in a cafe nearby.",
      },
      {
        title: "Pay after the drop",
        body: "Cash, telebirr or CBE transfer once your car is where you wanted it. Receipt on request for insurance claims.",
      },
    ],
  },
  coverage: {
    sectionTitle: "Where we go",
    sectionLede:
      "Anywhere inside the ring road, the expressway as far as Mojo, and the Debre Zeit and Sululta roads on request.",
    etaSuffix: "min",
    items: {
      bole: {
        name: "Bole",
        note: "Two trucks stage near Bole Medhanialem, so airport-road call-outs are usually our fastest.",
      },
      megenagna: {
        name: "Megenagna",
        note: "Peak-hour traffic around the Megenagna interchange is the main delay — we route via Gurd Shola instead.",
      },
      cmc: {
        name: "CMC",
        note: "Compound access is tight in Summit and Ayat, so we send the shorter flatbed for these calls.",
      },
      piassa: {
        name: "Piassa",
        note: "Narrow one-way streets here need a wheel-lift truck rather than a full bed.",
      },
      sarbet: {
        name: "Sarbet",
        note: "Embassy-area streets have parking restrictions — we need a plate number before arrival.",
      },
      kality: {
        name: "Kality",
        note: "Heavy-truck recovery is based out of Kality, so the big wreckers reach this side quickest.",
      },
      "ring-road": {
        name: "Ring Road",
        note: "Stay behind the barrier, never beside the car. We arrive with beacons and cones.",
      },
      "addis-adama-expressway": {
        name: "Addis–Adama Expressway",
        note: "Expressway recovery is charged per kilometre past Tulu Dimtu. Give us the nearest marker post.",
      },
    },
  },
  pricing: {
    sectionTitle: "What it costs",
    p1: "The call-out fee covers the first 10 kilometres. After that it is 90 birr per kilometre, charged from where your car is to where you want it — not from our yard.",
    p2: "Dispatch quotes the full figure on the phone before the truck moves. If the job turns out to be different from what you described, the driver tells you the new price before he loads.",
    payingTitle: "Paying",
    payingP1:
      "Cash, telebirr or a CBE transfer once the car is delivered. Nothing is taken up front.",
    payingP2:
      "Ask for a receipt at the drop if you are claiming on insurance — it takes the driver a minute and saves you a trip later.",
  },
  safety: {
    sectionTitle: "While you wait for us",
    sectionLede:
      "The riskiest part of a breakdown is the twenty minutes before the truck arrives.",
    items: [
      {
        title: "Hazards on, first",
        body: "Before anything else. On the ring road at night you are invisible without them.",
      },
      {
        title: "Get out on the safe side",
        body: "Everyone leaves through the doors away from traffic, then stands behind the barrier — not beside the car.",
      },
      {
        title: "Triangle 50 metres back",
        body: "Further on a curve or a downhill, so drivers see it in time to move over.",
      },
      {
        title: "Do not push across lanes",
        body: "A car that will not start is safer where it is than half way across a moving lane.",
      },
    ],
  },
  gallery: {
    sectionTitle: "On the job",
    sectionLede:
      "Real recoveries from around the city — flatbed loads, night call-outs, and the odd tricky recovery.",
    openLabel: "Open",
    closeLabel: "Close",
    prevLabel: "Previous",
    nextLabel: "Next",
    videoBadge: "Video",
    items: {
      "flatbed-bole": "Flatbed loading a sedan in Bole",
      "breakdown-ring-road": "Breakdown recovery on the Ring Road, after dark",
      "accident-cleanup": "Clearing an accident scene and recovering the vehicle",
      "heavy-kality": "Heavy-duty recovery of a minibus in Kality",
      "jump-start": "Jump-starting a flat battery at the roadside",
      "tire-change": "Roadside tire change",
      "flatbed-load-video": "Full flatbed loading sequence, start to finish",
    },
  },
  faq: {
    sectionTitle: "Questions people ask us",
    items: [
      {
        q: "How fast can a tow truck reach me in Addis Ababa?",
        a: "Inside the ring road we average 25 minutes, and 15 minutes around Bole. Traffic between 5pm and 7pm adds roughly ten minutes. When you request a truck you get the driver's phone number, so you can call him directly instead of guessing.",
      },
      {
        q: "How much does towing cost in Addis Ababa?",
        a: "A standard car towed inside the city starts at 2,500 birr, which covers the call-out and the first 10 km. After that it is 90 birr per kilometre. A jump start is 600 birr and a tire change is 500 birr. The price is agreed on the phone before the truck leaves — there is no surprise at the end.",
      },
      {
        q: "Do you work at night and on holidays?",
        a: "Yes. Dispatch is staffed every hour of the year, including Meskel, Timket and Eid. Night call-outs cost the same as daytime ones.",
      },
      {
        q: "Can I choose which garage my car goes to?",
        a: "Always. Tell the driver the garage and we take it there. If you have not decided, we can recommend one, but we are not paid by any garage to bring cars in.",
      },
      {
        q: "Will a flatbed damage my low car?",
        a: "No. The bed tilts to the ground and the car is winched on at a shallow angle, then strapped at the wheels rather than the body. For very low cars we carry loading ramps that cut the angle further.",
      },
      {
        q: "What should I do while I wait for the tow truck?",
        a: "Switch on your hazard lights, get everyone out on the side away from traffic, and stand behind the barrier rather than next to the car. Put your warning triangle about 50 metres back. Do not try to push the car across lanes.",
      },
      {
        q: "Do you handle insurance paperwork after an accident?",
        a: "We photograph the vehicle at the scene, write a timestamped condition report, and send both to you and your insurer. The car can stay in our guarded yard until the assessor has seen it.",
      },
      {
        q: "Can you tow a car with a locked steering wheel or missing keys?",
        a: "Yes. That is a flatbed job — the car is winched on with all four wheels off the ground, so the steering lock and the gearbox do not matter.",
      },
    ],
  },
  cta: {
    title: "Need a truck right now?",
    sub: "Dispatch picks up in under three rings, every hour of the year.",
  },
  footer: {
    tagline: "24/7 towing and roadside recovery",
    taglineLine: "{tagline} across {city}. Dispatch answers every hour of the year.",
    servicesHeading: "Services",
    areasHeading: "Areas",
    findUsHeading: "Find us",
    telegram: "Telegram",
    openHoursLine: "Open 24 hours, including public holidays.",
    sinceLine: "© {year} {legalName}. Operating since {foundingYear}.",
  },
  actionbar: { call: "Call {phone}", request: "Request a truck" },
  form: {
    stepOf: "Step {n} of {total}",
    stepNames: ["What happened", "Where you are", "How to reach you"],
    serviceLabel: "What do you need?",
    servicePlaceholder: "Choose a service",
    notSure: "Not sure — help me work it out",
    priceFromOption: "from {price} birr",
    vehicleLabel: "What are you driving?",
    vehiclePlaceholder: "Choose a vehicle type",
    vehicleTypes: [
      "Sedan / hatchback",
      "SUV / 4x4",
      "Minibus / van",
      "Pickup",
      "Truck / heavy",
      "Motorcycle",
      "Electric Cars"
    ],
    locationLabel: "Where is the car?",
    locationPlaceholder: "Megenagna, in front of Zefmesh Grand Mall",
    locationHelp: "A landmark beats an address here.",
    useGps: "Use my GPS location",
    locating: "Finding you…",
    pinAttached: " ✓ pin attached",
    urgencyLabel: "How is the car sitting?",
    urgencyLevels: [
      { label: "Blocking traffic", hint: "We prioritise this" },
      { label: "Unsafe spot", hint: "Highway or no shoulder" },
      { label: "Safely parked", hint: "Standard dispatch" },
      { label: "Schedule for later", hint: "Pick a time" },
    ],
    scheduleLabel: "When should the truck come?",
    nameLabel: "Your name",
    phoneLabel: "Phone",
    phonePlaceholder: "0911 23 45 67",
    notesLabel: "Anything the driver should know?",
    notesPlaceholder:
      "Front wheel is bent, car is in an underground parking on level 2",
    back: "Back",
    continue: "Continue",
    send: "Send request",
    sending: "Sending…",
    successTitle: "A truck is being assigned",
    successBody:
      "Dispatch is calling you in the next few minutes to confirm the price. Estimated arrival is about {eta} minutes once the driver sets off.",
    callDispatch: "Call dispatch now",
    sendAnother: "Send another request",
    compactHint: "In a hurry? Calling {phone} is always faster than typing.",
    errors: {
      service: "Pick the help you need.",
      vehicle: "Tell us what you drive.",
      location: "A landmark is enough — 'Bole, opposite Edna Mall'.",
      urgency: "Choose how the car is sitting right now.",
      schedule: "Pick a date and time.",
      name: "We need a name for the driver.",
      phone: "Enter a working Ethiopian mobile number.",
      locationBlocked: "Location was blocked. Type the nearest landmark instead.",
      geoUnsupported:
        "This browser cannot share location. Type a landmark instead.",
      submitFailed:
        "We could not send that. Call {phone} and dispatch will take the details.",
    },
  },
};

export const am: Dict = {
  nav: {
    services: "አገልግሎቶች",
    coverage: "የምንደርስባቸው ቦታዎች",
    pricing: "ዋጋዎች",
    faq: "ጥያቄዎች",
    gallery: "ጋለሪ",
    menu: "ዝርዝር",
    close: "ዝጋ",
    requestTruck: "መኪና ይጠይቁ",
  },
  hero: {
    status: "ማዘዣ አሁን ክፍት ነው · {trucks} መኪኖች በስራ ላይ",
    h1a: "በመንገድ ላይ ተቸግረዋል?",
    h1b: "{city} ውስጥ?",
    sub: "በአቅራቢያዎ ያለውን ምልክት ይንገሩን፣ መኪናው ወዲያውኑ ይነሳል። የአሽከርካሪውን ስም፣ የሰሌዳ ቁጥር እና ዋጋ ከመንቀሳቀሱ በፊት ያገኛሉ።",
    callBtn: "ይደውሉ {phone}",
    requestBtn: "መኪና ይጠይቁ",
    factEtaLabel: "አማካይ የመድረሻ ጊዜ በቀለበት መንገድ ውስጥ",
    fact247: "24/7",
    fact247Label: "የሌሊት ጥሪዎች እንደ ቀን ጥሪዎች ተመሳሳይ ዋጋ አላቸው",
    factYearsLabel: "በከተማው ውስጥ መኪኖችን ሲያድኑ የቆዩ ዓመታት",
    quickTitle: "መኪና ይጠይቁ",
    quickHint: "ሶስት አጭር ደረጃዎች። መለያ አያስፈልግም፣ ቅድሚያ ክፍያ የለም።",
  },
  services: {
    sectionTitle: "ለምን እንደሚደውሉልን",
    sectionLede:
      "አብዛኞቹ ጥሪዎች በሁለት መንገዶች ያበቃሉ፦ በቆሙበት ቦታ ይጠገናል፣ ወይም ተጭኖ እርስዎ ወደሚሉት ጋራዥ ይወሰዳል።",
    priceFromSuffix: "ብር",
    startingPrice: "መነሻ ዋጋ",
    detailsLink: "ዝርዝር",
    otherTitle: "ሌሎች የምናደርጋቸው ነገሮች",
    items: {
      "flatbed-towing": {
        name: "ፍላትቤድ ተሳቢ",
        short: "ዝቅተኛ፣ ቅንጡ እና መንቀሳቀስ ለማይችሉ መኪኖች ሙሉ አካል መጫኛ",
        headline: "በአዲስ አበባ ፍላትቤድ ተሳቢ አገልግሎት",
        description:
          "አራቱም ጎማዎች ከመሬት ይነሳሉ። ዝቅተኛ ማጠፊያ ላላቸው፣ ሁሉንም ጎማ ለሚያንቀሳቅሱ እና መንቀሳቀስ ለማይችሉ መኪኖች በጣም ደህንነቱ የተጠበቀ መንገድ።",
        details: [
          "ሃይድሮሊክ የሚያዘነብል መድረክ፣ በዊንች የሚጫን — ምንም የማንሳት ጉዳት የለም",
          "ለAWD፣ ለ4x4 እና ማርሽ ለተቆለፈባቸው መኪኖች ትክክለኛ",
          "ለስላሳ ማሰሪያዎች በአሎይ ጎማዎች ላይ፣ በአካል ላይ በጭራሽ",
          "ለአውቶሞቢል መደብር እና ጋራዥ እንቅስቃሴዎች ሁለት መኪኖች በአንድ መድረክ",
        ],
      },
      "accident-recovery": {
        name: "የአደጋ እርዳታ",
        short: "የግጭት ቦታዎች፣ የኢንሹራንስ ወረቀት ስራ፣ ደህንነቱ የተጠበቀ ማከማቻ",
        headline: "የአደጋ እና ግጭት እርዳታ",
        description:
          "ቦታውን በፍጥነት እናጸዳለን፣ ለኢንሹራንስዎ መኪናውን ፎቶ እናነሳለን፣ የይገባኛል ጥያቄው እስኪያልቅ ድረስ በጥበቃ ስር እናስቀምጣለን።",
        details: [
          "የቦታ ፎቶዎች እና ጊዜ የተመዘገበበት የሁኔታ ሪፖርት",
          "ከንያላ፣ አዋሽ፣ ኢትዮ ላይፍ እና ሌሎች ኢንሹራንሶች ጋር እንሰራለን",
          "በአጥር የተከበበ፣ በካሜራ የሚጠበቅ ግቢ",
          "ትራፊክ እንደገና እንዲንቀሳቀስ ፍርስራሽ ይጸዳል",
        ],
      },
      "heavy-duty-towing": {
        name: "ከባድ መኪና ተሳቢ",
        short: "ሚኒባሶች፣ ከባድ መኪኖች፣ ማሽነሪ እና ኮንቴይነሮች",
        headline: "ከባድ መኪና ተሳቢ እና የመሳሪያ እንቅስቃሴ",
        description:
          "ለሚኒባሶች፣ ለኢሱዙ ከባድ መኪኖች፣ ለግንባታ መሳሪያዎች እና ለተገለበጡ ጭነቶች የሮቴተር እና ከባድ አዳኝ አቅም።",
        details: [
          "እስከ 25 ቶን ማዳን እና ማቃናት",
          "የተገለበጠ ከባድ መኪና ከጭነት ዝውውር ጋር ማቃናት",
          "ለኤክስካቫተር እና ጄኔሬተር ዝቅተኛ ጫኝ",
          "ከፎቶ ግምገማ በኋላ በስራው መጠን ዋጋ ይሰጣል",
        ],
      },
    },
  },
  steps: {
    sectionTitle: "ከጥሪዎ እስከ ጋራዥዎ",
    sectionLede: "አራት ነገሮች፣ በዚህ ቅደም ተከተል፣ ሁልጊዜ ይከናወናሉ።",
    items: [
      {
        title: "የት እንዳሉ ይንገሩን",
        body: "ይደውሉ፣ ወይም በቴሌግራም ቀጥታ አካባቢዎን ይላኩ። አንድ ምልክት በቂ ነው — 'ቦሌ፣ ከሚሊኒየም አዳራሽ ትይዩ' ከአድራሻ የተሻለ ይሰራል።",
      },
      {
        title: "ዋጋ እና ስም ያግኙ",
        body: "ማዘዣ መኪናው ከመንቀሳቀሱ በፊት የስራውን ዋጋ ይነግርዎታል፣ የአሽከርካሪውን ስም፣ የሰሌዳ ቁጥር እና ስልክ ይልክልዎታል።",
      },
      {
        title: "መኪናውን ይከታተሉ",
        body: "አሽከርካሪው ሲቃረብ አካባቢውን ያካፍላል፣ ስለዚህ በመኪናው ውስጥ ወይም በአቅራቢያ ባለ ካፌ መጠበቅ እንዳለብዎ ያውቃሉ።",
      },
      {
        title: "ከደረሰ በኋላ ይክፈሉ",
        body: "መኪናዎ በፈለጉት ቦታ ከደረሰ በኋላ በጥሬ ገንዘብ፣ በቴሌብር ወይም በሲቢኢ ዝውውር ይክፈሉ። ለኢንሹራንስ ጥያቄዎች ሲጠየቅ ደረሰኝ ይሰጣል።",
      },
    ],
  },
  coverage: {
    sectionTitle: "የምንደርስባቸው ቦታዎች",
    sectionLede:
      "በቀለበት መንገድ ውስጥ ማንኛውም ቦታ፣ እስከ ሞጆ ድረስ ያለው ፍጥነት መንገድ፣ እና በጥያቄ መሰረት የደብረ ዘይት እና የሱሉልታ መንገዶች።",
    etaSuffix: "ደቂቃ",
    items: {
      bole: {
        name: "ቦሌ",
        note: "ሁለት መኪኖች በቦሌ መድሃኒያለም አቅራቢያ ስለሚቆሙ፣ የአውሮፕላን ማረፊያ መንገድ ጥሪዎች አብዛኛውን ጊዜ ፈጣኖቻችን ናቸው።",
      },
      megenagna: {
        name: "መገናኛ",
        note: "በመገናኛ መገናኛ መንገድ ዙሪያ ያለው የሰዓት መጨናነቅ ዋነኛው መዘግየት ነው — በምትኩ በጉርድ ሾላ በኩል እንመራለን።",
      },
      cmc: {
        name: "ሲኤምሲ",
        note: "በሰሚት እና በአያት ውስጥ ወደ ግቢ መግባት ጠባብ ነው፣ ስለዚህ ለእነዚህ ጥሪዎች አጭሩን ፍላትቤድ እንልካለን።",
      },
      piassa: {
        name: "ፒያሳ",
        note: "እዚህ ያሉት ጠባብ የነጠላ አቅጣጫ መንገዶች ከሙሉ መድረክ ይልቅ የጎማ-አንሺ መኪና ይፈልጋሉ።",
      },
      sarbet: {
        name: "ሳርቤት",
        note: "በኤምባሲ አካባቢ ያሉ መንገዶች የመኪና ማቆሚያ ገደቦች አሏቸው — ከመድረሳችን በፊት የሰሌዳ ቁጥር እንፈልጋለን።",
      },
      kality: {
        name: "ቃሊቲ",
        note: "ከባድ መኪና ማዳን በቃሊቲ የተመሰረተ ነው፣ ስለዚህ ትልልቆቹ አዳኝ መኪኖች ወደዚህ ጎን በፍጥነት ይደርሳሉ።",
      },
      "ring-road": {
        name: "ቀለበት መንገድ",
        note: "ከመከላከያው ጀርባ ይቆዩ፣ በጭራሽ ከመኪናው አጠገብ አይሁኑ። በምልክት መብራቶች እና ኮኖች እንደርሳለን።",
      },
      "addis-adama-expressway": {
        name: "አዲስ አበባ–አዳማ ፍጥነት መንገድ",
        note: "ከቱሉ ዲምቱ በኋላ ያለው የፍጥነት መንገድ ማዳን በኪሎሜትር ይከፈላል። የቅርቡን ምልክት ልጥፍ ይንገሩን።",
      },
    },
  },
  pricing: {
    sectionTitle: "ምን ያህል ያስከፍላል",
    p1: "የጥሪ ክፍያው የመጀመሪያዎቹን 10 ኪሎሜትሮች ይሸፍናል። ከዚያ በኋላ በኪሎሜትር 90 ብር ያስከፍላል፣ ከመኪናዎ ካለበት ወደሚፈልጉት ቦታ ይሰላል — ከግቢያችን አይደለም።",
    p2: "ማዘዣ መኪናው ከመንቀሳቀሱ በፊት ሙሉውን ዋጋ በስልክ ይነግርዎታል። ስራው ከገለጹት የተለየ ሆኖ ከተገኘ፣ አሽከርካሪው ከመጫኑ በፊት አዲሱን ዋጋ ይነግርዎታል።",
    payingTitle: "ክፍያ",
    payingP1:
      "መኪናው ከደረሰ በኋላ በጥሬ ገንዘብ፣ በቴሌብር ወይም በሲቢኢ ዝውውር። ምንም ቅድመ ክፍያ አይወሰድም።",
    payingP2:
      "ኢንሹራንስ የሚጠይቁ ከሆነ በመድረሻው ደረሰኝ ይጠይቁ — ለአሽከርካሪው አንድ ደቂቃ ይወስዳል እና በኋላ የሚደረግ ጉዞ ያስቀርልዎታል።",
  },
  safety: {
    sectionTitle: "እኛን በሚጠብቁበት ጊዜ",
    sectionLede: "የብልሽት በጣም አደገኛው ክፍል መኪናው ከመድረሱ በፊት ያሉት ሃያ ደቂቃዎች ናቸው።",
    items: [
      {
        title: "መጀመሪያ የአደጋ መብራት ያብሩ",
        body: "ከሌላው ነገር ሁሉ በፊት። በሌሊት በቀለበት መንገድ ላይ ያለእነሱ አይታዩም።",
      },
      {
        title: "በደህና በኩል ይውጡ",
        body: "ሁሉም ሰው ከትራፊክ ርቆ ባለው በር በኩል ይወጣል፣ ከዚያም ከመከላከያው ጀርባ ይቆማል — ከመኪናው አጠገብ አይደለም።",
      },
      {
        title: "ማስጠንቀቂያ ትሪያንግል 50 ሜትር ወደኋላ",
        body: "በመታጠፊያ ወይም በቁልቁለት ላይ የበለጠ ወደኋላ፣ አሽከርካሪዎች በጊዜ አይተው እንዲርቁ።",
      },
      {
        title: "በመስመሮች ላይ አይግፉ",
        body: "የማይነሳ መኪና በሚንቀሳቀስ መስመር መሃል ላይ ከመሆን ባለበት ቦታ ቢቆይ ደህንነቱ የተጠበቀ ነው።",
      },
    ],
  },
  gallery: {
    sectionTitle: "በስራ ላይ",
    sectionLede:
      "ከከተማው ዙሪያ የተውጣጡ እውነተኛ ማዳኖች — ፍላትቤድ ጭነቶች፣ የሌሊት ጥሪዎች፣ እና አልፎ አልፎ አስቸጋሪ ማዳኖች።",
    openLabel: "ክፈት",
    closeLabel: "ዝጋ",
    prevLabel: "ቀዳሚ",
    nextLabel: "ቀጣይ",
    videoBadge: "ቪዲዮ",
    items: {
      "flatbed-bole": "በቦሌ ውስጥ ሴዳን በፍላትቤድ ሲጫን",
      "breakdown-ring-road": "በቀለበት መንገድ ላይ ከጨለማ በኋላ የብልሽት እርዳታ",
      "accident-cleanup": "የአደጋ ቦታን ማጽዳት እና መኪናውን ማዳን",
      "heavy-kality": "በቃሊቲ ውስጥ ሚኒባስ ከባድ ማዳን",
      "jump-start": "በመንገድ ዳር የደከመ ባትሪ ጃምፕ ስታርት ማድረግ",
      "tire-change": "በመንገድ ዳር የጎማ መቀየሪያ",
      "flatbed-load-video": "ሙሉ የፍላትቤድ መጫኛ ቅደም ተከተል፣ ከመጀመሪያ እስከ መጨረሻ",
    },
  },
  faq: {
    sectionTitle: "ሰዎች የሚጠይቁን ጥያቄዎች",
    items: [
      {
        q: "በአዲስ አበባ ውስጥ ተጎታች መኪና ምን ያህል በፍጥነት ሊደርሰኝ ይችላል?",
        a: "በቀለበት መንገድ ውስጥ በአማካይ 25 ደቂቃ፣ በቦሌ አካባቢ ደግሞ 15 ደቂቃ እንደርሳለን። ከምሽቱ 5 እስከ 7 ያለው ትራፊክ በግምት አስር ደቂቃ ይጨምራል። መኪና ሲጠይቁ የአሽከርካሪውን ስልክ ቁጥር ያገኛሉ፣ ስለዚህ ከመገመት ይልቅ በቀጥታ መደወል ይችላሉ።",
      },
      {
        q: "በአዲስ አበባ ተሳቢ ምን ያህል ያስከፍላል?",
        a: "በከተማ ውስጥ መደበኛ መኪና ተሳቢ ከ2,500 ብር ይጀምራል፣ ይህም የጥሪ ክፍያ እና የመጀመሪያዎቹን 10 ኪ.ሜ ይሸፍናል። ከዚያ በኋላ በኪሎሜትር 90 ብር ነው። ጃምፕ ስታርት 600 ብር፣ የጎማ መቀየሪያ 500 ብር ነው። ዋጋው መኪናው ከመነሳቱ በፊት በስልክ ይስማማል — በመጨረሻ ምንም አስገራሚ ነገር የለም።",
      },
      {
        q: "በሌሊት እና በበዓላት ይሰራሉ?",
        a: "አዎ። ማዘዣ በዓመቱ ውስጥ በሁሉም ሰዓት ሰራተኞች አሉት፣ መስቀል፣ ጥምቀት እና ኢድን ጨምሮ። የሌሊት ጥሪዎች እንደ ቀን ጥሪዎች ተመሳሳይ ዋጋ አላቸው።",
      },
      {
        q: "መኪናዬ ወደሚሄድበት ጋራዥ መምረጥ እችላለሁ?",
        a: "ሁልጊዜ። ጋራዡን ለአሽከርካሪው ይንገሩ እና እኛ እዚያ እንወስደዋለን። ገና ካልወሰኑ፣ አንድ መጠቆም እንችላለን፣ ነገር ግን መኪኖችን ለማምጣት በየትኛውም ጋራዥ አንከፈልም።",
      },
      {
        q: "ፍላትቤድ ዝቅተኛ መኪናዬን ይጎዳል?",
        a: "አይደለም። መድረኩ ወደ መሬት ያዘነብላል፣ መኪናውም በዝቅተኛ አንግል በዊንች ይጫናል፣ ከዚያም በጎማዎቹ ላይ እንጂ በአካሉ ላይ አይታሰርም። በጣም ዝቅተኛ ለሆኑ መኪኖች አንግሉን የበለጠ የሚቀንሱ መጫኛ ራምፖችን እንይዛለን።",
      },
      {
        q: "ተጎታች መኪናውን በምጠብቅበት ጊዜ ምን ማድረግ አለብኝ?",
        a: "የአደጋ መብራትዎን ያብሩ፣ ሁሉንም ሰው ከትራፊክ ርቆ ባለው ጎን ያውጡ፣ ከመኪናው አጠገብ ከመሆን ይልቅ ከመከላከያው ጀርባ ይቁሙ። የማስጠንቀቂያ ትሪያንግልዎን በግምት 50 ሜትር ወደኋላ ያድርጉ። መኪናውን በመስመሮች ላይ ለመግፋት አይሞክሩ።",
      },
      {
        q: "ከአደጋ በኋላ የኢንሹራንስ ወረቀቶችን ያስተናግዳሉ?",
        a: "መኪናውን በቦታው ላይ ፎቶ እናነሳለን፣ ጊዜ የተመዘገበበት የሁኔታ ሪፖርት እንጽፋለን፣ ለእርስዎ እና ለኢንሹራንስ ሰጪዎ እንልካለን። ገምጋሚው እስኪያየው ድረስ መኪናው በተጠበቀው ግቢያችን ውስጥ ሊቆይ ይችላል።",
      },
      {
        q: "የተቆለፈ መሪ ወይም የጠፋ ቁልፍ ያለውን መኪና ማንሳት ይችላሉ?",
        a: "አዎ። ያ የፍላትቤድ ስራ ነው — መኪናው አራቱም ጎማዎች ከመሬት ተነስተው በዊንች ይጫናል፣ ስለዚህ የመሪ መቆለፊያ እና ማርሽ ችግር የለውም።",
      },
    ],
  },
  cta: {
    title: "አሁን መኪና ይፈልጋሉ?",
    sub: "ማዘዣ በዓመቱ ውስጥ በማንኛውም ሰዓት ከሶስት ጥሪ ጩኸት በታች ስልክ ያነሳል።",
  },
  footer: {
    tagline: "24/7 ተሳቢ እና የመንገድ ዳር እርዳታ",
    taglineLine: "{tagline} በ{city} ውስጥ። ማዘዣ በዓመቱ ውስጥ በማንኛውም ሰዓት ይመልሳል።",
    servicesHeading: "አገልግሎቶች",
    areasHeading: "አካባቢዎች",
    findUsHeading: "ያግኙን",
    telegram: "ቴሌግራም",
    openHoursLine: "24 ሰዓት ክፍት፣ የህዝብ በዓላትን ጨምሮ።",
    sinceLine: "© {year} {legalName}። ከ{foundingYear} ጀምሮ በስራ ላይ።",
  },
  actionbar: { call: "ይደውሉ {phone}", request: "መኪና ይጠይቁ" },
  form: {
    stepOf: "ደረጃ {n} ከ{total}",
    stepNames: ["ምን እንደተከሰተ", "የት እንዳሉ", "እንዴት እንደሚደርስዎት"],
    serviceLabel: "ምን ያስፈልግዎታል?",
    servicePlaceholder: "አገልግሎት ይምረጡ",
    notSure: "እርግጠኛ አይደለሁም — እርዱኝ",
    priceFromOption: "ከ{price} ብር ጀምሮ",
    vehicleLabel: "ምን አይነት መኪና ነው የሚነዱት?",
    vehiclePlaceholder: "የመኪና አይነት ይምረጡ",
    vehicleTypes: [
      "ሴዳን / ሃችባክ",
      "ኤስዩቪ / 4x4",
      "ሚኒባስ / ቫን",
      "ፒክአፕ",
      "ከባድ መኪና",
      "ሞተር ሳይክል",
      "ኤሌትሪክ መኪና"
    ],
    locationLabel: "መኪናው የት ነው?",
    locationPlaceholder: "መገናኛ፣ ከዘፍመሽ ግራንድ ሞል ፊት ለፊት",
    locationHelp: "እዚህ ምልክት ከአድራሻ ይሻላል።",
    useGps: "የኔን ጂፒኤስ አካባቢ ይጠቀሙ",
    locating: "እየፈለግንዎ ነው…",
    pinAttached: " ✓ ምልክት ተያይዟል",
    urgencyLabel: "መኪናው እንዴት ነው ያለው?",
    urgencyLevels: [
      { label: "ትራፊክ እያገደ ነው", hint: "ለዚህ ቅድሚያ እንሰጣለን" },
      { label: "ደህንነቱ ያልተጠበቀ ቦታ", hint: "አውራ ጎዳና ወይም መስመር ዳር የለም" },
      { label: "በደህና ቆሟል", hint: "መደበኛ ማዘዣ" },
      { label: "ለኋላ ያስይዙ", hint: "ሰዓት ይምረጡ" },
    ],
    scheduleLabel: "መኪናው መቼ መምጣት አለበት?",
    nameLabel: "ስምዎ",
    phoneLabel: "ስልክ",
    phonePlaceholder: "0911 23 45 67",
    notesLabel: "አሽከርካሪው ማወቅ ያለበት ነገር አለ?",
    notesPlaceholder: "የፊት ጎማ ጎበጥ ብሏል፣ መኪናው በምድር ውስጥ ማቆሚያ ደረጃ 2 ላይ ነው",
    back: "ተመለስ",
    continue: "ቀጥል",
    send: "ጥያቄ ላክ",
    sending: "እየላከ ነው…",
    successTitle: "መኪና እየተመደበ ነው",
    successBody:
      "ማዘዣ ዋጋውን ለማረጋገጥ በሚቀጥሉት ደቂቃዎች ውስጥ ይደውልልዎታል። አሽከርካሪው ከተነሳ በኋላ የሚደርስበት ግምታዊ ጊዜ {eta} ደቂቃ ያህል ነው።",
    callDispatch: "አሁን ማዘዣን ይደውሉ",
    sendAnother: "ሌላ ጥያቄ ላክ",
    compactHint: "ቸኩለዋል? {phone} መደወል ሁልጊዜ ከመተየብ ይፈጥናል።",
    errors: {
      service: "የሚያስፈልግዎትን እርዳታ ይምረጡ።",
      vehicle: "ምን እንደሚነዱ ይንገሩን።",
      location: "አንድ ምልክት በቂ ነው — 'ቦሌ፣ ከኤድና ሞል ትይዩ'።",
      urgency: "መኪናው አሁን እንዴት እንዳለ ይምረጡ።",
      schedule: "ቀን እና ሰዓት ይምረጡ።",
      name: "ለአሽከርካሪው ስም እንፈልጋለን።",
      phone: "የሚሰራ የኢትዮጵያ ስልክ ቁጥር ያስገቡ።",
      locationBlocked: "አካባቢ ተከልክሏል። በምትኩ የቅርቡን ምልክት ይተይቡ።",
      geoUnsupported: "ይህ አሳሽ አካባቢን ማጋራት አይችልም። በምትኩ ምልክት ይተይቡ።",
      submitFailed: "ያንን መላክ አልቻልንም። {phone} ይደውሉ ማዘዣው ዝርዝሩን ይወስዳል።",
    },
  },
} satisfies Dict;

export const dictionaries: Record<Lang, Dict> = { en, am };
export type { Dict, ServiceCopy, AreaCopy, FaqCopy, StepCopy, SafetyCopy };