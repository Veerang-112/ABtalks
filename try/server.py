import os
import json
from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
# Enable CORS for development
CORS(app)

DATA_FILE = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'data.json')

INITIAL_DATA = {
  "stats": {
    "streak": 12,
    "total_commits": 45,
    "tasks_done": 12
  }#,
#   "challenges": [
#     {
#       "day": 1,
#       "title": "Set up HTML Boilerplate",
#       "description": "Create a valid HTML5 document containing meta tags, responsive viewport settings, and a title.",
#       "xp": 10,
#       "difficulty": "Easy",
#       "status": "completed",
#       "submitted_code": "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"UTF-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n  <title>Day 1 Challenge</title>\n</head>\n<body>\n  <h1>Hello, World!</h1>\n</body>\n</html>",
#       "starter_code": "<!DOCTYPE html>\n<html>\n<!-- Add your head and body tags here -->\n</html>",
#       "instructions": "1. Add <!doctype html>\n2. Set language to English\n3. Add head and body tags\n4. Set title to 'Day 1'"
#     },
#     {
#       "day": 2,
#       "title": "Style a Button with CSS",
#       "description": "Style an interactive button with custom hover states, border-radius, and smooth transition properties.",
#       "xp": 15,
#       "difficulty": "Easy",
#       "status": "completed",
#       "submitted_code": "button {\n  background-color: #004ac6;\n  color: white;\n  border: none;\n  padding: 10px 20px;\n  border-radius: 8px;\n  cursor: pointer;\n  transition: background-color 0.2s;\n}\nbutton:hover {\n  background-color: #0053db;\n}",
#       "starter_code": "button {\n  /* Your custom CSS styles here */\n}",
#       "instructions": "1. Add a primary background color\n2. Style text in white\n3. Set a smooth transition on hover"
#     },
#     {
#       "day": 3,
#       "title": "Create a Card Layout",
#       "description": "Create a layout with an image, text content, and a button inside a modern card component.",
#       "xp": 20,
#       "difficulty": "Easy",
#       "status": "completed",
#       "submitted_code": ".card { border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); padding: 16px; }"
#     },
#     {
#       "day": 4,
#       "title": "Build a Simple Form",
#       "description": "Create an input form containing name, email, and submission handling.",
#       "xp": 20,
#       "difficulty": "Easy",
#       "status": "completed",
#       "submitted_code": "<form>\n  <input type=\"text\" placeholder=\"Name\">\n  <input type=\"email\" placeholder=\"Email\">\n  <button type=\"submit\">Submit</button>\n</form>"
#     },
#     {
#       "day": 5,
#       "title": "CSS Flexbox Layout",
#       "description": "Align three item boxes horizontally and spread them out evenly using CSS Flexbox properties.",
#       "xp": 25,
#       "difficulty": "Medium",
#       "status": "completed",
#       "submitted_code": ".container {\n  display: flex;\n  justify-content: space-between;\n}"
#     },
#     {
#       "day": 6,
#       "title": "JavaScript DOM Manipulation",
#       "description": "Write a script that displays the current time on the screen when a button is clicked.",
#       "xp": 25,
#       "difficulty": "Medium",
#       "status": "completed",
#       "submitted_code": "document.getElementById('btn').addEventListener('click', () => {\n  document.getElementById('time').innerText = new Date().toLocaleTimeString();\n});"
#     },
#     {
#       "day": 7,
#       "title": "Responsive Media Queries",
#       "description": "Apply responsive breakpoints to change background colors from red to green to blue dynamically.",
#       "xp": 30,
#       "difficulty": "Medium",
#       "status": "completed",
#       "submitted_code": "@media (max-width: 600px) { body { background: red; } }"
#     },
#     {
#       "day": 8,
#       "title": "Fetch Data from REST API",
#       "description": "Fetch user statistics using the Fetch API and display names in an HTML list element.",
#       "xp": 30,
#       "difficulty": "Medium",
#       "status": "completed",
#       "submitted_code": "fetch('https://api.github.com/users').then(r => r.json()).then(data => console.log(data));"
#     },
#     {
#       "day": 9,
#       "title": "CSS Animations Basics",
#       "description": "Create smooth hover effects and keyframe animations for interactive UI elements.",
#       "xp": 35,
#       "difficulty": "Medium",
#       "status": "completed",
#       "submitted_code": ".animate {\n  animation: fadein 2s infinite;\n}\n@keyframes fadein {\n  from { opacity: 0; }\n  to { opacity: 1; }\n}"
#     },
#     {
#       "day": 10,
#       "title": "Accessible Form Validation",
#       "description": "Build a sign-up form with real-time validation and ARIA attributes for accessibility.",
#       "xp": 35,
#       "difficulty": "Hard",
#       "status": "missed",
#       "submitted_code": ""
#     },
#     {
#       "day": 11,
#       "title": "CSS Grid Dashboard Layout",
#       "description": "Implement a complex dashboard layout utilizing CSS Grid areas and responsive sizing.",
#       "xp": 40,
#       "difficulty": "Medium",
#       "status": "completed",
#       "submitted_code": ".grid-container {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));\n  gap: 16px;\n}"
#     },
#     {
#       "day": 12,
#       "title": "Responsive Flexbox Navigation",
#       "description": "Create a mobile-first navigation bar using CSS Flexbox that adapts to desktop screens dynamically.",
#       "xp": 40,
#       "difficulty": "Medium",
#       "status": "completed",
#       "submitted_code": "<nav class=\"flex justify-between items-center p-4 bg-gray-800 text-white\">\n  <div class=\"logo font-bold\">Logo</div>\n  <ul class=\"flex gap-4 md:flex-row flex-col\">\n    <li><a href=\"#\">Home</a></li>\n    <li><a href=\"#\">About</a></li>\n  </ul>\n</nav>",
#       "starter_code": "<nav class=\"flex justify-between items-center p-4\">\n  <div class=\"brand font-bold\">Brand</div>\n  <ul class=\"flex gap-4\">\n    <li><a href=\"#\">Home</a></li>\n    <li><a href=\"#\">Services</a></li>\n    <li><a href=\"#\">Contact</a></li>\n  </ul>\n</nav>",
#       "instructions": "1. Build a <nav> container.\n2. Apply display: flex and justify-content: space-between.\n3. Make menu items wrap or collapse on mobile sizes."
#     },
#     {
#       "day": 13,
#       "title": "Build a Dark Mode Toggle",
#       "description": "Implement a robust dark mode toggle using CSS variables and local storage to persist user preferences across sessions. Focus on smooth transitions and semantic color mapping.",
#       "xp": 50,
#       "difficulty": "Medium",
#       "status": "pending",
#       "submitted_code": "",
#       "starter_code": "// Select elements\nconst toggleBtn = document.querySelector('#theme-toggle');\n\n// Toggle theme implementation\ntoggleBtn.addEventListener('click', () => {\n  const isDark = document.documentElement.classList.toggle('dark');\n  localStorage.setItem('theme', isDark ? 'dark' : 'light');\n});",
#       "instructions": "1. Select your toggle switch button from DOM.\n2. Add event listener to toggle 'dark' class on <html> document.\n3. Store user selection in LocalStorage.\n4. Apply dark state on page load based on storage."
#     },
#     {
#       "day": 14,
#       "title": "Implement LocalStorage Hook",
#       "description": "Write a custom React hook `useLocalStorage` to synchronize state with local storage key-value pairs.",
#       "xp": 50,
#       "difficulty": "Medium",
#       "status": "upcoming",
#       "starter_code": "function useLocalStorage(key, initialValue) {\n  // Implement local storage custom state hook\n}",
#       "instructions": "1. Initialize state from LocalStorage or default fallback.\n2. Update LocalStorage whenever state changes."
#     },
#     {
#       "day": 15,
#       "title": "Create a Modal Dialog",
#       "description": "Design an accessible modal popup window using HTML <dialog> elements and backdrop styling overlays.",
#       "xp": 55,
#       "difficulty": "Hard",
#       "status": "upcoming"
#     }
#   ]
}

def read_data():
    if not os.path.exists(DATA_FILE):
        write_data(INITIAL_DATA)
        return INITIAL_DATA
    try:
        with open(DATA_FILE, 'r', encoding='utf-8') as f:
            return json.load(f)
    except Exception:
        return INITIAL_DATA

def write_data(data):
    with open(DATA_FILE, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)

@app.route('/api/status', methods=['GET'])
def get_status():
    data = read_data()
    return jsonify(data.get("stats", {}))

@app.route('/api/challenges', methods=['GET'])
def get_challenges():
    data = read_data()
    return jsonify(data.get("challenges", []))

@app.route('/api/submit', methods=['POST'])
def submit_challenge():
    req_body = request.get_json() or {}
    day_num = req_body.get('day')
    code = req_body.get('code', '')
    
    if day_num is None:
        return jsonify({"error": "Missing 'day' parameter"}), 400
        
    data = read_data()
    challenges = data.get("challenges", [])
    stats = data.get("stats", {})
    
    challenge_found = None
    for chal in challenges:
        if chal.get('day') == day_num:
            challenge_found = chal
            break
            
    if not challenge_found:
        return jsonify({"error": f"Challenge for Day {day_num} not found"}), 404
        
    was_completed = (challenge_found.get('status') == 'completed')
    
    # Update challenge details
    challenge_found['status'] = 'completed'
    challenge_found['submitted_code'] = code
    
    # Update user statistics if this is a new completion
    if not was_completed:
        stats['tasks_done'] = stats.get('tasks_done', 0) + 1
        stats['streak'] = stats.get('streak', 0) + 1
        stats['total_commits'] = stats.get('total_commits', 0) + 1
    else:
        # Just record a commit if they re-submitted
        stats['total_commits'] = stats.get('total_commits', 0) + 1
        
    write_data(data)
    
    return jsonify({
        "status": "success",
        "stats": stats,
        "challenge": challenge_found
    })

@app.route('/api/reset', methods=['POST'])
def reset_database():
    write_data(INITIAL_DATA)
    return jsonify({
        "status": "success",
        "message": "Database reset to initial mock state",
        "stats": INITIAL_DATA["stats"],
        "challenges": INITIAL_DATA["challenges"]
    })

if __name__ == '__main__':
    # Listen on port 5000
    app.run(host='0.0.0.0', port=5000, debug=True)
