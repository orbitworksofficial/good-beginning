/**
 * All site content, recovered from the compromised WordPress database
 * (wp-content/ai1wm-backups/gbeginnings-com-20260611-*.wpress -> database.sql).
 * Editing copy here updates it everywhere on the site.
 */

export const site = {
  name: "Good Beginnings",
  tagline: "Child Care and Preschool",
  established: 1999,
  phone: "301-776-6670",
  phoneHref: "tel:+13017766670",
  email: "Gbinfo@gbeginnings.com",
  address: {
    street: "10473 Gorman Road",
    city: "Laurel",
    state: "MD",
    zip: "20723",
    full: "10473 Gorman Road, Laurel, MD 20723",
    note: "Located between I-95 and Route 29 in Howard County",
    landmark: "Directly across from the Columbia Horse Center on Gorman Road",
  },
  hours: {
    weekdays: "7:00 am – 6:00 pm",
    days: "Monday – Friday",
  },
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=10473+Gorman+Road+Laurel+MD+20723",
};

export const nav = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about-us" },
  { label: "Our Program", href: "/our-program" },
  { label: "Enroll", href: "/enroll" },
  { label: "Contact Us", href: "/contact-us" },
];

export const hero = {
  eyebrow: "Welcome to our preschool",
  title: "A day full of discoveries and knowledge",
  body:
    "At Good Beginnings, we encourage each child to reach their potential and secure a solid foundation for success now and in the future.",
  primaryCta: { label: "Enroll Now", href: "/enroll" },
  secondaryCta: { label: "About Us", href: "/about-us" },
};

export const highlights = [
  "Individualized curriculum",
  "Phenomenal teachers",
  "Small class sizes",
  "Wonderful children",
  "Staff devoted to excellence",
];

export const pillars = [
  {
    title: "Curriculum",
    icon: "book",
    items: ["Reading readiness", "Science & Mathematics", "Music & Arts"],
  },
  {
    title: "All-Inclusive",
    icon: "basket",
    items: [
      "All snacks and milk",
      "All elements of our program and curriculum",
      "All school supplies",
    ],
  },
  {
    title: "State & National Standards",
    icon: "shield",
    items: [
      "Aligns with local, state, and federal guidelines",
      "Focus on a variety of subjects",
    ],
  },
  {
    title: "120 Minutes of Active Play",
    icon: "sun",
    items: [
      "Instructor-led physical education class",
      "Outdoor play area with swings and activities designed for active fun",
    ],
  },
];

export const programs = [
  {
    name: "Infant",
    age: "6 weeks to 18 months",
    blurb:
      "Gentle, attentive care for our youngest learners, with plenty of cuddles, tummy time, and early sensory play.",
    image: "/images/insta-4.jpg",
  },
  {
    name: "Toddlers",
    age: "18 months to 36 months",
    blurb:
      "Busy hands and growing vocabularies. Toddlers explore, build, sing, and start learning to play alongside friends.",
    image: "/images/classroom-circle.png",
  },
  {
    name: "Preschool",
    age: "3 to 5 years",
    blurb:
      "Reading readiness, early math, science, and the arts, all delivered through hands-on discovery and creative play.",
    image: "/images/insta-3.jpg",
  },
  {
    name: "Kindergarten",
    age: "Kindergarten readiness",
    blurb:
      "A confident bridge into elementary school, built on milestones, independence, and a genuine love of learning.",
    image: "/images/insta-1.jpg",
  },
  {
    name: "Before & After School",
    age: "School-age care",
    blurb:
      "A warm, supervised place to land before the bell and after dismissal, with homework help and time to unwind.",
    image: "/images/kids-art.jpg",
  },
  {
    name: "Summer Program",
    age: "Seasonal enrollment",
    blurb:
      "Summer days packed with outdoor play, art, water fun, and themed weeks that keep curious minds busy.",
    image: "/images/insta-2.jpg",
  },
];

export const classrooms = [
  {
    name: "Infant Classroom",
    age: "6 weeks to 18 months",
    detail: "Individualized care and a calm, nurturing space.",
  },
  {
    name: "Purple Classroom",
    age: "18 months to 3 years",
    detail: "Nine students and two teachers.",
  },
  {
    name: "Pink Classroom",
    age: "3 to 4 years",
    detail: "Six students, one full-time and one part-time teacher.",
  },
  {
    name: "Blue Classroom",
    age: "4 to 5 years",
    detail: "Nine students, one full-time and one part-time teacher.",
  },
];

export const staff = [
  "Maria Naz",
  "Lahiba Ijaz",
  "Abebaye Abebe",
  "Fatima Diallo",
  "Jayda Stevens",
  "Saadia Khokhar",
];

export const about = {
  heading: "A trusted part of the community since 1999",
  paragraphs: [
    "Located directly across from the Columbia Horse Farm, Good Beginnings has been a trusted part of the community since 1999. We welcome children from 6 months through 5 years, providing a safe, caring, and engaging place to learn, grow, and explore.",
    "Our school is led by two directors, who are also the owners and are actively involved every day. Alongside our dedicated teachers, they share a true passion for nurturing children and creating a supportive environment where families feel at home.",
    "With only thirty students enrolled each year, we combine the resources of a larger center with the personal touch of a close-knit family. We currently have four classrooms, thoughtfully designed to meet each child's developmental stage and prepare them for kindergarten with confidence and joy.",
    "At Good Beginnings, we follow a milestone-based curriculum that supports each child's growth at their own pace, encouraging learning, exploration, and success every step of the way.",
  ],
  stats: [
    { value: "25+", label: "Years serving families" },
    { value: "30", label: "Students each year" },
    { value: "4", label: "Thoughtful classrooms" },
    { value: "6wk–5yr", label: "Ages welcomed" },
  ],
};

export const enrollSteps = [
  {
    step: "01",
    title: "Reach out",
    body:
      "Complete the Initial Interest Form, call us at 301-776-6670, or email Gbinfo@gbeginnings.com to contact us, schedule a tour, and reserve your spot.",
  },
  {
    step: "02",
    title: "Tour & interview",
    body:
      "Bring your Initial Interest Form to your tour, or fill one out when you arrive. The tour, parent interview, and student interview can happen on the same day or on different days — the choice is yours.",
  },
  {
    step: "03",
    title: "Accept your spot",
    body:
      "Once we meet and have your information, we will contact you if we have an opening for your child. You may accept or decline. To secure your spot we ask for a two-week deposit (non-refundable).",
  },
];

export const whyUs = [
  {
    title: "Phenomenal teachers",
    body:
      "We realize that your child is precious and needs many opportunities for growth and discovery. Our teachers are here for every one of them.",
  },
  {
    title: "Small class sizes",
    body:
      "With only thirty students enrolled each year, every child is known by name and supported at their own pace.",
  },
  {
    title: "Milestone-based curriculum",
    body:
      "Reading readiness, science, mathematics, music, and the arts, all aligned with local, state, and federal guidelines.",
  },
  {
    title: "Owner-led, every day",
    body:
      "Our two directors are also the owners, and they are actively involved in the school each and every day.",
  },
];

/** "Our Program" page — what a day at Good Beginnings includes. */
export const ourProgram = {
  eyebrow: "Our program",
  title: "More than a preschool",
  intro:
    "At Good Beginnings, your child's day is filled with more than learning and care. We provide a well-rounded preschool experience designed to nurture the whole child — academically, socially, physically, and creatively.",
  pillars: ["Academically", "Socially", "Physically", "Creatively"],
  groups: [
    {
      id: "learn",
      title: "Learn & Discover",
      body: "A thoughtful, age-appropriate curriculum that turns curiosity into confidence and gets every child ready for kindergarten.",
      image: "/images/ourimages/gb-1.jpeg",
      alt: "A preschooler matching wooden number tiles during a math activity",
      items: [
        { text: "Daily age-appropriate curriculum and learning activities" },
        { text: "Early literacy and storytime" },
        { text: "STEM and science exploration" },
        { text: "Sensory learning" },
        { text: "Hands-on classroom projects" },
        { text: "Gardening and nature exploration" },
        { text: "School-readiness activities" },
        { text: "Fine-motor and creative development" },
        { text: "Social-emotional learning" },
      ],
    },
    {
      id: "move",
      title: "Move & Grow",
      body: "Active bodies build strong minds. Every week is full of music, movement, and time outdoors.",
      image: "/images/ourimages/gb-5.jpeg",
      alt: "Children climbing the dome on the Good Beginnings playground",
      items: [
        { emoji: "⚽", text: "Soccer Days with Coach Jake", note: "Mondays & Thursdays" },
        { emoji: "🎵", text: "Musical Wednesdays with Boogie Bennie" },
        { emoji: "🌳", text: "Daily outdoor play and physical activity" },
        { emoji: "💦", text: "Splash Fridays", note: "During the summer" },
      ],
    },
    {
      id: "create",
      title: "Create & Explore",
      body: "Room to cook, build, perform, and imagine, with plenty of hands-on moments along the way.",
      image: "/images/ourimages/gb-4.jpeg",
      alt: "Children playing shop and doctor together in the classroom",
      items: [
        { emoji: "👩‍🍳", text: "Biweekly cooking classes" },
        { emoji: "🎨", text: "Art and creative expression" },
        { emoji: "🎤", text: "Show & Tell Days" },
        { emoji: "🏪", text: "School Store experiences" },
        { emoji: "✋", text: "Special classroom activities and hands-on experiences" },
      ],
    },
    {
      id: "beyond",
      title: "Experiences Beyond the Classroom",
      body: "Throughout the year, children enjoy special enrichment experiences that bring learning to life.",
      image: "/images/ourimages/gb-2.jpeg",
      alt: "Children in Halloween costumes celebrating outside the school",
      items: [
        { emoji: "✨", text: "Magic shows" },
        { emoji: "🐐", text: "Petting zoos" },
        { emoji: "🚌", text: "Field trips" },
        { emoji: "👋", text: "Special visitors and interactive experiences" },
        { emoji: "🍂", text: "Seasonal activities and celebrations" },
        { emoji: "🎪", text: "A variety of festivals and special events" },
        { emoji: "🎉", text: "And much more!" },
      ],
    },
  ],
  families: {
    title: "Families are part of the journey",
    body: "We believe children thrive when their families and teachers work together.",
    items: [
      {
        emoji: "❤️",
        title: "Monthly parent involvement",
        body: "Regular opportunities every month to join in and be part of your child's classroom.",
      },
      {
        emoji: "📝",
        title: "Parent-teacher conferences",
        body: "Twice a year we sit down together to talk about your child's growth and next steps.",
      },
      {
        emoji: "📱",
        title: "Brightwheel family connection",
        body: "Daily communication, photos, videos, classroom updates, learning activities, and easy parent-teacher messaging.",
      },
    ],
  },
  closing: {
    title: "A preschool experience that keeps growing",
    paragraphs: [
      "At Good Beginnings, we want every child to leave each day having learned something new, tried something different, created something special, or made a meaningful connection.",
      "Because preschool should be more than somewhere your child goes each day — it should be a place where they learn, explore, grow, and make memories.",
    ],
  },
};
