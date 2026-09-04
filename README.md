# TravelMate Sri Lanka 🇱🇰

TravelMate Sri Lanka is a web-based travel planning application designed to
help solo travellers plan personalized and practical trips around Sri Lanka.

The application allows travellers to provide their trip preferences and
creates a suggested travel plan by matching those preferences with curated
Sri Lankan destination and transportation data.

---

## 📌 Selected Problem

Solo travellers visiting Sri Lanka can find it difficult to plan a realistic
and personalized trip because information about destinations, transportation,
travel costs, and activities is often scattered across different sources.

Travellers who are unfamiliar with Sri Lanka may also have difficulty deciding:

- Which destinations match their interests
- Which places can realistically be visited within their available time
- How to travel between destinations
- How to plan according to their available budget

This can make trip planning time-consuming and confusing, especially for
travellers visiting Sri Lanka for the first time.

---

## 💡 Proposed Solution

TravelMate Sri Lanka provides a simple travel planning platform for solo
travellers.

The traveller enters information such as:

- Travel dates
- Budget
- Starting location
- Travel interests

The system uses predefined Sri Lankan destination and transportation data to
match suitable destinations with the traveller's preferences.

It then creates a suggested travel plan containing suitable destinations,
a practical destination order, transportation suggestions, and estimated
travel costs.

The goal of TravelMate is to make planning a solo trip around Sri Lanka
simpler, faster, and more convenient.

---

## ✨ Main Features

### 1. Traveller Preference Form

Travellers can provide their basic trip information, including:

- Travel dates
- Available budget
- Starting location
- Travel interests

Example interests include:

- Nature
- Beaches
- Culture
- Adventure
- Wildlife
- Historical places

The form validates user input and displays friendly error messages when
required information is missing or invalid.

### 2. Rule-Based Travel Planner

TravelMate uses a rule-based approach to select destinations rather than
randomly suggesting locations.

The planner considers:

- Traveller interests
- Available travel days
- Budget
- Starting location
- Destination information
- Travel order

Destinations are matched and ranked using predefined destination data and
the preferences entered by the traveller.

### 3. Destination Recommendations

The system recommends Sri Lankan destinations that match the traveller's
selected interests and trip requirements.

Each destination can include useful information such as:

- Destination name
- Location
- Suitable interests
- Suggested activities
- Estimated cost
- Recommended duration

### 4. Suggested Travel Route

Selected destinations are arranged into a sensible travel order to reduce
unnecessary travel between locations and make the itinerary more practical.

### 5. Transportation Suggestions

TravelMate provides suitable transportation suggestions between selected
destinations using predefined transportation information.

Possible transport options may include:

- Train
- Bus
- Taxi
- Tuk-tuk

### 6. Estimated Budget Information

The application provides estimated cost information for the suggested trip
to help travellers understand how the plan fits their selected budget.

### 7. Responsive User Interface

The application is designed to work on both desktop and mobile screen sizes
so travellers can conveniently access their travel plan from different
devices.

---

## ⚙️ How the Travel Planner Works

The basic application flow is:

1. The traveller enters their trip preferences.
2. The system validates the entered information.
3. Destinations are filtered according to the traveller's interests and
   trip requirements.
4. Suitable destinations are ranked using predefined rules.
5. Selected destinations are arranged into a practical travel order.
6. Transportation suggestions are added between destinations.
7. Estimated cost information is calculated.
8. The completed travel plan is displayed to the traveller.

The initial version of TravelMate uses a rule-based planning approach with
curated sample data rather than relying on an AI model to create the
itinerary.

---

## 🛠️ Technologies Used

### Frontend

- React
- Vite
- JavaScript
- HTML5
- CSS3

### Data

- JSON-based sample destination data
- JSON-based transportation data

### Development and Collaboration

- Git
- GitHub

### Deployment

- Vercel

### Running the backend

1. Copy `Backend/.env.example` to `Backend/.env`.
2. Set `DATABASE_URL` to your local MongoDB or MongoDB Atlas connection string.
3. Start the API from the repository root with `npm --prefix Backend run dev`.
4. Start the frontend with `npm --prefix Frontend run dev`.

The preference form sends data to `POST http://localhost:5000/api/preferences`.
Set `Frontend/.env` with `VITE_API_URL` if the backend runs at another URL.
---

## 📁 Project Structure

```text
TravelMate/
│
├── public/
│
├── src/
│   ├── components/
│   │   ├── PreferenceForm.jsx
│   │   ├── InterestSelector.jsx
│   │   ├── ItineraryCard.jsx
│   │   └── TransportInfo.jsx
│   │
│   ├── data/
│   │   ├── destinations.json
│   │   └── transport.json
│   │
│   ├── pages/
│   │   ├── Home.jsx
│   │   └── Results.jsx
│   │
│   ├── utils/
│   │   ├── validation.js
│   │   └── generateItinerary.js
│   │
│   ├── App.jsx
│   └── main.jsx
│
├── .gitignore
├── package.json
├── README.md
└── vite.config.js
```

> The project structure may change slightly during development.

---

## 🤖 AI Tools Used

AI-assisted development tools are used during the development of TravelMate
to support the team with development tasks.

### AI Tools

- Google Antigravity
- ChatGPT

### How AI Is Used

AI tools may assist with:

- Generating initial code suggestions
- UI implementation
- Debugging
- Code explanation
- Refactoring
- Generating sample data
- Documentation assistance
- Testing suggestions

All AI-assisted outputs are reviewed, modified where necessary, and tested
by the team before being included in the final application.

The TravelMate itinerary itself uses rule-based application logic in the
current MVP and should not be confused with the AI tools used to assist
during software development.

---

## 👥 Team Members and Contributions

| Team Member | Student ID | Contribution |
|---|---|---|
| Member 1 | ITXXXXXXXX | Traveller Preference Form and Interest Selection |
| Member 2 | ITXXXXXXXX | Form Validation and Destination/Transport Data |
| Member 3 | ITXXXXXXXX | Rule-Based Travel Planning and Route Logic |
| Member 4 | ITXXXXXXXX | Results Interface, Integration and Responsive Design |

All team members contribute code to the shared GitHub repository and
participate in testing, integration, and final project preparation.

> Update this section with the actual team member names, student IDs, and
> contributions before submission.

---

## 🚀 Installation and Execution

### Prerequisites

Make sure the following software is installed:

- Node.js
- npm
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/THT-Thenabadu/TravelMate.git
```

### 2. Navigate to the Project

```bash
cd TravelMate
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Run the Development Server

```bash
npm run dev
```

### 5. Open the Application

After starting the development server, Vite will display a local URL,
usually:

```text
http://localhost:5173
```

Open the displayed URL in a web browser.

---

## 🌐 Deployed Application

The completed TravelMate application will be publicly deployed for the
hackathon submission.

**Live Application:**  
To be added after deployment.

---

## 🎥 Demonstration Video

A short demonstration video showing the main features and functionality of
TravelMate will be provided after development.

**Demo Video:**  
To be added after recording.

---

## 🇱🇰 Value for Sri Lankan Tourism

TravelMate focuses specifically on travel within Sri Lanka.

By combining traveller preferences with Sri Lankan destination and
transportation information, the application aims to make trip planning
simpler for solo visitors while helping them discover destinations that
match their interests, time, and budget.

---

## 🔮 Future Improvements

If the project is extended beyond the hackathon MVP, possible improvements
could include:

- Interactive maps
- Real-time weather information
- Live public transportation information
- Accommodation recommendations
- Real-time destination information
- User accounts and saved trips
- AI-assisted itinerary recommendations
- Additional safety information for solo travellers

These features are outside the initial hackathon scope and can be considered
for future development.

---

## 🎓 Academic Information

**Module:** SE3090 – Software Engineering Frameworks  
**Assessment:** Assignment 2 – Mini Hackathon  
**Project:** TravelMate Sri Lanka  
**Theme:** Build for Sri Lanka  
**Year:** 2026

---

## 📄 License

This project was developed for academic purposes as part of the SE3090
Mini Hackathon.