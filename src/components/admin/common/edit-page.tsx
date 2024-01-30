import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useUpdateTranslationsForPage } from "@/lib/query/hooks-mutate";
import { useTranslationsForPage } from "@/lib/query/hooks-query";
import { useUserLanguage } from "@/hooks/use-userlang";

const EditPage = () => {
  const { pageName } = useParams<{ pageName: string }>();
  const { data: translations, isLoading } = useTranslationsForPage(pageName);
  const updateTranslations = useUpdateTranslationsForPage();
  const { language } = useUserLanguage();
  const [formValues, setFormValues] = useState<Record<string, any>>({});

  useEffect(() => {
    if (translations) {
      // Filter translations by the current language
      const langFilteredTranslations = Object.keys(translations).reduce(
        (acc: Record<string, any>, key: string) => {
          const value = translations[key];
          if (key.includes(language)) {
            acc[key] = value;
          }
          return acc;
        },
        {}
      );

      setFormValues(langFilteredTranslations);
    }
  }, [translations, language]);

  const handleInputChange = (path: string, value: any) => {
    const keys = path.split(".");
    setFormValues((prev: Record<string, any>) => {
      let current = prev;
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        if (i === keys.length - 1) {
          // Check if the final key is part of the current language section
          if (key.startsWith(language)) {
            current[key] = value;
          }
        } else {
          current[key] = current[key] || {};
          current = current[key];
        }
      }
      return { ...prev };
    });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Filter `formValues` to include only the part that belongs to the current language
    const updatedTranslations = Object.keys(formValues).reduce(
      (acc: Record<string, any>, key: string) => {
        if (key.startsWith(language)) {
          acc[key] = formValues[key];
        }
        return acc;
      },
      {}
    );

    updateTranslations.mutate({
      translations: updatedTranslations,
      pageName: pageName || "",
    });
  };

  const renderFields = (data: any, parentKey = "") => {
    return Object.entries(data).map(([key, value]) => {
      const path = parentKey ? `${parentKey}.${key}` : key;

      if (
        typeof value === "object" &&
        !Array.isArray(value) &&
        value !== null
      ) {
        return (
          <div key={path}>
            <h4 style={{ textAlign: "center" }}>{key}</h4>
            {renderFields(value, path)}
          </div>
        );
      }

      if (Array.isArray(value)) {
        return value.map((item, index) =>
          typeof item === "object" ? (
            <div key={`${path}[${index}]`}>
              {renderFields(item, `${path}[${index}]`)}
            </div>
          ) : (
            <textarea
              key={`${path}[${index}]`}
              value={item}
              onChange={(e) =>
                handleInputChange(`${path}[${index}]`, e.target.value)
              }
            />
          )
        );
      }

      if (key === "imageUrl") {
        return (
          <div key={path} style={{ textAlign: "center" }}>
            <img
              src={value || " "}
              alt="Preview"
              style={{ maxWidth: "200px", marginBottom: "10px" }}
            />
            <input
              type="file"
              onChange={(e) =>
                e.target.files &&
                handleInputChange(path, URL.createObjectURL(e.target.files[0]))
              }
            />
          </div>
        );
      }

      return (
        <div key={path} style={{ textAlign: "center" }}>
          <textarea
            value={value || ""}
            onChange={(e) => handleInputChange(path, e.target.value)}
          />
        </div>
      );
    });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      {renderFields(formValues)}
      <button type="submit">Update</button>
    </form>
  );
};

export default EditPage;
