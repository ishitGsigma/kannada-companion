// Phrase helper. Add { verified: true } as a 4th argument ONLY after a native speaker approves.
const p = (en, kn, translit, extra = {}) => ({ en, kn, translit, verified: false, ...extra });

export const PACKS = [
  {
    id: 'transport',
    icon: '🚌',
    title: 'Transportation',
    blurb: 'Auto, bus, metro, directions',
    scenarios: [
      {
        id: 'auto',
        title: 'Taking an auto',
        phrases: [
          p('Please use the meter', 'ಮೀಟರ್ ಹಾಕಿ', 'meetar haaki', { replies: [{ kn: 'ಮೀಟರ್ ಇಲ್ಲ', translit: 'meetar illa', en: 'No meter (fixed price)' }] }),
          p('How much to the bus stand?', 'ಬಸ್ ಸ್ಟ್ಯಾಂಡ್‌ಗೆ ಎಷ್ಟು ಆಗುತ್ತೆ?', 'bus stand ge eshtu aagutte', { replies: [{ kn: 'ನೂರು ರೂಪಾಯಿ', translit: 'nooru roopaayi', en: '100 rupees' }] }),
          p('Stop here', 'ಇಲ್ಲಿ ನಿಲ್ಲಿಸಿ', 'illi nillisi'),
          p('Please take me to this address', 'ದಯವಿಟ್ಟು ಈ ವಿಳಾಸಕ್ಕೆ ಕರೆದುಕೊಂಡು ಹೋಗಿ', 'dayavittu ee vilaasakke karedukondu hogi'),
          p('How long will it take?', 'ಎಷ್ಟು ಸಮಯ ಆಗುತ್ತದೆ?', 'eshtu samaya aaguttade'),
          p('Please go slowly', 'ದಯವಿಟ್ಟು ನಿಧಾನವಾಗಿ ಹೋಗಿ', 'dayavittu nidhaanavaagi hogi'),
          p('Please turn left', 'ದಯವಿಟ್ಟು ಎಡಕ್ಕೆ ತಿರುಗಿ', 'dayavittu edakke tirugi'),
          p('Please turn right', 'ದಯವಿಟ್ಟು ಬಲಕ್ಕೆ ತಿರುಗಿ', 'dayavittu balakke tirugi'),
          p('Go straight', 'ನೇರವಾಗಿ ಹೋಗಿ', 'neravaagi hogi'),
          p('Please stop near the entrance', 'ದಯವಿಟ್ಟು ಪ್ರವೇಶದ್ವಾರದ ಹತ್ತಿರ ನಿಲ್ಲಿಸಿ', 'dayavittu praveshadvaarada hattira nillisi'),
          p('Can you take me there?', 'ನನ್ನನ್ನು ಅಲ್ಲಿಗೆ ಕರೆದುಕೊಂಡು ಹೋಗುತ್ತೀರಾ?', 'nannannu allige karedukondu hogutteera'),
          p('Is this the shortest route?', 'ಇದು ಚಿಕ್ಕ ದಾರಿಯೇ?', 'idu chikka daariye'),
          p('I will pay by cash', 'ನಾನು ನಗದು ಕೊಡುತ್ತೇನೆ', 'naanu nagadu koduttene'),
          p('Do you accept UPI?', 'ನೀವು ಯುಪಿಐ ಸ್ವೀಕರಿಸುತ್ತೀರಾ?', 'neevu UPI sveekarisutteera'),
          p('Please give me change', 'ದಯವಿಟ್ಟು ಚಿಲ್ಲರೆ ಕೊಡಿ', 'dayavittu chillare kodi'),
          p('I am in a hurry', 'ನನಗೆ ಅವಸರ ಇದೆ', 'nanage avasara ide'),
          p('Please wait for two minutes', 'ದಯವಿಟ್ಟು ಎರಡು ನಿಮಿಷ ಕಾಯಿರಿ', 'dayavittu eradu nimisha kaayiri'),
          p('I have luggage', 'ನನ್ನ ಬಳಿ ಸಾಮಾನು ಇದೆ', 'nanna bali saamaanu ide'),
          p('Can you help with my bags?', 'ನನ್ನ ಚೀಲಗಳಿಗೆ ಸಹಾಯ ಮಾಡುತ್ತೀರಾ?', 'nanna cheelagalige sahaaya maadutteera')
        ]
      },
      {
        id: 'bus',
        title: 'City bus and metro',
        phrases: [
          p('Does this bus go to Majestic?', 'ಈ ಬಸ್ ಮೆಜೆಸ್ಟಿಕ್‌ಗೆ ಹೋಗುತ್ತಾ?', 'ee bus Majestic ge hogutta'),
          p('Where is the metro station?', 'ಮೆಟ್ರೋ ಸ್ಟೇಷನ್ ಎಲ್ಲಿದೆ?', 'metro station ellide'),
          p('Which bus goes to the city centre?', 'ನಗರ ಕೇಂದ್ರಕ್ಕೆ ಯಾವ ಬಸ್ ಹೋಗುತ್ತದೆ?', 'nagara kendrakke yaava bus hoguttade'),
          p('Where can I buy a ticket?', 'ಟಿಕೆಟ್ ಎಲ್ಲಿ ಖರೀದಿಸಬಹುದು?', 'ticket elli khareedisabahudu'),
          p('One ticket, please', 'ಒಂದು ಟಿಕೆಟ್ ಕೊಡಿ', 'ondu ticket kodi'),
          p('Is this seat available?', 'ಈ ಆಸನ ಖಾಲಿ ಇದೆಯೇ?', 'ee aasana khaali ideye'),
          p('Please tell me when we arrive', 'ನಾವು ತಲುಪಿದಾಗ ದಯವಿಟ್ಟು ಹೇಳಿ', 'naavu talupidaga dayavittu heli'),
          p('Where should I get off?', 'ನಾನು ಎಲ್ಲಿ ಇಳಿಯಬೇಕು?', 'naanu elli iliyabeku'),
          p('Is this the right platform?', 'ಇದು ಸರಿಯಾದ ಪ್ಲಾಟ್‌ಫಾರ್ಮ್ ಆಗಿದೆಯೇ?', 'idu sariyaada platform aagideye'),
          p('When is the next bus?', 'ಮುಂದಿನ ಬಸ್ ಯಾವಾಗ ಬರುತ್ತದೆ?', 'mundina bus yaavaga baruttade'),
          p('When is the next metro?', 'ಮುಂದಿನ ಮೆಟ್ರೋ ಯಾವಾಗ ಬರುತ್ತದೆ?', 'mundina metro yaavaga baruttade'),
          p('Does this bus stop at the station?', 'ಈ ಬಸ್ ನಿಲ್ದಾಣದಲ್ಲಿ ನಿಲ್ಲುತ್ತದೆಯೇ?', 'ee bus nildaanadalli nilluttadeye'),
          p('Is there a direct bus?', 'ನೇರ ಬಸ್ ಇದೆಯೇ?', 'nera bus ideye'),
          p('How many stops are left?', 'ಇನ್ನೆಷ್ಟು ನಿಲ್ದಾಣಗಳಿವೆ?', 'inneshtu nildaanagalive'),
          p('I missed my stop', 'ನನ್ನ ನಿಲ್ದಾಣ ತಪ್ಪಿಹೋಯಿತು', 'nanna nildaana tappihoyitu'),
          p('Where is the bus stop?', 'ಬಸ್ ನಿಲ್ದಾಣ ಎಲ್ಲಿದೆ?', 'bus nildaana ellide'),
          p('Where is the ticket counter?', 'ಟಿಕೆಟ್ ಕೌಂಟರ್ ಎಲ್ಲಿದೆ?', 'ticket counter ellide'),
          p('Is this bus crowded?', 'ಈ ಬಸ್‌ನಲ್ಲಿ ಜನಸಂದಣಿ ಇದೆಯೇ?', 'ee bus nalli jana sandani ideye'),
          p('I need to recharge my travel card', 'ನನ್ನ ಪ್ರಯಾಣ ಕಾರ್ಡ್ ರೀಚಾರ್ಜ್ ಮಾಡಬೇಕು', 'nanna prayaana card recharge maadabeku'),
          p('Please move a little', 'ದಯವಿಟ್ಟು ಸ್ವಲ್ಪ ಸರಿಯಿರಿ', 'dayavittu swalpa sariyiri')
        ]
      },
      {
        id: 'directions',
        title: 'Asking for directions',
        phrases: [
          p('Where is this address?', 'ಈ ವಿಳಾಸ ಎಲ್ಲಿದೆ?', 'ee vilaasa ellide'),
          p('Is it far from here?', 'ಇಲ್ಲಿಂದ ಅದು ದೂರ ಇದೆಯೇ?', 'illinda adu doora ideye'),
          p('Can I walk there?', 'ನಾನು ಅಲ್ಲಿಗೆ ನಡೆದುಕೊಂಡು ಹೋಗಬಹುದೇ?', 'naanu allige nadedukondu hogabahude'),
          p('Which way should I go?', 'ನಾನು ಯಾವ ದಾರಿಯಲ್ಲಿ ಹೋಗಬೇಕು?', 'naanu yaava daariyalli hogabeku'),
          p('Please show me on the map', 'ದಯವಿಟ್ಟು ನಕ್ಷೆಯಲ್ಲಿ ತೋರಿಸಿ', 'dayavittu nakshayalli torisi'),
          p('Where is the nearest ATM?', 'ಹತ್ತಿರದ ಎಟಿಎಂ ಎಲ್ಲಿದೆ?', 'hattirada ATM ellide'),
          p('Where is the nearest hospital?', 'ಹತ್ತಿರದ ಆಸ್ಪತ್ರೆ ಎಲ್ಲಿದೆ?', 'hattirada aaspatre ellide'),
          p('Where is the main road?', 'ಮುಖ್ಯ ರಸ್ತೆ ಎಲ್ಲಿದೆ?', 'mukhya raste ellide'),
          p('Is this the way to the market?', 'ಇದು ಮಾರುಕಟ್ಟೆಗೆ ಹೋಗುವ ದಾರಿಯೇ?', 'idu maarukattege hoguva daariye'),
          p('How far is the station?', 'ನಿಲ್ದಾಣ ಎಷ್ಟು ದೂರದಲ್ಲಿದೆ?', 'nildaana eshtu dooradallide'),
          p('Can you point me in the right direction?', 'ಸರಿಯಾದ ದಿಕ್ಕನ್ನು ತೋರಿಸುತ್ತೀರಾ?', 'sariyaada dikkannu torisutteera'),
          p('I think I am lost', 'ನಾನು ದಾರಿ ತಪ್ಪಿದ್ದೇನೆ ಅನಿಸುತ್ತದೆ', 'naanu daari tappiddene anisuttade'),
          p('Please write the address', 'ದಯವಿಟ್ಟು ವಿಳಾಸ ಬರೆದು ಕೊಡಿ', 'dayavittu vilaasa baredu kodi'),
          p('Is there a landmark nearby?', 'ಹತ್ತಿರದಲ್ಲಿ ಗುರುತಿನ ಸ್ಥಳ ಇದೆಯೇ?', 'hattiradalli gurutina sthala ideye'),
          p('Can I get there by metro?', 'ನಾನು ಮೆಟ್ರೋದಲ್ಲಿ ಅಲ್ಲಿಗೆ ಹೋಗಬಹುದೇ?', 'naanu metro dalli allige hogabahude'),
          p('Can I get there by bus?', 'ನಾನು ಬಸ್‌ನಲ್ಲಿ ಅಲ್ಲಿಗೆ ಹೋಗಬಹುದೇ?', 'naanu bus nalli allige hogabahude'),
          p('Please tell me the road name', 'ದಯವಿಟ್ಟು ರಸ್ತೆಯ ಹೆಸರು ಹೇಳಿ', 'dayavittu rasteya hesaru heli'),
          p('Is the bridge nearby?', 'ಸೇತುವೆ ಹತ್ತಿರದಲ್ಲಿದೆಯೇ?', 'setuve hattiradallideye'),
          p('Where is the crossing?', 'ಕ್ರಾಸಿಂಗ್ ಎಲ್ಲಿದೆ?', 'crossing ellide'),
          p('Thank you for your help', 'ನಿಮ್ಮ ಸಹಾಯಕ್ಕೆ ಧನ್ಯವಾದಗಳು', 'nimma sahaayakke dhanyavaadagalu')
        ]
      }
    ]
  },

  {
    id: 'shopping',
    icon: '🛒',
    title: 'Shopping',
    blurb: 'Markets, groceries, clothes',
    scenarios: [
      {
        id: 'market',
        title: 'Market and bargaining',
        phrases: [
          p('How much is this?', 'ಇದರ ಬೆಲೆ ಎಷ್ಟು?', 'idara bele eshtu'),
          p('Reduce it a little', 'ಸ್ವಲ್ಪ ಕಡಿಮೆ ಮಾಡಿ', 'swalpa kadime maadi'),
          p('Half a kilo, please', 'ಅರ್ಧ ಕೆಜಿ ಕೊಡಿ', 'ardha kg kodi'),
          p('One kilo, please', 'ಒಂದು ಕೆಜಿ ಕೊಡಿ', 'ondu kg kodi'),
          p('What is the final price?', 'ಕೊನೆಯ ಬೆಲೆ ಎಷ್ಟು?', 'koneya bele eshtu'),
          p('That is too expensive', 'ಅದು ತುಂಬಾ ದುಬಾರಿ', 'adu tumbaa dubaari'),
          p('Can you give me a discount?', 'ನೀವು ರಿಯಾಯಿತಿ ಕೊಡಬಹುದೇ?', 'neevu riyaayiti kodabahude'),
          p('I am just looking', 'ನಾನು ಸುಮ್ಮನೆ ನೋಡುತ್ತಿದ್ದೇನೆ', 'naanu summane noduttiddene'),
          p('Do you have this in another colour?', 'ಇದು ಬೇರೆ ಬಣ್ಣದಲ್ಲಿ ಇದೆಯೇ?', 'idu bere bannadalli ideye'),
          p('Do you have a smaller size?', 'ಇದಕ್ಕಿಂತ ಚಿಕ್ಕ ಗಾತ್ರ ಇದೆಯೇ?', 'idakkintha chikka gaatra ideye'),
          p('Do you have a larger size?', 'ಇದಕ್ಕಿಂತ ದೊಡ್ಡ ಗಾತ್ರ ಇದೆಯೇ?', 'idakkintha dodda gaatra ideye'),
          p('Can I try this on?', 'ನಾನು ಇದನ್ನು ಧರಿಸಿ ನೋಡಬಹುದೇ?', 'naanu idannu dharisi nodabahude'),
          p('Where is the fitting room?', 'ಬಟ್ಟೆ ಬದಲಿಸುವ ಕೊಠಡಿ ಎಲ್ಲಿದೆ?', 'batte badalisuva kothadi ellide'),
          p('I will take this', 'ನಾನು ಇದನ್ನು ತೆಗೆದುಕೊಳ್ಳುತ್ತೇನೆ', 'naanu idannu tegedukolluttene'),
          p('I do not want this', 'ನನಗೆ ಇದು ಬೇಡ', 'nanage idu beda'),
          p('Please pack it', 'ದಯವಿಟ್ಟು ಪ್ಯಾಕ್ ಮಾಡಿ', 'dayavittu pack maadi'),
          p('Can I pay by card?', 'ನಾನು ಕಾರ್ಡ್ ಮೂಲಕ ಪಾವತಿಸಬಹುದೇ?', 'naanu card moolaka paavatisabahude'),
          p('Can I pay by UPI?', 'ನಾನು ಯುಪಿಐ ಮೂಲಕ ಪಾವತಿಸಬಹುದೇ?', 'naanu UPI moolaka paavatisabahude'),
          p('Please give me a receipt', 'ದಯವಿಟ್ಟು ರಸೀದಿ ಕೊಡಿ', 'dayavittu raseedi kodi'),
          p('Do you have a bag?', 'ನಿಮ್ಮ ಬಳಿ ಚೀಲ ಇದೆಯೇ?', 'nimma bali cheela ideye')
        ]
      },
      {
        id: 'groceries',
        title: 'Groceries and quantities',
        phrases: [
          p('Give me two kilos', 'ಎರಡು ಕೆಜಿ ಕೊಡಿ', 'eradu kg kodi'),
          p('Give me 250 grams', '250 ಗ್ರಾಂ ಕೊಡಿ', '250 gram kodi'),
          p('Give me a quarter kilo', 'ಕಾಲು ಕೆಜಿ ಕೊಡಿ', 'kaalu kg kodi'),
          p('I need fresh vegetables', 'ನನಗೆ ತಾಜಾ ತರಕಾರಿಗಳು ಬೇಕು', 'nanage taaja tarakaarigalu beku'),
          p('Are these fresh?', 'ಇವು ತಾಜಾವಾಗಿವೆಯೇ?', 'ivu taajaavaagiveye'),
          p('Give me ripe bananas', 'ಹಣ್ಣಾದ ಬಾಳೆಹಣ್ಣು ಕೊಡಿ', 'hannaada baalehannu kodi'),
          p('I need potatoes', 'ನನಗೆ ಆಲೂಗಡ್ಡೆ ಬೇಕು', 'nanage aalugadde beku'),
          p('I need onions', 'ನನಗೆ ಈರುಳ್ಳಿ ಬೇಕು', 'nanage eerulli beku'),
          p('I need tomatoes', 'ನನಗೆ ಟೊಮೇಟೊ ಬೇಕು', 'nanage tomato beku'),
          p('I need green chillies', 'ನನಗೆ ಹಸಿಮೆಣಸಿನಕಾಯಿ ಬೇಕು', 'nanage hasimenasinakaayi beku'),
          p('Give me coriander leaves', 'ಕೊತ್ತಂಬರಿ ಸೊಪ್ಪು ಕೊಡಿ', 'kottambari soppu kodi'),
          p('Give me curry leaves', 'ಕರಿಬೇವು ಕೊಡಿ', 'karibevu kodi'),
          p('Do you have rice?', 'ನಿಮ್ಮ ಬಳಿ ಅಕ್ಕಿ ಇದೆಯೇ?', 'nimma bali akki ideye'),
          p('Which rice is good?', 'ಯಾವ ಅಕ್ಕಿ ಚೆನ್ನಾಗಿದೆ?', 'yaava akki chennagide'),
          p('Give me one litre of milk', 'ಒಂದು ಲೀಟರ್ ಹಾಲು ಕೊಡಿ', 'ondu litre haalu kodi'),
          p('Give me a dozen eggs', 'ಒಂದು ಡಜನ್ ಮೊಟ್ಟೆ ಕೊಡಿ', 'ondu dozen motte kodi'),
          p('Is this product expired?', 'ಈ ವಸ್ತುವಿನ ಅವಧಿ ಮುಗಿದಿದೆಯೇ?', 'ee vastuvina avadhi mugidideye'),
          p('Please weigh it again', 'ದಯವಿಟ್ಟು ಮತ್ತೆ ತೂಕ ಮಾಡಿ', 'dayavittu matte tooka maadi'),
          p('That is enough, thank you', 'ಅಷ್ಟು ಸಾಕು, ಧನ್ಯವಾದಗಳು', 'ashtu saaku, dhanyavaadagalu'),
          p('Please put these separately', 'ದಯವಿಟ್ಟು ಇವುಗಳನ್ನು ಪ್ರತ್ಯೇಕವಾಗಿ ಇಡಿ', 'dayavittu ivugalannu pratyekavaagi idi')
        ]
      },
      {
        id: 'clothes',
        title: 'Clothes and accessories',
        phrases: [
          p('Where are the shirts?', 'ಶರ್ಟ್‌ಗಳು ಎಲ್ಲಿವೆ?', 'shirts ellive'),
          p('Where are the trousers?', 'ಪ್ಯಾಂಟ್‌ಗಳು ಎಲ್ಲಿವೆ?', 'pants ellive'),
          p('I need a cotton shirt', 'ನನಗೆ ಹತ್ತಿಯ ಶರ್ಟ್ ಬೇಕು', 'nanage hattiya shirt beku'),
          p('Is this washable?', 'ಇದನ್ನು ತೊಳೆಯಬಹುದೇ?', 'idannu toleyabahude'),
          p('Does this come in black?', 'ಇದು ಕಪ್ಪು ಬಣ್ಣದಲ್ಲಿ ಸಿಗುತ್ತದೆಯೇ?', 'idu kappu bannadalli siguttadeye'),
          p('Does this come in blue?', 'ಇದು ನೀಲಿ ಬಣ್ಣದಲ್ಲಿ ಸಿಗುತ್ತದೆಯೇ?', 'idu neeli bannadalli siguttadeye'),
          p('I need a pair of shoes', 'ನನಗೆ ಒಂದು ಜೋಡಿ ಶೂ ಬೇಕು', 'nanage ondu jodi shoe beku'),
          p('Where are the sandals?', 'ಚಪ್ಪಲಿಗಳು ಎಲ್ಲಿವೆ?', 'chappaligalu ellive'),
          p('Can I exchange this?', 'ನಾನು ಇದನ್ನು ಬದಲಾಯಿಸಬಹುದೇ?', 'naanu idannu badalaayisabahude'),
          p('What is the return policy?', 'ಹಿಂತಿರುಗಿಸುವ ನಿಯಮ ಏನು?', 'hintirugisuva niyama enu'),
          p('Is there a warranty?', 'ವಾರಂಟಿ ಇದೆಯೇ?', 'warranty ideye'),
          p('This is too tight', 'ಇದು ತುಂಬಾ ಬಿಗಿಯಾಗಿದೆ', 'idu tumbaa bigiyaagide'),
          p('This is too loose', 'ಇದು ತುಂಬಾ ಸಡಿಲವಾಗಿದೆ', 'idu tumbaa sadilavaagide'),
          p('Do you sell belts?', 'ನೀವು ಬೆಲ್ಟ್‌ಗಳನ್ನು ಮಾರುತ್ತೀರಾ?', 'neevu beltgalannu maarutteera'),
          p('Do you sell umbrellas?', 'ನೀವು ಛತ್ರಿಗಳನ್ನು ಮಾರುತ್ತೀರಾ?', 'neevu chhatrigalannu maarutteera'),
          p('Do you have a larger bag?', 'ದೊಡ್ಡ ಚೀಲ ಇದೆಯೇ?', 'dodda cheela ideye'),
          p('Is this handmade?', 'ಇದು ಕೈಯಿಂದ ಮಾಡಿದುದೇ?', 'idu kaiyinda maadidude'),
          p('What material is this?', 'ಇದು ಯಾವ ವಸ್ತುವಿನಿಂದ ಮಾಡಲಾಗಿದೆ?', 'idu yaava vastuvininda maadalagide'),
          p('Can you wrap this as a gift?', 'ಇದನ್ನು ಉಡುಗೊರೆಯಾಗಿ ಸುತ್ತಿಕೊಡಬಹುದೇ?', 'idannu udugoreyaagi suttikodabahude'),
          p('I will come back later', 'ನಾನು ನಂತರ ಮತ್ತೆ ಬರುತ್ತೇನೆ', 'naanu nantara matte baruttene')
        ]
      }
    ]
  },

  {
    id: 'healthcare',
    icon: '🏥',
    title: 'Healthcare',
    blurb: 'Symptoms, clinics, pharmacy',
    scenarios: [
      {
        id: 'symptoms',
        title: 'Describing symptoms',
        phrases: [
          p('I have a fever', 'ನನಗೆ ಜ್ವರ ಇದೆ', 'nanage jvara ide'),
          p('I have a headache', 'ನನಗೆ ತಲೆನೋವು ಇದೆ', 'nanage thale novu ide'),
          p('I have a stomach ache', 'ನನಗೆ ಹೊಟ್ಟೆ ನೋವು ಇದೆ', 'nanage hotte novu ide'),
          p('I have a cough', 'ನನಗೆ ಕೆಮ್ಮು ಇದೆ', 'nanage kemmu ide'),
          p('I have a sore throat', 'ನನಗೆ ಗಂಟಲು ನೋವು ಇದೆ', 'nanage gantalu novu ide'),
          p('I have a cold', 'ನನಗೆ ಶೀತವಾಗಿದೆ', 'nanage sheetavaagide'),
          p('I feel dizzy', 'ನನಗೆ ತಲೆ ಸುತ್ತುತ್ತಿದೆ', 'nanage tale suttuttide'),
          p('I feel nauseous', 'ನನಗೆ ವಾಕರಿಕೆ ಬರುತ್ತಿದೆ', 'nanage vaakarike baruttide'),
          p('I have back pain', 'ನನಗೆ ಬೆನ್ನು ನೋವು ಇದೆ', 'nanage bennu novu ide'),
          p('My tooth hurts', 'ನನ್ನ ಹಲ್ಲು ನೋಯುತ್ತಿದೆ', 'nanna hallu noyuttide'),
          p('My ear hurts', 'ನನ್ನ ಕಿವಿ ನೋಯುತ್ತಿದೆ', 'nanna kivi noyuttide'),
          p('I have an allergy', 'ನನಗೆ ಅಲರ್ಜಿ ಇದೆ', 'nanage allergy ide'),
          p('I have a rash', 'ನನ್ನ ಚರ್ಮದ ಮೇಲೆ ದದ್ದುಗಳಿವೆ', 'nanna charmada mele daddugalive'),
          p('I have trouble breathing', 'ನನಗೆ ಉಸಿರಾಡಲು ತೊಂದರೆ ಆಗುತ್ತಿದೆ', 'nanage usiraadalu tondare aaguttide'),
          p('I feel weak', 'ನನಗೆ ದೌರ್ಬಲ್ಯ ಅನಿಸುತ್ತಿದೆ', 'nanage daurbalya anisuttide'),
          p('I have had this pain since yesterday', 'ನಿನ್ನೆಯಿಂದ ಈ ನೋವು ಇದೆ', 'ninneyinda ee novu ide'),
          p('The pain comes and goes', 'ನೋವು ಆಗಾಗ ಬರುತ್ತದೆ ಮತ್ತು ಹೋಗುತ್ತದೆ', 'novu aagaaga baruttade mattu hoguttade'),
          p('I need a doctor', 'ನನಗೆ ವೈದ್ಯರು ಬೇಕು', 'nanage vaidyaru beku'),
          p('Is this an emergency?', 'ಇದು ತುರ್ತು ಪರಿಸ್ಥಿತಿಯೇ?', 'idu turtu paristhitiye'),
          p('Please call an ambulance', 'ದಯವಿಟ್ಟು ಆಂಬುಲೆನ್ಸ್ ಕರೆಸಿ', 'dayavittu ambulance karesi')
        ]
      },
      {
        id: 'clinic',
        title: 'At the clinic',
        phrases: [
          p('Where is the clinic?', 'ಕ್ಲಿನಿಕ್ ಎಲ್ಲಿದೆ?', 'clinic ellide'),
          p('I have an appointment', 'ನನಗೆ ಅಪಾಯಿಂಟ್‌ಮೆಂಟ್ ಇದೆ', 'nanage appointment ide'),
          p('I do not have an appointment', 'ನನಗೆ ಅಪಾಯಿಂಟ್‌ಮೆಂಟ್ ಇಲ್ಲ', 'nanage appointment illa'),
          p('Can I see the doctor today?', 'ನಾನು ಇಂದು ವೈದ್ಯರನ್ನು ಭೇಟಿಯಾಗಬಹುದೇ?', 'naanu indu vaidyarannu bhetiyaagabahude'),
          p('How long is the wait?', 'ಇನ್ನೆಷ್ಟು ಹೊತ್ತು ಕಾಯಬೇಕು?', 'inneshtu hottu kaayabeku'),
          p('Where do I register?', 'ನಾನು ಎಲ್ಲಿ ನೋಂದಣಿ ಮಾಡಿಸಬೇಕು?', 'naanu elli nondani maadisabeku'),
          p('Please speak slowly', 'ದಯವಿಟ್ಟು ನಿಧಾನವಾಗಿ ಮಾತನಾಡಿ', 'dayavittu nidhaanavaagi maatanaadi'),
          p('I do not understand', 'ನನಗೆ ಅರ್ಥವಾಗುತ್ತಿಲ್ಲ', 'nanage arthavaaguttilla'),
          p('Can you write that down?', 'ಅದನ್ನು ಬರೆದು ಕೊಡಬಹುದೇ?', 'adannu baredu kodabahude'),
          p('I take this medicine regularly', 'ನಾನು ಈ ಔಷಧಿಯನ್ನು ನಿಯಮಿತವಾಗಿ ತೆಗೆದುಕೊಳ್ಳುತ್ತೇನೆ', 'naanu ee aushadhiyannu niyamitavaagi tegedukolluttene'),
          p('I have a medical allergy', 'ನನಗೆ ಔಷಧಿಯ ಅಲರ್ಜಿ ಇದೆ', 'nanage aushadhiya allergy ide'),
          p('I am taking other medicines', 'ನಾನು ಬೇರೆ ಔಷಧಿಗಳನ್ನು ತೆಗೆದುಕೊಳ್ಳುತ್ತಿದ್ದೇನೆ', 'naanu bere aushadhigalannu tegedukolluttiddene'),
          p('Do I need a test?', 'ನನಗೆ ಪರೀಕ್ಷೆ ಮಾಡಿಸಬೇಕೇ?', 'nanage pareekshe maadisabeke'),
          p('Where is the laboratory?', 'ಪ್ರಯೋಗಾಲಯ ಎಲ್ಲಿದೆ?', 'prayogaalaya ellide'),
          p('When will the results be ready?', 'ಫಲಿತಾಂಶಗಳು ಯಾವಾಗ ಸಿದ್ಧವಾಗುತ್ತವೆ?', 'phalitaamshagalu yaavaga siddhavaaguttave'),
          p('Should I come back?', 'ನಾನು ಮತ್ತೆ ಬರಬೇಕೇ?', 'naanu matte barabeke'),
          p('When should I return?', 'ನಾನು ಯಾವಾಗ ಮತ್ತೆ ಬರಬೇಕು?', 'naanu yaavaga matte barabeku'),
          p('Can you explain the instructions?', 'ಸೂಚನೆಗಳನ್ನು ವಿವರಿಸಬಹುದೇ?', 'soochanegalannu vivarisabahude'),
          p('Where do I pay?', 'ನಾನು ಎಲ್ಲಿ ಹಣ ಪಾವತಿಸಬೇಕು?', 'naanu elli hana paavatisabeku'),
          p('Please give me a copy of the report', 'ದಯವಿಟ್ಟು ವರದಿಯ ಪ್ರತಿಯನ್ನು ಕೊಡಿ', 'dayavittu varadiya pratiyannu kodi')
        ]
      },
      {
        id: 'pharmacy',
        title: 'Pharmacy',
        phrases: [
          p('Where is the pharmacy?', 'ಫಾರ್ಮಸಿ ಎಲ್ಲಿದೆ?', 'pharmacy ellide'),
          p('Do you have this medicine?', 'ಈ ಔಷಧಿ ನಿಮ್ಮ ಬಳಿ ಇದೆಯೇ?', 'ee aushadhi nimma bali ideye'),
          p('I have a prescription', 'ನನ್ನ ಬಳಿ ವೈದ್ಯರ ಚೀಟಿ ಇದೆ', 'nanna bali vaidyara cheeti ide'),
          p('Do I need a prescription?', 'ವೈದ್ಯರ ಚೀಟಿ ಬೇಕೇ?', 'vaidyara cheeti beke'),
          p('How should I take this medicine?', 'ಈ ಔಷಧಿಯನ್ನು ಹೇಗೆ ತೆಗೆದುಕೊಳ್ಳಬೇಕು?', 'ee aushadhiyannu hege tegedukollabeku'),
          p('How often should I take it?', 'ಇದನ್ನು ಎಷ್ಟು ಬಾರಿ ತೆಗೆದುಕೊಳ್ಳಬೇಕು?', 'idannu eshtu baari tegedukollabeku'),
          p('Should I take it with food?', 'ಇದನ್ನು ಊಟದ ಜೊತೆ ತೆಗೆದುಕೊಳ್ಳಬೇಕೇ?', 'idannu oota da jote tegedukollabeke'),
          p('Are there any side effects?', 'ಇದರಿಂದ ಅಡ್ಡಪರಿಣಾಮಗಳಿವೆಯೇ?', 'idarinda addaparinaamagaliveye'),
          p('Is there a generic version?', 'ಇದಕ್ಕೆ ಜನರಿಕ್ ಔಷಧಿ ಇದೆಯೇ?', 'idakke generic aushadhi ideye'),
          p('How much does it cost?', 'ಇದರ ಬೆಲೆ ಎಷ್ಟು?', 'idara bele eshtu'),
          p('Do you have bandages?', 'ನಿಮ್ಮ ಬಳಿ ಬ್ಯಾಂಡೇಜ್ ಇದೆಯೇ?', 'nimma bali bandage ideye'),
          p('Do you have a thermometer?', 'ನಿಮ್ಮ ಬಳಿ ಥರ್ಮಾಮೀಟರ್ ಇದೆಯೇ?', 'nimma bali thermometer ideye'),
          p('I need oral rehydration salts', 'ನನಗೆ ORS ಬೇಕು', 'nanage ORS beku'),
          p('Please check the expiry date', 'ದಯವಿಟ್ಟು ಅವಧಿ ಮುಗಿದ ದಿನಾಂಕ ನೋಡಿ', 'dayavittu avadhi mugida dinaanka nodi'),
          p('Can I get a smaller pack?', 'ಚಿಕ್ಕ ಪ್ಯಾಕ್ ಸಿಗುತ್ತದೆಯೇ?', 'chikka pack siguttadeye'),
          p('Do you deliver medicines?', 'ನೀವು ಔಷಧಿಗಳನ್ನು ಮನೆಗೆ ತಲುಪಿಸುತ್ತೀರಾ?', 'neevu aushadhigalannu manege talupisutteera'),
          p('Is this medicine available?', 'ಈ ಔಷಧಿ ಸಿಗುತ್ತದೆಯೇ?', 'ee aushadhi siguttadeye'),
          p('Can you print the bill?', 'ಬಿಲ್ ಮುದ್ರಿಸಿ ಕೊಡಬಹುದೇ?', 'bill mudrisi kodabahude'),
          p('I need medicine for a child', 'ನನಗೆ ಮಗುವಿಗೆ ಔಷಧಿ ಬೇಕು', 'nanage maguvige aushadhi beku'),
          p('Thank you, that is all', 'ಧನ್ಯವಾದಗಳು, ಇಷ್ಟೇ ಸಾಕು', 'dhanyavaadagalu, ishte saaku')
        ]
      }
    ]
  },

  {
    id: 'travel',
    icon: '🧳',
    title: 'Travelling',
    blurb: 'Sightseeing, hotels, restaurants',
    scenarios: [
      {
        id: 'sightseeing',
        title: 'Sightseeing',
        phrases: [
          p('What is the ticket price?', 'ಟಿಕೆಟ್ ಬೆಲೆ ಎಷ್ಟು?', 'ticket bele eshtu'),
          p('Can I take photos here?', 'ಇಲ್ಲಿ ಫೋಟೋ ತೆಗೆಯಬಹುದಾ?', 'illi photo tegeyabahuda'),
          p('Where is the toilet?', 'ಶೌಚಾಲಯ ಎಲ್ಲಿದೆ?', 'shouchaalaya ellide'),
          p('What time does it open?', 'ಇದು ಎಷ್ಟು ಗಂಟೆಗೆ ತೆರೆಯುತ್ತದೆ?', 'idu eshtu gantege tereyuttade'),
          p('What time does it close?', 'ಇದು ಎಷ್ಟು ಗಂಟೆಗೆ ಮುಚ್ಚುತ್ತದೆ?', 'idu eshtu gantege muchchuttade'),
          p('Is there a student discount?', 'ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ ರಿಯಾಯಿತಿ ಇದೆಯೇ?', 'vidyaarthigalige riyaayiti ideye'),
          p('Is a guide available?', 'ಮಾರ್ಗದರ್ಶಕರು ಲಭ್ಯವಿದ್ದಾರೆಯೇ?', 'maargadarshakaru labhyaviddareye'),
          p('How long does the tour take?', 'ಪ್ರವಾಸಕ್ಕೆ ಎಷ್ಟು ಸಮಯ ಬೇಕು?', 'pravaasakke eshtu samaya beku'),
          p('Is this place open today?', 'ಈ ಸ್ಥಳ ಇಂದು ತೆರೆದಿದೆಯೇ?', 'ee sthala indu teredideye'),
          p('Can I buy tickets online?', 'ನಾನು ಆನ್‌ಲೈನ್‌ನಲ್ಲಿ ಟಿಕೆಟ್ ಖರೀದಿಸಬಹುದೇ?', 'naanu online nalli ticket khareedisabahude'),
          p('Where is the entrance?', 'ಪ್ರವೇಶದ್ವಾರ ಎಲ್ಲಿದೆ?', 'praveshadvaara ellide'),
          p('Where is the exit?', 'ನಿರ್ಗಮನ ದ್ವಾರ ಎಲ್ಲಿದೆ?', 'nirgamana dvaara ellide'),
          p('Are there lockers here?', 'ಇಲ್ಲಿ ಲಾಕರ್‌ಗಳಿವೆಯೇ?', 'illi lockers iveye'),
          p('Is there a place to sit?', 'ಕುಳಿತುಕೊಳ್ಳಲು ಸ್ಥಳ ಇದೆಯೇ?', 'kulitukollalu sthala ideye'),
          p('Please take a photo of us', 'ದಯವಿಟ್ಟು ನಮ್ಮ ಫೋಟೋ ತೆಗೆದು ಕೊಡಿ', 'dayavittu namma photo tegedu kodi'),
          p('Is this area accessible?', 'ಈ ಪ್ರದೇಶಕ್ಕೆ ಸುಲಭವಾಗಿ ಹೋಗಬಹುದೇ?', 'ee pradeshakke sulabhavaagi hogabahude'),
          p('Can I bring food inside?', 'ನಾನು ಒಳಗೆ ಆಹಾರ ತರಬಹುದೇ?', 'naanu olage aahaara tarabahude'),
          p('Where can I buy souvenirs?', 'ನೆನಪಿನ ವಸ್ತುಗಳನ್ನು ಎಲ್ಲಿ ಖರೀದಿಸಬಹುದು?', 'nenapina vastugalannu elli khareedisabahudu'),
          p('Is there a drinking water station?', 'ಕುಡಿಯುವ ನೀರಿನ ಸ್ಥಳ ಇದೆಯೇ?', 'kudiyuva neerina sthala ideye'),
          p('Thank you, I enjoyed the visit', 'ಧನ್ಯವಾದಗಳು, ಭೇಟಿ ಚೆನ್ನಾಗಿತ್ತು', 'dhanyavaadagalu, bheti chennagittu')
        ]
      },
      {
        id: 'hotel',
        title: 'Hotel and accommodation',
        phrases: [
          p('I have a booking', 'ನನ್ನ ಬಳಿ ಬುಕಿಂಗ್ ಇದೆ', 'nanna bali booking ide'),
          p('I would like to book a room', 'ನನಗೆ ಒಂದು ಕೊಠಡಿ ಬುಕ್ ಮಾಡಬೇಕು', 'nanage ondu kothadi book maadabeku'),
          p('Do you have a room available?', 'ಕೊಠಡಿ ಖಾಲಿ ಇದೆಯೇ?', 'kothadi khaali ideye'),
          p('How much is one night?', 'ಒಂದು ರಾತ್ರಿಗೆ ಎಷ್ಟು?', 'ondu raatrige eshtu'),
          p('Is breakfast included?', 'ಉಪಾಹಾರ ಸೇರಿಸಲಾಗಿದೆಯೇ?', 'upaahaara serisalagideye'),
          p('What time is check-in?', 'ಚೆಕ್-ಇನ್ ಸಮಯ ಎಷ್ಟು?', 'check-in samaya eshtu'),
          p('What time is check-out?', 'ಚೆಕ್-ಔಟ್ ಸಮಯ ಎಷ್ಟು?', 'check-out samaya eshtu'),
          p('Can I see the room first?', 'ಮೊದಲು ಕೊಠಡಿಯನ್ನು ನೋಡಬಹುದೇ?', 'modalu kothadiyannu nodabahude'),
          p('The air conditioning is not working', 'ಏರ್ ಕಂಡೀಷನರ್ ಕೆಲಸ ಮಾಡುತ್ತಿಲ್ಲ', 'air conditioner kelasa maaduttilla'),
          p('There is no hot water', 'ಬಿಸಿ ನೀರು ಬರುತ್ತಿಲ್ಲ', 'bisi neeru baruttilla'),
          p('Can I get another towel?', 'ಇನ್ನೊಂದು ಟವೆಲ್ ಕೊಡಬಹುದೇ?', 'innondu towel kodabahude'),
          p('Please clean the room', 'ದಯವಿಟ್ಟು ಕೊಠಡಿಯನ್ನು ಸ್ವಚ್ಛಗೊಳಿಸಿ', 'dayavittu kothadiyannu swachchhagolisi'),
          p('Is Wi-Fi available?', 'ವೈ-ಫೈ ಇದೆಯೇ?', 'Wi-Fi ideye'),
          p('What is the Wi-Fi password?', 'ವೈ-ಫೈ ಪಾಸ್‌ವರ್ಡ್ ಏನು?', 'Wi-Fi password enu'),
          p('Can I leave my bags here?', 'ನನ್ನ ಚೀಲಗಳನ್ನು ಇಲ್ಲಿ ಇಡಬಹುದೇ?', 'nanna cheelagalannu illi idabahude'),
          p('Please call a taxi', 'ದಯವಿಟ್ಟು ಟ್ಯಾಕ್ಸಿ ಕರೆಸಿ', 'dayavittu taxi karesi'),
          p('I would like to extend my stay', 'ನಾನು ಇನ್ನೂ ಕೆಲವು ದಿನ ಉಳಿಯಬೇಕು', 'naanu innu kelavu dina uliyabeku'),
          p('Can I pay by card?', 'ನಾನು ಕಾರ್ಡ್ ಮೂಲಕ ಪಾವತಿಸಬಹುದೇ?', 'naanu card moolaka paavatisabahude'),
          p('Please give me the bill', 'ದಯವಿಟ್ಟು ಬಿಲ್ ಕೊಡಿ', 'dayavittu bill kodi'),
          p('I would like to check out', 'ನಾನು ಚೆಕ್-ಔಟ್ ಮಾಡಬೇಕು', 'naanu check-out maadabeku')
        ]
      },
      {
        id: 'restaurant',
        title: 'Restaurants and food',
        phrases: [
          p('Can I see the menu?', 'ಮೆನು ನೋಡಬಹುದೇ?', 'menu nodabahude'),
          p('A table for two, please', 'ಇಬ್ಬರಿಗೆ ಒಂದು ಮೇಜು ಬೇಕು', 'ibbarige ondu meju beku'),
          p('Is this vegetarian?', 'ಇದು ಸಸ್ಯಾಹಾರವೇ?', 'idu sasyahaarave'),
          p('Does this contain nuts?', 'ಇದರಲ್ಲಿ ಬೀಜಗಳಿವೆಯೇ?', 'idaralli beejagaliveye'),
          p('I do not eat spicy food', 'ನಾನು ಖಾರವಾದ ಆಹಾರ ತಿನ್ನುವುದಿಲ್ಲ', 'naanu khaaravaada aahaara tinnuvudilla'),
          p('Please make it less spicy', 'ದಯವಿಟ್ಟು ಖಾರ ಕಡಿಮೆ ಮಾಡಿ', 'dayavittu khaara kadime maadi'),
          p('I would like some water', 'ನನಗೆ ಸ್ವಲ್ಪ ನೀರು ಬೇಕು', 'nanage swalpa neeru beku'),
          p('Please bring the bill', 'ದಯವಿಟ್ಟು ಬಿಲ್ ತಂದು ಕೊಡಿ', 'dayavittu bill tandu kodi'),
          p('Is service charge included?', 'ಸೇವಾ ಶುಲ್ಕ ಸೇರಿಸಲಾಗಿದೆಯೇ?', 'sevaa shulka serisalagideye'),
          p('Can I get this without onion?', 'ಈರುಳ್ಳಿ ಇಲ್ಲದೆ ಇದನ್ನು ಕೊಡಬಹುದೇ?', 'eerulli illade idannu kodabahude'),
          p('Is this freshly made?', 'ಇದನ್ನು ಈಗ ತಯಾರಿಸಿದ್ದಾರೆಯೇ?', 'idannu eega tayaarisiddaareye'),
          p('What do you recommend?', 'ನೀವು ಯಾವುದನ್ನು ಶಿಫಾರಸು ಮಾಡುತ್ತೀರಿ?', 'neevu yaavudannu shiphaarasu maadutteeri'),
          p('I would like takeaway', 'ನನಗೆ ಪಾರ್ಸೆಲ್ ಬೇಕು', 'nanage parcel beku'),
          p('Can we share this dish?', 'ನಾವು ಈ ಖಾದ್ಯವನ್ನು ಹಂಚಿಕೊಳ್ಳಬಹುದೇ?', 'naavu ee khaadyavannu hanchikollabahude'),
          p('I am allergic to peanuts', 'ನನಗೆ ಕಡಲೆಕಾಯಿ ಅಲರ್ಜಿ ಇದೆ', 'nanage kadalekaayi allergy ide'),
          p('Please pack the leftovers', 'ಉಳಿದ ಆಹಾರವನ್ನು ಪ್ಯಾಕ್ ಮಾಡಿ', 'ulida aahaaravannu pack maadi'),
          p('Is there a queue?', 'ಸರತಿ ಸಾಲು ಇದೆಯೇ?', 'sarati saalu ideye'),
          p('Where can I wash my hands?', 'ನಾನು ಎಲ್ಲಿ ಕೈ ತೊಳೆಯಬಹುದು?', 'naanu elli kai toleyabahudu'),
          p('The food is delicious', 'ಆಹಾರ ರುಚಿಯಾಗಿದೆ', 'aahaara ruchiyaagide'),
          p('Thank you for the meal', 'ಊಟಕ್ಕೆ ಧನ್ಯವಾದಗಳು', 'ootakke dhanyavaadagalu')
        ]
      }
    ]
  },

  {
    id: 'education',
    icon: '🎓',
    title: 'Education',
    blurb: 'Classroom, campus, exams',
    scenarios: [
      {
        id: 'class',
        title: 'Classroom basics',
        phrases: [
          p('Please say it once more', 'ದಯವಿಟ್ಟು ಇನ್ನೊಮ್ಮೆ ಹೇಳಿ', 'dayavittu innomme heli'),
          p('What does this mean?', 'ಇದರ ಅರ್ಥ ಏನು?', 'idara artha enu'),
          p('Where is the library?', 'ಗ್ರಂಥಾಲಯ ಎಲ್ಲಿದೆ?', 'granthaalaya ellide'),
          p('I have a question', 'ನನಗೆ ಒಂದು ಪ್ರಶ್ನೆ ಇದೆ', 'nanage ondu prashne ide'),
          p('Could you explain this?', 'ಇದನ್ನು ವಿವರಿಸಬಹುದೇ?', 'idannu vivarisabahude'),
          p('I did not understand', 'ನನಗೆ ಅರ್ಥವಾಗಲಿಲ್ಲ', 'nanage arthavaagalilla'),
          p('Please speak more slowly', 'ದಯವಿಟ್ಟು ಇನ್ನೂ ನಿಧಾನವಾಗಿ ಮಾತನಾಡಿ', 'dayavittu innu nidhaanavaagi maatanaadi'),
          p('Can you write it on the board?', 'ಇದನ್ನು ಬೋರ್ಡ್ ಮೇಲೆ ಬರೆಯಬಹುದೇ?', 'idannu board mele bareyabahude'),
          p('Which page are we on?', 'ನಾವು ಯಾವ ಪುಟದಲ್ಲಿದ್ದೇವೆ?', 'naavu yaava putadalliddeve'),
          p('What is the homework?', 'ಮನೆಕೆಲಸ ಏನು?', 'manekelasa enu'),
          p('When is the assignment due?', 'ಅಸೈನ್‌ಮೆಂಟ್ ಸಲ್ಲಿಸಲು ಕೊನೆಯ ದಿನ ಯಾವುದು?', 'assignment sallisalu koneya dina yaavudu'),
          p('May I come in?', 'ನಾನು ಒಳಗೆ ಬರಬಹುದೇ?', 'naanu olage barabahude'),
          p('May I leave early today?', 'ನಾನು ಇಂದು ಬೇಗ ಹೋಗಬಹುದೇ?', 'naanu indu bega hogabahude'),
          p('I was absent yesterday', 'ನಾನು ನಿನ್ನೆ ಗೈರುಹಾಜರಾಗಿದ್ದೆ', 'naanu ninne gairuhaajaraagidde'),
          p('Can I borrow a pen?', 'ನಾನು ಪೆನ್ ಸಾಲವಾಗಿ ಪಡೆಯಬಹುದೇ?', 'naanu pen saalavaagi padeyabahude'),
          p('I forgot my notebook', 'ನನ್ನ ನೋಟ್‌ಬುಕ್ ಮರೆತಿದ್ದೇನೆ', 'nanna notebook maretiddene'),
          p('Can you share your notes?', 'ನಿಮ್ಮ ಟಿಪ್ಪಣಿಗಳನ್ನು ಹಂಚಿಕೊಳ್ಳಬಹುದೇ?', 'nimma tippanigalannu hanchikollabahude'),
          p('What is the answer to question one?', 'ಮೊದಲ ಪ್ರಶ್ನೆಯ ಉತ್ತರ ಏನು?', 'modala prashneya uttara enu'),
          p('Is this going to be on the exam?', 'ಇದು ಪರೀಕ್ಷೆಯಲ್ಲಿ ಬರುತ್ತದೆಯೇ?', 'idu pareeksheyalli baruttadeye'),
          p('Thank you for explaining', 'ವಿವರಿಸಿದ್ದಕ್ಕೆ ಧನ್ಯವಾದಗಳು', 'vivarisiddakke dhanyavaadagalu')
        ]
      },
      {
        id: 'campus',
        title: 'Campus and facilities',
        phrases: [
          p('Where is the classroom?', 'ತರಗತಿ ಕೊಠಡಿ ಎಲ್ಲಿದೆ?', 'taragati kothadi ellide'),
          p('Where is the administration office?', 'ಆಡಳಿತ ಕಚೇರಿ ಎಲ್ಲಿದೆ?', 'aadalita kacheri ellide'),
          p('Where is the computer lab?', 'ಕಂಪ್ಯೂಟರ್ ಪ್ರಯೋಗಾಲಯ ಎಲ್ಲಿದೆ?', 'computer prayogaalaya ellide'),
          p('Where is the science lab?', 'ವಿಜ್ಞಾನ ಪ್ರಯೋಗಾಲಯ ಎಲ್ಲಿದೆ?', 'vijnaana prayogaalaya ellide'),
          p('Where is the student office?', 'ವಿದ್ಯಾರ್ಥಿ ಕಚೇರಿ ಎಲ್ಲಿದೆ?', 'vidyaarthi kacheri ellide'),
          p('Where can I get my student ID?', 'ವಿದ್ಯಾರ್ಥಿ ಗುರುತಿನ ಚೀಟಿ ಎಲ್ಲಿ ಸಿಗುತ್ತದೆ?', 'vidyaarthi gurutina cheeti elli siguttade'),
          p('How do I connect to campus Wi-Fi?', 'ಕ್ಯಾಂಪಸ್ ವೈ-ಫೈಗೆ ಹೇಗೆ ಸಂಪರ್ಕಿಸಬೇಕು?', 'campus Wi-Fi ge hege samparkisabeku'),
          p('Where is the notice board?', 'ಸೂಚನಾ ಫಲಕ ಎಲ್ಲಿದೆ?', 'soochanaa phalaka ellide'),
          p('Where is the auditorium?', 'ಸಭಾಂಗಣ ಎಲ್ಲಿದೆ?', 'sabhaangana ellide'),
          p('Where is the cafeteria?', 'ಕೆಫೆಟೇರಿಯಾ ಎಲ್ಲಿದೆ?', 'cafeteria ellide'),
          p('What are the library hours?', 'ಗ್ರಂಥಾಲಯದ ಸಮಯ ಏನು?', 'granthaalayada samaya enu'),
          p('Can I renew this book?', 'ಈ ಪುಸ್ತಕವನ್ನು ನವೀಕರಿಸಬಹುದೇ?', 'ee pustakavannu naveekarisabahude'),
          p('When is this book due?', 'ಈ ಪುಸ್ತಕವನ್ನು ಯಾವಾಗ ಹಿಂತಿರುಗಿಸಬೇಕು?', 'ee pustakavannu yaavaga hintirugisabeku'),
          p('Is this seat taken?', 'ಈ ಆಸನದಲ್ಲಿ ಯಾರಾದರೂ ಕುಳಿತಿದ್ದಾರೆಯೇ?', 'ee aasanadalli yaaradaru kulitiddaareye'),
          p('Where can I print a document?', 'ದಾಖಲೆಯನ್ನು ಎಲ್ಲಿ ಮುದ್ರಿಸಬಹುದು?', 'daakhaleyannu elli mudrisabahudu'),
          p('Where can I photocopy this?', 'ಇದನ್ನು ಎಲ್ಲಿ ಫೋಟೋಕಾಪಿ ಮಾಡಬಹುದು?', 'idannu elli photocopy maadabahudu'),
          p('How do I get to the hostel?', 'ವಿದ್ಯಾರ್ಥಿನಿಲಯಕ್ಕೆ ಹೇಗೆ ಹೋಗಬೇಕು?', 'vidyaarthinilayakke hege hogabeku'),
          p('Where is the sports ground?', 'ಕ್ರೀಡಾಂಗಣ ಎಲ್ಲಿದೆ?', 'kreedaangana ellide'),
          p('Is there a campus map?', 'ಕ್ಯಾಂಪಸ್ ನಕ್ಷೆ ಇದೆಯೇ?', 'campus nakshe ideye'),
          p('Who should I contact for help?', 'ಸಹಾಯಕ್ಕಾಗಿ ಯಾರನ್ನು ಸಂಪರ್ಕಿಸಬೇಕು?', 'sahaayakkaagi yaarannu samparkisabeku')
        ]
      },
      {
        id: 'exams',
        title: 'Exams and assignments',
        phrases: [
          p('When is the exam?', 'ಪರೀಕ್ಷೆ ಯಾವಾಗ?', 'pareekshe yaavaga'),
          p('Where is the exam hall?', 'ಪರೀಕ್ಷಾ ಕೊಠಡಿ ಎಲ್ಲಿದೆ?', 'pareekshaa kothadi ellide'),
          p('What is the syllabus?', 'ಪಠ್ಯಕ್ರಮ ಏನು?', 'pathyakrama enu'),
          p('How many marks is this worth?', 'ಇದಕ್ಕೆ ಎಷ್ಟು ಅಂಕಗಳಿವೆ?', 'idakke eshtu ankagalive'),
          p('When will the results be announced?', 'ಫಲಿತಾಂಶ ಯಾವಾಗ ಪ್ರಕಟವಾಗುತ್ತದೆ?', 'phalitaamsha yaavaga prakatavaaguttade'),
          p('Can I submit this online?', 'ಇದನ್ನು ಆನ್‌ಲೈನ್‌ನಲ್ಲಿ ಸಲ್ಲಿಸಬಹುದೇ?', 'idannu online nalli sallisabahude'),
          p('I need an extension', 'ನನಗೆ ಗಡುವು ವಿಸ್ತರಣೆ ಬೇಕು', 'nanage gaduvu vistarane beku'),
          p('I have submitted the assignment', 'ನಾನು ಅಸೈನ್‌ಮೆಂಟ್ ಸಲ್ಲಿಸಿದ್ದೇನೆ', 'naanu assignment sallisiddene'),
          p('I need help with this problem', 'ಈ ಸಮಸ್ಯೆಯಲ್ಲಿ ನನಗೆ ಸಹಾಯ ಬೇಕು', 'ee samasyeyalli nanage sahaaya beku'),
          p('Can we study together?', 'ನಾವು ಒಟ್ಟಿಗೆ ಓದಬಹುದೇ?', 'naavu ottige odabahude'),
          p('Which chapters should I study?', 'ನಾನು ಯಾವ ಅಧ್ಯಾಯಗಳನ್ನು ಓದಬೇಕು?', 'naanu yaava adhyaayagalannu odabeku'),
          p('Are calculators allowed?', 'ಕ್ಯಾಲ್ಕುಲೇಟರ್ ಬಳಸಲು ಅನುಮತಿ ಇದೆಯೇ?', 'calculator balasalu anumati ideye'),
          p('Can I use a dictionary?', 'ನಾನು ನಿಘಂಟು ಬಳಸಬಹುದೇ?', 'naanu nighantu balasabahude'),
          p('I need a copy of my transcript', 'ನನಗೆ ಅಂಕಪಟ್ಟಿಯ ಪ್ರತಿ ಬೇಕು', 'nanage ankapattiya prati beku'),
          p('How do I register for the course?', 'ಪಠ್ಯಕ್ರಮಕ್ಕೆ ಹೇಗೆ ನೋಂದಣಿ ಮಾಡಬೇಕು?', 'pathyakramakke hege nondani maadabeku'),
          p('Is attendance compulsory?', 'ಹಾಜರಾತಿ ಕಡ್ಡಾಯವೇ?', 'haajaraati kaddaayave'),
          p('I missed the lecture', 'ನಾನು ಉಪನ್ಯಾಸಕ್ಕೆ ಹಾಜರಾಗಲಿಲ್ಲ', 'naanu upanyaasakke haajaraagalilla'),
          p('Could you recommend a textbook?', 'ಒಂದು ಪಠ್ಯಪುಸ್ತಕವನ್ನು ಶಿಫಾರಸು ಮಾಡಬಹುದೇ?', 'ondu pathyapustakavannu shiphaarasu maadabahude'),
          p('Where can I find past papers?', 'ಹಿಂದಿನ ಪ್ರಶ್ನೆಪತ್ರಿಕೆಗಳು ಎಲ್ಲಿ ಸಿಗುತ್ತವೆ?', 'hindina prashnepatrikegalu elli siguttave'),
          p('Good luck with your exam', 'ನಿಮ್ಮ ಪರೀಕ್ಷೆಗೆ ಶುಭವಾಗಲಿ', 'nimma pareekshege shubhavaagali')
        ]
      }
    ]
  },

  {
    id: 'work',
    icon: '💼',
    title: 'Workplaces',
    blurb: 'Office, meetings, work tasks',
    scenarios: [
      {
        id: 'office',
        title: 'Office basics',
        phrases: [
          p('Hello, sir', 'ನಮಸ್ಕಾರ ಸರ್', 'namaskaara sir'),
          p('Can I take leave tomorrow?', 'ನಾನು ನಾಳೆ ರಜೆ ತೆಗೆದುಕೊಳ್ಳಬಹುದಾ?', 'naanu naale raje tegedukollabahuda'),
          p('Please explain once more', 'ದಯವಿಟ್ಟು ಇನ್ನೊಮ್ಮೆ ವಿವರಿಸಿ', 'dayavittu innomme vivarisi'),
          p('Good morning', 'ಶುಭೋದಯ', 'shubhodaya'),
          p('Good afternoon', 'ಶುಭ ಮಧ್ಯಾಹ್ನ', 'shubha madhyaahna'),
          p('Good evening', 'ಶುಭ ಸಂಜೆ', 'shubha sanje'),
          p('How are you?', 'ನೀವು ಹೇಗಿದ್ದೀರಿ?', 'neevu hegiddiri'),
          p('I am doing well, thank you', 'ನಾನು ಚೆನ್ನಾಗಿದ್ದೇನೆ, ಧನ್ಯವಾದಗಳು', 'naanu chennaagiddene, dhanyavaadagalu'),
          p('Could you help me, please?', 'ದಯವಿಟ್ಟು ನನಗೆ ಸಹಾಯ ಮಾಡಬಹುದೇ?', 'dayavittu nanage sahaaya maadabahude'),
          p('I will finish this today', 'ನಾನು ಇದನ್ನು ಇಂದು ಮುಗಿಸುತ್ತೇನೆ', 'naanu idannu indu mugisuttene'),
          p('I have completed the task', 'ನಾನು ಕೆಲಸ ಮುಗಿಸಿದ್ದೇನೆ', 'naanu kelasa mugisiddene'),
          p('I need more time', 'ನನಗೆ ಇನ್ನಷ್ಟು ಸಮಯ ಬೇಕು', 'nanage innashtu samaya beku'),
          p('I will send the email', 'ನಾನು ಇಮೇಲ್ ಕಳುಹಿಸುತ್ತೇನೆ', 'naanu email kaluhisuttene'),
          p('Did you receive my email?', 'ನನ್ನ ಇಮೇಲ್ ನಿಮಗೆ ತಲುಪಿದೆಯೇ?', 'nanna email nimage talupideye'),
          p('Could you check this document?', 'ಈ ದಾಖಲೆಯನ್ನು ಪರಿಶೀಲಿಸಬಹುದೇ?', 'ee daakhaleyannu parishilisabahude'),
          p('Where is the meeting room?', 'ಸಭೆಯ ಕೊಠಡಿ ಎಲ್ಲಿದೆ?', 'sabheya kothadi ellide'),
          p('I am running a little late', 'ನನಗೆ ಸ್ವಲ್ಪ ತಡವಾಗುತ್ತಿದೆ', 'nanage swalpa tadavaaguttide'),
          p('I will be there in ten minutes', 'ನಾನು ಹತ್ತು ನಿಮಿಷಗಳಲ್ಲಿ ಅಲ್ಲಿರುತ್ತೇನೆ', 'naanu hattu nimishagalalli allirutthene'),
          p('Thank you for your time', 'ನಿಮ್ಮ ಸಮಯಕ್ಕೆ ಧನ್ಯವಾದಗಳು', 'nimma samayakke dhanyavaadagalu'),
          p('Have a nice day', 'ನಿಮ್ಮ ದಿನ ಚೆನ್ನಾಗಿರಲಿ', 'nimma dina chennaagirali')
        ]
      },
      {
        id: 'meetings',
        title: 'Meetings and communication',
        phrases: [
          p('When is the meeting?', 'ಸಭೆ ಯಾವಾಗ?', 'sabhe yaavaga'),
          p('Has the meeting started?', 'ಸಭೆ ಪ್ರಾರಂಭವಾಗಿದೆಯೇ?', 'sabhe praarambhavaagideye'),
          p('Can we start now?', 'ನಾವು ಈಗ ಪ್ರಾರಂಭಿಸಬಹುದೇ?', 'naavu eega praarambhisabahude'),
          p('Please share the agenda', 'ದಯವಿಟ್ಟು ಸಭೆಯ ಕಾರ್ಯಸೂಚಿ ಹಂಚಿಕೊಳ್ಳಿ', 'dayavittu sabheya kaaryasoochi hanchikolli'),
          p('I have a suggestion', 'ನನಗೆ ಒಂದು ಸಲಹೆ ಇದೆ', 'nanage ondu salahe ide'),
          p('I agree with that', 'ನಾನು ಅದನ್ನು ಒಪ್ಪುತ್ತೇನೆ', 'naanu adannu opputtene'),
          p('I have a different opinion', 'ನನಗೆ ಬೇರೆ ಅಭಿಪ್ರಾಯವಿದೆ', 'nanage bere abhipraayavide'),
          p('Could you clarify this point?', 'ಈ ಅಂಶವನ್ನು ಸ್ಪಷ್ಟಪಡಿಸಬಹುದೇ?', 'ee amshavannu spashtapadisabahude'),
          p('Could you repeat the last point?', 'ಕೊನೆಯ ಅಂಶವನ್ನು ಮತ್ತೆ ಹೇಳಬಹುದೇ?', 'koneya amshavannu matte helabahude'),
          p('Let us discuss this later', 'ಇದನ್ನು ನಂತರ ಚರ್ಚಿಸೋಣ', 'idannu nantara charchisona'),
          p('Who is responsible for this task?', 'ಈ ಕೆಲಸಕ್ಕೆ ಯಾರು ಜವಾಬ್ದಾರರು?', 'ee kelasakke yaaru javaabdaararu'),
          p('What is the deadline?', 'ಕೊನೆಯ ಗಡುವು ಯಾವುದು?', 'koneya gaduvu yaavudu'),
          p('I will take the minutes', 'ನಾನು ಸಭೆಯ ನಡವಳಿಯನ್ನು ದಾಖಲಿಸುತ್ತೇನೆ', 'naanu sabheya nadavaliyannu daakhalisuttene'),
          p('Please send me the meeting notes', 'ದಯವಿಟ್ಟು ಸಭೆಯ ಟಿಪ್ಪಣಿಗಳನ್ನು ಕಳುಹಿಸಿ', 'dayavittu sabheya tippanigalannu kaluhisi'),
          p('Can we reschedule the meeting?', 'ಸಭೆಯ ಸಮಯವನ್ನು ಬದಲಾಯಿಸಬಹುದೇ?', 'sabheya samayavannu badalaayisabahude'),
          p('I cannot attend the meeting', 'ನಾನು ಸಭೆಗೆ ಹಾಜರಾಗಲು ಸಾಧ್ಯವಿಲ್ಲ', 'naanu sabhege haajaraagalu saadhyavilla'),
          p('I will join online', 'ನಾನು ಆನ್‌ಲೈನ್‌ನಲ್ಲಿ ಸೇರಿಕೊಳ್ಳುತ್ತೇನೆ', 'naanu online nalli serikolluttene'),
          p('Can everyone hear me?', 'ಎಲ್ಲರಿಗೂ ನನ್ನ ಧ್ವನಿ ಕೇಳಿಸುತ್ತಿದೆಯೇ?', 'ellarigu nanna dhvani kelisuttideye'),
          p('Your microphone is muted', 'ನಿಮ್ಮ ಮೈಕ್ರೊಫೋನ್ ಮ್ಯೂಟ್ ಆಗಿದೆ', 'nimma microphone mute aagide'),
          p('Thank you for the discussion', 'ಚರ್ಚೆಗೆ ಧನ್ಯವಾದಗಳು', 'charchege dhanyavaadagalu')
        ]
      },
      {
        id: 'tasks',
        title: 'Tasks and workplace needs',
        phrases: [
          p('What should I work on first?', 'ನಾನು ಮೊದಲು ಯಾವ ಕೆಲಸ ಮಾಡಬೇಕು?', 'naanu modalu yaava kelasa maadabeku'),
          p('Could you prioritise these tasks?', 'ಈ ಕೆಲಸಗಳಿಗೆ ಆದ್ಯತೆ ನಿಗದಿಪಡಿಸಬಹುದೇ?', 'ee kelasagalige aadyate nigadipadisabahude'),
          p('I need access to this file', 'ನನಗೆ ಈ ಫೈಲ್‌ಗೆ ಪ್ರವೇಶ ಬೇಕು', 'nanage ee file ge pravesha beku'),
          p('The system is not working', 'ಸಿಸ್ಟಮ್ ಕೆಲಸ ಮಾಡುತ್ತಿಲ್ಲ', 'system kelasa maaduttilla'),
          p('I cannot log in', 'ನನಗೆ ಲಾಗಿನ್ ಆಗಲು ಸಾಧ್ಯವಾಗುತ್ತಿಲ್ಲ', 'nanage login aagalu saadhyavaaguttilla'),
          p('I need technical support', 'ನನಗೆ ತಾಂತ್ರಿಕ ಸಹಾಯ ಬೇಕು', 'nanage taantrika sahaaya beku'),
          p('Could you review my work?', 'ನನ್ನ ಕೆಲಸವನ್ನು ಪರಿಶೀಲಿಸಬಹುದೇ?', 'nanna kelasavannu parishilisabahude'),
          p('I have updated the file', 'ನಾನು ಫೈಲ್ ನವೀಕರಿಸಿದ್ದೇನೆ', 'naanu file naveekarisiddene'),
          p('Please find the attached document', 'ಲಗತ್ತಿಸಿದ ದಾಖಲೆಯನ್ನು ನೋಡಿ', 'lagattisida daakhaleyannu nodi'),
          p('I will follow up tomorrow', 'ನಾನು ನಾಳೆ ಮತ್ತೆ ಸಂಪರ್ಕಿಸುತ್ತೇನೆ', 'naanu naale matte samparkisuttene'),
          p('Could you approve this request?', 'ಈ ವಿನಂತಿಯನ್ನು ಅನುಮೋದಿಸಬಹುದೇ?', 'ee vinantiyannu anumodisabahude'),
          p('I need clarification on the instructions', 'ಸೂಚನೆಗಳ ಬಗ್ಗೆ ನನಗೆ ಸ್ಪಷ್ಟನೆ ಬೇಕು', 'soochanegala bagge nanage spashtane beku'),
          p('The task is still in progress', 'ಕೆಲಸ ಇನ್ನೂ ನಡೆಯುತ್ತಿದೆ', 'kelasa innu nadeyuttide'),
          p('The task is finished', 'ಕೆಲಸ ಮುಗಿದಿದೆ', 'kelasa mugidide'),
          p('I found an error', 'ನನಗೆ ಒಂದು ದೋಷ ಕಂಡುಬಂದಿದೆ', 'nanage ondu dosha kandubandide'),
          p('I will fix it', 'ನಾನು ಅದನ್ನು ಸರಿಪಡಿಸುತ್ತೇನೆ', 'naanu adannu saripadisuttene'),
          p('Could you share the latest version?', 'ಇತ್ತೀಚಿನ ಆವೃತ್ತಿಯನ್ನು ಹಂಚಿಕೊಳ್ಳಬಹುದೇ?', 'itteechina aavruttiyannu hanchikollabahude'),
          p('Where should I save this file?', 'ಈ ಫೈಲ್ ಅನ್ನು ಎಲ್ಲಿ ಉಳಿಸಬೇಕು?', 'ee file annu elli ulisabeku'),
          p('I am available this afternoon', 'ನಾನು ಇಂದು ಮಧ್ಯಾಹ್ನ ಲಭ್ಯವಿದ್ದೇನೆ', 'naanu indu madhyaahna labhyaviddene'),
          p('Please let me know if anything changes', 'ಏನಾದರೂ ಬದಲಾದರೆ ದಯವಿಟ್ಟು ತಿಳಿಸಿ', 'enaadaru badalaadare dayavittu tilisi')
        ]
      }
    ]
  }
];

export const allPhrases = () =>
  PACKS.flatMap(pk => pk.scenarios.flatMap(s => s.phrases));