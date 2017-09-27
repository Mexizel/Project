const MongoClient = require('mongodb').MongoClient;

const questionDatabase = [
  {
    "theQuestion": {
      "question": "In which movie Jim Carrey and Renée Zellweger played together?",
      "answers": [
        "Ace Ventura: Pet Detective ",
        "Bridget Jones's Diary",
        "Me, Myself & Irene",
        "Truman's Show"
      ]
    },
    "theAnswer": 3
  },

  {
    "theQuestion": {
      "question": "In which movie Whitney Houston and Kevin Costner played together?",
      "answers": [
        "Notting Hill",
        "My Best Friend's Wedding",
        "The Bodyguard",
        "Serendipity"
      ]
    },
    "theAnswer": 3
  },

  {
    "theQuestion": {
      "question": "The Van Gogh museum is located in what European capital city?",
      "answers": [
        "Amsterdam",
        "Rome",
        "Viena",
        "Prag"
      ]
    },
    "theAnswer": 1
  },

  {
    "theQuestion": {
      "question": "Who played the female lead in the 1942 film Casablanca?",
      "answers": [
        "Marilyn Monroe",
        "Debbie Reynolds",
        "Shirley MacLaine",
        "Ingrid Bergman"
      ]
    },
    "theAnswer": 4
  },

  {
    "theQuestion": {
      "question": "In Disney's 'The Little Mermaid' what is the name of the human that Ariel falls in love with?",
      "answers": [
        "Prince Daniel",
        "Prince William",
        "Prince Eric",
        "Prince Carl"
      ]
    },
    "theAnswer": 3
  },

  {
    "theQuestion": {
      "question": "In the Star Wars universe, who is Luke Skywalker's mother?",
      "answers": [
        "Darth Vader",
        "Padmé Amidala",
        "Leia Organa",
        "Mari Amithest"
      ]
    },
    "theAnswer": 2
  },

  {
    "theQuestion": {
      "question": "In the 'Lord of the Rings' film series which actor plays the character of Saruman?",
      "answers": [
        "Sean Astin",
        "Billy Boyd",
        "Christopher Lee",
        "Orlando Bloom"
      ]
    },
    "theAnswer": 3
  },

  {
    "theQuestion": {
      "question": "Which actress played identical twins in the 1998 movie remake of The Parent Trap?",
      "answers": [
        "Lindsay Lohan",
        "Jeniffer Aniston",
        "Seth Cohen",
        "Leighton Meester"
      ]
    },
    "theAnswer": 1
  },

  {
    "theQuestion": {
      "question": "Released in 1992, what is the best selling soundtrack album of all time?",
      "answers": [
        "Titanic",
        "Space Jam",
        "My Girl",
        "The Bodyguard"
      ]
    },
    "theAnswer": 4
  },

  {
    "theQuestion": {
      "question": "Who played lead guitar for the British rock band Queen?",
      "answers": [
        "Brian May",
        "Richie Blackmoore",
        "Randy Rhoads",
        "Steve Howe"
      ]
    },
    "theAnswer": 1
  },

  {
    "theQuestion": {
      "question": "K-pop is a genre of music that originated in what country?",
      "answers": [
        "China",
        "South Korea",
        "North Korea",
        "India"
      ]
    },
    "theAnswer": 2
  },

  {
    "theQuestion": {
      "question": "'Hallelujah' is a song written by which Canadian recording artist?",
      "answers": [
        "Leonard Cohen",
        "Bob Dylan",
        "Fredie Mercury",
        "John Lennon"
      ]
    },
    "theAnswer": 1
  },

  {
    "theQuestion": {
      "question": "What was the name of Michael Jackson's first solo album as an adult?",
      "answers": [
        "Bad",
        "Off The Wall",
        "Thriller 25",
        "Bad 25"
      ]
    },
    "theAnswer": 2
  },

  {
    "theQuestion": {
      "question": "What color do you get when you mix yellow and blue?",
      "answers": [
        "Green",
        "Red",
        "Orange",
        "Gray"
      ]
    },
    "theAnswer": 1
  },

  {
    "theQuestion": {
      "question": "How many paintings did Vincent Van Gogh sell during his lifetime?",
      "answers": [
        "Twenty",
        "Four",
        "Ten",
        "One"
      ]
    },
    "theAnswer": 4
  }
];

var url = "mongodb://localhost:27017/BrainBuzzDB";

// Create the  database.
MongoClient.connect(url, function(err, db) {

  if (err) throw err;

  // Create the questions table.
  db.createCollection("Questions", function(err, res) {

    if (err) throw err;

    // Insert the questions to the questions table.
    db.collection("Questions").insertMany(questionDatabase, function(err, res) {

      if (err) throw err;

      console.log("BrainBuzz Questions database is created");
      console.log("Number of documents inserted: " + res.insertedCount);

      db.close();
    });
  });
});
