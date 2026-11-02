import { Camera, Clapperboard, Mic, Music, Palette } from "lucide-react";

export const studioCategories = [
  {
    value: "Photo Studio",
    label: "Photo Studios",
    description: "Cyc walls, daylight lofts and strobe-ready sets",
    icon: Camera,
  },
  {
    value: "Film Stage",
    label: "Sound Stages",
    description: "Soundproof stages with grids, power and green rooms",
    icon: Clapperboard,
  },
  {
    value: "Podcast Lounge",
    label: "Podcast Rooms",
    description: "Treated rooms with broadcast mics and video capture",
    icon: Mic,
  },
  {
    value: "Music Suite",
    label: "Music Suites",
    description: "Live rooms, vocal booths and analog control rooms",
    icon: Music,
  },
  {
    value: "Workshop",
    label: "Art Workshops",
    description: "Skylit spaces for painting, ceramics and craft classes",
    icon: Palette,
  },
];

export const categoryValues = studioCategories.map((item) => item.value);

export const suggestedAmenities = [
  "High-Speed Wi-Fi",
  "Air Conditioning",
  "Soundproofing",
  "Lighting Kit",
  "Green Screen",
  "Makeup Station",
  "Free Parking",
  "Loading Dock",
  "Kitchenette",
  "Restroom",
  "Props Library",
  "Client Lounge",
];

export const timeOptions = Array.from({ length: 36 }, (_, index) => {
  const minutes = 6 * 60 + index * 30;
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  return `${String(hours).padStart(2, "0")}:${String(rest).padStart(2, "0")}`;
});

export const heroSlides = [
  {
    image:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=2000&q=80",
    eyebrow: "Photo Studios",
    title: "Shoot in spaces built for the frame",
    text: "Cyc walls, daylight lofts and fully lit sets, ready for your next campaign by the hour.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=2000&q=80",
    eyebrow: "Music & Podcast",
    title: "Record where every take sounds right",
    text: "Treated rooms, vocal booths and broadcast desks from hosts who care about your sound.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=2000&q=80",
    eyebrow: "Film Stages",
    title: "Roll camera on a stage of your own",
    text: "Book soundproof stages with power, grids and green rooms without the long-term lease.",
  },
];
