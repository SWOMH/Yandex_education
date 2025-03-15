// jest.config.js
module.exports = {
  transform: {
    "^.+\\.jsx?$": "babel-jest", // для JavaScript-файлов
    "^.+\\.tsx?$": "ts-jest", // для TypeScript-файлов
  },
  testEnvironment: "jsdom",
  moduleFileExtensions: ["js", "jsx", "ts", "tsx"], // добавляем поддержку TypeScript
};