module.exports = {
  "roots": ["<rootDir>/src"],
  "setupFiles": [
    "<rootDir>/config/test-shim.js"
  ],
  "moduleDirectories": [
    "<rootDir>/node_modules",
    "<rootDir>/src"
  ],
  "moduleFileExtensions": [
    "ts",
    "tsx",
    "js",
    "jsx"
  ],
  "moduleNameMapper": {
    "~components/(.*)": "<rootDir>/src/components/$1",
    "~common/(.*)": "<rootDir>/src/common/$1",
    "~stores/(.*)": "<rootDir>/src/stores/$1",
    '~pages/(.*)': "<rootDir>/src/pages/$1",
    '~types/(.*)': "<rootDir>/src/types/$1",
    '~img/(.*)': "<rootDir>/src/img/$1",
    '~utils/(.*)': "<rootDir>/src/utils/$1",
    '~model/(.*)': "<rootDir>/src/model/$1",
    '~services/(.*)': "<rootDir>/src/services/$1",
    "css-vendor*": "<rootDir>/node_modules/jss-plugin-vendor-prefixer/node_modules/css-vendor"
  },
  "transform": {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/config/jestFileTransformer.js"
  },
  "testRegex": "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
  "snapshotSerializers": ["enzyme-to-json/serializer"],
  "setupFilesAfterEnv": ["<rootDir>/config/setupEnzyme.js", "<rootDir>/config/test-imports.js"],
}