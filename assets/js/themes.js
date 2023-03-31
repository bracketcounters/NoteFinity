const themes = {
  "Icy Blue": {
    playground: "bg-white text-black",
    navigation: "bg-transparent hover:bg-gray-200 text-gray-800 hover:text-gray-800",
    navigationList:
      "bg-white text-gray-800 hover:text-gray-800 hover:bg-gray-200 active:text-white active:bg-sky-400",
    tabactive: "border-gray-300"
  },
  "Rosy": {
    playground: "bg-pink-100 text-gray-800",
    navigation: "bg-transparent text-gray-800 hover:bg-pink-200 hover:text-gray-800",
    navigationList:
      "bg-transparent text-gray-800 hover:text-gray-800 hover:bg-pink-200 active:text-white active:bg-pink-500",
    tabactive: "border-pink-300"
  },
  "Dark Knight": {
    playground: "bg-gray-800 text-gray-400",
    navigation: "bg-transparent hover:bg-gray-600",
    navigationList:
      "bg-gray-900 text-gray-400 hover:text-white hover:bg-gray-600 active:text-white active:bg-blue-500",
    tabactive: "border-gray-600"
  },
  "Sunshine": {
    playground: "bg-yellow-50 text-gray-800",
    navigation: "bg-transparent hover:bg-yellow-300",
    navigationList: "bg-yellow-400 text-gray-800 hover:text-white hover:bg-yellow-500 active:text-white active:bg-yellow-600",
    tabactive: "border-yellow-600"
  },
  "Fresh Air":{
    playground: "bg-green-100 text-gray-800",
    navigation: "bg-transparent hover:bg-green-300",
    navigationList: "bg-green-400 text-gray-800 hover:text-white hover:bg-green-500 active:text-white active:bg-green-600",
    tabactive: "border-green-600"
  },
  "Ocean Breeze":{
    playground: "bg-blue-50 text-gray-800",
    navigation: "bg-transparent hover:bg-blue-300",
    navigationList: "bg-blue-400 text-gray-800 hover:text-white hover:bg-blue-500 active:text-white active:bg-blue-600",
    tabactive: "border-blue-600"
  },
  "Creamy Vanilla":{
    playground: "bg-slate-100 text-slate-800",
    navigation: "bg-transparent hover:bg-slate-300",
    navigationList: "bg-slate-400 text-slate-800 hover:text-white hover:bg-slate-500 active:text-white active:bg-slate-600",
    tabactive: "border-slate-600"
  },
  "Royal Purple":{
    playground: "bg-purple-800 text-gray-400",
    navigation: "bg-transparent hover:bg-purple-600",
    navigationList: "bg-purple-900 text-gray-400 hover:text-white hover:bg-purple-600 active:text-white active:bg-blue-500",
    tabactive: "border-purple-600"
  },
  "Lilac":{
    playground: "bg-purple-50 text-gray-800",
    navigation: "bg-transparent hover:bg-purple-300",
    navigationList: "bg-purple-400 text-gray-800 hover:text-white hover:bg-purple-500 active:text-white active:bg-purple-600",
    tabactive: "border-purple-600"
  },
  "Peach":{
    playground: "bg-orange-50 text-gray-800",
    navigation: "bg-transparent hover:bg-orange-300",
    navigationList: "bg-orange-400 text-gray-800 hover:text-white hover:bg-orange-500 active:text-white active:bg-orange-600",
    tabactive: "border-orange-600"
  },
  "Saffron Spice":{
    playground: "bg-white text-gray-800",
    navigation: "bg-transparent hover:bg-yellow-500",
    navigationList: "bg-yellow-600 text-gray-800 hover:text-white hover:bg-yellow-700 active:text-white active:bg-yellow-800",
    tabactive: "border-yellow-900"
  },
  "Cloudy Gray":{
    playground: "bg-gray-50 text-gray-800",
    navigation: "bg-transparent hover:bg-gray-300",
    navigationList: "bg-gray-400 text-gray-800 hover:text-white hover:bg-gray-500 active:text-white active:bg-gray-600",
    tabactive: "border-gray-600"
  },
  "Scarlet":{
    playground: "bg-red-50 text-gray-800",
    navigation: "bg-transparent hover:bg-red-500",
    navigationList: "bg-red-600 text-gray-200 hover:text-white hover:bg-red-700 active:text-white active:bg-red-800",
    tabactive: "border-red-800"
  },
  "Orange Cream":{
    playground: "bg-white text-gray-800",
    navigation: "bg-transparent hover:bg-orange-500",
    navigationList: "bg-orange-600 text-gray-800 hover:text-white hover:bg-orange-700 active:text-white active:bg-orange-800",
    tabactive: "border-orange-900"
  },
  "Rose Water":{
    playground: "bg-pink-50 text-gray-800",
    navigation: "bg-transparent hover:bg-pink-300",
    navigationList: "bg-pink-400 text-gray-800 hover:text-white hover:bg-pink-500 active:text-white active:bg-pink-600",
    tabactive: "border-pink-600"
  },
  "Dark Ocean":{
    playground: "bg-black text-gray-400",
    navigation: "bg-transparent hover:bg-blue-700",
    navigationList: "bg-blue-900 text-gray-400 hover:text-white hover:bg-blue-700 active:text-white active:bg-blue-600",
    tabactive: "border-blue-600"
  },
  "Slate Gray":{
    playground: "bg-gray-200 text-gray-800",
    navigation: "bg-transparent hover:bg-gray-500",
    navigationList: "bg-gray-600 text-gray-200 hover:text-white hover:bg-gray-700 active:text-white active:bg-gray-800",
    tabactive: "border-gray-800"
  },
  "Crimson":{
    playground: "bg-red-50 text-gray-800",
    navigation: "bg-transparent hover:bg-red-200",
    navigationList: "bg-white text-gray-800 hover:text-gray-800 hover:bg-red-300 active:text-white active:bg-red-600",
    tabactive: "border-red-800"
  },
  "Indigo Night":{
    playground: "bg-indigo-800 text-gray-400",
    navigation: "bg-transparent hover:bg-indigo-500",
    navigationList: "bg-indigo-700 text-gray-400 hover:text-white hover:bg-indigo-600 active:text-white active:bg-indigo-500",
    tabactive: "border-indigo-500"
  },
  "Indigo Breeze":{
    playground: "bg-white text-gray-800",
    navigation: "bg-transparent hover:bg-indigo-500",
    navigationList: "bg-indigo-600 text-gray-200 hover:text-white hover:bg-indigo-700 active:text-white active:bg-indigo-800",
    tabactive: "border-indigo-800"
  },
  "Zinc":{
    playground: "bg-gray-600 text-gray-200",
    navigation: "bg-transparent hover:bg-gray-300",
    navigationList: "bg-gray-500 text-gray-300 hover:text-white hover:bg-gray-400 active:text-white active:bg-gray-300",
    tabactive: "border-gray-200"
  },

  "Azure":{
    playground: "bg-blue-100 text-gray-800",
    navigation: "bg-transparent hover:bg-blue-500",
    navigationList: "bg-blue-600 text-gray-200 hover:text-white hover:bg-blue-700 active:text-white active:bg-blue-800",
    tabactive: "border-blue-800"
  },
  "Moss":{
    playground: "bg-green-100 text-gray-800",
    navigation: "bg-transparent hover:bg-green-500",
    navigationList: "bg-green-600 text-gray-200 hover:text-white hover:bg-green-700 active:text-white active:bg-green-800",
    tabactive: "border-green-800"
  },
  "Coral":{
    playground: "bg-red-100 text-gray-800",
    navigation: "bg-transparent hover:bg-red-500",
    navigationList: "bg-red-600 text-gray-200 hover:text-white hover:bg-red-700 active:text-white active:bg-red-800",
    tabactive: "border-red-800"
  },
  "Ocean":{
    playground: "bg-teal-100 text-gray-800",
    navigation: "bg-transparent hover:bg-teal-500",
    navigationList: "bg-teal-600 text-gray-200 hover:text-white hover:bg-teal-700 active:text-white active:bg-teal-800",
    tabactive: "border-teal-800"
  }
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
        
};