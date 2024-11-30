import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Summary = () => {
  const location = useLocation(); // Récupère les résultats validés depuis Results
  const navigate = useNavigate();
  const { results } = location.state || { results: [] };

  // Calculer le score
  const correctAnswers = results.filter((res) => res).length;
  const incorrectAnswers = results.filter((res) => !res).length;

  return (
    <div>
      <h1>Résumé du Quiz</h1>
      <p>
        <strong>Bonnes réponses :</strong> {correctAnswers}
      </p>
      <p>
        <strong>Mauvaises réponses :</strong> {incorrectAnswers}
      </p>
      <button onClick={() => navigate("/")}>Recommencer le Quiz</button>
    </div>
  );
};

export default Summary;
