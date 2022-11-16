export function parseJwt(token) {
  if (!token) {
    return {
      sub: null,
    };
  }
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
}
export const validateUserIsAdult = (value) => {
  const selected = new Date(value).getFullYear();
  const now = new Date().getFullYear();
  return now - selected >= 18;
};
export const SECURITY_QUESTIONS = [
  {
    key: "1",
    value: "What is your favorite song?",
    text: "What is your favorite song?",
  },
  {
    key: "2",
    value: "What is your work address(city)?",
    text: "What is your work address(city)?",
  },
  {
    key: "3",
    value: "What is your oldest cousin’s first name?",
    text: "What is your oldest cousin’s first name?",
  },
  {
    key: "4",
    value: "In which city was your Father born?",
    text: "In which city was your Father born?",
  },
  {
    key: "5",
    value: "In which city was your Mother born?",
    text: "In which city was your Mother born?",
  },
  {
    key: "6",
    value: "What was your favorite school teacher's name?",
    text: "What was your favorite school teacher's name?",
  },
  {
    key: "7",
    value: "What is your first school's name?",
    text: "What is your first school's name?",
  },
  {
    key: "8",
    value: "Which country would you like  to visit?",
    text: "Which country would you like  to visit?",
  },
  {
    key: "9",
    value: "What was your first car?",
    text: "What was your first car?",
  },
  {
    key: "10",
    value: "What is your favorite book?",
    text: "What is your favorite book?",
  },
  {
    key: "11",
    value: "Who is your favorite actor/actress?",
    text: "Who is your favorite actor/actress?",
  },
  {
    key: "12",
    value: "What is your favorite movie?",
    text: "What is your favorite movie?",
  },
];
