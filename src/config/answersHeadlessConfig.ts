
export const googleMapsConfig =  {
  centerLatitude: 38.047989,
  centerLongitude:-84.501640,
  // googleMapsApiKey: "AIzaSyDZNQlSlEIkFAct5VzUtsP4dSbvOr2bE18"  
  googleMapsApiKey: "AIzaSyDZNQlSlEIkFAct5VzUtsP4dSbvOr2bE18" 
}; 

export const AnswerExperienceConfig = {
  limit:4,
  locale: "en",
  apiKey : "06fd5ba2b2a505cc0d620efe004958a4",
  verticalKey : "locations",
  experienceKey : "independent-financial",
  experienceVersion: "STAGING",
  locationRadius: 100000,
  sessionTrackingEnabled: true,
  endpoints: {
    universalSearch: "https://liveapi-sandbox.yext.com/v2/accounts/me/answers/query",
    verticalSearch: "https://liveapi-sandbox.yext.com/v2/accounts/me/answers/vertical/query",
    questionSubmission: "https://liveapi-sandbox.yext.com/v2/accounts/me/createQuestion",
    universalAutocomplete: "https://liveapi-sandbox.yext.com/v2/accounts/me/answers/autocomplete",
    verticalAutocomplete: "https://liveapi-sandbox.yext.com/v2/accounts/me/answers/vertical/autocomplete",
    filterSearch: "https://liveapi-sandbox.yext.com/v2/accounts/me/answers/filtersearch",

  }
}