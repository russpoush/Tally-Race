// Tally Race data — copied from Sports Reference career leaderboards (pulled Nov 5, 2026).
// Only retired players, so totals never change. Format: [name, value].
const BOARDS = [
  {
    id: "mlb_hr", sport: "baseball", league: "MLB",
    stat: "career home runs", unit: "HR",
    question: "Who hit more career home runs?",
    kid: "A home run is when the batter hits the ball and makes it all the way around the bases, usually by smashing it over the fence!",
    source: "Baseball-Reference.com", url: "https://www.baseball-reference.com/leaders/HR_career.shtml",
    players: [
      ["Barry Bonds",762],["Hank Aaron",755],["Babe Ruth",714],["Albert Pujols",703],["Alex Rodriguez",696],
      ["Willie Mays",660],["Ken Griffey Jr.",630],["Jim Thome",612],["Sammy Sosa",609],["Frank Robinson",586],
      ["Mark McGwire",583],["Harmon Killebrew",573],["Rafael Palmeiro",569],["Reggie Jackson",563],["Manny Ramirez",555],
      ["Mike Schmidt",548],["David Ortiz",541],["Mickey Mantle",536],["Jimmie Foxx",534],["Willie McCovey",521],
      ["Frank Thomas",521],["Ted Williams",521],["Ernie Banks",512],["Eddie Mathews",512],["Miguel Cabrera",511],
      ["Mel Ott",511],["Gary Sheffield",509],["Eddie Murray",504],["Lou Gehrig",493],["Fred McGriff",493],
      ["Adrian Beltré",477],["Stan Musial",475],["Willie Stargell",475],["Carlos Delgado",473],["Chipper Jones",468],
      ["Dave Winfield",465],["Nelson Cruz",464],["José Canseco",462],["Adam Dunn",462],["Carl Yastrzemski",452],
      ["Jeff Bagwell",449],["Vladimir Guerrero",449],["Dave Kingman",442],["Jason Giambi",440],["Paul Konerko",439],
      ["Andre Dawson",438],["Carlos Beltrán",435],["Juan González",434],["Andruw Jones",434],["Cal Ripken Jr.",431],
      ["Mike Piazza",427],["Billy Williams",426],["Edwin Encarnación",424],["Darrell Evans",414],["Alfonso Soriano",412],
      ["Mark Teixeira",409],["Duke Snider",407],["Andrés Galarraga",399],["Al Kaline",399]
    ]
  },
  {
    id: "mlb_h", sport: "baseball", league: "MLB",
    stat: "career hits", unit: "hits",
    question: "Who got more career hits?",
    kid: "A hit is when the batter smacks the ball and safely reaches base because of it.",
    source: "Baseball-Reference.com", url: "https://www.baseball-reference.com/leaders/H_career.shtml",
    players: [
      ["Pete Rose",4256],["Ty Cobb",4189],["Hank Aaron",3771],["Stan Musial",3630],["Tris Speaker",3514],
      ["Derek Jeter",3465],["Cap Anson",3435],["Honus Wagner",3420],["Carl Yastrzemski",3419],["Albert Pujols",3384],
      ["Paul Molitor",3319],["Eddie Collins",3315],["Willie Mays",3293],["Eddie Murray",3255],["Nap Lajoie",3243],
      ["Cal Ripken Jr.",3184],["Miguel Cabrera",3174],["Adrian Beltré",3166],["George Brett",3154],["Paul Waner",3152],
      ["Robin Yount",3142],["Tony Gwynn",3141],["Alex Rodriguez",3115],["Dave Winfield",3110],["Ichiro Suzuki",3089],
      ["Craig Biggio",3060],["Rickey Henderson",3055],["Rod Carew",3053],["Lou Brock",3023],["Rafael Palmeiro",3020],
      ["Wade Boggs",3010],["Al Kaline",3007],["Roberto Clemente",3000],["Sam Rice",2987],["Sam Crawford",2961],
      ["Frank Robinson",2943],["Jake Beckley",2938],["Barry Bonds",2935],["Willie Keeler",2932],["Rogers Hornsby",2930],
      ["Al Simmons",2927],["Zack Wheat",2884],["Frankie Frisch",2880],["Omar Vizquel",2877],["Mel Ott",2876],
      ["Babe Ruth",2873],["Harold Baines",2866],["Jesse Burkett",2850],["Brooks Robinson",2848],["Iván Rodríguez",2844]
    ]
  },
  {
    id: "nba_pts", sport: "basketball", league: "NBA & ABA",
    stat: "career points", unit: "pts",
    question: "Who scored more career points?",
    kid: "Every basket is worth 2 or 3 points, and free throws are worth 1.",
    source: "Basketball-Reference.com", url: "https://www.basketball-reference.com/leaders/pts_career.html",
    players: [
      ["Kareem Abdul-Jabbar",38387],["Karl Malone",36928],["Kobe Bryant",33643],["Michael Jordan",32292],["Dirk Nowitzki",31560],
      ["Wilt Chamberlain",31419],["Julius Erving",30026],["Moses Malone",29580],["Shaquille O'Neal",28596],["Carmelo Anthony",28289],
      ["Dan Issel",27482],["Elvin Hayes",27313],["Hakeem Olajuwon",26946],["Oscar Robertson",26710],["Dominique Wilkins",26668],
      ["George Gervin",26595],["Tim Duncan",26496],["Paul Pierce",26397],["John Havlicek",26395],["Kevin Garnett",26071],
      ["Vince Carter",25728],["Alex English",25613],["Rick Barry",25279],["Reggie Miller",25279],["Jerry West",25192],
      ["Artis Gilmore",24941],["Patrick Ewing",24815],["Ray Allen",24505],["Allen Iverson",24368],["Charles Barkley",23757],
      ["Robert Parish",23334],["Adrian Dantley",23177],["Dwyane Wade",23165],["Elgin Baylor",23149],["Clyde Drexler",22195],
      ["Gary Payton",21813],["Larry Bird",21791],["Hal Greer",21586],["Walt Bellamy",20941],["Pau Gasol",20894],
      ["Bob Pettit",20880],["David Robinson",20790],["LaMarcus Aldridge",20558],["Mitch Richmond",20497],["Joe Johnson",20407],
      ["Tom Chambers",20049],["Antawn Jamison",20042],["John Stockton",19711],["Bernard King",19655]
    ]
  },
  {
    id: "nba_trb", sport: "basketball", league: "NBA & ABA",
    stat: "career rebounds", unit: "reb",
    question: "Who grabbed more career rebounds?",
    kid: "A rebound is grabbing the ball after somebody misses a shot.",
    source: "Basketball-Reference.com", url: "https://www.basketball-reference.com/leaders/trb_career_c.html",
    players: [
      ["Wilt Chamberlain",23924],["Bill Russell",21620],["Moses Malone",17834],["Kareem Abdul-Jabbar",17440],["Artis Gilmore",16330],
      ["Elvin Hayes",16279],["Tim Duncan",15091],["Karl Malone",14968],["Robert Parish",14715],["Kevin Garnett",14662],
      ["Dwight Howard",14627],["Nate Thurmond",14464],["Walt Bellamy",14241],["Wes Unseld",13769],["Hakeem Olajuwon",13748],
      ["Shaquille O'Neal",13099],["Buck Williams",13017],["Jerry Lucas",12942],["Bob Pettit",12849],["Charles Barkley",12546],
      ["Dikembe Mutombo",12359],["Paul Silas",12357],["Charles Oakley",12205],["Dennis Rodman",11954],["Kevin Willis",11901],
      ["Patrick Ewing",11607],["Dirk Nowitzki",11489],["Elgin Baylor",11463],["Pau Gasol",11305],["Dolph Schayes",11256],
      ["Dan Issel",11133],["Bill Bridges",11054],["Jack Sikma",10816],["Caldwell Jones",10685],["Julius Erving",10525],
      ["David Robinson",10497],["Ben Wallace",10482],["Dave Cowens",10444]
    ]
  },
  {
    id: "nfl_pass", sport: "football", league: "NFL",
    stat: "career passing yards", unit: "yds",
    question: "Who threw for more career passing yards?",
    kid: "Passing yards add up how far the ball went on every catch from his throws.",
    source: "Pro-Football-Reference.com", url: "https://www.pro-football-reference.com/leaders/pass_yds_career.htm",
    players: [
      ["Tom Brady",89214],["Drew Brees",80358],["Peyton Manning",71940],["Brett Favre",71838],["Ben Roethlisberger",64088],
      ["Matt Ryan",62792],["Dan Marino",61361],["Eli Manning",57023],["John Elway",51475],["Warren Moon",49325],
      ["Fran Tarkenton",47003],["Carson Palmer",46247],["Vinny Testaverde",46233],["Drew Bledsoe",44611],["Dan Fouts",43040],
      ["Kerry Collins",40922],["Joe Montana",40551],["Johnny Unitas",40239],["Dave Krieg",38147],["Boomer Esiason",37920],
      ["Donovan McNabb",37276],["Matt Hasselbeck",36638],["Alex Smith",35650],["Jim Kelly",35467],["Jay Cutler",35133],
      ["Jim Everett",34837],["Jim Hart",34665],["Steve DeBerg",34241],["Tony Romo",34183],["John Hadl",33503],
      ["Phil Simms",33462],["Steve Young",33124],["Troy Aikman",32942],["Ken Anderson",32838],["Kurt Warner",32344]
    ]
  },
  {
    id: "nfl_rush", sport: "football", league: "NFL",
    stat: "career rushing yards", unit: "yds",
    question: "Who ran for more career rushing yards?",
    kid: "Rushing yards are how far a player carried the ball by running with it.",
    source: "Pro-Football-Reference.com", url: "https://www.pro-football-reference.com/leaders/rush_yds_career.htm",
    players: [
      ["Emmitt Smith",18355],["Walter Payton",16726],["Barry Sanders",15269],["Curtis Martin",14101],["LaDainian Tomlinson",13684],
      ["Jerome Bettis",13662],["Eric Dickerson",13259],["Tony Dorsett",12739],["Jim Brown",12312],["Marcus Allen",12243],
      ["Franco Harris",12120],["John Riggins",11352],["O.J. Simpson",11236],["Ottis Anderson",10273],["Joe Perry",9723],
      ["Earl Campbell",9407],["Jim Taylor",8597],["Earnest Byner",8261],["Herschel Walker",8225],["Roger Craig",8189],
      ["Gerald Riggs",8188],["Larry Csonka",8081],["Freeman McNeil",8074],["James Brooks",7962],["Leroy Kelly",7274],
      ["Gale Sayers",4956]
    ]
  },
  {
    id: "nhl_g", sport: "hockey", league: "NHL",
    stat: "career goals", unit: "goals",
    question: "Who scored more career goals?",
    kid: "A goal is when the puck goes into the net.",
    source: "Hockey-Reference.com", url: "https://www.hockey-reference.com/leaders/goals_career.html",
    players: [
      ["Wayne Gretzky",894],["Gordie Howe",801],["Jaromír Jágr",766],["Brett Hull",741],["Marcel Dionne",731],
      ["Phil Esposito",717],["Mike Gartner",708],["Mark Messier",694],["Steve Yzerman",692],["Mario Lemieux",690],
      ["Teemu Selänne",684],["Luc Robitaille",668],["Brendan Shanahan",656],["Dave Andreychuk",640],["Jarome Iginla",625],
      ["Joe Sakic",625],["Bobby Hull",610],["Dino Ciccarelli",608],["Jari Kurri",601],["Mark Recchi",577],
      ["Mike Bossy",573],["Patrick Marleau",566],["Joe Nieuwendyk",564],["Mats Sundin",564],["Mike Modano",561],
      ["Guy Lafleur",560],["Johnny Bucyk",556],["Ron Francis",549],["Michel Goulet",548],["Maurice Richard",544],
      ["Stan Mikita",541],["Keith Tkachuk",538],["Frank Mahovlich",533],["Marián Hossa",525],["Bryan Trottier",524],
      ["Pat Verbeek",522],["Dale Hawerchuk",518],["Pierre Turgeon",515]
    ]
  },
  {
    id: "nhl_pts", sport: "hockey", league: "NHL",
    stat: "career points", unit: "pts",
    question: "Who got more career points?",
    kid: "In hockey you get a point for scoring a goal OR for helping set one up.",
    source: "Hockey-Reference.com", url: "https://www.hockey-reference.com/leaders/points_career.html",
    players: [
      ["Wayne Gretzky",2857],["Jaromír Jágr",1921],["Mark Messier",1887],["Gordie Howe",1850],["Ron Francis",1798],
      ["Marcel Dionne",1771],["Steve Yzerman",1755],["Mario Lemieux",1723],["Joe Sakic",1641],["Phil Esposito",1590],
      ["Ray Bourque",1579],["Joe Thornton",1539],["Mark Recchi",1533],["Paul Coffey",1531],["Stan Mikita",1467],
      ["Teemu Selänne",1457],["Bryan Trottier",1425],["Adam Oates",1420],["Doug Gilmour",1414],["Dale Hawerchuk",1409],
      ["Jari Kurri",1398],["Luc Robitaille",1394],["Brett Hull",1391],["Mike Modano",1374],["Johnny Bucyk",1369],
      ["Brendan Shanahan",1354],["Guy Lafleur",1353],["Mats Sundin",1349],["Dave Andreychuk",1338],["Denis Savard",1338],
      ["Mike Gartner",1335],["Pierre Turgeon",1327],["Gilbert Perreault",1326],["Jarome Iginla",1300],["Alex Delvecchio",1281],
      ["Al MacInnis",1274],["Jean Ratelle",1267],["Peter Šťastný",1239]
    ]
  }
];
if (typeof module !== "undefined") module.exports = { BOARDS };
