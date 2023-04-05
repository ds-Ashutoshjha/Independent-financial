import * as React from "react";
import Banner from "../components/locationDetail/banner";
import Cta from "../components/commons/cta";
import Contact from "../components/locationDetail/contact";
import ApiCall from "../Apis/ApiCall";
import Nearby from "../components/locationDetail/Nearby";
import { CustomFieldDebuggerReactProvider } from "@yext/custom-field-debugger";
import { JsonLd } from "react-schemaorg";
import Opening from "../components/commons/openClose";
import { nearByLocation } from "../types/nearByLocation";
import Logo from "../images/logo-header.svg";
import offerBanner from "../images/offer-banner.jpg";
import IframeMap from "../components/locationDetail/IframeMap";
import "../index.css";
import {
  Template,
  GetPath,
  GetRedirects,
  TemplateConfig,
  TemplateProps,
  TemplateRenderProps,
  GetHeadConfig,
  TransformProps,
  HeadConfig,
} from "@yext/pages";
import PageLayout from "../components/layouts/PageLayout";
import { fetch } from "@yext/pages/util";
import Nav from "../components/layouts/Nav";
import Footer from "../components/layouts/footer";
import Menu from "../components/locationDetail/Menu";
import PhotoSlider from "../components/locationDetail/PhotoSlider";
import PhotoGallery from "../components/locationDetail/PhotoGallery";
import About from "../components/locationDetail/About";
import Breadcrumb from "../components/layouts/Breadcrumb";
import CustomMap from "../components/locationDetail/CustomMap";
import BreadCrumbs from "../components/layouts/Breadcrumb";
import StoreHighlight from "../components/locationDetail/SoreHighlight";
import OpenClose from "../components/commons/openClose";
import Faq from "../components/locationDetail/Faqs";
import { StaticData } from "../../sites-global/staticData";

import {
  apikey_for_entity,
  baseuRL,
  stagingBaseurl,
  AnalyticsEnableDebugging,
  AnalyticsEnableTrackingCookie,
  favicon,
} from "../../sites-global/global";
import {
  AnalyticsProvider,
  AnalyticsScopeProvider,
} from "@yext/pages/components";
import FeaturesBrand from "../components/locationDetail/FeaturesBrand";
import { Fade, Slide } from "react-awesome-reveal";
import MgmTimber from "../components/locationDetail/MgmTimber";
import { AnswerExperienceConfig } from "../config/answersHeadlessConfig";
import { ImageSource } from "mapbox-gl";

/**
 * Required when Knowledge Graph data is used for a template.
 */
export const config: TemplateConfig = {
  stream: {
    $id: "locations",
    // Specifies the exact data that each generated document will contain. This data is passed in
    // directly as props to the default exported function.
    fields: [
      "id",
      "uid",
      "meta",
      "name",
      "address",
      "mainPhone",
      "hours",
      "slug",
      "c_lobbyHour",
      "c_locationBannerSection",
      "c_customerCareSection",
      "c_telephonicServices",
      "c_lostcardServices",
      "timezone",
      "yextDisplayCoordinate",
      "displayCoordinate",
      "cityCoordinate",
      "c_atLocationTitle",
      "c_entityitem",
      "c_testimonialSection",
      "c_improvementFeild",
      "c_featureSection",
      "c_headingMain",
      "c_digitalMenu",
      "c_digitalBanking",
      /**mobile sec */
      "c_firstImageMob",
      "c_mobTitle",
      "c_mobDesc",
      "c_mobileTwoImg",
      "c_mainMobileImg",
      "dm_directoryParents.name",
      "dm_directoryParents.slug",
      "dm_directoryParents.meta.entityType",
    ],
    // Defines the scope of entities that qualify for this stream.
    filter: {
      entityTypes: ["location"],
    },
    // The entity language profiles that documents will be generated for.
    localization: {
      locales: ["en"],
      primary: false,
    },
  },
};

/**
 * Defines the path that the generated file will live at for production.
 *
 * NOTE: This currently has no impact on the local dev path. Local dev urls currently
 * take on the form: featureName/entityId
 */
export const getPath: GetPath<TemplateProps> = ({ document }) => {
  // var url = "";
  // var name: any = document.name.toLowerCase();
  // var string: any = name.toString();;
  // let result: any = string.replaceAll(" ", "-");
  // document.dm_directoryParents.map((result: any, i: Number) => {
  //   if (i > 0) {
  //     url += result.slug + "/"
  //   }
  // })
  // if (!document.slug) {
  //   url += `${result}.html`;
  // } else {
  //   url += `${document.slug.toString()}.html`;
  // }

  return document.id;
};
/**
 * Defines a list of paths which will redirect to the path created by getPath.
 *
 * NOTE: This currently has no impact on the local dev path. Redirects will be setup on
 * a new deploy.
 */
export const getRedirects: GetRedirects<TemplateProps> = ({ document }) => {
  return [`index-old/${document.id}`];
};

/**
 * This allows the user to define a function which will take in their template
 * data and procude a HeadConfig object. When the site is generated, the HeadConfig
 * will be used to generate the inner contents of the HTML document's <head> tag.
 * This can include the title, meta tags, script tags, etc.
 */
export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = ({
  relativePrefixToRoot,
  path,
  document,
}): HeadConfig => {
  return {
    title: document.c_meta_title
      ? document.c_meta_title
      : `${document.name} Independent Financial`,
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1",
    tags: [
      {
        type: "meta",
        attributes: {
          name: "description",
          content: `${
            document.c_meta_description
              ? document.c_meta_description
              : `Find the ${document.name} Timber Store in ${document.address.city}. We stock high-quality, robust products at competitive rates.`
          }`,
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
          rel: "canonical",
          href: `${
            document._site.c_canonical ? document.c_canonical : stagingBaseurl
          }${
            document.slug ? document.slug : `${document.name.toLowerCase()}`
          }.html`,
        },
      },

      {
        type: "meta",
        attributes: {
          property: "og:description",
          content: `${
            document.c_meta_description
              ? document.c_meta_description
              : `Find the ${document.name} Timber Store in ${document.address.city}. We stock high-quality, robust products at competitive rates.`
          }`,
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
        type: "meta",
        attributes: {
          property: "og:title",
          content: `${document.name}`,
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
          name: "twitter:title",
          content: document.c_meta_title
            ? document.c_meta_title
            : `${document.name} Store of MGM Timber`,
        },
      },
      {
        type: "meta",
        attributes: {
          name: "twitter:description",
          content: `${
            document.c_meta_description
              ? document.c_meta_description
              : `Find the ${document.name} Timber Store in ${document.address.city}. We stock high-quality, robust products at competitive rates.`
          }`,
        },
      },
      /// twitter tag
    ],
  };
};
type ExternalApiData = TemplateProps & { externalApiData: nearByLocation };
export const transformProps: TransformProps<ExternalApiData> = async (
  data: any
) => {
  var location = `${
    data.document.yextDisplayCoordinate
      ? data.document.yextDisplayCoordinate.latitude
      : data.document.displayCoordinate.latitude
  },${
    data.document.yextDisplayCoordinate
      ? data.document.yextDisplayCoordinate.longitude
      : data.document.displayCoordinate.longitude
  }`;

  const url = `${AnswerExperienceConfig.endpoints.verticalSearch}?experienceKey=${AnswerExperienceConfig.experienceKey}&api_key=${AnswerExperienceConfig.apiKey}&v=20220511&version=${AnswerExperienceConfig.experienceVersion}&locale=${AnswerExperienceConfig.locale}&location=${location}&locationRadius=${AnswerExperienceConfig.locationRadius}&verticalKey=${AnswerExperienceConfig.verticalKey}&limit=4&retrieveFacets=true&skipSpellCheck=false&sessionTrackingEnabled=true&source=STANDARD`;
  console.log(url);
  const externalApiData = (await fetch(url).then((res: any) =>
    res.json()
  )) as nearByLocation;
  return { ...data, externalApiData };
};

type ExternalApiRenderData = TemplateRenderProps & {
  externalApiData: nearByLocation;
};

const Location: Template<ExternalApiRenderData> = ({
  relativePrefixToRoot,
  path,
  document,
  __meta,
  externalApiData,
}) => {
  const {
    _site,
    address,
    slug,
    hours,
    mainPhone,
    photoGallery,
    c_banner_image,
    c_canonical,
    description,
    additionalHoursText,
    timezone,
    c_lobbyHour,
    c_locationBannerSection,
    c_customerCareSection,
    c_telephonicServices,
    c_lostcardServices,
    yextDisplayCoordinate,
    displayCoordinate,
    cityCoordinate,
    c_atLocationTitle,
    dm_directoryParents,
    c_entityitem,
    c_testimonialSection,
    c_improvementFeild,
    c_featureSection,
    c_headingMain,
    c_digitalMenu,
    c_digitalBanking,
    c_firstImageMob,
    c_mobTitle,
    c_mobDesc,
    c_mobileTwoImg,
    c_mainMobileImg,
    name,
  } = document;
  console.log('_site', _site)
  let templateData = { document: document, __meta: __meta };
  let hoursSchema = [];
  let breadcrumbScheme = [];
  for (var key in hours) {
    if (hours.hasOwnProperty(key)) {
      let openIntervalsSchema = "";
      if (key !== "holidayHours") {
        if (hours[key].isClosed) {
          openIntervalsSchema = {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: key,
          };
        } else {
          let end = "";
          let start = "";
          if (typeof hours[key].openIntervals != "undefined") {
            let openIntervals = hours[key].openIntervals;
            for (var o in openIntervals) {
              if (openIntervals.hasOwnProperty(o)) {
                end = openIntervals[o].end;
                start = openIntervals[o].start;
              }
            }
          }
          openIntervalsSchema = {
            "@type": "OpeningHoursSpecification",
            closes: end,
            dayOfWeek: key,
            opens: start,
          };
        }
      } else {
      }

      hoursSchema.push(openIntervalsSchema);
    }
  }
  document.dm_directoryParents &&
    document.dm_directoryParents.map((i: any, index: any) => {
      if (i.meta.entityType.id == "ce_country") {
        document.dm_directoryParents[index].name =
          document.dm_directoryParents[index].name;
        document.dm_directoryParents[index].slug =
          document.dm_directoryParents[index].slug;

        breadcrumbScheme.push({
          "@type": "ListItem",
          position: index,
          item: {
            "@id":
              stagingBaseurl +
              document.dm_directoryParents[index].slug +
              ".html",
            name: i.name,
          },
        });
      } else if (i.meta.entityType.id == "ce_region") {
        let url = "";
        document.dm_directoryParents.map((j: any) => {
          if (
            j.meta.entityType.id != "ce_region" &&
            j.meta.entityType.id != "ce_city" &&
            j.meta.entityType.id != "ce_root"
          ) {
            console.log(j, "j");
            url = url + j.slug;
          }
        });
        breadcrumbScheme.push({
          "@type": "ListItem",
          position: index,
          item: {
            "@id":
              stagingBaseurl +
              url +
              "/" +
              document.dm_directoryParents[index].slug +
              ".html",
            name: i.name,
          },
        });
      } else if (i.meta.entityType.id == "ce_city") {
        let url = "";
        document.dm_directoryParents.map((j: any) => {
          if (
            j.meta.entityType.id != "ce_city" &&
            j.meta.entityType.id != "ce_root"
          ) {
            console.log(j, "j");
            url = url + "/" + j.slug;
          }
        });
        breadcrumbScheme.push({
          "@type": "ListItem",
          position: index,
          item: {
            "@id":
              stagingBaseurl +
              url +
              "/" +
              document.dm_directoryParents[index].slug +
              ".html",
            name: i.name,
          },
        });
      }
    });

  breadcrumbScheme.push({
    "@type": "ListItem",
    position: 4,
    item: {
      "@id": stagingBaseurl + path,
      name: document.name,
    },
  });
  let imageurl = photoGallery
    ? photoGallery.map((element: any) => {
        return element.image.url;
      })
    : null;
  console.log(document);
  let bannerimage = c_banner_image && c_banner_image.image.url;
  console.log("firstbaner", c_testimonialSection);
console.log('c_featureSection', c_featureSection)
  return (
    <>
      <JsonLd<Store>
        item={{
          "@context": "https://schema.org",
          "@type": "DepartmentStore",
          name: name,
          address: {
            "@type": "PostalAddress",
            streetAddress: address.line1,
            addressLocality: address.city,
            addressRegion: address.region,
            postalCode: address.postalCode,
            addressCountry: address.countryCode,
          },
          openingHoursSpecification: hoursSchema,
          description: description,
          image: imageurl,
          telephone: mainPhone,
          url: `${c_canonical ? c_canonical : stagingBaseurl}${
            slug ? slug : `${name}`
          }.html`,
        }}
      />
      <JsonLd<BreadcrumbList>
        item={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",

          itemListElement: breadcrumbScheme,
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
            {/* {console.log('global', _site)} */}
            {/* {c_lobbyHour} */}
            {/* {c_locationBannerSection} */}
            <ol className="Breadcrumbs-list">
                <li><BreadCrumbs
              name={name}
              parents={dm_directoryParents}
              baseUrl={relativePrefixToRoot}
              address={address}
            ></BreadCrumbs></li>
            </ol>
            <div className="Hero-background">
              <div
                style={{
                  width: "100%",
                  backgroundImage:
                    "url(" +
                    c_locationBannerSection?.backgroundImage?.url +
                    ")",
                }}
              >
                {/* <img src={c_locationBannerSection?.backgroundImage?.url} style={{width:"100%"}}></img> */}
                <div className="Hero-overlay">
                  <div className="Hero-container">
                    <div className="Hero-nameContainer">
                      <h1 className="Hero-name">
                        <span className="LocationName" id="location-name">
                          <span className="LocationName-brand">
                            {c_locationBannerSection?.bannerHeading1}
                          </span>
                          <span className="sr-only">-</span>{" "}
                          <span className="LocationName-geo">{name}</span>
                        </span>
                      </h1>
                    </div>
                    <div className="Hero-ctaContainer">
                      <a
                        className="Hero-cta"
                        href={c_locationBannerSection?.accountButton?.link}
                      >
                        {c_locationBannerSection?.accountButton?.label}
                      </a>
                      <div className="c-get-directions">
                        {/* <div className="c-get-directions-button-wrapper">
                          <a
                            className="c-get-directions-button Hero-cta"
                            href={c_locationBannerSection?.directionButton.link}
                            
                          >
                            {c_locationBannerSection?.directionButton?.label}
                            
                            <span className="sr-only wcag-new-tab-hover">
                              &nbsp;
                            </span>
                          </a>
                        </div> */}
                      </div>
                    </div>

                    {/* <div className="Hero-hours--mobile l-visible-only-xs">
                      <span className="Lobby">
                        <OpenClose
                          timezone={timezone}
                          hoursloby={c_lobbyHour}
                        />
                      </span>
                    </div> */}
                    <div className="Hero-infoContainer">
                      <div className="container">
                        <div className="banner-text banner-dark-bg justify-center text-center">
                          {/* <h1 className="">{name}</h1> */}
                          {/* <div className="openClosestatus detail-page closeing-div">
                            <OpenClose timezone={timezone} hours={hours} />
                          </div> */}
                        </div>
                      </div>
                      <div className="location-information">
                        <Contact
                          address={address}
                          phone={mainPhone}
                          latitude={
                            yextDisplayCoordinate
                              ? yextDisplayCoordinate.latitude
                              : displayCoordinate?.latitude
                          }
                          yextDisplayCoordinate={yextDisplayCoordinate}
                          longitude={
                            yextDisplayCoordinate
                              ? yextDisplayCoordinate.longitude
                              : displayCoordinate?.longitude
                          }
                          hoursloby={c_lobbyHour}
                          hours={hours}
                          additionalHoursText={additionalHoursText}
                        ></Contact>
                      </div>
                    </div>
                  </div>
                </div>

                {/* {
            hours ?
              <div className="map-sec" id="map_canvas">
                <CustomMap prop={yextDisplayCoordinate ? yextDisplayCoordinate : displayCoordinate} />
              </div> :
              <div className="map-sec without-hours" id="map_canvas">
                <CustomMap prop={yextDisplayCoordinate ? yextDisplayCoordinate : displayCoordinate} />
              </div>
          } */}
              </div>
            </div>

            <div className="AtThisLocation">
              <div className="AtThisLocation-container">
                <div className="AtThisLocation-title">{c_atLocationTitle}</div>
                <div className="AtThisLocation-row l-row">
                  <div className="AtThisLocation-services l-col-xs-12-down l-col-sm-6 l-col-md-3-up">
                    <div className="AtThisLocation-servicesTitle l-hidden-xs">
                      {c_entityitem?.servicesHeading}
                    </div>
                    <ul className="AtThisLocation-servicesList">
                      {c_entityitem?.serviceslabel?.map((location: any) => {
                        return (
                          <>
                            <li className="AtThisLocation-service">
                              <a
                                href="#"
                                className="AtThisLocation-serviceLink"
                              >
                                {location.label}
                              </a>
                            </li>
                          </>
                        );
                      })}
                    </ul>
                  </div>
                  <div className="AtThisLocation-offerings l-col-xs-12-down l-col-sm-6 l-col-md-3-up">
                    <div className="AtThisLocation-offeringsTitle">
                      {c_entityitem.otherBankTitle}
                    </div>
                    <ul className="AtThisLocation-offeringsList">
                      {c_entityitem?.otherBanklabel?.map((services: any) => {
                        return (
                          <>
                            <li className="AtThisLocation-offering">
                              <a
                                href="#"
                                className="AtThisLocation-offeringText AtThisLocation-offeringLink"
                              >
                                {services.label}
                              </a>
                            </li>
                          </>
                        );
                      })}
                    </ul>
                  </div>
                  <div className="AtThisLocation-phonesCol l-col-xs-12-down l-col-sm-6 l-col-md-3-up">
                    <div className="AtThisLocation-phoneContainer">
                      <div className="AtThisLocation-phoneTitle">
                        {" "}
                        {c_entityitem.customertitle}
                      </div>

                      {c_entityitem?.customerlabel?.map((career: any) => {
                        return (
                          <>
                            <div className="AtThisLocation-phoneWrapper">
                              <li className="mb-2">
                                <a
                                  href="#"
                                  className="border-b border-solid border-transparent hover:border-purple-800 hover:text-purple-800"
                                >
                                  {career.label}
                                </a>
                              </li>
                            </div>
                          </>
                        );
                      })}
                    </div>
                  </div>
                  <div className="AtThisLocation-phonesCol l-col-xs-12-down l-col-sm-6 l-col-md-3-up">
                    <div className="AtThisLocation-phoneContainer">
                      <div className="AtThisLocation-phoneTitle">
                        {c_entityitem.losttitle}
                      </div>
                    </div>

                    <div className="flex sm:justify-center xl:justify-start">
                      {c_entityitem?.lostlabel?.map((social: any) => {
                        return (
                          <>
                            <ul className="list-none footer-links m-3">
                              <li className="mb-2">
                                <a
                                  href="#"
                                  className="border-b border-solid border-transparent hover:border-purple-800 hover:text-purple-800"
                                >
                                  {social.label}
                                </a>
                              </li>
                            </ul>
                          </>
                        ); 
                      })}
                    </div>

                    <div className="Advisors" data-ya-scope="advisors">
                      <div className="Advisors-container">
                        <div className="Advisors-list">
                          {c_testimonialSection.map((namess: any) => {
                            return (
                              <>
                                <article className="Teaser Teaser--advisor">
                                  <div className="Teaser-specialty">
                                    {namess.businessName}
                                  </div>
                                  <div className="Teaser-container">
                                    <div className="Teaser-image ObjectFit-container">
                                      <img
                                        className="ObjectFit-image"
                                        src={namess?.personPhoto?.url}
                                        alt=""
                                      />
                                    </div>
                                    <div className="Teaser-infoWrapper">
                                      <div className="Teaser-title">
                                        {namess.personName}
                                      </div>
                                      <div className="Teaser-subtitle">
                                        {namess.personDesignation}
                                      </div>
                                      <div className="Teaser-linksContainer">
                                        <div className="Phone Teaser-phone">
                                          <div className="Phone-display l-hidden-xs">
                                            <span className="Text Phone-text Phone-display">
                                              {namess.phoneNumber.label}
                                            </span>
                                          </div>
                                        </div>
                                        <div className="Teaser-emailWrapper">
                                          <a className="Teaser-email" href="#">
                                            {" "}
                                            {namess.emailId.label}
                                          </a>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </article>
                              </>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="sm:flex sm:flex-nowrap sm:-mx-4 mt-6 pt-6 sm:mt-12 sm:pt-12 border-t">
                {/* <div className=" px-4 md:w-1/8">{footerData.copyrighttext}</div> */}
                <div className="px-4 sm:w-1/2 md:w-1/4 mt-4 md:mt-0">
                  <a href="#">
                    {" "}
                    <h4 className="mb-2 font-medium">
                      {/* {footerData.c_privacy.label} */}
                    </h4>
                  </a>
                </div>
              </div>
            </div>

            <div className="Promo">
              <div className="Promo-container">
                <div className="Promo-infoWrapper">
                  <div className="Promo-title">
                    <div className="Promo-descriptionWrapper">
                      <div className="Promo-subtitle">
                        {c_improvementFeild?.titleHeading?.map((data: any) => {
                          return <>{data}</>;
                        })}
                      </div>
                    </div>
                  </div>

                  <div className="Promo-ctaWrapper">
                    <a
                      className="Promo-cta"
                      href="https://www.independent-bank.com/personal/loans/home-equity-loans.html"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {c_improvementFeild?.learnMoreSection.label}
                    </a>
                  </div>
                </div>

                <div className="Promo-image js-lazy ObjectFit-container js-lazy-loaded">
                  <img
                    className="ObjectFit-image"
                    src={c_improvementFeild?.photofeild?.url}
                    alt=""
                  />
                </div>
              </div>
            </div>
            <div className="Products">
              <div className="Products-container">
                <div className="Products-title">
                  {c_headingMain?.featureHeadingTop}
                </div>
                <div className="Products-list l-row">
                {c_featureSection.map((data: any) => {
                  return(
                    <>
                           <div className="Products-listItem l-col-xs-12-down l-col-sm-4-up">
                            <div className="Product">
                              <div className="Product-title">
                              {data.heading}
                              </div>
                              <div className="Product-description">
                                {data.description}
                                <div className="Product-ctaWrapper">
                                  <a
                                    className="Product-cta"
                                    href="https://www.independent-bank.com/personal/banking-services"
                                    data-ya-track="link#"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    {data.cta.label}
                                    <span></span>
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                    </>
                  )
                 
                })}


                </div>
              </div>
            </div>
            <div className="Services">
              <div className="Services-container">
                <div className="Services-title">
                  {c_digitalMenu?.featureHeadingTop}
                </div>
              </div>
              <div className="Services-list l-row">
                {c_digitalBanking.map((img: any) => {
                  return (
                    <>
                      <div className="Services-listItem l-col-xs-12-down l-col-sm-6 l-col-md-4-up">
                        <div className="Service">
                          <div className="Service-image js-lazy ObjectFit-container js-lazy-loaded">
                            <img src={img?.bankingPhoto?.url} alt="" />
                          </div>
                          <div className="SService-infoWrapper Service-infoWrapper--padding">
                            <div className="Service-title">{img?.heading1}</div>
                            <div className="Service-description">
                              {img.descriptionDetail}
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  );
                })}
              </div>
            </div>

            <div className="App">
              <div className="App-container">
                <div className="App-card">
                  <div className="App-infoContainer">
                    <img
                      className="App-logo l-hidden-xs js-lazy js-lazy-loaded"
                      src={c_firstImageMob.url}
                      alt=""
                    />
                      <div className="App-infoWrapper">
                  <div className="App-titleRow">
                    <div className="App-linksContainer">
                       <div className="App-title">{c_mobTitle}</div>
                    </div>
                  </div>
                  <div className="App-description">{c_mobDesc}</div>
                  <div className="App-linksContainer">
                    <a className="App-appLink">
                      {c_mobileTwoImg.map((img:any)=>{
                        return(
                          <>
                          <img src={img.url} alt="" />
                          </>
                        )
                      })}
                      
                    </a>
                  </div>
                  
                </div>
                <div className="App-phoneImageWrapper">
                     <img className="App-phoneImage js-lazy js-lazy-loaded" src={c_mainMobileImg?.image?.url} alt="" >
                      
                    </img>
                  </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="nearby-sec">
              <div className="container">
                <div className="sec-title">
                  <h2 className="">{StaticData.NearStoretext}</h2>
                </div>
                <div className="nearby-sec-inner">
                  {yextDisplayCoordinate ||
                  cityCoordinate ||
                  displayCoordinate ? (
                    <Nearby externalApiData={externalApiData} mainPhones={mainPhone}/>
                  ) : (
                    ""
                  )}
                </div>
                {console.log('mainPhone', mainPhone)}
              </div>
            </div>
            <Footer footer={_site}/>
          </PageLayout>
        </AnalyticsScopeProvider>
      </AnalyticsProvider>
    </>
  );
};

export default Location;
