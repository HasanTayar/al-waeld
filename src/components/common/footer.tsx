import {
  Facebook,
  Instagram,
  MailIcon,
  MapPinIcon,
  PhoneCall,
} from "lucide-react";
import {
  useGetContactList,
  useTranslationsForPage,
} from "@/lib/query/hooks-query";
import Loader from "./loader";
import logo from "/assets/headLogo.png";
import QPM from "/assets/poweredByQPM.png";

const Footer = () => {
  const {
    data: footerTranslation,
    isLoading: isLoadingFooter,
    error: errorFooter,
  } = useTranslationsForPage("footer");
  const {
    data: globalTranslation,
    isLoading: isLoadingGlobal,
    error: errorGlobal,
  } = useTranslationsForPage("global");
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

  const contact = contactList && contactList[0];

  return (
    <footer className="bg-slate-300 text-gray-700" dir="rtl">
      <div className="container mx-auto px-4 py-16 flex flex-col items-center space-y-8 md:space-y-0 md:flex-row md:justify-around">
        {/* Logo Section */}
        <div>
          <a href="/">
            <img src={logo} alt="logo" className="w-32 h-32 md:w-40 md:h-40" />
          </a>
        </div>

        {/* Visit Us Section */}
        <div className="flex flex-col space-y-8">
          <h2 className="text-2xl font-semibold">
            {footerTranslation?.come_vist}
          </h2>
          <div className="space-y-8">
            <a
              href={contact?.address}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2"
            >
              <MapPinIcon className="w-6 h-6" />
              <span>{globalTranslation?.address}</span>
            </a>
            <a
              href={`mailto:${contact?.email}`}
              className="flex items-center space-x-2"
            >
              <MailIcon className="w-6 h-6" />
              <span>{contact?.email}</span>
            </a>
            <a
              href={`tel:${contact?.phone_number}`}
              className="flex items-center space-x-2 "
            >
              <PhoneCall className="w-6 h-6 " />
              <span>{contact?.phone_number}</span>
            </a>
          </div>
        </div>

        {/* Contact Section */}
        <div className="flex flex-col space-y-4">
          <h2 className="text-2xl font-semibold">
            {footerTranslation?.contact}
          </h2>
          <div className="flex space-x-4">
            <a
              href={contact?.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-secondary transition-colors"
            >
              <Facebook className="w-6 h-6 md:w-8 md:h-8" />
            </a>
            <a
              href={contact?.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-secondary pr-2 transition-colors"
            >
              <Instagram className="w-6 h-6 md:w-8 md:h-8" />
            </a>
            {contact?.whatsapp && (
              <a
                href={contact.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-secondary transition-colors"
              >
                <div className="w-6 h-6 md:w-8 md:h-8">
                  <img src="/assets/whatsapp.svg" alt="whatsapp" />
                </div>
              </a>
            )}
          </div>
        </div>
      </div>
      <div className="flex justify-center py-4">
        <img
          src={QPM}
          alt="QPM Company"
          className="rounded-full w-30 h-20 transform transition duration-300 hover:-translate-y-1"
        />
      </div>
    </footer>
  );
};

export default Footer;
