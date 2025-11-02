import React, { useState, useEffect } from "react";
import Registration from "./components/Registration";
import ObjectiveQuiz from "./components/ObjectiveQuiz";
import SubjectiveQuiz from "./components/SubjectiveQuiz";
import SocialMedia from "./components/SocialMedia";
import GetPass from "./components/GetPass";

const App= () => {
  // --- persistent state ---
  const [userEmail, setUserEmail] = useState("");
  const [showObjective, setShowObjective] = useState(false);
  const [showSubjective, setShowSubjective] = useState(false);
  const [showSocial, setShowSocial] = useState(false);
  const [showPass, setShowPass] = useState(false);

  // --- restore state from localStorage on reload ---
  useEffect(() => {
    const savedEmail = localStorage.getItem("userEmail");
    const savedStage = localStorage.getItem("workshopStage");

    if (savedEmail) setUserEmail(savedEmail);

    switch (savedStage) {
      case "objective":
        setShowObjective(true);
        break;
      case "subjective":
        setShowSubjective(true);
        break;
      case "social":
        setShowSocial(true);
        break;
      case "pass":
        setShowPass(true);
        break;
      default:
        break;
    }
  }, []);

  // --- registration completed ---
  const handleRegistrationSuccess = (email) => {
    setUserEmail(email);
    setShowObjective(true);
    localStorage.setItem("userEmail", email);
    localStorage.setItem("workshopStage", "objective");
  };

  // --- objective quiz completed ---
  const handleObjectivePassed = () => {
    setShowObjective(false);
    setShowSubjective(true);
    localStorage.setItem("workshopStage", "subjective");
  };

  // --- subjective quiz submitted ---
  const handleSubjectiveSubmit = () => {
    setShowSubjective(false);
    setShowSocial(true);
    localStorage.setItem("workshopStage", "social");
  };

  // --- social step completed ---
  const handleSocialComplete = () => {
    setShowSocial(false);
    setShowPass(true);
    localStorage.setItem("workshopStage", "pass");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-blue-50 p-6">
      {!showObjective && !showSubjective && !showSocial && !showPass && (
        <Registration onRegister={handleRegistrationSuccess} />
      )}

      {showObjective && (
        <ObjectiveQuiz
          userEmail={userEmail}
          onPassed={handleObjectivePassed}
        />
      )}

      {showSubjective && (
        <SubjectiveQuiz
          userEmail={userEmail}
          onSubmit={handleSubjectiveSubmit}
        />
      )}

      {showSocial && <SocialMedia/>}

      {showSocial && <GetPass userEmail={userEmail} />}
    </div>
  );
};








export default App;
