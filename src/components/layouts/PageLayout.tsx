  import * as React from "react";
import Footer from "./footer";
import Header from "./header";
import Nav from "./Nav";


type Props = {
    title?: string;
    _site?: any;
    global:any;
    children?: React.ReactNode;
    
};
  
  const PageLayout = ({
    title,
    _site,
    global,
    children,
  
  }: Props) => {

    return (
        <>
        <Header c_headerLogo ={global?.c_headerLogo} c_headerTopMenus ={global?.c_headerTopMenus} c_headerMainMenus = {global?.c_headerMainMenus}/>
      
                {children}
                {/* <Footer footer={global} /> */} 
      
        </>
    );
  };

export default PageLayout;
  