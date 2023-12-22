import { Facebook, Instagram, MailIcon, MapPinIcon, MessageCircle, PhoneCall } from "lucide-react";
import { useGetContactList, useTranslationsForPage } from "@/lib/query/hooks-query";
import { useUserLanguage } from "@/hooks/use-userlang";
import Loader from "./loader";
import logo from "/assets/headLogo.png";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const Footer = () => {
  const { language: currentLangCode } = useUserLanguage();
  const {
    data: footerTranslation,
    isLoading: isLoadingFooter,
    error: errorFooter,
  } = useTranslationsForPage({ pageName: "footer", langCode: currentLangCode });
  const {
    data: globalTranslation,
    isLoading: isLoadingGlobal,
    error: errorGlobal,
  } = useTranslationsForPage({ pageName: "global", langCode: currentLangCode });
  const {
    data: contactList,
    isLoading: isLoadingContactList,
    error: errorContactList,
  } = useGetContactList();

  if (isLoadingFooter || isLoadingGlobal || isLoadingContactList) {
    return <Loader />;
  }

  if (errorFooter || errorGlobal || errorContactList) {
    return <div>Error loading translations</div>;
  }

  // Assuming there's only one contact in the contactList
  const contact = contactList && contactList[0];

  return (
    <footer className="bg-slate-300 text-gray-700">
      <div className="container mx-auto px-4 py-16 flex flex-col items-center space-y-8 rtl lg:flex-row lg:space-x-8 lg:space-y-0">
        
        {/* Logo Section */}
        <div className="lg:order-1">
          <a href="/">
            <img src={logo} alt="logo" className="w-32 h-32 lg:w-40 lg:h-40" />
          </a>
        </div>
  
        {/* Visit Us Section */}
        <div className="flex flex-col space-y-4 lg:order-2 pr-10">
          <h2 className="text-2xl lg:text-3xl font-semibold">
            {footerTranslation?.come_vist}
          </h2>
          <div className="space-y-2">
            <a href={contact?.address} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2">
              <MapPinIcon className="w-6 h-6" />
              <span>{globalTranslation?.address}</span>
            </a>
            <a href={`mailto:${contact?.email}`} className="flex items-center space-x-2">
              <MailIcon className="w-6 h-6" />
              <span>{contact?.email}</span>
            </a>
            <a href={`tel:${contact?.phone_number}`} className="flex items-center space-x-2">
              <PhoneCall className="w-6 h-6" />
              <span>{contact?.phone_number}</span>
            </a>
          </div>
        </div>
  
        {/* Contact Section */}
        <div className="flex flex-col space-y-4 items-center lg:items-end lg:order-3">
          <h2 className="text-2xl lg:text-3xl font-semibold">
            {footerTranslation?.contact}
          </h2>
          <div className="flex space-x-4">
            <a href={contact?.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-secondary transition-colors">
              <Facebook className="w-6 h-6 lg:w-8 lg:h-8" />
            </a>
            <a href={contact?.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-secondary transition-colors">
              <Instagram className="w-6 h-6 lg:w-8 lg:h-8" />
            </a>
            {contact?.whatsapp && (
              <a
                href={contact.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-secondary transition-colors"
              >
                <MessageCircle className="w-6 h-6 lg:w-8 lg:h-8" />
              </a>
            )}
          </div>
        </div>
  
        {/* Email Subscription Section */}
        <div className="w-full text-sm lg:text-base text-center mt-8 lg:mt-0 lg:order-4">
          <p>{globalTranslation?.mail_acceptance}</p>
          <div className="mt-2 flex flex-col items-center space-y-2">
            <Input type="email" placeholder="example@example.com" className="rounded-xl border-2 border-blue-300 p-2 text-blue-900 w-full lg:max-w-xs" />
            <Button className="bg-blue-500 text-white rounded-xl p-2 hover:bg-blue-600 transition-colors w-full lg:max-w-xs">
              {globalTranslation?.send}
            </Button>
          </div>
        </div>
      </div>
      <div className="text-center py-4 text-white">
        &copy; {new Date().getFullYear()} Your Website. All rights reserved.
      </div>
    </footer>
  );
  
};

export default Footer;
