export const BUSINESS_INFO = {
  name: "Perry's Grillz",
  legalName: "Perry's Grillz Restaurant",
  tagline: "Authentic Creole Grill & Hillside Open-Air Dining with Panoramic Seychelles Ocean Views",
  locationName: "Les Canelles Hilltop",
  address: {
    street: "Les Canelles Rd",
    suite: "Hilltop Terrace",
    city: "Mahé",
    state: "Anse Royale District",
    zip: "Seychelles",
    country: "Seychelles",
    formatted: "Les Canelles Rd, Mahé, Seychelles",
  },
  phone: "+248 2 527 260",
  secondaryPhone: "+248 2 527 260",
  conciergePhone: "+248 2 527 260",
  website: "perrysgrillz.restaurants-info.com",
  email: "reservations@perrysgrillz.com",
  googleMapsLink: "https://maps.google.com/?q=Perry's+Grillz+Les+Canelles+Rd+Mahe+Seychelles",
  googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3976.184337415663!2d55.5067468!3d-4.7380124!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x231e2b2945d1f291%3A0x6d120762b71d749b!2sPerry&#39;s%20Grillz!5e0!3m2!1sen!2s!4v1755720986076!5m2!1sen!2s",
  
  hours: [
    { day: "Monday", open: "12:00 PM", close: "9:00 PM", note: "Lunch & Sunset Grill Dinner" },
    { day: "Tuesday", open: "9:00 AM", close: "9:00 PM", note: "Morning Coffee, Lunch & Dinner" },
    { day: "Wednesday", open: "Closed", close: "Closed", note: "Rest Day & Ocean Fishery Harvest" },
    { day: "Thursday", open: "12:00 PM", close: "9:00 PM", note: "Lunch & Sunset Grill Dinner" },
    { day: "Friday", open: "12:00 PM", close: "9:00 PM", note: "Creole Feast & Sunset Cocktails" },
    { day: "Saturday", open: "12:00 PM", close: "9:00 PM", note: "Weekend Hillside BBQ & Cocktails" },
    { day: "Sunday", open: "12:00 PM", close: "9:00 PM", note: "Family Sunday Feast & Ocean Views" },
  ],

  history: [
    {
      year: "Origins",
      title: "Family Roots in Mahé",
      description: "Founded by Perry and his mother as an authentic family kitchen nestled along the scenic Les Canelles mountain road overlooking southern Mahé."
    },
    {
      year: "Tradition",
      title: "Wood-Fired Creole Grilling",
      description: "Pioneering dock-to-mountain fresh seafood grilling, preparing daily caught red snapper, jobfish, and octopus over seasoned flames with aromatic island herbs."
    },
    {
      year: "Hospitality",
      title: "The Island Guest Shuttle",
      description: "Famous for legendary island hospitality, including complimentary hotel pick-up service for guests navigating the scenic mountain ascent."
    },
    {
      year: "Today",
      title: "Seychelles' Must-Visit Hillside Gem",
      description: "Praised by international travelers and Seychelles locals alike for stunning tropical panoramic views, mouthwatering seafood platters, and heartfelt family hospitality."
    }
  ],

  executiveChef: {
    name: "Perry & The Family",
    role: "Proprietor & Master Pitmaster",
    quote: "Cooking in Seychelles is all about heart, fresh catch, and welcoming people like family. From our spicy grilled octopus to the slow-simmered pumpkin curry and ice-cold fresh coconuts, we invite you to sit above the canopy and savor authentic island life.",
    credentials: "Creole Culinary Master • Family-Owned Seychelles Kitchen • Local Sustainable Seafood Champion"
  },

  reviews: [
    {
      author: "Hanna Bakirova",
      location: "International Traveler",
      source: "Verified Guest Review",
      rating: 5,
      date: "Recent Review",
      comment: "The road up there is quite a climb, but it’s absolutely worth it! For the first time during our entire trip, we had a truly delicious and diverse meal. There’s something for both meat lovers and vegans — everything was so tasty, and the presentation was on another level. The view is pure happiness and a wonderful bonus to the meal. Service is fast and very welcoming."
    },
    {
      author: "Maxence Beaumont",
      location: "France",
      source: "Verified Guest Review",
      rating: 5,
      date: "Recent Review",
      comment: "We loved Perry’s family, he is such a nice gentleman, his mother also and all the team. They are very welcoming and warm. We loved the food, it was so good, also veggie options. Felt like a family dinner. Must go if you feel like eating amazing local food at a fair price! They even picked us up at the hotel."
    },
    {
      author: "Lyndsay Smith",
      location: "United Kingdom",
      source: "Concierge Recommendation",
      rating: 5,
      date: "Recent Review",
      comment: "This wonderful place was recommended to us by our hotel concierge. We were greeted warmly by Perry and his family. The view was gorgeous and the food was outstanding, super fresh and cooked to perfection. I had the mixed seafood grill and my partner had the red snapper with fried rice. Cannot fault it. Thank you for your kind hospitality!"
    },
    {
      author: "David & Elena Kovacs",
      location: "Travelers in Mahé",
      source: "Google Review",
      rating: 5,
      date: "Recent Review",
      comment: "Sitting atop the mountain on the open terrace with a cold fresh coconut, savoring grilled octopus and garlic prawns while the ocean breeze rolls in. Perry's warmth and hospitality made this the undisputed highlight of our Seychelles vacation."
    }
  ]
};

export const isOpenNow = () => {
  const now = new Date();
  const day = now.getDay(); // 0 = Sun, 1 = Mon, ..., 6 = Sat
  const hour = now.getHours();
  const minutes = now.getMinutes();
  const time = hour + minutes / 60;

  if (day === 3) { // Wednesday Closed
    return false;
  }
  if (day === 2) { // Tuesday 09:00 - 21:00
    return time >= 9 && time < 21;
  }
  // Monday, Thursday, Friday, Saturday, Sunday: 12:00 - 21:00
  return time >= 12 && time < 21;
};
