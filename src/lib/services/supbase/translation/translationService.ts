import { PageTranslations } from "@/constants";
import { supabase } from ".."; // Update the path according to your project structure
import { processTranslationValue } from "./helper";
import { encodeHtmlEntities } from "../../html-entity-encoder";

export async function getTranslationsForPage(pageName: string): Promise<any> {
  const { data: pageData, error: pageError } = await supabase
    .from("pages")
    .select("page_id")
    .eq("page_name", pageName)
    .single();

  if (pageError) throw new Error(pageError.message);
  if (!pageData) throw new Error(`Page not found: ${pageName}`);

  const { data: translationsData, error: translationsError } = await supabase
    .from("translations")
    .select("translations")
    .eq("page_id", pageData.page_id)
    .single();

  if (translationsError) throw new Error(translationsError.message);
  if (!translationsData)
    throw new Error(`Translations not found for page: ${pageName}`);

  const translations: PageTranslations = {};
  Object.keys(translationsData.translations).forEach((key) => {
    translations[key] = processTranslationValue(
      translationsData.translations[key]
    );
  });

  return translations;
}
export async function updateTranslationsForPage(
  pageName: string,
  updatedTranslations: Record<string, any>
): Promise<any> {
  // First, get the page_id as you'll need this to update the correct translations.
  const { data: pageData, error: pageError } = await supabase
    .from("pages")
    .select("page_id")
    .eq("page_name", pageName)
    .single();

  if (pageError) throw new Error(pageError.message);
  if (!pageData) throw new Error(`Page not found: ${pageName}`);

  // Define the type for processedTranslations with string index signature
  const processedTranslations: Record<string, any> = {};
  Object.keys(updatedTranslations).forEach((key) => {
    // Check if the value is a string before encoding
    const value = updatedTranslations[key];
    processedTranslations[key] =
      typeof value === "string" ? encodeHtmlEntities(value) : value;
  });

  // Then, update the translations with the processed data.
  const { data: updatedData, error: updateError } = await supabase
    .from("translations")
    .update({ translations: processedTranslations })
    .eq("page_id", pageData.page_id);

  if (updateError) throw new Error(updateError.message);

  return updatedData;
}
