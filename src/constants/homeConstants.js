const countries = [
  "British",
  "American",
  "French",
  "Canadian",
  "Jamaican",
  "Chinese",
  "Dutch",
  "Egyptian",
  "Greek",
  "Indian",
  "Irish",
  "Italian",
  "Japanese",
  "Kenyan",
  "Malaysian",
  "Mexican",
  "Moroccan",
  "Croatian",
  "Norwegian",
  "Portuguese",
  "Russian",
  "Argentinian",
  "Spanish",
  "Slovak",
  "Thai",
  "Saudi Arabian",
  "Vietnamese",
  "Turkish",
  "Syrian",
  "Algerian",
  "Tunisian",
  "Polish",
  "Philippine",
  "Ukrainian",
  "Uruguayan",
];

const countriesFlag = [
  {
    demonym: "British",
    country: "United Kingdom",
    flag_svg_url: "https://flagcdn.com/gb.svg",
  },
  {
    demonym: "American",
    country: "United States",
    flag_svg_url:
      "https://upload.wikimedia.org/wikipedia/commons/a/a4/Flag_of_the_United_States.svg",
  },
  {
    demonym: "French",
    country: "France",
    flag_svg_url:
      "https://upload.wikimedia.org/wikipedia/commons/c/c3/Flag_of_France.svg",
  },
  {
    demonym: "Canadian",
    country: "Canada",
    flag_svg_url:
      "https://upload.wikimedia.org/wikipedia/commons/d/d9/Flag_of_Canada_%28Pantone%29.svg",
  },
  {
    demonym: "Chinese",
    country: "China",
    flag_svg_url:
      "https://upload.wikimedia.org/wikipedia/commons/f/fa/Flag_of_the_People%27s_Republic_of_China.svg",
  },
  {
    demonym: "Dutch",
    country: "Netherlands",
    flag_svg_url:
      "https://upload.wikimedia.org/wikipedia/commons/2/20/Flag_of_the_Netherlands.svg",
  },
  {
    demonym: "Egyptian",
    country: "Egypt",
    flag_svg_url:
      "https://upload.wikimedia.org/wikipedia/commons/f/fe/Flag_of_Egypt.svg",
  },
  {
    demonym: "Greek",
    country: "Greece",
    flag_svg_url:
      "https://upload.wikimedia.org/wikipedia/commons/5/5c/Flag_of_Greece.svg",
  },
  {
    demonym: "Indian",
    country: "India",
    flag_svg_url:
      "https://upload.wikimedia.org/wikipedia/commons/4/41/Flag_of_India.svg",
  },
  {
    demonym: "Italian",
    country: "Italy",
    flag_svg_url:
      "https://upload.wikimedia.org/wikipedia/commons/0/03/Flag_of_Italy.svg",
  },
  {
    demonym: "Japanese",
    country: "Japan",
    flag_svg_url:
      "https://upload.wikimedia.org/wikipedia/commons/9/9e/Flag_of_Japan.svg",
  },
  {
    demonym: "Malaysian",
    country: "Malaysia",
    flag_svg_url:
      "https://upload.wikimedia.org/wikipedia/commons/6/66/Flag_of_Malaysia.svg",
  },
  {
    demonym: "Croatian",
    country: "Croatia",
    flag_svg_url:
      "https://upload.wikimedia.org/wikipedia/commons/1/1b/Flag_of_Croatia.svg",
  },
  {
    demonym: "Spanish",
    country: "Spain",
    flag_svg_url:
      "https://upload.wikimedia.org/wikipedia/commons/9/9a/Flag_of_Spain.svg",
  },
  {
    demonym: "Turkish",
    country: "Turkey",
    flag_svg_url:
      "https://upload.wikimedia.org/wikipedia/commons/b/b4/Flag_of_Turkey.svg",
  },
  {
    demonym: "Tunisian",
    country: "Tunisia",
    flag_svg_url:
      "https://upload.wikimedia.org/wikipedia/commons/c/ce/Flag_of_Tunisia.svg",
  },
];

const LoginFields = [
  {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "Enter your email",
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    placeholder: "Enter your password",
  },
];

const SignUpFields = [
  {
    name: "userName",
    label: "Username",
    type: "text",
    placeholder: "Enter your username",
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "Enter your email",
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    placeholder: "Enter your password",
  },
  {
    name: "confirmPassword",
    label: "Confirm Password",
    type: "password",
    placeholder: "Re-enter your password",
  },
];

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const strongPasswordRegex =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

export {
  countries,
  countriesFlag,
  LoginFields,
  SignUpFields,
  emailRegex,
  strongPasswordRegex,
};
