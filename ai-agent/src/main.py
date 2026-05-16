from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import numpy as np
from typing import List, Dict
from agents.fraud_detector import FraudDetector
from agents.consensus_builder import ConsensusBuilder
from agents.budget_optimizer import BudgetOptimizer

app = FastAPI(title="Common Good AI Agent")

fraud_detector = FraudDetector()
consensus_builder = ConsensusBuilder()
budget_optimizer = BudgetOptimizer()

class VotePattern(BaseModel):
    user_id: str
    project_id: int
    vote_value: bool
    timestamp: str
    amount: float

@app.post("/analyze/fraud")
async def analyze_fraud(votes: List[VotePattern]):
    """Detect suspicious voting patterns"""
    try:
        risk_score = fraud_detector.analyze(votes)
        
        return {
            "risk_score": risk_score,
            "suspicious": risk_score > 0.7,
            "indicators": fraud_detector.get_indicators(),
            "recommendations": fraud_detector.get_recommendations()
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/optimize/proposal")
async def optimize_proposal(
    project_id: int,
    current_proposal: Dict,
    voting_history: List[VotePattern]
):
    """Suggest proposal modifications to reach consensus"""
    try:
        analysis = consensus_builder.analyze_objections(voting_history)
        
        modified_proposal = consensus_builder.suggest_modification(
            current_proposal,
            primary_objection=analysis['primary_objection']
        )
        
        return {
            "original_proposal": current_proposal,
            "modified_proposal": modified_proposal,
            "rationale": analysis['rationale'],
            "predicted_approval_increase": analysis['predicted_improvement']
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/optimize/budget")
async def optimize_budget_allocation(
    total_budget: float,
    projects: List[Dict],
    constraints: Dict
):
    """Optimize budget distribution across projects"""
    try:
        allocation = budget_optimizer.optimize(
            total_budget,
            projects,
            constraints
        )
        
        return {
            "recommended_allocation": allocation,
            "efficiency_score": budget_optimizer.calculate_efficiency(allocation),
            "equity_metrics": budget_optimizer.calculate_equity(allocation)
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
