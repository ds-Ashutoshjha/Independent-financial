import * as React from "react";
type data = {
  footer: any;
};

const Footer = (props: any) => {
  const { footer } = props;
  console.log("footer", footer);
//   console.log(websiteLogos,"")
  return (
    <>
      <div className="Footer" data-ya-scope="footer">
        <div className="Footer-container l-container">
          <div className="Footer-top">
            <div className="Footer-logoContainer">
              <div className="Footer-logo">
                <img src={footer?.c_footerLogo.url} />
              </div>
            </div>
            {/* <span className="sr-only">Link to main site</span> */}
            <div className="Footer-linksWrapper l-row">
              {footer?.c_footerSectionMenus?.map((data: any, index: number) => {
                return (
                  <>
                    <div className="footer-Menu">
                      <div className="Footer-colHeading">{data?.menuTitle}</div>

                      {data?.menuLinks?.map((subdata: any) => {
                        return (
                          <>
                            <a  target="_blank"  className="Footer-link" href={subdata.link}>{subdata.label}</a>
                          </>
                        );
                      })}

                      {index == 3 ? (
                        <div className="SocialLinks Footer-socialLinks">
                          {footer?.c_socialMediaIcons?.map((data: any) => {
                            return (
                              <div className="SocialLinks-linkWrapper">
                                <a target="_blank" href="#">
                                < img src={data?.socialIcon?.url} />
                                </a>
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </>
                );
              })}
            </div>
          </div>
          <div>
		  <div className="Footer-bottom l-row">
            <div className="Footer-bottomCol l-col-xs-12-down l-col-sm-5-up">
				
              <div className="Footer-copyrightContainer">
                <div className="Footer-nmls">
                  {footer?.c_bottomFooter?.nMLS}
                </div>
              </div>
              <div className="Footer-copyright">
                {footer?.c_bottomFooter?.independentFinancial}
              </div>
			  <div className="Footer-partnersContainer">
				  {footer?.c_bottomFooter.websiteLogos?.map((data: any) => {
				
				return (
				  <>
                    <a className="Footer-partnerWrapper">
                      <img src={data?.url} alt="" />
                    </a>
					</>
              );
            })}
                  </div>
            </div>
            
                  

				  <div className="Footer-bottomCol l-col-xs-12-down l-col-sm-7-up">
				<div className="Footer-tableText">
					{footer?.c_bottomFooter?.investmentProducts}
				</div>
			  
		  
			  <table className="Footer-table">
				<tbody>
					<tr className="Footer-tableRow">
					
					<th className="border1 ">{footer?.c_bottomFooter?.tableData[0]}</th>	
					<th className="border2">{footer?.c_bottomFooter?.tableData[1]}</th>	
					<th className="border3">{footer?.c_bottomFooter?.tableData[2]}</th>
					</tr>	
					
					<tr className="Footer-tableCell">		
					<td className="border4">{footer?.c_bottomFooter?.tableData[3]}</td>	
					<td className="border5">{footer?.c_bottomFooter?.tableData[4]}</td>	
					<td className="border6">{footer?.c_bottomFooter?.tableData[5]}</td>		
					</tr>

				</tbody>
			  </table>
        </div>
          </div>
	
		</div>
		</div>
      </div>
    </>
  );
};
export default Footer;
