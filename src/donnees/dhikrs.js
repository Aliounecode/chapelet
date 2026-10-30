/**
 * Prières / dhikrs proposés dans la partie « Chapelet 33 ».
 * Chaque dhikr est une suite de phases ; chaque phase a un nombre de répétitions (cible).
 */
export const dhikrs = [
  {
    id: "tasbih-priere",
    titre: "Après la prière",
    description:
      "33 × SubhanAllah, 33 × Alhamdulillah, 33 × Allahu Akbar, puis la conclusion",
    phases: [
      {
        arabe: "سُبْحَانَ اللَّهِ",
        translit: "SubhanAllah",
        sens: "Gloire à Allah",
        cible: 33,
      },
      {
        arabe: "الْحَمْدُ لِلَّهِ",
        translit: "Alhamdulillah",
        sens: "Louange à Allah",
        cible: 33,
      },
      {
        arabe: "اللَّهُ أَكْبَرُ",
        translit: "Allahu Akbar",
        sens: "Allah est le plus grand",
        cible: 33,
      },
      {
        arabe:
          "لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ",
        translit:
          "La ilaha illa Allah wahdahu la charika lah, lahul-mulku wa lahul-hamd, wa houwa 3ala kulli chay'in qadir",
        sens: "Il n'y a de divinité digne d'adoration qu'Allah, Seul, sans associé. À Lui la royauté, à Lui la louange, et Il est capable de toute chose.",
        cible: 1,
      },
    ],
  },
  {
    id: "subhanallah",
    titre: "SubhanAllah",
    description: "Glorifier Allah",
    phases: [
      {
        arabe: "سُبْحَانَ اللَّهِ",
        translit: "SubhanAllah",
        sens: "Gloire à Allah",
        cible: 33,
      },
    ],
  },
  {
    id: "alhamdulillah",
    titre: "Alhamdulillah",
    description: "Louer Allah",
    phases: [
      {
        arabe: "الْحَمْدُ لِلَّهِ",
        translit: "Alhamdulillah",
        sens: "Louange à Allah",
        cible: 33,
      },
    ],
  },
  {
    id: "allahu-akbar",
    titre: "Allahu Akbar",
    description: "Magnifier Allah",
    phases: [
      {
        arabe: "اللَّهُ أَكْبَرُ",
        translit: "Allahu Akbar",
        sens: "Allah est le plus grand",
        cible: 33,
      },
    ],
  },
  {
    id: "tahlil",
    titre: "La ilaha illa Allah",
    description: "L'attestation d'unicité",
    phases: [
      {
        arabe: "لَا إِلَهَ إِلَّا اللَّهُ",
        translit: "La ilaha illa Allah",
        sens: "Il n'y a de divinité digne d'adoration qu'Allah",
        cible: 33,
      },
    ],
  },
  {
    id: "tasbih-hamd",
    titre: "SubhanAllah wa bihamdih",
    description: "Gloire et louange à Allah",
    phases: [
      {
        arabe: "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ",
        translit: "SubhanAllahi wa bihamdih",
        sens: "Gloire à Allah et par Sa louange",
        cible: 33,
      },
    ],
  },
  {
    id: "tasbih-adhim",
    titre: "SubhanAllahi l-3Adhim",
    description: "Gloire à Allah, l'Immense",
    phases: [
      {
        arabe: "سُبْحَانَ اللَّهِ الْعَظِيمِ",
        translit: "SubhanAllahi l-3Adhim",
        sens: "Gloire à Allah, l'Immense",
        cible: 33,
      },
    ],
  },
  {
    id: "istighfar",
    titre: "Astaghfirullah",
    description: "Demander le pardon d'Allah",
    phases: [
      {
        arabe: "أَسْتَغْفِرُ اللَّهَ",
        translit: "Astaghfirullah",
        sens: "Je demande pardon à Allah",
        cible: 33,
      },
    ],
  },
  {
    id: "salat-nabi",
    titre: "Salat sur le Prophète ﷺ",
    description: "Invoquer la paix et les bénédictions sur le Prophète",
    phases: [
      {
        arabe: "اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ",
        translit: "Allahumma salli 3ala Mouhammad",
        sens: "Ô Allah, accorde Tes éloges à Mouhammad",
        cible: 33,
      },
    ],
  },
  {
    id: "hawqala",
    titre: "La hawla wa la quwwata",
    description: "Se remettre à Allah",
    phases: [
      {
        arabe: "لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ",
        translit: "La hawla wa la quwwata illa billah",
        sens: "Il n'y a de force ni de puissance qu'en Allah",
        cible: 33,
      },
    ],
  },
  {
    id: "tasbih_younous",
    titre: "Tasbih Younous",
    description: "Invocation pour dissiper l'angoisse et la tristesse",
    phases: [
      {
        arabe:
          "لَّا إِلَٰهَ إِلَّا أَنتَ سُبْحَانَكَ إِنِّي كُنتُ مِنَ الظَّالِمِينَ",
        translit: "La ilaha illa anta subhanaka inni kuntu minazalimin",
        sens: "Il n'y a de divinité que Toi ! Pureté à Toi ! J'ai été vraiment du nombre des injustes",
        cible: 33,
      },
    ],
  },

  {
    id: "perso",
    titre: "Personnalisé",
    description: "Écrivez votre propre prière",
    personnalise: true,
    phases: [{ arabe: "", translit: "Mon dhikr", sens: "", cible: 33 }],
  },
];
