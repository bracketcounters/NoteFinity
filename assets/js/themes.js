const themes = {
  "Icy Blue": {
    playground: "bg-white text-black",
    navigation: "bg-transparent hover:bg-gray-200 focus:bg-gray-200 text-gray-800 hover:text-gray-800 focus:text-gray-800",
    navigationList:
      "bg-white text-gray-800 hover:text-gray-800 hover:bg-gray-200 active:text-white active:bg-sky-400",
    line: "border-t-gray-200",
    tabactive: "border-gray-300"
  },
  "Rosy": {
    playground: "bg-pink-100 text-gray-800",
    navigation: "bg-transparent text-gray-800 hover:bg-pink-200 hover:text-gray-800 focus:bg-pink-200 focus:text-gray-800",
    navigationList:
      "bg-transparent text-gray-800 hover:text-gray-800 hover:bg-pink-200 active:text-white active:bg-pink-500",
    line: "border-t-gray-200",
    tabactive: "border-pink-300"
  },
  "Dark Knight": {
    playground: "bg-gray-800 text-gray-400",
    navigation: "bg-transparent hover:bg-gray-600 focus:bg-gray-600",
    navigationList:
      "bg-gray-900 text-gray-400 hover:text-white hover:bg-gray-600 active:text-white active:bg-blue-500",
    line: "border-t-gray-600",
    tabactive: "border-gray-600"
  },
  "Sunshine": {
    playground: "bg-yellow-50 text-gray-800",
    navigation: "bg-transparent hover:bg-yellow-300 focus:bg-yellow-300",
    navigationList: "bg-yellow-400 text-gray-800 hover:text-white hover:bg-yellow-500 active:text-white active:bg-yellow-600",
    line: "border-t-yellow-300",
    tabactive: "border-yellow-600"
  },
  "Fresh Air":{
    playground: "bg-green-100 text-gray-800",
    navigation: "bg-transparent hover:bg-green-300 focus:bg-green-300",
    navigationList: "bg-green-400 text-gray-800 hover:text-white hover:bg-green-500 active:text-white active:bg-green-600",
    line: "border-t-green-300",
    tabactive: "border-green-600"
  },
  "Ocean Breeze":{
    playground: "bg-blue-50 text-gray-800",
    navigation: "bg-transparent hover:bg-blue-300 focus:bg-blue-300",
    navigationList: "bg-blue-400 text-gray-800 hover:text-white hover:bg-blue-500 active:text-white active:bg-blue-600",
    line: "border-t-blue-300",
    tabactive: "border-blue-600"
  },
  "Creamy Vanilla":{
    playground: "bg-slate-100 text-slate-800",
    navigation: "bg-transparent hover:bg-slate-300 focus:bg-slate-300",
    navigationList: "bg-slate-400 text-slate-800 hover:text-white hover:bg-slate-500 active:text-white active:bg-slate-600",
    line: "border-t-slate-300",
    tabactive: "border-slate-600"
  },
  "Royal Purple":{
    playground: "bg-purple-800 text-gray-400",
    navigation: "bg-transparent hover:bg-purple-600 focus:bg-purple-600",
    navigationList: "bg-purple-900 text-gray-400 hover:text-white hover:bg-purple-600 active:text-white active:bg-blue-500",
    line: "border-t-purple-800",
    tabactive: "border-purple-600"
  },
  "Lilac":{
    playground: "bg-purple-50 text-gray-800",
    navigation: "bg-transparent hover:bg-purple-300 focus:bg-purple-300",
    navigationList: "bg-purple-400 text-gray-800 hover:text-white hover:bg-purple-500 active:text-white active:bg-purple-600",
    line: "border-t-purple-300",
    tabactive: "border-purple-600"
  },
  "Peach":{
    playground: "bg-orange-50 text-gray-800",
    navigation: "bg-transparent hover:bg-orange-300 focus:bg-orange-300",
    navigationList: "bg-orange-400 text-gray-800 hover:text-white hover:bg-orange-500 active:text-white active:bg-orange-600",
    line: "border-t-orange-300",
    tabactive: "border-orange-600"
  },
  "Saffron Spice":{
    playground: "bg-white text-gray-800",
    navigation: "bg-transparent hover:bg-yellow-500 focus:bg-yellow-500",
    navigationList: "bg-yellow-600 text-gray-800 hover:text-white hover:bg-yellow-700 active:text-white active:bg-yellow-800",
    line: "border-t-yellow-500",
    tabactive: "border-yellow-900"
  },
  "Cloudy Gray":{
    playground: "bg-gray-50 text-gray-800",
    navigation: "bg-transparent hover:bg-gray-300 focus:bg-gray-300",
    navigationList: "bg-gray-400 text-gray-800 hover:text-white hover:bg-gray-500 active:text-white active:bg-gray-600",
    line: "border-t-gray-300",
    tabactive: "border-gray-600"
  },
  "Scarlet":{
    playground: "bg-red-50 text-gray-800",
    navigation: "bg-transparent hover:bg-red-500 focus:bg-red-500",
    navigationList: "bg-red-600 text-gray-200 hover:text-white hover:bg-red-700 active:text-white active:bg-red-800",
    line: "border-t-red-500",
    tabactive: "border-red-800"
  },
  "Orange Cream":{
    playground: "bg-white text-gray-800",
    navigation: "bg-transparent hover:bg-orange-500 focus:bg-orange-500",
    navigationList: "bg-orange-600 text-gray-800 hover:text-white hover:bg-orange-700 active:text-white active:bg-orange-800",
    line: "border-t-orange-500",
    tabactive: "border-orange-900"
  },
  "Rose Water":{
    playground: "bg-pink-50 text-gray-800",
    navigation: "bg-transparent hover:bg-pink-300 focus:bg-pink-300",
    navigationList: "bg-pink-400 text-gray-800 hover:text-white hover:bg-pink-500 active:text-white active:bg-pink-600",
    line: "border-t-pink-300",
    tabactive: "border-pink-600"
  },
  "Dark Ocean":{
    playground: "bg-black text-gray-400",
    navigation: "bg-transparent hover:bg-blue-700 focus:bg-blue-700",
    navigationList: "bg-blue-900 text-gray-400 hover:text-white hover:bg-blue-700 active:text-white active:bg-blue-600",
    line: "border-t-blue-800",
    tabactive: "border-blue-600"
  },
  "Slate Gray":{
    playground: "bg-gray-200 text-gray-800",
    navigation: "bg-transparent hover:bg-gray-500 focus:bg-gray-500",
    navigationList: "bg-gray-600 text-gray-200 hover:text-white hover:bg-gray-700 active:text-white active:bg-gray-800",
    line: "border-t-gray-500",
    tabactive: "border-gray-800"
  },
  "Crimson":{
    playground: "bg-red-50 text-gray-800",
    navigation: "bg-transparent hover:bg-red-200 focus:bg-red-200",
    navigationList: "bg-white text-gray-800 hover:text-gray-800 hover:bg-red-300 active:text-white active:bg-red-600",
    line: "border-t-gray-200",
    tabactive: "border-red-800"
  },
  "Indigo Night":{
    playground: "bg-indigo-800 text-gray-400",
    navigation: "bg-transparent hover:bg-indigo-500 focus:bg-indigo-500",
    navigationList: "bg-indigo-700 text-gray-400 hover:text-white hover:bg-indigo-600 active:text-white active:bg-indigo-500",
    line: "border-t-indigo-600",
    tabactive: "border-indigo-500"
  },
  "Indigo Breeze":{
    playground: "bg-white text-gray-800",
    navigation: "bg-transparent hover:bg-indigo-500 focus:bg-indigo-500",
    navigationList: "bg-indigo-600 text-gray-200 hover:text-white hover:bg-indigo-700 active:text-white active:bg-indigo-800",
    line: "border-t-indigo-500",
    tabactive: "border-indigo-800"
  },
  "Zinc":{
    playground: "bg-gray-600 text-gray-200",
    navigation: "bg-transparent hover:bg-gray-300 focus:bg-gray-300",
    navigationList: "bg-gray-500 text-gray-300 hover:text-white hover:bg-gray-400 active:text-white active:bg-gray-300",
    line: "border-t-gray-400",
    tabactive: "border-gray-200"
  },

  "Azure":{
    playground: "bg-blue-100 text-gray-800",
    navigation: "bg-transparent hover:bg-blue-500 focus:bg-blue-500",
    navigationList: "bg-blue-600 text-gray-200 hover:text-white hover:bg-blue-700 active:text-white active:bg-blue-800",
    line: "border-t-blue-500",
    tabactive: "border-blue-800"
  },
  "Coral":{
    playground: "bg-red-100 text-gray-800",
    navigation: "bg-transparent hover:bg-red-500 focus:bg-red-500",
    navigationList: "bg-red-600 text-gray-200 hover:text-white hover:bg-red-700 active:text-white active:bg-red-800",
    line: "border-t-red-500",
    tabactive: "border-red-800"
  },
  "Ocean":{
    playground: "bg-teal-100 text-gray-800",
    navigation: "bg-transparent hover:bg-teal-500 focus:bg-teal-500",
    navigationList: "bg-teal-600 text-gray-200 hover:text-white hover:bg-teal-700 active:text-white active:bg-teal-800",
    line: "border-t-teal-500",
    tabactive: "border-teal-800"
  },
  "Snow White": {
    playground: "bg-white text-sky-400",
    navigation: "bg-transparent hover:bg-gray-100 focus:bg-gray-100",
    navigationList: "bg-gray-100 text-gray-900 hover:text-white hover:bg-gray-200 active:text-white active:bg-gray-300",
    line: "border-t-gray-200",
    tabactive: "border-gray-300"
  },
  "Neon Orange": {
    playground: "bg-black text-orange-500",
    navigation: "bg-transparent hover:bg-orange-700 focus:bg-orange-700 text-white hover:text-white focus:text-white",
    navigationList:
      "bg-black text-orange-500 hover:text-orange-500 hover:bg-orange-700 active:text-white active:bg-orange-900",
    line: "border-t-gray-800",
    tabactive: "border-orange-700"
  },
  "Neon Yellow": {
    playground: "bg-black text-yellow-500",
    navigation: "bg-transparent hover:bg-yellow-700 focus:bg-yellow-700 text-white hover:text-white focus:text-white",
    navigationList:
      "bg-black text-yellow-500 hover:text-yellow-500 hover:bg-yellow-700 active:text-white active:bg-yellow-900",
    line: "border-t-gray-800",
    tabactive: "border-yellow-700"
  },
  "Neon Pink": {
    playground: "bg-black text-pink-500",
    navigation: "bg-transparent hover:bg-pink-700 focus:bg-pink-700 text-white hover:text-white focus:text-white",
    navigationList:
      "bg-black text-pink-500 hover:text-pink-500 hover:bg-pink-700 active:text-white active:bg-pink-900",
    line: "border-t-gray-800",
    tabactive: "border-pink-700"
  },
  "Neon Blue": {
    playground: "bg-black text-sky-500",
    navigation: "bg-transparent hover:bg-sky-700 focus:bg-sky-700 text-white hover:text-white focus:text-white",
    navigationList:
      "bg-black text-sky-500 hover:text-sky-500 hover:bg-sky-700 active:text-white active:bg-sky-900",
    line: "border-t-gray-800",
    tabactive: "border-sky-700"
  },
  "Neon Green": {
    playground: "bg-black text-green-500",
    navigation: "bg-transparent hover:bg-green-700 focus:bg-green-700 text-white hover:text-white focus:text-white",
    navigationList:
      "bg-black text-green-500 hover:text-green-500 hover:bg-green-700 active:text-white active:bg-green-900",
    line: "border-t-gray-800",
    tabactive: "border-green-700"
  },
  "Neon Indigo": {
    playground: "bg-black text-indigo-500",
    navigation: "bg-transparent hover:bg-indigo-700 focus:bg-indigo-700 text-white hover:text-white focus:text-white",
    navigationList:
      "bg-black text-indigo-500 hover:text-indigo-500 hover:bg-indigo-700 active:text-white active:bg-indigo-900",
    line: "border-t-gray-800",
    tabactive: "border-indigo-700"
  },
  "Neon Purple": {
    playground: "bg-black text-purple-500",
    navigation: "bg-transparent hover:bg-purple-700 focus:bg-purple-700 text-white hover:text-white focus:text-white",
    navigationList:
      "bg-black text-purple-500 hover:text-purple-500 hover:bg-purple-700 active:text-white active:bg-purple-900",
    line: "border-t-gray-800",
    tabactive: "border-purple-700"
  },
  "Clear Sky": {
    playground: "bg-white text-black",
    navigation: "bg-transparent hover:bg-sky-100 focus:bg-sky-100 text-sky-800 hover:text-sky-800 focus:text-sky-800",
    navigationList: "bg-sky-200 text-sky-800 hover:text-white hover:bg-sky-300 active:text-white active:bg-sky-400",
    line: "border-t-sky-100",
    tabactive: "border-sky-400"
  },
  "Lemon Zest": {
    playground: "bg-white text-black",
    navigation: "bg-transparent hover:bg-yellow-100 focus:bg-yellow-100 text-yellow-800 hover:text-yellow-800 focus:text-yellow-800",
    navigationList: "bg-yellow-200 text-yellow-800 hover:text-white hover:bg-yellow-300 active:text-white active:bg-yellow-400",
    line: "border-t-yellow-100",
    tabactive: "border-yellow-400"
  },
  "Golden Glow": {
    playground: "bg-yellow-200 text-gray-800",
    navigation: "bg-transparent hover:bg-yellow-400 focus:bg-yellow-400",
    navigationList: "bg-yellow-500 text-gray-800 hover:text-white hover:bg-yellow-600 active:text-white active:bg-yellow-700",
    line: "border-t-yellow-400",
    tabactive: "border-yellow-700"
  },
};