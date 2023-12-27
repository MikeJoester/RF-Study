
#include <SPI.h>
#include <MFRC522.h>
#include <LiquidCrystal_I2C.h>
#include <WiFi.h>
#include <HTTPClient.h>

#define SSID "21NTT"
#define PASSWORD "abcd12345"
#define HOST "https://rfstudy.onrender.com"
#define PATH "/api/std/"
#define SS_PIN 5
#define RST_PIN 0 

MFRC522 rfid(SS_PIN, RST_PIN);
LiquidCrystal_I2C lcd_i2c(0x27, 16, 2); // I2C address 0x27, 16 column and 2 

const char WIFI_SSID[] = SSID;         // CHANGE IT
const char WIFI_PASSWORD[] = PASSWORD; // CHANGE IT

String HOST_NAME   = HOST; // CHANGE IT
String PATH_NAME   = PATH;      // CHANGE IT
//String PATH_NAME   = "/products/arduino.php";      // CHANGE IT
String queryString;

void setup() {
  Serial.begin(115200);
  SPI.begin(); // init SPI bus
  rfid.PCD_Init(); // init MFRC522
  lcd_i2c.init(); // initialize the lcd
  lcd_i2c.backlight();

  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.println("Connecting");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.print("Connected to WiFi network with IP Address: ");
  Serial.println(WiFi.localIP());

  Serial.println("Tap an RFID/NFC tag on the RFID-RC522 reader");
}

void postRequest(String req) {
  HTTPClient http;

  http.begin(req);
  http.addHeader("Content-Type", "application/x-www-form-urlencoded");
  Serial.println(req);

  int httpCode = http.POST("");

  // httpCode will be negative on error
  if (httpCode > 0) {
    // file found at server
    if (httpCode == HTTP_CODE_OK) {
      String payload = http.getString();
      Serial.println(payload);
    } else {
      // HTTP header has been send and Server response header has been handled
      Serial.printf("[HTTP] POST... code: %d\n", httpCode);
    }
  } else {
    Serial.printf("[HTTP] POST... failed, error: %s\n", http.errorToString(httpCode).c_str());
  }

  http.end();
}

void loop() {
  if (rfid.PICC_IsNewCardPresent()) { // new tag is available
    if (rfid.PICC_ReadCardSerial()) { // NUID has been readed
      MFRC522::PICC_Type piccType = rfid.PICC_GetType(rfid.uid.sak);
      Serial.print("RFID/NFC Tag Type: ");
      Serial.println(rfid.PICC_GetTypeName(piccType));

      // print UID in Serial Monitor in the hex format
      Serial.print("UID: ");
      String studentId = "";
      for (int i = 0; i < rfid.uid.size; i++) {
        // Serial.print(rfid.uid.uidByte[i] < 0x10 ? " 0" : " ");
        // Serial.print(rfid.uid.uidByte[i], DEC);
        s += (rfid.uid.uidByte[i] < 0x10 ? "0" : "");
        s = s + String(rfid.uid.uidByte[i], DEC);
      }
      postRequest(HOST_NAME + PATH_NAME + studentId + "/logs");
      // Serial.print(s);
      lcd_i2c.clear();              // clear display
      lcd_i2c.setCursor(0, 0);      // move cursor to   (0, 0)
      lcd_i2c.print("ID:");       // print message at (0, 0)
      lcd_i2c.setCursor(0, 1);      // move cursor to   (2, 1)
      lcd_i2c.print(s); // print message at (2, 1)
      delay(3000); 

      Serial.println();

      rfid.PICC_HaltA(); // halt PICC
      rfid.PCD_StopCrypto1(); // stop encryption on PCD
    }
  }
}
