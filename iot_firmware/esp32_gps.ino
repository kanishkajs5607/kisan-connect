#include <WiFi.h>

const char* ssid = "YOUR_WIFI_SSID";
const char* password = "YOUR_WIFI_PASSWORD";

void setup() {
  Serial.begin(115200);
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("\n[KisanConnect IoT] Connected to WiFi");
  Serial.print("IP Address: ");
  Serial.println(WiFi.localIP());
}

void loop() {
  float latitude = 19.8762;
  float longitude = 75.3433;

  Serial.print("[Telemetry] Syncing GPS Location: ");
  Serial.print(latitude, 4);
  Serial.print(", ");
  Serial.println(longitude, 4);

  delay(5000);
}
