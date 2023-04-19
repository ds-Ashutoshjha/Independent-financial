import { useSearchActions } from "@yext/search-headless-react";
import { useEffect, useState, useRef } from "react";
import * as React from "react";
import {
  LocationBias,
  Pagination,
  StandardFacets,
} from "@yext/search-ui-react";


import { Location } from "../../types/search/locations";
import LocationCard from "./LocationCard";
import { AnswersHeadlessProvider } from "@yext/answers-headless-react";
import { GoogleMaps } from "./GoogleMaps";
import { useSearchState, Result } from "@yext/search-headless-react";
import Geocode from "react-geocode";
import Address from "../commons/Address";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";
import $ from "jquery";
import Banner from "../locationDetail/banner";
import LoadingSpinner from "../commons/LoadingSpinner";

import { Matcher, SelectableFilter } from "@yext/search-headless-react";

import { googleMapsConfig } from "../../config/answersHeadlessConfig";

import {
  breadcrumbhome,
  center_latitude,
  center_longitude,
  googleApikey,
  search_icn,
  UseMylocationsvg,
} from "../../../sites-global/global";
import { StaticData } from "../../../sites-global/staticData";

import FilterSearch from "../locatorPage/FilterSearch";
import ViewMore from "./ViewMore";
import VerticalResults from "../VerticalResults";
import ResultsCount from "./ResultsCount";
import useFetchResults from "../../hooks/useFetchResults";
import { Link } from "@mui/material";
import { AnswerExperienceConfig } from "../../config/answersHeadlessConfig";
import Footer from "../layouts/footer";
import { Wrapper } from "@googlemaps/react-wrapper";


var params1: any = { latitude: center_latitude, longitude: center_longitude };
var mapzoom = 8;
var centerLatitude = center_latitude;
var centerLongitude = center_longitude;

const SearchLayout = (props: any): JSX.Element => {
  console.log("props", props);

  const [isLoading, setIsloading] = React.useState(true);
  const [check, setCheck] = useState(false);
  type FilterHandle = React.ElementRef<typeof FilterSearch>;
  const filterRef = useRef<FilterHandle>(null);
  const locationResults = useFetchResults() || [];
  const locationinbuit =
    useSearchState((state) => state.vertical?.results) || [];
  const alternateresult =
    useSearchState((state) => state.vertical?.results?.length) || 0;
  const [displaymsg, setDisplaymsg] = useState(false);
  const [inputvalue, setInputValue] = React.useState("");
  // const [inputvalue, setInputValue] = React.useState('');
  const [allowlocation, setallowLocation] = React.useState("");
  const [newparam, SetNewparam] = React.useState({ latitude: 0, longitude: 0 });
  const [offset, setOffset] = React.useState(0);
  const searchActions = useSearchActions();
  const state = useSearchState((s) => s) || [];
  const [optionclick, setOptionClick] = useState(true);

  const loading = useSearchState((s) => s.searchStatus.isLoading);
  let googleLib = typeof google !== "undefined" ? google : null;
  const [filterValue, setFilterValue] = useState([]);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [facetData, setFacetData] = useState("");

  var searchKey: any;
  var target;

  var firstTimeRunners = true;
 

  const FirstLoad = () => {
    setCheck(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          const params: any = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          params1 = params;
          SetNewparam(params1);
          mapzoom = 3;
          const locationFilter: SelectableFilter = {
            selected: true,
            fieldId: "builtin.location",
            value: {
              lat: params.latitude,
              lng: params.longitude,
              radius: 10000000000,
            },
  
            matcher: Matcher.Near,
          };
  
          searchActions.setOffset(0)
          searchActions.setStaticFilters([locationFilter]);
          searchActions.setUserLocation(params1);
          searchActions.setVerticalLimit(AnswerExperienceConfig.limit);
          searchActions.executeVerticalQuery();
        },
        function (error) {
          if (error.code == error.PERMISSION_DENIED) {
          }
        }
      );
    }
    params1 = {
      latitude: 33.1,
      longitude: -96.41,
    };
    SetNewparam(params1);
    // mapzoom=8;
    const locationFilter: SelectableFilter = {
      selected: true,
      fieldId: "builtin.location",
      value: {
        lat: params1.latitude,
        lng: params1.longitude,
        radius: 100000,
      },

      matcher: Matcher.Near,
    };
    searchActions.setStaticFilters([locationFilter]);
    searchActions.setUserLocation(params1);
    searchActions.setVerticalLimit(AnswerExperienceConfig.limit);
    searchActions.executeVerticalQuery();
    setTimeout(() => {
      setIsloading(false);
      $("body").removeClass("overflow-hidden");
    }, 3100);
  };
  const onClick = () => {
    if (navigator.geolocation) {
      const error = (error: any) => {
        if (error.code == 1) {
          setallowLocation("Please allow your Location");
        }
      };

      navigator.geolocation.getCurrentPosition(
        function (position) {
          Geocode.setApiKey(googleApikey);
          var inputformat = "";
          Geocode.fromLatLng(
            position.coords.latitude,
            position.coords.longitude
          ).then(
            (response: any) => {
              if (response.results[0]) {
                filterRef.current &&
                  filterRef.current.setInputValue(
                    response.results[0].formatted_address
                  );
                setallowLocation("");
              }
            },
            (error: any) => {
              console.error(error);
              setCheck(false);
            }
          );

          let params = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };

          mapzoom = 3;
          searchActions.setVertical("locations");
          searchActions.setUserLocation(params);
          searchActions.setOffset(0);
          searchActions.executeVerticalQuery();
        },
        error,
        {
          timeout: 10000,
        }
      );
    }
  };

  const Findinput = () => {
    let searchKey = document.getElementsByClassName("FilterSearchInput");
    let Search = searchKey[0].value;

    setInputValue("");
    if (searchKey[0].value != "") {
      getCoordinates(Search);
    }
    console.log(locationinbuit.length, "fisttimedispaly");
    if (locationinbuit.length == 0) {
      setDisplaymsg(true);
    } else {
      setDisplaymsg(false);
    }
  };

  const handleInputValue = () => {
    setInputValue("");
  };
  const handleSetUserShareLocation = (value: any, userShareStatus: boolean) => {
    console.log(value, center_latitude, center_longitude, "value");
    setInputValue(value);
    if (userShareStatus) {
      setCenterLatitude(center_latitude);
      setCenterLongitude(center_longitude);
    }
  };

  function getCoordinates(address: String) {
    setInputValue("");

    setCheck(true);
    // console.log(searchActions,"searchActions")
    searchActions.setQuery(address);
    searchActions.setUserLocation(params1);
    searchActions.setOffset(0);
    searchActions.executeVerticalQuery();
    searchActions.setFacets()
  }

  const c_locatorButton =
    props._site?.c_locatorButton[0]?.mainMenu != undefined
      ? props._site?.c_locatorButton[0]?.mainMenu
      : "";

  // console.log('c_locatorButtonssss', c_locatorButton)

  // const loader =
  //   isLoading ? <LoadingSpinner /> : '';

  const addClass = () => {
    document.body.setAttribute("class", "mapView");
    // setActive('')
  };

  useEffect(() => {
    if (locationinbuit.length > 0) {
      setDisplaymsg(false);
    }
  }, [locationinbuit]);
  useEffect(() => {
    console.log("yes rerender");
    locationResults.map((result: any, index: number) => {
      const resultelement = document.querySelectorAll(
        `.result-list-inner-${index + 1}`
      );
      for (let index = 0; index < resultelement.length; index++) {
        if (
          resultelement[index].classList.contains("active") ||
          resultelement[index].classList.contains("fixed-hover")
        ) {
          resultelement[index].classList.remove("active", "fixed-hover");
        }
      }
    });
  }, [loading]);
  useEffect(() => {
    if (firstTimeRunners) {
      firstTimeRunners = false;
      // searchActions.resetFacets();
      FirstLoad();
    }
  }, []);

  const Findinput2 = () => {
    let Search = inputRef.current?.value || "";
    let locationHub: any = [];
    if (Search.length == 0) {
      const bounds = new google.maps.LatLngBounds();
      bounds.extend({
        lat: googleMapsConfig.centerLatitude,
        lng: googleMapsConfig.centerLongitude,
      });
      searchActions.setVertical("locations");
      searchActions.setQuery("");

      if (filterValue.length > 0) {
        // setShowFilterEmptyMsg(true);
        let location: SelectableFilter = {
          selected: true,
          fieldId: "c_relatedAdvantages.name",
          value: filterValue[0],
          matcher: Matcher.Equals,
        };
        locationHub.push(location);

        if (filterValue.length > 1) {
          let location2: SelectableFilter = {
            selected: true,
            fieldId: "c_glassdriveAdvantages",
            value: filterValue[1],
            matcher: Matcher.Equals,
          };
          locationHub.push(location2);
        }

        if (facetData != "") {
          let facet_core: SelectableFilter = {
            selected: false,
            fieldId: "c_typesDeVéhicules",
            value: facetData,
            matcher: Matcher.Equals,
          };
          locationHub.push(facet_core);
        }
      } else {
        locationHub = [];
      }
      searchActions.setStaticFilters(locationHub);

      searchActions.setOffset(0);
      searchActions.setVerticalLimit(AnswerExperienceConfig.limit);
      searchActions.executeVerticalQuery();
      getCoordinates(Search);
    }
  };
  const [data, setData] = useState([]);

  const searchbybranch = () => {
    //  let facet: SelectableFilter = {
    //   selected: true,
    //   fieldId: "c_searchby",
    //   value: "Branch",
    //   matcher: Matcher.Equals,
    // };
        // getCoordinates("branch");
        searchActions.setFilterOption(facet);
        searchActions.executeVerticalQuery()
      //   useEffect(() => {
      //     const apiUrl = '06fd5ba2b2a505cc0d620efe004958a4';
      //     const apiKey = 'independent-financial';
      //     const filteredApiKey = `branch ${apiKey}`;
      //     fetch(apiUrl, {
      //       headers: {
      //         'Authorization': filteredApiKey,
      //         'User-Agent': 'searchlayout',
              
      //       }
      //     })
      //     .then(response => response.json())
      //     .then(data => setData(data))
      //     .catch(error => console.error(error));
      // }, []);
      // return (
      //   <div>
      //     {filteredApiKey}
      //   </div>
      // );
    }

    


 

  const searchbyatm = () => {
    let facet: SelectableFilter = {
      selected: true,
      fieldId: "c_searchby",
      value: "ATM",
      matcher: Matcher.Equals,
    };
        // getCoordinates("branch");
        searchActions.setFilterOption(facet);
        searchActions.executeVerticalQuery()

  

  };

  const [autocomplete, setAutocomplete] =
    useState<google.maps.places.Autocomplete>();

  useEffect(() => {
    if (googleLib && typeof google.maps === "object") {
      let pacInput: any = document?.getElementById("pac-input");
      let options: any = {
        options: {
          types: ["geocode"],
          componentRestrictions: { country: "USA" },
          strictBounds: false,
          fields: ["address_components", "geometry", "icon", "name"],
        },
      };
      const autoComplete = new google.maps.places.Autocomplete(
        pacInput,
        options
      );
      if (autoComplete) {
        function pacSelectFirst(input: HTMLInputElement) {
          var _addEventListener = input?.addEventListener;

          function addEventListenerWrapper(type: string, listener: any) {
            if (type == "keydown") {
              var orig_listener = listener;

              listener = function (event: { which: number }) {
                var suggestion_selected = $(".pac-item-selected").length > 0;

                if (
                  (event.which == 13 || event.which == 9) &&
                  !suggestion_selected
                ) {
                  var simulated_downarrow = $.Event("keydown", {
                    keyCode: 40,
                    which: 40,
                  });
                  orig_listener.apply(input, [simulated_downarrow]);
                }

                orig_listener.apply(input, [event]);
              };
            }

            _addEventListener.apply(input, [type, listener]);
          }

          if (input?.addEventListener) {
            input.addEventListener = addEventListenerWrapper;
          }
        }

        setAutocomplete(autoComplete);
        pacSelectFirst(pacInput);
        $("#search-location-button")
          .off("click")
          .on("click", function () {
            var keydown = document.createEvent("HTMLEvents");
            keydown.initEvent("keydown", true, false);
            Object.defineProperty(keydown, "keyCode", {
              get: function () {
                return 13;
              },
            });
            Object.defineProperty(keydown, "which", {
              get: function () {
                return 13;
              },
            });
            pacInput.dispatchEvent(keydown);
          });

        google.maps.event.addListener(
          autoComplete,
          "place_changed",
          function () {
            const searchKey: any = pacInput.value;
            if (searchKey) {
              getCoordinates(searchKey);
            }
          }
        );
      }
    }
    return () => {
      if (autocomplete) {
        autocomplete.unbindAll();
      }
    };
  }, [googleLib]);
  

  return (
    <>
      <Wrapper
        apiKey={googleMapsConfig.googleMapsApiKey}
        libraries={["places", "geometry"]}
      >
        {/* {loader} */}

       
       
        <div className="breadcrumb">
          <div className="container-custom">
            <ul>
              <li>
                <a href="#" className="home">
                  {" "}
                  Home
                </a>
              </li>
              <li>{StaticData.locator_breadcrumb}</li>
            </ul>
          </div>
        </div>
        <div className="locator-main">
          {allowlocation.length > 0 ? (
            <div className="for-allow">{allowlocation}</div>
          ) : (
            ""
          )}

          <div className="search-bx">
            <div className="location-with-filter">
              <h1 className="">{StaticData.FindLocationtext}</h1>
            </div>
            <div className="loBtn flex">
                       {/* <StandardFacets
          customCssClasses={{ container: "filter-items" }}
          defaultExpanded={true}
          
></StandardFacets> */}


  {c_locatorButton.map((data: any, index: number) => {
                return (
                  <>
                    <a
                      onClick={index == 0 ? searchbybranch : searchbyatm}
                      href="javascript:void(0)"
                      className={index == 0 ? 'Link button-red cursor-pointer mr-2 searchbranch' : 'Link button-red cursor-pointer mr-2 searchatm'}
                      type="button"
                      style={{ unicodeBidi: "bidi-override", direction: "ltr" }}
                    >
                      {data?.label}
                    </a>
                  </>
                );
              })} 
           
               
              
      
            </div>
           

            <div className="search-field">
              {/* <FilterSearch
              ref={filterRef}
              displaymsg={displaymsg}
              setDisplaymsg={setDisplaymsg}
              customCssClasses={{
                filterSearchContainer: "m-2 w-full",
                inputElement: "FilterSearchInput pr-[90px]",
                optionsContainer: "options",
              }}
              inputvalue={inputvalue}
              setSearchInputValue={setInputValue}
              params={params1}
              searchOnSelect={true}
              searchFields={[
                // {
                //   entityType: "location",
                //   fieldApiName: "address.line1",
                // },
                {
                  entityType: "location",
                  fieldApiName: "address.postalCode",
                },
                {
                  entityType: "location",
                  fieldApiName: "name",
                },
                {
                  entityType: "location",
                  fieldApiName: "address.city",
                },
                {
                  entityType: "location",
                  fieldApiName: "address.region",
                },
                // {
                //   entityType: "location",
                //   fieldApiName: "address.countryCode",
                // },
              ]}
              handleInputValue={handleInputValue}
              handleSetUserShareLocation={handleSetUserShareLocation}
            /> */}

              <input
                id="pac-input"
                type="text"
                ref={inputRef}
                placeholder="Enter postal code, city ..."
                className="text-sm outline-none h-9 w-full p-2 rounded-md border border-gray-300 focus:border-blue-600 search_input FilterSearchInput pac-target-input"
                onChange={() => Findinput2()}
                onKeyDown={(evt) => {
                  if (
                    evt.key === "Backspace" ||
                    evt.key === "x" ||
                    evt.key === "Delete"
                  ) {
                    Findinput2();
                  }
                }}
              />

              <button
                className="search-btn"
                aria-label="Search bar icon"
                id="search-location-button"
                onClick={Findinput}
              >
                <span dangerouslySetInnerHTML={{ __html: search_icn }} />
              </button>
            </div>


            <div className="fliter-sec">
              <button
                className="useMyLocation"
                title="Search using your current location!"
                id="useLocation"
                onClick={onClick}
              >
                <span
                  className="icon"
                  dangerouslySetInnerHTML={{ __html: UseMylocationsvg }}
                />

                <span className="underline hover:no-underline">
                  {" "}
                  {StaticData.Usemylocation}
                </span>
              </button>

              <ResultsCount
                customCssClasses={{ container: "mx-2 my-0 text-white" }}
              />
            </div>
          </div>
    
          <div className="mobile-btns">
            <div className="button-bx">
              <a
                className="btn listBtn"
                href="javascript:void(0);"
                onClick={() => {
                  document.body.classList.remove("mapView");
                }}
              >
                {" "}
                List View
              </a>
              <a
                className="btn mapBtn"
                href="javascript:void(0);"
                onClick={addClass}
              >
                {" "}
                Map View
              </a>
            </div>
          </div>
          <div className=" map-section ">
            <GoogleMaps
              apiKey={googleApikey}
              centerLatitude={centerLatitude}
              centerLongitude={centerLongitude}
              check={true}
              defaultZoom={mapzoom}
              showEmptyMap={true}
            />
          </div>

          <div className="left-listing">
            <PerfectScrollbar>
              <div>
                <VerticalResults
                  displayAllOnNoResults={false}
                  CardComponent={LocationCard}
                  locationResults={locationinbuit}
                  customCssClasses={{
                    container:
                      "result-list flex flex-col scroll-smooth  overflow-auto",
                  }}
                  // CardComponent={LocationCard}
                />

                {locationinbuit && locationinbuit.length <= 0 ? (
                  <div className="browse-dir">
                    <a className="underline " href="/gb.html">
                      Use the search above or{" "}
                      <span className="font-second-main-font">
                        {" "}
                        browse our directory
                      </span>
                    </a>
                  </div>
                ) : (
                  ""
                )}
                <div className="button-bx">
                  <ViewMore
                    className={
                      " btn notHighlight lg:!w-[132%] !mb-2 button view-more"
                    }
                    idName={"view-more-button"}
                    buttonLabel={"View More"}
                  />
                </div>

                  {/* <ViewMore
                className={"button view-more"}
                idName={"view-more-button"}
                buttonLabel={"Load More"}
              /> */}
{
              <Pagination
                customCssClasses={{
                  paginationContainer: "pagination-conatiner",
                  leftIconContainer: "left-container",
                  rightIconContainer: "right-container",
                  selectedLabel: "selectedLabel"
                }}
                /> }
              </div>
            </PerfectScrollbar>
          </div>
        </div>
      </Wrapper>
    </>
  );
};

export default SearchLayout;
