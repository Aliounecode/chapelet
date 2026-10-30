/**
 * Banque de questions du Quizz.
 * Format d'une question : { id, theme, question, bonne, fausses: [3 réponses], explication }
 * Pour en ajouter, il suffit d'ajouter un objet dans `questionsManuelles`.
 * Les questions du thème « Noms d'Allah » sont en partie générées à partir de noms.js.
 */
import { noms } from './noms.js';

export const themes = [
  { id: 'piliers', libelle: 'Piliers et pratiques', description: 'Les piliers, la prière, le jeûne, la zakat…' },
  { id: 'prophetes', libelle: 'Prophètes et histoire', description: 'Les prophètes, la Sira, les premiers califes' },
  { id: 'coran', libelle: 'Le Coran', description: 'Sourates, révélation, versets célèbres' },
  { id: 'noms', libelle: 'Les 99 Noms d’Allah', description: 'Retrouvez le nom à partir de son sens' },
  { id: 'invocations', libelle: 'Invocations et adab', description: 'Formules du quotidien et leur sens' },
];

const questionsManuelles = [
  /* ---------- Piliers et pratiques ---------- */
  {
    id: 'pi-1', theme: 'piliers',
    question: 'Combien y a-t-il de piliers de l’islam ?',
    bonne: '5', fausses: ['4', '6', '7'],
    explication: 'La Chahada, la prière, la zakat, le jeûne de Ramadan et le pèlerinage (Hajj).',
  },
  {
    id: 'pi-2', theme: 'piliers',
    question: 'Quel est le premier pilier de l’islam ?',
    bonne: 'L’attestation de foi (Chahada)', fausses: ['La prière', 'La zakat', 'Le jeûne'],
    explication: 'Témoigner qu’il n’y a de divinité digne d’adoration qu’Allah et que Mouhammad ﷺ est Son messager.',
  },
  {
    id: 'pi-3', theme: 'piliers',
    question: 'Combien de prières obligatoires accomplit-on chaque jour ?',
    bonne: '5', fausses: ['3', '4', '6'],
    explication: 'Sobh (Fajr), Dhouhr, 3Asr, Maghrib et 3Icha.',
  },
  {
    id: 'pi-4', theme: 'piliers',
    question: 'Quelle prière s’accomplit avant le lever du soleil ?',
    bonne: 'Sobh (Fajr)', fausses: ['Dhouhr', '3Asr', '3Icha'],
    explication: 'C’est la prière de l’aube, de deux rak3at.',
  },
  {
    id: 'pi-5', theme: 'piliers',
    question: 'Combien de rak3at compte la prière du Maghrib ?',
    bonne: '3', fausses: ['2', '4', '5'],
    explication: 'Sobh : 2, Dhouhr : 4, 3Asr : 4, Maghrib : 3, 3Icha : 4.',
  },
  {
    id: 'pi-6', theme: 'piliers',
    question: 'Quel mois les musulmans jeûnent-ils chaque année ?',
    bonne: 'Ramadan', fausses: ['Mouharram', 'Rajab', 'Cha3ban'],
    explication: 'Le jeûne dure du lever de l’aube au coucher du soleil, durant tout le mois.',
  },
  {
    id: 'pi-7', theme: 'piliers',
    question: 'À quel moment rompt-on le jeûne chaque jour ?',
    bonne: 'Au coucher du soleil', fausses: ['À minuit', 'Au zénith', 'Au lever du soleil'],
    explication: 'On rompt le jeûne à l’heure du Maghrib.',
  },
  {
    id: 'pi-8', theme: 'piliers',
    question: 'Quel pourcentage de ses économies imposables verse-t-on en zakat al-mal ?',
    bonne: '2,5 %', fausses: ['1 %', '5 %', '10 %'],
    explication: 'Sur l’épargne qui atteint le nisab et qu’on a conservée une année lunaire.',
  },
  {
    id: 'pi-9', theme: 'piliers',
    question: 'Combien de fois dans sa vie le Hajj est-il obligatoire pour celui qui en a les moyens ?',
    bonne: 'Une fois', fausses: ['Chaque année', 'Deux fois', 'Trois fois'],
    explication: 'C’est une obligation unique, pour celui qui en a la capacité.',
  },
  {
    id: 'pi-10', theme: 'piliers',
    question: 'Comment appelle-t-on l’appel à la prière ?',
    bonne: 'L’adhan', fausses: ['L’iqama', 'La khoutba', 'Le tasbih'],
    explication: 'L’iqama, elle, annonce le début imminent de la prière.',
  },
  {
    id: 'pi-11', theme: 'piliers',
    question: 'Vers quoi les musulmans se tournent-ils pour prier ?',
    bonne: 'La Kaaba, à La Mecque', fausses: ['La mosquée du Prophète, à Médine', 'Al-Aqsa, à Jérusalem', 'Le mont Arafat'],
    explication: 'C’est la qibla.',
  },
  {
    id: 'pi-12', theme: 'piliers',
    question: 'Quel jour a lieu la prière collective de la Joumou3a ?',
    bonne: 'Le vendredi', fausses: ['Le jeudi', 'Le samedi', 'Le dimanche'],
    explication: 'La prière du vendredi remplace celle du Dhouhr et est précédée de la khoutba.',
  },
  {
    id: 'pi-13', theme: 'piliers',
    question: 'Quelle fête marque la fin du mois de Ramadan ?',
    bonne: 'L’Aïd al-Fitr', fausses: ['L’Aïd al-Adha', 'Achoura', 'Le Mawlid'],
    explication: 'On l’appelle aussi la fête de la rupture du jeûne.',
  },
  {
    id: 'pi-14', theme: 'piliers',
    question: 'Quelle fête rappelle le sacrifice d’Ibrahim ?',
    bonne: 'L’Aïd al-Adha', fausses: ['L’Aïd al-Fitr', 'Laylat al-Qadr', 'Le Nouvel An de l’Hégire'],
    explication: 'Allah a remplacé le fils d’Ibrahim par un bélier ; on sacrifie un animal à cette occasion.',
  },
  {
    id: 'pi-15', theme: 'piliers',
    question: 'Combien y a-t-il de piliers de la foi (Iman) ?',
    bonne: '6', fausses: ['5', '4', '7'],
    explication: 'Croire en Allah, en Ses anges, en Ses livres, en Ses messagers, au Jour dernier et au destin (qadar).',
  },
  {
    id: 'pi-16', theme: 'piliers',
    question: 'Comment appelle-t-on les ablutions faites avant la prière ?',
    bonne: 'Le woudou’', fausses: ['Le ghousl', 'Le tayammoum', 'Le tahajjoud'],
    explication: 'Le ghousl est le bain rituel complet ; le tayammoum, l’ablution sèche avec de la terre pure.',
  },

  /* ---------- Prophètes et histoire ---------- */
  {
    id: 'pr-1', theme: 'prophetes',
    question: 'Qui est le dernier prophète de l’islam ?',
    bonne: 'Mouhammad ﷺ', fausses: ['Issa (Jésus)', 'Moussa (Moïse)', 'Ibrahim (Abraham)'],
    explication: 'Il est le sceau des prophètes (Khatam an-Nabiyyin).',
  },
  {
    id: 'pr-2', theme: 'prophetes',
    question: 'Quel prophète a construit l’arche ?',
    bonne: 'Nouh (Noé)', fausses: ['Houd', 'Salih', 'Yousouf'],
    explication: 'Nouh a construit l’arche sur l’ordre d’Allah avant le déluge.',
  },
  {
    id: 'pr-3', theme: 'prophetes',
    question: 'Quel prophète fut jeté dans le feu qu’Allah rendit frais et sans danger ?',
    bonne: 'Ibrahim (Abraham)', fausses: ['Moussa (Moïse)', 'Issa (Jésus)', 'Yahya (Jean)'],
    explication: 'Sourate Al-Anbiya : « Ô feu, sois fraîcheur et salut pour Ibrahim ».',
  },
  {
    id: 'pr-4', theme: 'prophetes',
    question: 'Quel prophète fut avalé par un grand poisson ?',
    bonne: 'Younous (Jonas)', fausses: ['Ayyoub (Job)', 'Idris', 'Zakariyya'],
    explication: 'Il invoqua Allah depuis le ventre du poisson : « Il n’y a de dieu que Toi, gloire à Toi ».',
  },
  {
    id: 'pr-5', theme: 'prophetes',
    question: 'Quel prophète a été envoyé auprès de Pharaon ?',
    bonne: 'Moussa (Moïse)', fausses: ['Ibrahim (Abraham)', 'Dawoud (David)', 'Souleyman (Salomon)'],
    explication: 'Moussa, accompagné de son frère Haroun.',
  },
  {
    id: 'pr-6', theme: 'prophetes',
    question: 'Quel livre a été révélé à Moussa ?',
    bonne: 'La Tawrat (Torah)', fausses: ['L’Injil (Évangile)', 'Le Zabour (Psaumes)', 'Le Coran'],
    explication: 'Le Zabour a été révélé à Dawoud, l’Injil à Issa et le Coran à Mouhammad ﷺ.',
  },
  {
    id: 'pr-7', theme: 'prophetes',
    question: 'À quel prophète le Zabour (Psaumes) a-t-il été révélé ?',
    bonne: 'Dawoud (David)', fausses: ['Moussa (Moïse)', 'Issa (Jésus)', 'Souleyman (Salomon)'],
    explication: 'Le Zabour est le livre de Dawoud, cité dans le Coran.',
  },
  {
    id: 'pr-8', theme: 'prophetes',
    question: 'Quel prophète est célèbre pour sa patience dans l’épreuve de la maladie ?',
    bonne: 'Ayyoub (Job)', fausses: ['Yousouf (Joseph)', 'Houd', 'Chou3ayb'],
    explication: 'Il demeura patient et invoqua Allah ; Allah le guérit.',
  },
  {
    id: 'pr-9', theme: 'prophetes',
    question: 'Quel prophète fut jeté dans un puits par ses frères ?',
    bonne: 'Yousouf (Joseph)', fausses: ['Ya3qoub (Jacob)', 'Isma3il (Ismaël)', 'Lout (Loth)'],
    explication: 'Son histoire est racontée dans la sourate qui porte son nom.',
  },
  {
    id: 'pr-10', theme: 'prophetes',
    question: 'Quel ange a transmis la révélation aux prophètes ?',
    bonne: 'Jibril (Gabriel)', fausses: ['Mikail (Michel)', 'Israfil', 'Malik'],
    explication: 'On l’appelle aussi ar-Rouh al-Amin, l’Esprit fidèle.',
  },
  {
    id: 'pr-11', theme: 'prophetes',
    question: 'Dans quelle ville est né le Prophète Mouhammad ﷺ ?',
    bonne: 'La Mecque', fausses: ['Médine', 'Taïf', 'Jérusalem'],
    explication: 'Il est né à La Mecque, dans la tribu de Qouraych.',
  },
  {
    id: 'pr-12', theme: 'prophetes',
    question: 'Comment appelle-t-on l’émigration du Prophète ﷺ de La Mecque vers Médine ?',
    bonne: 'L’Hégire', fausses: ['L’Isra', 'Le Mi3raj', 'La Oumra'],
    explication: 'Elle marque le début du calendrier musulman.',
  },
  {
    id: 'pr-13', theme: 'prophetes',
    question: 'En quelle année du calendrier grégorien a eu lieu l’Hégire ?',
    bonne: '622', fausses: ['570', '632', '661'],
    explication: 'L’an 1 du calendrier hégirien correspond à 622.',
  },
  {
    id: 'pr-14', theme: 'prophetes',
    question: 'Dans quelle grotte le Prophète ﷺ a-t-il reçu les premières révélations ?',
    bonne: 'La grotte de Hira', fausses: ['La grotte de Thawr', 'La grotte des Sept Dormants', 'Une grotte de Mina'],
    explication: 'La grotte de Hira se trouve sur le mont Nour, près de La Mecque.',
  },
  {
    id: 'pr-15', theme: 'prophetes',
    question: 'Quelle fut la première épouse du Prophète ﷺ ?',
    bonne: 'Khadija', fausses: ['3Aïcha', 'Hafsa', 'Zaynab'],
    explication: 'Khadija bint Khouwaylid, la première à croire en son message.',
  },
  {
    id: 'pr-16', theme: 'prophetes',
    question: 'Qui fut le premier calife après le Prophète ﷺ ?',
    bonne: 'Abou Bakr as-Siddiq', fausses: ['Omar ibn al-Khattab', 'Outhman ibn 3Affan', '3Ali ibn Abi Talib'],
    explication: 'Les quatre califes bien guidés : Abou Bakr, Omar, Outhman et 3Ali.',
  },
  {
    id: 'pr-17', theme: 'prophetes',
    question: 'Quel compagnon fut le premier muezzin de l’islam ?',
    bonne: 'Bilal ibn Rabah', fausses: ['Abou Hourayrah', 'Salman al-Farisi', 'Zayd ibn Thabit'],
    explication: 'Bilal al-Habachi, à la voix réputée belle et puissante.',
  },
  {
    id: 'pr-18', theme: 'prophetes',
    question: 'Quel calife est surnommé « al-Farouq » ?',
    bonne: 'Omar ibn al-Khattab', fausses: ['Abou Bakr', 'Outhman', '3Ali'],
    explication: 'Al-Farouq signifie « celui qui distingue le vrai du faux ».',
  },
  {
    id: 'pr-19', theme: 'prophetes',
    question: 'Comment appelle-t-on le voyage nocturne du Prophète ﷺ de La Mecque à Jérusalem ?',
    bonne: 'L’Isra', fausses: ['L’Hégire', 'Le Hajj', 'La Oumra'],
    explication: 'L’Isra est le voyage nocturne vers Al-Aqsa ; le Mi3raj est l’ascension vers les cieux.',
  },
  {
    id: 'pr-20', theme: 'prophetes',
    question: 'Quelle bataille, en l’an 2 de l’Hégire, fut la première grande victoire des musulmans ?',
    bonne: 'Badr', fausses: ['Ouhoud', 'Al-Khandaq', 'Hounayn'],
    explication: 'Les musulmans, bien moins nombreux, remportèrent la victoire à Badr.',
  },

  /* ---------- Le Coran ---------- */
  {
    id: 'co-1', theme: 'coran',
    question: 'Combien de sourates compte le Coran ?',
    bonne: '114', fausses: ['99', '110', '120'],
    explication: 'Le Coran compte 114 sourates.',
  },
  {
    id: 'co-2', theme: 'coran',
    question: 'Quelle est la première sourate du Coran ?',
    bonne: 'Al-Fatiha', fausses: ['Al-Baqara', 'Al-Ikhlas', 'Ya-Sin'],
    explication: 'Son nom signifie « l’Ouverture ».',
  },
  {
    id: 'co-3', theme: 'coran',
    question: 'Quelle est la dernière sourate du Coran ?',
    bonne: 'An-Nas', fausses: ['Al-Falaq', 'Al-Ikhlas', 'Al-Kawthar'],
    explication: 'An-Nas (« Les hommes ») est la 114e sourate.',
  },
  {
    id: 'co-4', theme: 'coran',
    question: 'Quelle est la plus longue sourate du Coran ?',
    bonne: 'Al-Baqara', fausses: ['Al-3Imran', 'An-Nisa', 'Al-Kahf'],
    explication: 'Al-Baqara (« La Vache ») compte 286 versets.',
  },
  {
    id: 'co-5', theme: 'coran',
    question: 'Quelle est la plus courte sourate du Coran ?',
    bonne: 'Al-Kawthar', fausses: ['Al-Ikhlas', 'Al-Falaq', 'An-Nas'],
    explication: 'Al-Kawthar ne compte que trois versets, et c’est la plus courte en nombre de mots.',
  },
  {
    id: 'co-6', theme: 'coran',
    question: 'Quel est le premier mot révélé au Prophète ﷺ ?',
    bonne: 'Iqra’ (Lis)', fausses: ['Bismillah', 'Qoul (Dis)', 'Kouhn (Sois)'],
    explication: 'Premiers versets de la sourate Al-3Alaq : « Lis, au nom de ton Seigneur qui a créé ».',
  },
  {
    id: 'co-7', theme: 'coran',
    question: 'Pendant quel mois le Coran a-t-il commencé à être révélé ?',
    bonne: 'Ramadan', fausses: ['Rajab', 'Mouharram', 'Dhou l-Hijja'],
    explication: '« Le mois de Ramadan, dans lequel le Coran a été révélé » (Al-Baqara).',
  },
  {
    id: 'co-8', theme: 'coran',
    question: 'En combien de juz’ (parties) le Coran est-il traditionnellement divisé ?',
    bonne: '30', fausses: ['20', '40', '60'],
    explication: 'Chaque juz’ est lui-même divisé en deux hizb.',
  },
  {
    id: 'co-9', theme: 'coran',
    question: 'Dans quelle sourate se trouve le verset du Trône (Ayat al-Koursi) ?',
    bonne: 'Al-Baqara', fausses: ['Al-3Imran', 'An-Nour', 'Ya-Sin'],
    explication: 'C’est le verset 255 de la sourate Al-Baqara.',
  },
  {
    id: 'co-10', theme: 'coran',
    question: 'Quelle sourate équivaut au tiers du Coran, selon un hadith authentique ?',
    bonne: 'Al-Ikhlas', fausses: ['Al-Fatiha', 'Al-Kafiroun', 'Al-Falaq'],
    explication: 'Hadith rapporté par al-Boukhari au sujet de « Dis : Il est Allah, Unique ».',
  },
  {
    id: 'co-11', theme: 'coran',
    question: 'Quelle sourate ne commence pas par la basmala ?',
    bonne: 'At-Tawba', fausses: ['Al-Anfal', 'Younous', 'Al-Ma’ida'],
    explication: 'At-Tawba est la seule sourate qui débute sans « Bismillah ar-Rahman ar-Rahim ».',
  },
  {
    id: 'co-12', theme: 'coran',
    question: 'Quelles sont les deux sourates de protection (al-Mou3awwidhatayn) ?',
    bonne: 'Al-Falaq et An-Nas', fausses: ['Al-Ikhlas et Al-Kafiroun', 'Al-Fatiha et Al-Baqara', 'Al-Masad et An-Nasr'],
    explication: 'Ce sont les deux dernières sourates du Coran.',
  },
  {
    id: 'co-13', theme: 'coran',
    question: 'Dans quelle langue le Coran a-t-il été révélé ?',
    bonne: 'L’arabe', fausses: ['L’hébreu', 'L’araméen', 'Le persan'],
    explication: '« Nous l’avons fait descendre en un Coran arabe » (Youssouf).',
  },
  {
    id: 'co-14', theme: 'coran',
    question: 'Quelle sourate récite-t-on dans chaque rak3a de la prière ?',
    bonne: 'Al-Fatiha', fausses: ['Al-Ikhlas', 'Al-Kawthar', 'Al-Baqara'],
    explication: '« Il n’y a pas de prière pour celui qui ne récite pas l’Ouverture du Livre. »',
  },

  /* ---------- Invocations et adab ---------- */
  {
    id: 'in-1', theme: 'invocations',
    question: 'Que signifie « Bismillah » ?',
    bonne: 'Au nom d’Allah', fausses: ['Louange à Allah', 'Gloire à Allah', 'Allah est le plus grand'],
    explication: 'On le dit avant de commencer une action : manger, boire, lire…',
  },
  {
    id: 'in-2', theme: 'invocations',
    question: 'Que signifie « Alhamdulillah » ?',
    bonne: 'Louange à Allah', fausses: ['Au nom d’Allah', 'Si Allah le veut', 'Je demande pardon à Allah'],
    explication: 'On le dit pour remercier Allah, dans l’aisance comme dans l’épreuve.',
  },
  {
    id: 'in-3', theme: 'invocations',
    question: 'Que signifie « SubhanAllah » ?',
    bonne: 'Gloire à Allah', fausses: ['Louange à Allah', 'Allah est le plus grand', 'Qu’Allah te bénisse'],
    explication: 'Proclamer qu’Allah est exempt de tout défaut.',
  },
  {
    id: 'in-4', theme: 'invocations',
    question: 'Que signifie « Allahu Akbar » ?',
    bonne: 'Allah est le plus grand', fausses: ['Allah est le plus miséricordieux', 'Gloire à Allah', 'Au nom d’Allah'],
    explication: 'C’est le takbir, prononcé au début de la prière et à de nombreuses occasions.',
  },
  {
    id: 'in-5', theme: 'invocations',
    question: 'Que signifie « Astaghfirullah » ?',
    bonne: 'Je demande pardon à Allah', fausses: ['Je m’en remets à Allah', 'Si Allah le veut', 'Qu’Allah te bénisse'],
    explication: 'C’est l’istighfar, la demande de pardon.',
  },
  {
    id: 'in-6', theme: 'invocations',
    question: 'Que signifie « In cha Allah » ?',
    bonne: 'Si Allah le veut', fausses: ['Qu’Allah t’en récompense', 'Par la grâce d’Allah', 'Allah le sait'],
    explication: 'On l’emploie en parlant de l’avenir, car tout dépend de la volonté d’Allah.',
  },
  {
    id: 'in-7', theme: 'invocations',
    question: 'Quelle formule dit-on pour remercier quelqu’un en lui souhaitant du bien ?',
    bonne: 'Jazak Allahou khayran', fausses: ['As-salamou 3alaykoum', 'Bismillah', 'SubhanAllah'],
    explication: 'Elle signifie : « Qu’Allah te récompense par le bien ».',
  },
  {
    id: 'in-8', theme: 'invocations',
    question: 'Que répond-on à « As-salamou 3alaykoum » ?',
    bonne: 'Wa 3alaykoumou s-salam', fausses: ['Barak Allahou fik', 'Jazak Allahou khayran', 'Amine'],
    explication: 'Soit : « Et sur vous la paix », idéalement en ajoutant « wa rahmatou Llah ».',
  },
  {
    id: 'in-9', theme: 'invocations',
    question: 'Que dit-on après avoir éternué ?',
    bonne: 'Alhamdulillah', fausses: ['Bismillah', 'Astaghfirullah', 'SubhanAllah'],
    explication: 'L’entourage répond : « Yarhamoukallah » (Qu’Allah te fasse miséricorde).',
  },
  {
    id: 'in-10', theme: 'invocations',
    question: 'Que dit-on avant de manger ?',
    bonne: 'Bismillah', fausses: ['Alhamdulillah', 'Allahu Akbar', 'Astaghfirullah'],
    explication: 'Et on remercie Allah après le repas.',
  },
  {
    id: 'in-11', theme: 'invocations',
    question: 'Combien de fois dit-on SubhanAllah, Alhamdulillah et Allahu Akbar après la prière ?',
    bonne: '33 fois chacun', fausses: ['10 fois chacun', '50 fois chacun', '100 fois chacun'],
    explication: 'On complète ensuite la centaine par « La ilaha illa Allah wahdahou la charika lah… » (hadith rapporté par Mouslim).',
  },
  {
    id: 'in-12', theme: 'invocations',
    question: 'Quelle formule est dite « légère sur la langue, lourde dans la balance » ?',
    bonne: 'SubhanAllahi wa bihamdih, SubhanAllahi l-3Adhim',
    fausses: ['La hawla wa la quwwata illa billah', 'Bismillahi r-Rahmani r-Rahim', 'Astaghfirullah'],
    explication: 'Hadith d’Abou Hourayrah, rapporté par al-Boukhari et Mouslim.',
  },
  {
    id: 'in-13', theme: 'invocations',
    question: 'Que signifie « La hawla wa la quwwata illa billah » ?',
    bonne: 'Il n’y a de force ni de puissance qu’en Allah',
    fausses: ['Allah nous suffit', 'Qu’Allah te bénisse', 'Je demande pardon à Allah'],
    explication: 'C’est la hawqala, une formule d’abandon à Allah.',
  },
  {
    id: 'in-14', theme: 'invocations',
    question: 'Que signifie « Barak Allahou fik » ?',
    bonne: 'Qu’Allah te bénisse', fausses: ['Qu’Allah te pardonne', 'Qu’Allah te guide', 'Qu’Allah te protège'],
    explication: 'On l’emploie pour remercier ou féliciter quelqu’un.',
  },

  /* ---------- Noms d'Allah (manuelle) ---------- */
  {
    id: 'no-1', theme: 'noms',
    question: 'Combien de noms d’Allah le hadith mentionne-t-il pour celui qui les dénombre ?',
    bonne: '99', fausses: ['77', '100', '114'],
    explication: '« Allah a quatre-vingt-dix-neuf noms, cent moins un. Celui qui les dénombre entrera au Paradis. »',
  },
];

/* ---------- Questions générées à partir des 99 Noms ---------- */

// Noms dont le sens est court et sans équivalent proche dans la liste
const NUMEROS_NOMS_QUIZZ = [4, 6, 12, 17, 18, 19, 21, 22, 27, 28, 29, 36, 62, 63, 67, 73, 74, 96, 97];

function questionsNoms() {
  const pool = NUMEROS_NOMS_QUIZZ.map((n) => noms[n - 1]);
  return pool.map((nom, index) => {
    const autres = pool.filter((n) => n.numero !== nom.numero);
    // Autres noms choisis de façon stable (rotation) pour rester déterministe
    const fausses = [0, 5, 11].map((decalage) => autres[(index + decalage) % autres.length].translit);
    return {
      id: `no-g-${nom.numero}`,
      theme: 'noms',
      question: `Quel nom d’Allah correspond à : « ${nom.sens} » ?`,
      bonne: nom.translit,
      fausses,
      explication: `${nom.translit} (n° ${nom.numero}) : ${nom.sens}`,
    };
  });
}

export const questions = [...questionsManuelles, ...questionsNoms()];

export function compterParTheme(themeId) {
  return questions.filter((q) => q.theme === themeId).length;
}
