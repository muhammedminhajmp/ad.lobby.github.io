/* ===== EDIT SITE DETAILS, SERVICES AND PROJECTS HERE ===== */
const SITE = {
  name: "ad.lobby",                       // shown in capitals
  email: "adlobbyofficial@gmail.com",
  instagram: "ad.lobbby",                 // handle only (check spelling)
  whatsapp: "919143242220",               // country code + number, no + or spaces
  phoneDisplay: "+91 91432 42220",
  youtube: "",                            // full URL, "" hides it
  formEndpoint: "",                       // optional: Formspree URL. Empty = WhatsApp fallback
  introVideo: "videos/adlobby-introduction.mp4",
  introPoster: "images/adlobby-introduction-poster.jpg",
  videoFallback: "Introduction video coming soon."
};

const services = [
  { id: "cinematic", no: "01", title: "CINEMATIC VIDEO",
    short: "Story-driven visuals designed to give your brand a stronger presence.",
    desc: "Visual stories designed to give your brand a stronger presence.",
    items: ["Brand Films", "Product Videos", "Commercials", "Event Films", "Storytelling Videos"],
    preview: "images/service-video.jpg", image: "images/services-cinematic.jpg" },
  { id: "reels", no: "02", title: "REELS & SHORT-FORM",
    short: "Engaging content built to capture attention on social platforms.",
    desc: "Fast, engaging content designed for modern social platforms.",
    items: ["Instagram Reels", "Promotional Reels", "Product Reels", "Social Media Content", "Motion Graphics"],
    preview: "images/service-reels.jpg", image: "images/services-reels.jpg" },
  { id: "design", no: "03", title: "VISUAL DESIGN",
    short: "Posters, campaign creatives and motion graphics that communicate clearly.",
    desc: "Visual communication that makes your brand look as good as it feels.",
    items: ["Posters", "Social Media Creatives", "Campaign Designs", "Branding", "Motion Graphics"],
    preview: "images/service-design.jpg", image: "images/services-design.jpg" }
];

/* category must be: cinematic | reels | posters. Add a project = add an object. sample:true shows a SAMPLE tag. */
const projects = [
  { id: "cafe-campaigns", title: "Café Campaigns", category: "reels", categoryLabel: "Reels",
    description: "Short-form campaign content created for café brands.", thumbnail: "images/work-cafe-campaigns.jpg",
    featured: true, sample: true, client: "", services: ["Video Production", "Short-Form Content"], video: "", gallery: [] },
  { id: "brand-film", title: "Brand Film", category: "cinematic", categoryLabel: "Cinematic Videos",
    description: "A cinematic visual story for a brand.", thumbnail: "images/work-brand-film.jpg",
    featured: true, sample: true, client: "", services: ["Cinematic Video"], video: "videos/brand-film.mp4", gallery: [] },
  { id: "campaign-poster", title: "Campaign Design", category: "posters", categoryLabel: "Posters",
    description: "A visual campaign concept.", thumbnail: "images/work-poster.jpg",
    featured: true, sample: true, client: "", services: ["Poster Design"], video: "", gallery: [] },
  { id: "product-reel", title: "Product Reel", category: "reels", categoryLabel: "Reels",
    description: "A promotional reel showcasing a product.", thumbnail: "images/work-product-reel.jpg",
    featured: false, sample: true, client: "", services: ["Product Reels"], video: "", gallery: [] },
  { id: "event-film", title: "Event Film", category: "cinematic", categoryLabel: "Cinematic Videos",
    description: "Highlights of a live event, told as a film.", thumbnail: "images/work-event-film.jpg",
    featured: false, sample: true, client: "", services: ["Event Films"], video: "", gallery: [] }
];

const principles = [
  ["CREATIVITY", "Fresh ideas, always."], ["QUALITY", "Every frame matters."],
  ["STORY", "Content with something to say."], ["IMPACT", "Creative work built around brand goals."]
];
