/**
 * Everything editable about the business lives here.
 * Change these values and the whole site — pages, metadata, sitemap —
 * updates with them.
 */

export const site = {
  name: "Addis Tow",
  legalName: "Addis Tow Recovery PLC",
  tagline: "24/7 towing and roadside recovery",
  description:
    "Flatbed towing, accident recovery, jump starts and roadside help across Addis Ababa. Call or send your location and a truck is on the way.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://addistow.com",
  phone: "+251900628080",
  phoneDisplay: " 0900 62 80 80",
  alternetePhone: " 0906 05 04 03",
  telegram: "https://t.me/addistow",
  email: "dispatch@addistow.com",
  address: {
    street: "Bole Road, Behind Getu Commercial Center",
    city: "Addis Ababa",
    region: "Addis Ababa",
    country: "ET",
    postalCode: "1000",
  },
  geo: { lat: 8.9806, lng: 38.7578 },
  hours: "Mo-Su 00:00-23:59",
  foundingYear: 2019,
  responseMinutes: 25,
  trucks: 14,
  locale: "en_ET",
} as const;

export type Service = {
  slug: string;
  name: string;
  short: string;
  headline: string;
  description: string;
  priceFrom: number;
  details: string[];
  glyph: "flatbed" | "hook" | "crash" | "battery" | "tire" | "fuel" | "key" | "heavy";
};

export const services: Service[] = [
  {
    slug: "flatbed-towing",
    name: "Flatbed towing",
    short: "Full-body loading for low, luxury and non-rolling cars",
    headline: "Flatbed towing in Addis Ababa",
    description:
      "All four wheels off the ground. The safest way to move low-clearance cars, all-wheel-drive cars, and any vehicle that can no longer roll.",
    priceFrom: 2500,
    glyph: "flatbed",
    details: [
      "Hydraulic tilt bed, winch-loaded — no lifting damage",
      "Correct for AWD, 4x4 and cars with a locked gearbox",
      "Soft straps on alloy wheels, never on the body",
      "Two cars on one bed for dealership and garage moves",
    ],
  },
  {
    slug: "accident-recovery",
    name: "Accident recovery",
    short: "Collision scenes, insurance paperwork, secure storage",
    headline: "Accident and collision recovery",
    description:
      "We clear the scene quickly, photograph the vehicle for your insurer, and store it under guard until the claim is settled.",
    priceFrom: 3000,
    glyph: "crash",
    details: [
      "Scene photographs and a timestamped condition report",
      "Works with Nyala, Awash, Ethio Life and other insurers",
      "Fenced, guarded yard with CCTV",
      "Debris cleared so traffic can move again",
    ],
  },
  {
    slug: "heavy-duty-towing",
    name: "Heavy duty towing",
    short: "Minibuses, trucks, machinery and containers",
    headline: "Heavy duty towing and equipment moves",
    description:
      "Rotator and heavy wrecker capacity for minibuses, Isuzu trucks, construction plant and overturned loads.",
    priceFrom: 8000,
    glyph: "heavy",
    details: [
      "Up to 25 tonnes recovered and righted",
      "Overturned truck uprighting with load transfer",
      "Low-loader for excavators and generators",
      "Quoted per job after a photo assessment",
    ],
  },
];

export type Area = {
  slug: string;
  name: string;
  nearby: string[];
  note: string;
  eta: number;
};

export const areas: Area[] = [
  {
    slug: "bole",
    name: "Bole",
    nearby: ["Bole Medhanialem", "Atlas", "Rwanda", "Bole Airport", "Alem Bank"],
    note: "Two trucks stage near Bole Medhanialem, so airport-road call-outs are usually our fastest.",
    eta: 15,
  },
  {
    slug: "megenagna",
    name: "Megenagna",
    nearby: ["Gurd Shola", "Hayahulet", "Wollo Sefer", "CMC"],
    note: "Peak-hour traffic around the Megenagna interchange is the main delay — we route via Gurd Shola instead.",
    eta: 20,
  },
  {
    slug: "cmc",
    name: "CMC",
    nearby: ["Summit", "Ayat", "Semit", "Kotebe"],
    note: "Compound access is tight in Summit and Ayat, so we send the shorter flatbed for these calls.",
    eta: 25,
  },
  {
    slug: "piassa",
    name: "Piassa",
    nearby: ["Arat Kilo", "Sidist Kilo", "Merkato", "Lideta"],
    note: "Narrow one-way streets here need a wheel-lift truck rather than a full bed.",
    eta: 25,
  },
  {
    slug: "sarbet",
    name: "Sarbet",
    nearby: ["Mexico", "Old Airport", "Torhailoch", "Jemo"],
    note: "Embassy-area streets have parking restrictions — we need a plate number before arrival.",
    eta: 20,
  },
  {
    slug: "kality",
    name: "Kality",
    nearby: ["Saris", "Lebu", "Akaki", "Gotera"],
    note: "Heavy-truck recovery is based out of Kality, so the big wreckers reach this side quickest.",
    eta: 22,
  },
  {
    slug: "ring-road",
    name: "Ring Road",
    nearby: ["Gotera interchange", "Kera", "Bole Bridge", "Winget"],
    note: "Stay behind the barrier, never beside the car. We arrive with beacons and cones.",
    eta: 18,
  },
  {
    slug: "addis-adama-expressway",
    name: "Addis–Adama Expressway",
    nearby: ["Tulu Dimtu", "Dukem", "Bishoftu", "Mojo"],
    note: "Expressway recovery is charged per kilometre past Tulu Dimtu. Give us the nearest marker post.",
    eta: 40,
  },
];

export const faqs = [
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
];

export const steps = [
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
];

export const vehicleTypes = [
  "Sedan / hatchback",
  "SUV / 4x4",
  "Minibus / van",
  "Pickup",
  "Truck / heavy",
  "Motorcycle",
  "Electric Cars"
] as const;

export const urgencyLevels = [
  { value: "blocking-traffic", label: "Blocking traffic", hint: "We prioritise this" },
  { value: "unsafe", label: "Unsafe spot", hint: "Highway or no shoulder" },
  { value: "safe", label: "Safely parked", hint: "Standard dispatch" },
  { value: "scheduled", label: "Schedule for later", hint: "Pick a time" },
] as const;