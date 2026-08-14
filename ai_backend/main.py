from flask import Flask, jsonify, request

app = Flask(__name__)

@app.route('/')
def home():
    return jsonify({"message": "KisanConnect AI Demand Prediction Engine Running"})

@app.route('/predict-demand', methods=['POST'])
def predict_demand():
    data = request.get_json()
    crop_stage = data.get('crop_stage', 'harvesting')
    weather = data.get('weather', 'sunny')

    demand_level = "HIGH" if crop_stage == "harvesting" and weather == "sunny" else "NORMAL"

    return jsonify({
        "status": "success",
        "predicted_demand": demand_level,
        "recommendation": "Book harvesting machinery 3 days in advance."
    })

if __name__ == '__main__':
    app.run(port=5000, debug=True)
