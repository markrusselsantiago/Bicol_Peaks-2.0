const PROVINCES = ['Albay', 'Camarines Norte', 'Camarines Sur', 'Catanduanes', 'Masbate', 'Sorsogon'];

const DESTINATIONS = [
  {
    id: 1,
    name: "Mayon Volcano",
    province: "Albay",
    regionCode: "Albay",
    type: "Volcano",
    difficulty: "Check Local Advisories",
    elevation: "About 2,463 meters",
    description: "Mayon Volcano is famous for its near-symmetrical cone. Check PHIVOLCS alerts and local access restrictions before visiting.",
    image: "images/mayon-volcano.jpg"
  },
  {
    id: 2,
    name: "Mount Malinao",
    province: "Albay",
    regionCode: "Albay",
    type: "Mountain",
    difficulty: "Check Local Trail Conditions",
    elevation: "About 1,548 meters",
    description: "Mount Malinao is a forested volcanic mountain in Albay. Check local trail conditions before planning a visit.",
    image: "images/mount-malinao.jpg"
  },
  {
    id: 3,
    name: "Mount Masaraga",
    province: "Albay",
    regionCode: "Albay",
    type: "Mountain",
    difficulty: "Moderate to Hard",
    elevation: "About 1,328 meters",
    description: "Mount Masaraga is a prominent peak in Albay near the Mayon volcanic landscape.",
    image: "images/Mount_Masaraga.jpg"
  },
  {
    id: 4,
    name: "Mount Catburawan",
    province: "Albay",
    regionCode: "Albay",
    type: "Mountain",
    difficulty: "Check Local Trail Conditions",
    elevation: "Elevation not confirmed",
    description: "Mount Catburawan is included in this Bicol mountain directory. Confirm the local name, trail, and access information before visiting.",
    image: "images/mount-catburawan.jpg"
  },
  {
    id: 5,
    name: "Pocdol Mountains",
    province: "Sorsogon / Albay",
    regionCode: "Sorsogon",
    type: "Mountain Range",
    difficulty: "Check Local Trail Conditions",
    elevation: "Mountain range",
    description: "The Pocdol Mountains are in the Albay–Sorsogon area. This entry is grouped under Sorsogon for province filtering.",
    image: "images/Mountain-Pocdol.jpg"
  },
  {
    id: 6,
    name: "Bulusan Volcano",
    province: "Sorsogon",
    regionCode: "Sorsogon",
    type: "Volcano",
    difficulty: "Check Local Advisories",
    elevation: "About 1,565 meters",
    description: "Bulusan Volcano is surrounded by lush landscapes. Check official volcanic alerts and local restrictions before visiting.",
    image: "images/bulusan-volcano.jpg"
  },
  {
    id: 7,
    name: "Mount Isarog",
    province: "Camarines Sur",
    regionCode: "Camarines Sur",
    type: "Mountain",
    difficulty: "Moderate to Hard",
    elevation: "About 1,966 meters",
    description: "Mount Isarog is a forested volcanic mountain in Camarines Sur known for its biodiversity and protected natural areas.",
    image: "images/mount-isarog.jpg"
  },
  {
    id: 8,
    name: "Mount Iriga (Mount Asog)",
    province: "Camarines Sur",
    regionCode: "Camarines Sur",
    type: "Volcano",
    difficulty: "Check Local Advisories",
    elevation: "About 1,196 meters",
    description: "Mount Iriga, also called Mount Asog, is a volcanic peak near Iriga City. Check local advisories before visiting.",
    image: "images/Mount-Asog.jpg"
  },
  {
    id: 9,
    name: "Mount Labo",
    province: "Camarines Norte",
    regionCode: "Camarines Norte",
    type: "Mountain",
    difficulty: "Hard",
    elevation: "About 1,514 meters",
    description: "Mount Labo is a major mountain in Camarines Norte with forested slopes and a challenging natural environment.",
    image: "images/mount-labo.jpg"
  },
  {
    id: 10,
    name: "Mount Bagacay",
    province: "Camarines Norte",
    regionCode: "Camarines Norte",
    type: "Mountain",
    difficulty: "Check Local Trail Conditions",
    elevation: "About 775 meters",
    description: "Mount Bagacay is listed among the peaks of Camarines Norte. Confirm current trail access with local authorities.",
    image: "images/mount-bagacay.jpg"
  },
  {
    id: 11,
    name: "Mount Cadig",
    province: "Camarines Norte",
    regionCode: "Camarines Norte",
    type: "Mountain",
    difficulty: "Check Local Trail Conditions",
    elevation: "About 726 meters",
    description: "Mount Cadig is near the Camarines Norte–Quezon border. Confirm the route and local access before planning a hike.",
    image: "images/mount-cadig.webp"
  },
  {
    id: 12,
    name: "Mount Culasi",
    province: "Camarines Norte",
    regionCode: "Camarines Norte",
    type: "Mountain",
    difficulty: "Check Local Trail Conditions",
    elevation: "About 387 meters",
    description: "Mount Culasi is a listed peak in Camarines Norte. Verify the local trail and access information before visiting.",
    image: "images/mount-culasi.jpg"
  },
  {
    id: 13,
    name: "Mount Sagnay",
    province: "Camarines Sur",
    regionCode: "Camarines Sur",
    type: "Mountain",
    difficulty: "Check Local Trail Conditions",
    elevation: "Elevation not confirmed",
    description: "Mount Sagnay is included in the supplied list of Bicol peaks. Check local guidance for its exact route and access.",
    image: "images/mount-sagnay.webp"
  },
  {
    id: 14,
    name: "Mount Cone",
    province: "Camarines Norte",
    regionCode: "Camarines Norte",
    type: "Mountain",
    difficulty: "Check Local Trail Conditions",
    elevation: "About 959 meters",
    description: "Mount Cone, also known as Culasi Peak, is listed in Camarines Norte.",
    image: "images/mount-cone.jpg"
  },
  {
    id: 15,
    name: "Mount Juban",
    province: "Sorsogon",
    regionCode: "Sorsogon",
    type: "Volcano",
    difficulty: "Check Local Advisories",
    elevation: "About 844 meters",
    description: "Mount Juban, also called Juban Volcano, is a volcanic peak in Sorsogon. Check local advisories before visiting.",
    image: "images/mount-juban.jpg"
  },
  {
    id: 16,
    name: "Mount Jormajan",
    province: "Sorsogon",
    regionCode: "Sorsogon",
    type: "Volcano",
    difficulty: "Check Local Advisories",
    elevation: "About 738 meters",
    description: "Mount Jormajan is also listed with the spelling Jormajam in geographic references. Check local advisories and access information.",
    image: "images/mount-jormajan.jpg"
  },
  {
    id: 17,
    name: "Mount Engañaso",
    province: "Masbate",
    regionCode: "Masbate",
    type: "Mountain",
    difficulty: "Check Local Trail Conditions",
    elevation: "About 1,093 meters",
    description: "Mount Engañaso is located in the Claveria area of Masbate and is one of the region's listed mountain peaks.",
    image: "images/mount-enganaso.jpg"
  },
  {
    id: 18,
    name: "Sharp Peak",
    province: "Sorsogon",
    regionCode: "Sorsogon",
    type: "Volcano",
    difficulty: "Check Local Advisories",
    elevation: "About 1,047 meters",
    description: "Sharp Peak is listed in Sorsogon. Check current local information and volcanic advisories before planning a visit.",
    image: "images/sharp-peak.jpg"
  },
  {
    id: 19,
    name: "Saddle Peak",
    province: "Camarines Sur",
    regionCode: "Camarines Sur",
    type: "Mountain",
    difficulty: "Check Local Trail Conditions",
    elevation: "About 1,028 meters",
    description: "Saddle Peak is a mountain in Camarines Sur. Check local information for current access and route conditions.",
    image: "images/saddle-peak.jpg"
  },
  {
    id: 20,
    name: "Mount Bintacan",
    province: "Sorsogon",
    regionCode: "Sorsogon",
    type: "Mountain",
    difficulty: "Check Local Trail Conditions",
    elevation: "About 843 meters",
    description: "Mount Bintacan is in Sorsogon. Check local authorities for current access and protected-area information.",
    image: "images/mount-bintacan.jpg"
  },
  {
    id: 21,
    name: "Mount Putianay",
    province: "Camarines Sur",
    regionCode: "Camarines Sur",
    type: "Mountain",
    difficulty: "Check Local Trail Conditions",
    elevation: "About 826 meters",
    description: "Mount Putianay is a peak near Lagonoy in Camarines Sur.",
    image: "images/mount-putianay.jpg"
  },
  {
    id: 22,
    name: "Mount Sagurum",
    province: "Masbate",
    regionCode: "Masbate",
    type: "Mountain",
    difficulty: "Check Local Trail Conditions",
    elevation: "About 784 meters",
    description: "Mount Sagurum is a mountain peak in Masbate. Confirm local route conditions before visiting.",
    image: "images/mount-sagurum.jpg"
  },
  {
    id: 23,
    name: "Mount Bernacci",
    province: "Camarines Sur",
    regionCode: "Camarines Sur",
    type: "Mountain",
    difficulty: "Check Local Trail Conditions",
    elevation: "About 756 meters",
    description: "Mount Bernacci, also known locally as Tangcong Vaca, is in Camarines Sur.",
    image: "images/mount-bernacci.jpg"
  },
  {
    id: 24,
    name: "Mount Tiis",
    province: "Camarines Sur",
    regionCode: "Camarines Sur",
    type: "Mountain",
    difficulty: "Check Local Trail Conditions",
    elevation: "About 744 meters (reported listing)",
    description: "Mount Tiis is included in the supplied list of Bicol peaks. Confirm local trail information before travelling.",
    image: "images/mount-tiis.jpg"
  },
  {
    id: 25,
    name: "Mount Tamboo",
    province: "Camarines Sur",
    regionCode: "Camarines Sur",
    type: "Mountain",
    difficulty: "Check Local Trail Conditions",
    elevation: "About 642 meters (reported listing)",
    description: "Mount Tamboo is included in the supplied list. Verify its exact location and local trail access before visiting.",
    image: "images/mount-tamboo.jpg"
  },
  {
    id: 26,
    name: "Mount Suguitan",
    province: "Camarines Sur",
    regionCode: "Camarines Sur",
    type: "Mountain",
    difficulty: "Check Local Trail Conditions",
    elevation: "About 635 meters (reported listing)",
    description: "Mount Suguitan is included in the supplied list of Bicol peaks. Verify the exact local name and route before visiting.",
    image: "images/mount-suguitan.jpg"
  },
  {
    id: 27,
    name: "Mount Uac",
    province: "Masbate",
    regionCode: "Masbate",
    type: "Mountain",
    difficulty: "Check Local Trail Conditions",
    elevation: "About 592 meters",
    description: "Mount Uac is a mountain peak in Masbate. Confirm local route conditions before visiting.",
    image: "images/mount-uac.jpg"
  },
  {
    id: 28,
    name: "Conical Peak",
    province: "Catanduanes",
    regionCode: "Catanduanes",
    type: "Mountain",
    difficulty: "Check Local Trail Conditions",
    elevation: "About 686 meters",
    description: "Conical Peak is a listed peak in Catanduanes. Verify local trail access before planning a visit.",
    image: "images/conical-peak.jpg"
  },
  {
    id: 29,
    name: "Triple Peak",
    province: "Camarines Sur",
    regionCode: "Camarines Sur",
    type: "Mountain",
    difficulty: "Check Local Trail Conditions",
    elevation: "About 638 meters",
    description: "Triple Peak is listed as a mountain in Camarines Sur. Check local trail information before planning a visit.",
    image: "images/triple-peak.jpg"
  },
  {
    id: 30,
    name: "Mount Bagulipat",
    province: "Camarines Norte",
    regionCode: "Camarines Norte",
    type: "Mountain",
    difficulty: "Check Local Trail Conditions",
    elevation: "About 581 meters (reported listing)",
    description: "Mount Bagulipat is included in the supplied list of Bicol peaks. Verify its exact location and route locally.",
    image: "images/mount-bagulipat.jpg"
  }
];

const slugify = s => s.toLowerCase().replace(/\s+/g, '-');