import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [data, setData] = useState([]); // Contient les questions récupérées
  const [loading, setLoading] = useState(true); // Gère l'état de chargement
  const [currentIndex, setCurrentIndex] = useState(0); // Index de la question actuelle
  const [userAnswers, setUserAnswers] = useState([]); // Stocke les réponses de l'utilisateur
  const navigate = useNavigate(); // Pour naviguer vers la page des résultats

  useEffect(() => {
    // Fonction pour récupérer les questions depuis l'API
    const fetchData = async () => {
      try {
        const response = await fetch("https://opentdb.com/api.php?amount=10");
        const result = await response.json();
        setData(result.results);
        setLoading(false);
      } catch (error) {
        console.error("Erreur de chargement des données :", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Fonction pour enregistrer la réponse de l'utilisateur
  const handleAnswerChange = (answer) => {
    const updatedAnswers = [...userAnswers];
    updatedAnswers[currentIndex] = answer; // Enregistre la réponse pour la question courante
    setUserAnswers(updatedAnswers);
  };

  // Fonction pour passer à la question suivante
  const handleNext = () => {
    if (currentIndex < data.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // Naviguer vers la page des résultats une fois toutes les questions répondues
      navigate("/results", { state: { data, userAnswers } });
    }
  };

  if (loading) {
    return <p>Chargement des questions...</p>;
  }

  // Question actuelle
  const question = data[currentIndex];

  return (
    <div>
      <h1>Bienvenue sur le Quiz</h1>
      <div>
        <p dangerouslySetInnerHTML={{ __html: question.question }}></p>
        <small>
          <strong>Catégorie :</strong> {question.category}
        </small>
      </div>
      <div style={{ marginTop: "20px" }}>
        {/* Champ de réponse */}
        <input
          type="text"
          value={userAnswers[currentIndex] || ""}
          onChange={(e) => handleAnswerChange(e.target.value)}
          placeholder="Tapez votre réponse ici"
        />
        {/* Bouton suivant */}
        <button onClick={handleNext} disabled={!userAnswers[currentIndex]}>
          Suivant
        </button>
      </div>
      <p>
        Question {currentIndex + 1} sur {data.length}
      </p>
    </div>
  );
};

export default Home;
