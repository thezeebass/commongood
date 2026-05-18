import numpy as np
from sklearn.ensemble import IsolationForest
from typing import List, Dict

class FraudDetector:
    def __init__(self):
        self.model = IsolationForest(contamination=0.1)
        self.indicators = []
    
    def analyze(self, votes: List[Dict]) -> float:
        """
        Analyze voting patterns for anomalies
        Returns risk score 0.0-1.0
        """
        features = self._extract_features(votes)
        
        # Train on historical patterns
        self.model.fit(features)
        
        # Detect anomalies
        predictions = self.model.predict(features)
        risk_score = np.mean(predictions == -1)
        
        # Identify specific indicators
        self._identify_indicators(votes, predictions)
        
        return float(risk_score)
    
    def _extract_features(self, votes: List[Dict]) -> np.ndarray:
        """Extract features for ML model"""
        features = []
        
        for vote in votes:
            features.append([
                vote['amount'],
                self._time_since_registration(vote['user_id']),
                self._vote_frequency(vote['user_id']),
                self._similar_votes_count(vote),
                vote['vote_intensity'] if 'vote_intensity' in vote else 1
            ])
        
        return np.array(features)
    
    def _identify_indicators(self, votes: List[Dict], predictions: np.ndarray):
        """Identify specific fraud indicators"""
        self.indicators = []
        
        # Check for coordinated voting
        if self._detect_coordination(votes):
            self.indicators.append("Coordinated voting pattern detected")
        
        # Check for rapid successive votes
        if self._detect_rapid_voting(votes):
            self.indicators.append("Unusually rapid voting detected")
        
        # Check for vote buying patterns
        if self._detect_vote_buying(votes):
            self.indicators.append("Potential vote buying detected")
    
    def get_indicators(self) -> List[str]:
        return self.indicators
