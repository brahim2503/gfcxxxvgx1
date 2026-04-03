export const PREGNANCY_WEEKS = [
  {
    week: 1,
    title: { en: "Conception", ar: "الإخصاب", fr: "Conception" },
    description: {
      en: "Your journey begins! This is technically the start of your pregnancy cycle.",
      ar: "تبدأ رحلتك! هذا هو تقنيًا بداية دورة الحمل.",
      fr: "Votre voyage commence ! C'est techniquement le début de votre cycle de grossesse."
    },
    tips: [
      { en: "Start taking prenatal vitamins.", ar: "ابدئي بتناول فيتامينات الحمل.", fr: "Commencez à prendre des vitamines prénatales." },
      { en: "Stay hydrated.", ar: "حافظي على رطوبة جسمك.", fr: "Restez hydratée." }
    ]
  },
  // ... more weeks will be added
  {
    week: 40,
    title: { en: "Full Term", ar: "اكتمال الحمل", fr: "Terme complet" },
    description: {
      en: "Your baby is ready to meet you! Any day now.",
      ar: "طفلك مستعد للقائك! في أي يوم الآن.",
      fr: "Votre bébé est prêt à vous rencontrer ! N'importe quel jour maintenant."
    },
    tips: [
      { en: "Have your hospital bag ready.", ar: "جهزي حقيبة المستشفى.", fr: "Préparez votre sac d'hôpital." }
    ]
  }
];

export const LANGUAGES = {
  en: { name: "English", dir: "ltr" },
  ar: { name: "العربية", dir: "rtl" },
  fr: { name: "Français", dir: "ltr" }
};
