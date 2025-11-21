export const carouselData = [
  {
    id: "1",
    image: require("@/assets/images/add_1.jpeg"),
  },
  {
    id: "2",
    image: require("@/assets/images/add_2.jpeg"),
  },
  {
    id: "3",
    image: require("@/assets/images/add_3.jpeg"),
  },
  {
    id: "4",
    image: require("@/assets/images/add_4.jpeg"),
  },
];

export const testCategories = [
  {
    id: "1",
    title: "Blood Tests",
    tests: [
      {
        name: "Complete Blood Count (CBC)",
        desc: "Complete hemogram test",
        price: "₹250",
      },
      {
        name: "Lipid Profile",
        desc: "Cholesterol & triglycerides",
        price: "₹450",
      },
      {
        name: "Liver Function Test (LFT)",
        desc: "Liver health markers",
        price: "₹380",
      },
      {
        name: "Kidney Function Test (KFT)",
        desc: "Renal function markers",
        price: "₹350",
      },
      {
        name: "Thyroid Profile (T3, T4, TSH)",
        desc: "Thyroid hormone levels",
        price: "₹550",
      },
      {
        name: "Fasting Blood Sugar (FBS)",
        desc: "Blood glucose test",
        price: "₹80",
      },
      {
        name: "HbA1c (Glycated Hemoglobin)",
        desc: "3-month diabetes control",
        price: "₹350",
      },
      {
        name: "Iron Studies",
        desc: "Serum iron, TIBC, ferritin",
        price: "₹650",
      },
      { name: "Vitamin D (25-OH)", desc: "Vitamin D levels", price: "₹850" },
      { name: "Vitamin B12", desc: "B12 levels", price: "₹650" },
      { name: "Uric Acid", desc: "Gout marker", price: "₹250" },
      {
        name: "CRP (C-Reactive Protein)",
        desc: "Inflammation marker",
        price: "₹350",
      },
      { name: "ESR (Sed Rate)", desc: "Inflammation test", price: "₹100" },
      { name: "SGOT/SGPT", desc: "Liver enzymes", price: "₹250" },
      { name: "Serum Creatinine", desc: "Kidney function", price: "₹150" },
      {
        name: "Blood Urea Nitrogen (BUN)",
        desc: "Kidney function",
        price: "₹150",
      },
    ],
  },

  {
    id: "2",
    title: "Cardiac Tests",
    tests: [
      { name: "Troponin I", desc: "Heart attack marker", price: "₹950" },
      { name: "CPK-MB", desc: "Cardiac enzyme test", price: "₹450" },
      { name: "Homocysteine", desc: "Heart disease marker", price: "₹1200" },
    ],
  },

  {
    id: "3",
    title: "Hormone Tests",
    tests: [
      { name: "Testosterone (Total)", desc: "Male hormone", price: "₹550" },
      { name: "Estradiol (E2)", desc: "Female hormone", price: "₹600" },
      { name: "Cortisol", desc: "Stress hormone", price: "₹550" },
      { name: "Prolactin", desc: "Reproductive hormone", price: "₹500" },
    ],
  },

  {
    id: "4",
    title: "Infection Tests",
    tests: [
      {
        name: "Dengue NS1 Antigen",
        desc: "Early dengue detection",
        price: "₹650",
      },
      { name: "Malaria Antigen", desc: "Malaria parasite test", price: "₹350" },
      { name: "Typhoid IgM", desc: "Typhoid fever test", price: "₹450" },
      { name: "COVID-19 RT-PCR", desc: "Coronavirus detection", price: "₹500" },
    ],
  },

  {
    id: "5",
    title: "Cancer Markers",
    tests: [
      { name: "CA 19-9", desc: "Tumor marker", price: "₹1350" },
      {
        name: "PSA (Prostate)",
        desc: "Prostate cancer screening",
        price: "₹750",
      },
      { name: "CEA (Carcinoembryonic)", desc: "Cancer marker", price: "₹950" },
    ],
  },
];

export const healthPackages = [
  {
    id: "basic-checkup",
    name: "Basic Health Checkup",
    subtitle: "Essential tests for routine health monitoring",
    price: "₹999",
    originalPrice: "₹1380",
    savingsText: "Save ₹381 (28% OFF)",
    popular: true,
    tests: [
      "Complete Blood Count (CBC)",
      "Liver Function Test (LFT)",
      "Kidney Function Test (KFT)",
      "Fasting Blood Sugar (FBS)",
      "+ 1 more tests",
    ],
  },
  {
    id: "diabetes-care",
    name: "Diabetes Care Package",
    subtitle: "Comprehensive diabetes screening & monitoring",
    price: "₹1299",
    originalPrice: "₹1760",
    savingsText: "Save ₹461 (26% OFF)",
    popular: true,
    tests: [
      "Complete Blood Count (CBC)",
      "Fasting Blood Sugar (FBS)",
      "HbA1c (Glycated Hemoglobin)",
      "Liver Function Test (LFT)",
      "+ 2 more tests",
    ],
  },
  {
    id: "heart-health",
    name: "Heart Health Package",
    subtitle: "Complete cardiac risk assessment",
    price: "₹2499",
    originalPrice: "₹4350",
    savingsText: "Save ₹1851 (43% OFF)",
    popular: true,
    tests: [
      "Complete Blood Count (CBC)",
      "Lipid Profile",
      "HbA1c (Glycated Hemoglobin)",
      "Troponin I",
      "+ 3 more tests",
    ],
  },
  {
    id: "womens-wellness",
    name: "Women's Wellness Package",
    subtitle: "Specialized health tests for women",
    price: "₹2799",
    originalPrice: "₹4200",
    savingsText: "Save ₹1401 (33% OFF)",
    popular: false,
    tests: [
      "Complete Blood Count (CBC)",
      "Thyroid Profile (T3, T4, TSH)",
      "Vitamin D (25-OH)",
      "Vitamin B12",
      "+ 3 more tests",
    ],
  },
  {
    id: "mens-health",
    name: "Men's Health Package",
    subtitle: "Comprehensive men's health screening",
    price: "₹2999",
    originalPrice: "₹4350",
    savingsText: "Save ₹1351 (31% OFF)",
    popular: false,
    tests: [
      "Complete Blood Count (CBC)",
      "Lipid Profile",
      "Thyroid Profile (T3, T4, TSH)",
      "Testosterone (Total)",
      "+ 3 more tests",
    ],
  },

  {
    id: "fever-panel",
    name: "Fever Panel",
    subtitle: "Common infection screening",
    price: "₹1599",
    originalPrice: "₹2050",
    savingsText: "Save ₹451 (22% OFF)",
    popular: true,
    tests: [
      "Complete Blood Count (CBC)",
      "Dengue NS1 Antigen",
      "Malaria Antigen",
      "Typhoid IgM",
      "+ 1 more tests",
    ],
  },
];
