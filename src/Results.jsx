import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Results = () => {
  const location = useLocation(); // Récupère les données passées depuis Home
  const navigate = useNavigate();
  const { data, userAnswers } = location.state || { data: [], userAnswers: [] };

  const [currentIndex, setCurrentIndex] = useState(0); // Index de la question actuelle
  const [results, setResults] = useState([]); // Résultats validés (correct ou faux)

  // Fonction pour valider la réponse comme "Correcte"
  const handleValidate = (isCorrect) => {
    const updatedResults = [...results, isCorrect];
    setResults(updatedResults);

    // Passer à la question suivante ou terminer le quiz
    if (currentIndex < data.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // Toutes les questions ont été validées
      navigate("/summary", { state: { results: updatedResults } });
    }
  };

  // Question et réponse actuelle
  const currentQuestion = data[currentIndex];
  const currentAnswer = userAnswers[currentIndex];

  return (
    <div>
      <h1>Résultats du Quiz</h1>
      {currentQuestion && (
        <div>
          <p dangerouslySetInnerHTML={{ __html: currentQuestion.question }}></p>
          <p>
            <strong>Votre réponse :</strong> {currentAnswer}
          </p>
          <p>
            <strong>Bonne réponse :</strong> {currentQuestion.correct_answer}
          </p>
          <div style={{ marginTop: "20px" }}>
            <button
              style={{ marginRight: "10px", backgroundColor: "green", color: "white" }}
              onClick={() => handleValidate(true)}
            >
              Valide
            </button>
            <button
              style={{ backgroundColor: "red", color: "white" }}
              onClick={() => handleValidate(false)}
            >
              False
            </button>
          </div>
        </div>
      )}
      <p>
        Question {currentIndex + 1} sur {data.length}
      </p>
    </div>
  );
};

export default Results;

