## Starting via Docker:
- docker pull wrong21/react-calendar:latest
- docker run -dp 8000:3000 --name react-calendar wrong21/react-calendar:latest
- Open the: http://localhost:8000

## Starting manually:
- git clone https://github.com/wrong89/react-calendar.git
- cd react-calendar
- npm i
- npm run start


## Functions:

# Days:
- Mark the day;
- Add the inscription on day cell;
- Repeat the marking and inscription every year on day cell;
  
# History:
- Every marked day saving in history;
- Deleting marked day;
- Delete all history;
- Import history from file;
- Export current history;
- Search current day via date or title

## Preview

MainPage with marked day and inscripted day:
![image](https://github.com/user-attachments/assets/b58e28f5-948b-45d0-ae2c-1a502bd0ba73)

Modal window which contains the marking day and repeating day functional;
![image](https://github.com/user-attachments/assets/1c2571bf-0b20-4a89-b64d-3f22007b176d)

Opened DataPicker:
![image](https://github.com/user-attachments/assets/d31f7d17-2b36-47c3-9177-1f62617c5707)

HistoryPage:
![image](https://github.com/user-attachments/assets/70b74484-cf2f-4e7e-9d43-b9a00f5b3cf6)


## Stack
- React;
- Redux Toolkit;
- React-Router-Dom;
- Typescript;
- SCSS;
- Docker

