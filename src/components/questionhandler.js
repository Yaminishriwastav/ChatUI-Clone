// 🔹 Predefined Answers with Keywords
const predefinedAnswers = {
    // 👋 Greetings & Introduction
    "hello": "Hello! I'm your AI assistant, ready to help. 😊",
    "hi": "Hi there! How can I assist you today?",
    "hey": "Hey! What’s up?",
    "who are you": "I’m a GPT-powered chatbot, your virtual assistant!",
    "tell me about yourself": "I'm an AI chatbot created to answer questions and assist with various topics.",
    "what can you do": "I can answer questions, provide information on programming, general knowledge, and more!",
    "are you human": "No, I'm an AI assistant. But I try my best to be helpful like a human!",
    "good morning": "Good morning! Hope you have a great day ahead! 🌞",
    "good afternoon": "Good afternoon! How's your day going?",
    "good evening": "Good evening! How can I help you?",
    "good night": "Good night! Sleep well. 😴",

    // 🌍 General Knowledge
    "capital of france": "The capital of France is Paris.",
    "ceo of tesla": "The CEO of Tesla is Elon Musk.",
    "largest ocean": "The Pacific Ocean is the largest ocean on Earth.",
    "speed of light": "The speed of light is approximately 299,792 kilometers per second.",
    "who discovered gravity": "Gravity was discovered by Sir Isaac Newton.",
    "boiling point of water": "The boiling point of water is 100°C (212°F) at sea level.",
    "who wrote harry potter": "The 'Harry Potter' series was written by J.K. Rowling.",
    "2 + 2": "2 + 2 equals 4.",
    "first president of usa": "The first President of the USA was George Washington.",
    "tallest mountain": "Mount Everest is the tallest mountain in the world.",

    // 🌐 HTML Questions
    "html": "HTML stands for HyperText Markup Language.",
    "head tag in html": "The <head> tag contains meta information, title, and links to stylesheets and scripts.",
    "difference between div and span": "<div> is a block-level element, while <span> is an inline element.",
    "hyperlink in html": "You use the <a> tag, like this: <a href='https://example.com'>Click here</a>.",
    "meta tag": "The <meta> tag provides metadata like description, keywords, and character set for a webpage.",
    "html entities": "HTML entities are special characters like &amp; (for &) and &lt; (for <).",

    // 🎨 CSS Questions
    "css": "CSS stands for Cascading Style Sheets.",
    "relative and absolute positioning": "Relative positioning moves an element relative to its normal position, while absolute positioning places it relative to the nearest positioned ancestor.",
    "default position in css": "The default position is 'static'.",
    "flexbox": "Flexbox is a layout model in CSS used to align and distribute items in a container.",
    "difference between em and rem": "'em' is relative to the parent element's font size, while 'rem' is relative to the root (html) element's font size.",
    "pseudo-classes": "Pseudo-classes define a special state of an element, like ':hover' for mouse-over effects.",
    "difference between id and class": "An 'id' is unique and can be used once per page, while a 'class' can be used multiple times.",
    "css grid": "CSS Grid is a layout system for creating complex web layouts with rows and columns.",
    "make a website responsive": "You can use media queries, flexible grids, and relative units like %, em, rem, vh, and vw.",

    // ⚡ JavaScript Questions
    "javascript": "JavaScript is a programming language used for web development.",
    "js": "JavaScript is a programming language used for web development.",
    "difference between let var and const": "'var' has function scope, 'let' has block scope, and 'const' cannot be reassigned.",
    "arrow functions": "Arrow functions are a shorter syntax for function expressions: `const add = (a, b) => a + b;`",
    "difference between == and ===": "== checks for value equality with type conversion, while === checks for strict equality.",
    "map function in javascript": "The `map()` function creates a new array by applying a function to each element of an existing array.",
    "callback function": "A callback function is a function passed as an argument to another function.",
    "synchronous and asynchronous js": "Synchronous code runs sequentially, while asynchronous code can run in parallel, often using callbacks, promises, or async/await.",
    "event bubbling": "Event bubbling is when an event propagates from the target element up to its ancestors.",
    "difference between localstorage and sessionstorage": "localStorage stores data permanently, while sessionStorage clears data when the session ends.",
    "iife": "IIFE (Immediately Invoked Function Expression) is a function that runs as soon as it is defined.",
    "difference between null and undefined": "`null` is an assigned value representing 'no value', while `undefined` means a variable has been declared but not assigned a value.",

    // ⚛️ React Questions
    "react": "React is a JavaScript library for building user interfaces.",
    "jsx": "JSX is a syntax extension that allows writing HTML in JavaScript.",
    "props in react": "Props are used to pass data from parent to child components in React.",
    "state in react": "State is a built-in object that holds component-specific data in React.",
    "functional vs class component": "Functional components are stateless and use hooks, while class components use state and lifecycle methods.",
    "useEffect": "`useEffect` is a hook that runs side effects in function components, such as fetching data or updating the DOM.",
    "virtual dom": "The virtual DOM is a lightweight copy of the real DOM that React uses to optimize rendering.",
    "useState": "`useState` is a hook that allows functional components to have state.",
    "react router": "React Router is a library for handling navigation and routing in React applications.",
    "difference between useState and useReducer": "`useState` is used for simple state, while `useReducer` is better for complex state logic.",
    "react hooks": "React Hooks allow functional components to use state and other React features."
};

// 🔹 Function to Get Answer
export const getAnswer = (question) => {
    const formattedQuestion = question.trim().toLowerCase();

    //  **Step 1: Check for Keyword Matches**
    for (const key in predefinedAnswers) {
        if (formattedQuestion.includes(key)) {
            return predefinedAnswers[key]; // Return matched answer
        }
    }

    //  **Step 2: Google Search Fallback**
    const userWantsGoogleSearch = window.confirm("I couldn't find an answer. Would you like me to search on Google?");
    if (userWantsGoogleSearch) {
        window.open(`https://www.google.com/search?q=${encodeURIComponent(question)}`, "_blank");
        return "Searching on Google...";
    } else {
        return "Try something else.";
    }
};
