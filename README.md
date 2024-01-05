# RF-Study

## Overview
This is an IOT project to check students' attendance created by RFID team:
- Nguyen The Dan
- Nguyen Tuan Dung
- Le Xuan Cuong
- Le Tri Hieu

## Installation

### Hardware
![Arduino_Uno_i2C_LCD_bb](https://github.com/MikeJoester/RF-Study/assets/74175443/e183bfbd-7f74-480b-97e6-33791c46733c)

In the hardware folder, you can find one Arduino project named RFID_Reader. Open it with [Arduino IDE](https://www.arduino.cc/en/software).
If you want to change the access Wifi SSID and password of the ESP32, you can edit these following codes in the file:
```c++
#define SSID "Your Wifi Name"
#define PASSWORD "Your Wifi Password"
```

### Frontend
You can access the Frontend folder by using this command: 
```bash
cd admin-dashboard/frontend
```

Install the dependencies:
```bash
npm install
```

Run the frontend on local:
```bash
npm run dev
```

The website will be available on this link: ```http://localhost:3000```

### Backend
You can access the Backend folder by using this command: 
```bash
cd admin-dashboard/backend
```

Install the dependencies:
```bash
npm install -g yarn
yarn install
```

Run the frontend on local:
```bash
yarn start
```

The website will be available on this link: ```http://localhost:8888```
