const presets = [
  ['@babel/env', {
    targets: {
      ie: '11',
      chrome: '64'
    },
    useBuiltIns: "entry",
    corejs: { version: "3.32.1"}
  }]
]

module.exports = { presets}