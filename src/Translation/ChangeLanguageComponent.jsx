import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

function ChangeLanguageComponent() {
  const [language, setLanguage] = useState("en");
  const { i18n } = useTranslation();

  useEffect(() => {
    setLanguage(window.sessionStorage.getItem("lang") || "en");
  }, []);

  const handleChange = (e) => {
    const selectedLanguage = e.target.value;
    window.sessionStorage.setItem("lang", selectedLanguage);
    setLanguage(selectedLanguage);
    i18n.changeLanguage(selectedLanguage);
  };

  return (
    <div>
      <select
        value={language}
        onChange={handleChange}
        style={{
          backgroundColor: "#f2f2f2",
          padding: "5px",
          fontSize: "13px",
          borderRadius: "4px",
          width: "85px"
        }}
      >
        <option value="en">English</option>
        <option value="hn">हिंदी</option>
        <option value="mr">मराठी</option>
      </select>
    </div>
  );
}

export default ChangeLanguageComponent;
