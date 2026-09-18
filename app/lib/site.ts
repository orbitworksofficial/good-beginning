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
  email: "info@gbeginnings.com",
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
  { label: "Programs", href: "/#programs" },
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
    color: "periwinkle",
  },
  {
    name: "Toddlers",
    age: "18 months to 36 months",
    blurb:
      "Busy hands and growing vocabularies. Toddlers explore, build, sing, and start learning to play alongside friends.",
    image: "/images/classroom-circle.png",
    color: "coral",
  },
  {
    name: "Preschool",
    age: "3 to 5 years",
    blurb:
      "Reading readiness, early math, science, and the arts, all delivered through hands-on discovery and creative play.",
    image: "/images/insta-3.jpg",
    color: "sky",
  },
  {
    name: "Kindergarten",
    age: "Kindergarten readiness",
    blurb:
      "A confident bridge into elementary school, built on milestones, independence, and a genuine love of learning.",
    image: "/images/insta-1.jpg",
    color: "leaf",
  },
  {
    name: "Before & After School",
    age: "School-age care",
    blurb:
      "A warm, supervised place to land before the bell and after dismissal, with homework help and time to unwind.",
    image: "/images/classroom-hands.jpg",
    color: "coral",
  },
  {
    name: "Summer Program",
    age: "Seasonal enrollment",
    blurb:
      "Summer days packed with outdoor play, art, water fun, and themed weeks that keep curious minds busy.",
    image: "/images/insta-2.jpg",
    color: "periwinkle",
  },
];

export const classrooms = [
  {
    name: "Infant Classroom",
    age: "6 weeks to 18 months",
    detail: "Individualized care and a calm, nurturing space.",
    swatch: "bg-jade",
  },
  {
    name: "Purple Classroom",
    age: "18 months to 3 years",
    detail: "Nine students and two teachers.",
    swatch: "bg-berry",
  },
  {
    name: "Pink Classroom",
    age: "3 to 4 years",
    detail: "Six students, one full-time and one part-time teacher.",
    swatch: "bg-bubblegum",
  },
  {
    name: "Blue Classroom",
    age: "4 to 5 years",
    detail: "Nine students, one full-time and one part-time teacher.",
    swatch: "bg-periwinkle",
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
      "Complete the Initial Interest Form, call us at 301-776-6670, or email info@gbeginnings.com to contact us, schedule a tour, and reserve your spot.",
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
