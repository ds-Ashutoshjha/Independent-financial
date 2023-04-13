import * as React from "react";
import "../index.css";
import { GetHeadConfig, GetPath, HeadConfig, Template, TemplateConfig, TemplateProps, TemplateRenderProps } from "@yext/pages";
import { SearchHeadlessProvider } from "@yext/search-headless-react";
import { FilterSearch, VerticalResults, ResultsCount, AppliedFilters, ApplyFiltersButton, LocationBias, Pagination } from "@yext/search-ui-react";
import { Location } from "../types/search/locations";
import MapboxMap from "../components/MapboxMap";
import MapPin from "../components/MapPin";
import LocationCard from "../components/locatorPage/LocationCard";
import PageLayout from "../components/layouts/PageLayout";
import Geocode from "react-geocode";
import UseMyLocation from "../components/locatorPage/UseMyLocation"
import { Address } from "../types/search/locations";
import { useSearchActions } from "@yext/search-headless-react";
import { useEffect } from "react";
import SearchLayout from "../components/locatorPage/SearchLayout";
import {stagingBaseurl, favicon, AnalyticsEnableDebugging, AnalyticsEnableTrackingCookie} from "../../sites-global/global"
import Newsletter from "../components/locatorPage/Newsletter";
import { JsonLd } from "react-schemaorg";
import { StaticData } from "../../sites-global/staticData";
import {
  AnalyticsProvider,
  AnalyticsScopeProvider,
} from "@yext/pages/components";
import { AnswerExperienceConfig } from "../config/answersHeadlessConfig";
import Footer from "../components/layouts/footer";



export const getPath: GetPath<TemplateProps> = () => {
  return `/index.html`;
};
export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = ({
  relativePrefixToRoot,
  path,
  document,
}): HeadConfig => {
 return {
   title:`${document.c_meta_title?document.c_meta_title:`Independent Financial Near Me - Independent Financial Branch Locator Here.`}`,
   charset: "UTF-8",
   viewport: "width=device-width, initial-scale=1",
   tags: [
     {
       type: "meta",
       attributes: {
         name: "description",
         content: `${document.c_meta_description?document.c_meta_description:`View Independent Financial near you today at Independent Financial. We stock high-quality, robust products at competitive rates.`}`,
       },
     },

     {
       type: "meta",
       attributes: {
         name: "author",
         content: StaticData.Brandname,
       },
     },

     {
       type: "meta",
       attributes: {
         name: "robots",
         content: "noindex, nofollow",
       },
     },
     {
      type: "link",
      attributes: {
        rel: "shortcut icon",
        href: favicon,
      },
    },

     {
       type: "link",
       attributes: {
         rel: "canonical",
         href: `${
           document._site.c_canonical?document.c_canonical:stagingBaseurl
            
         }`,
       },
     },
 
     {
       type: "meta",
       attributes: {
         property: "og:description",
         content: `${document.c_meta_description?document.c_meta_description:`View Independent Financial near you today at Independent Financial. We stock high-quality, robust products at competitive rates.`}`,
       },
     },
     {
       type: "meta",
       attributes: {
         property: "og:title",
         content: `${document.c_meta_title?document.c_meta_title:`Independent Financial Near Me - Find Independent Financial Locator Here.`}`,
       },
     },
     {
       type: "meta",
       attributes: {
         property: "og:image",
         content: favicon,
       },
     },
     {
      type: "meta",
      attributes: {
        name: "twitter:card",
        content: "summary",
      },
    },
    {
      type: "meta",
      attributes: {
        name: "twitter:description",
        content:`${document.c_meta_description?document.c_meta_description:`View Independent Financial near you today at Independent Financial. We stock high-quality, robust products at competitive rates.`}`,
      },
    },
    {
      type: "meta",
      attributes: {
        name: "twitter:title",
        content: `${document.c_meta_title?document.c_meta_title:`Independent Financial Near Me - Find Independent Financial Branch Locator Here.`}`,
      },
    },
    {
      type: "meta",
      attributes: {
        name: "twitter:image",
        content: favicon
      },
    },
   
   ],
   
 };
};

const Locator: Template<TemplateRenderProps>= ({
   document,
   __meta,
 }) => {
   const {    
   _site
   } = document;
 

  let templateData = { document: document, __meta: __meta };
  // const endpoints =  {
  //   universalSearch: "https://liveapi-sandbox.yext.com/v2/accounts/me/answers/query",
  //   verticalSearch: "https://liveapi-sandbox.yext.com/v2/accounts/me/answers/vertical/query",
  //   questionSubmission: "https://liveapi-sandbox.yext.com/v2/accounts/me/createQuestion",
  //   universalAutocomplete: "https://liveapi-sandbox.yext.com/v2/accounts/me/answers/autocomplete",
  //   verticalAutocomplete: "https://liveapi-sandbox.yext.com/v2/accounts/me/answers/vertical/autocomplete",
  //   filterSearch: "https://liveapi-sandbox.yext.com/v2/accounts/me/answers/filtersearch",
   
  // }
  // var Api="AIzaSyDZNQlSlEIkFAct5VzUtsP4dSbvOr2bE18"; 
  // console.log('Narendra', _site) ;

  return (
    <>
    <JsonLd<locator>
        item={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "MGM ",
          url: stagingBaseurl,
          logo: favicon,
        }}
      />
          <AnalyticsProvider
        templateData={templateData}
        enableDebugging={AnalyticsEnableDebugging} 
        enableTrackingCookie={AnalyticsEnableTrackingCookie}
      >
        {" "}
        <AnalyticsScopeProvider name={""}>
      <PageLayout global={_site}>
       
        <SearchHeadlessProvider
          experienceKey={AnswerExperienceConfig.experienceKey}
          locale={AnswerExperienceConfig.locale}
          apiKey={AnswerExperienceConfig.apiKey}
          verticalKey={AnswerExperienceConfig.verticalKey}
          experienceVersion="STAGING"
          sessionTrackingEnabled={true}
          endpoints={AnswerExperienceConfig.endpoints}  
          radius={AnswerExperienceConfig.locationRadius}
        >
          
          <SearchLayout _site={_site}/>
     
        </SearchHeadlessProvider>
      
   
      </PageLayout>
      </AnalyticsScopeProvider>
      </AnalyticsProvider>
      {/* <Footer footer={_site}/> */}
    </>
  );
};

export default Locator;