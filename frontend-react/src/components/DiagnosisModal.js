import React, { useState, useEffect } from "react";
import Modal from "./common/Modal";
import Button from "./common/Button";
import { analyzeRun } from "../services/api";
import "./DiagnosisModal.css";

const CERTAINTY_COLOR = {
  high: "var(--success)",
  medium: "var(--warning)",
  low: "var(--danger)",
};

function DiagnosisModal({ run, isOpen, onClose, onDiagnosed }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
  setError(null);
  setLoading(false);
}, [run?._id]);

  const hasDiagnosis = run?.aiDiagnosis && run.aiDiagnosis.summary;

  const handleAnalyze = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await analyzeRun(run._id);
      onDiagnosed(res.data);
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Couldn't reach the AI diagnosis service. Is Ollama running?"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Failure Diagnosis">
      <div className="diagnosis-meta">
        <span className="diagnosis-branch">{run?.branch}</span>
        <span className="diagnosis-stage">{run?.failedStage}</span>
      </div>

      {!hasDiagnosis && !loading && (
        <div className="diagnosis-empty">
          <p>This failure hasn't been analyzed yet.</p>
          <Button onClick={handleAnalyze}>Diagnose with AI</Button>
        </div>
      )}

      {loading && (
        <div className="diagnosis-loading">
          <div className="spinner" />
          <p>Analyzing failure logs locally...</p>
        </div>
      )}

      {error && <p className="diagnosis-error">{error}</p>}

      {hasDiagnosis && !loading && (
        <div className="diagnosis-result">
          <div className="diagnosis-row">
            <span className="diagnosis-label">Category</span>
            <span className="diagnosis-category">
              {run.aiDiagnosis.category}
            </span>
          </div>

          <div className="diagnosis-row">
            <span className="diagnosis-label">Summary</span>
            <p className="diagnosis-text">{run.aiDiagnosis.summary}</p>
          </div>

          <div className="diagnosis-row">
            <span className="diagnosis-label">Evidence</span>
            <code className="diagnosis-evidence">
              {run.aiDiagnosis.evidence}
            </code>
          </div>

          <div className="diagnosis-row">
            <span className="diagnosis-label">Recommended action</span>
            <p className="diagnosis-text">
              {run.aiDiagnosis.recommendedAction}
            </p>
          </div>

          <div className="diagnosis-row">
            <span className="diagnosis-label">Certainty</span>
            <span
              className="diagnosis-certainty"
              style={{
                color: CERTAINTY_COLOR[run.aiDiagnosis.certainty] || "var(--text-secondary)"
              }}
            >
              {run.aiDiagnosis.certainty}
            </span>
          </div>
        </div>
      )}
    </Modal>
  );
}

export default DiagnosisModal;