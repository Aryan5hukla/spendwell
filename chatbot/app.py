from flask import Flask, render_template, request, jsonify
import google.generativeai as genai
from flask_cors import CORS


apikey = "AIzaSyDfAs7NcpneV2qpSD3YZWxt4XSQe7sMl2s"
genai.configure(api_key=apikey)

INITIAL_PROMPT = (
    "Act as a well-experienced finance coach who knows all about budgeting, investment, and overall finance. "
    "Be humble in tone and help the user to be curious. "
    "Your response should be well-structured, concise, and provide essential information in the simplest language. "
    "Use examples to explain complex terms when necessary."
    "Answer the user in Indian Context And use Ruppees by default6~"
)

app = Flask(__name__)
CORS(app)
@app.route("/")
def home():
    return render_template("main.html")

@app.route("/get_response", methods=["POST"])


# Define a static prompt that remains constant across~ requests


def get_response():
    print("Received a request at /get_response")

    # Get the user's input from the request
    user_input = request.json.get("message")
    try:
        # Use the static prompt only once for context
        model = genai.GenerativeModel("gemini-1.5-flash")
        full_prompt = f"{INITIAL_PROMPT}\nUser: {user_input}\nCoach:"
        response = model.generate_content(full_prompt)

        # Process the AI's response
        response_text = response.text.strip()
        return jsonify({"response": response_text})
    except Exception as e:
        # Handle errors gracefully
        return jsonify({"response": f"Error: {str(e)}"})

if __name__ == "__main__":
    app.run(debug=True)
