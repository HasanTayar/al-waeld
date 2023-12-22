import { useUserLanguage } from "@/hooks/use-userlang"
import { useTranslationsForPage } from "@/lib/query/hooks-query"

const Home = () => {
  const {language: currentLangCode} = useUserLanguage()
  const {data:homeTranslation , isLoading:isLodaingHome , error:errorHome}=useTranslationsForPage({
    pageName:'home_page',
    langCode:currentLangCode
  })
  return (
    <div>
      {homeTranslation?.info_start}
    </div>
  )
}

export default Home
