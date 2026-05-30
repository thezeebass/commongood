from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(
    title="Common Good AI Agent",
    description="AI services for fraud detection, budget optimization, and consensus building",
    version="0.1.0"
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
async def health():
    """Health check endpoint"""
    return {"status": "ok"}

@app.post("/analyze/fraud")
async def analyze_fraud(votes: list):
    """Detect suspicious voting patterns"""
    # TODO: Implement fraud detection
    return {
        "risk_score": 0.0,
        "suspicious": False,
        "indicators": []
    }

@app.post("/optimize/proposal")
async def optimize_proposal(project_id: int, proposal: dict):
    """Suggest proposal modifications for consensus"""
    # TODO: Implement consensus builder
    return {
        "modified_proposal": proposal,
        "rationale": "No modifications needed"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)