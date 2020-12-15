import React, {useState} from 'react';
const [gender, setGender] = useState({
  male: false,
  female: false,
  choice: '',
});

const malePressed = (choice) => {
  setGender({
    male: true,
    female: false,
    choice: choice,
  });
  console.log(gender);
};
const femalePressed = (choice) => {
  setGender({
    male: false,
    female: true,
    choice: choice,
  });
  console.log(gender);
};
