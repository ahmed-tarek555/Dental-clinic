from fastapi import APIRouter, Body

from ai.agent import ChatModel

router = APIRouter(tags=["AI Image Upload"])

instructions = "You are a dental health assistant.\n You are not a dentist.\n You only give advice to the user.\n If unsure tell the user to book an apointment with the dentist."
chat_model = ChatModel(instructions)


@router.post('/ai_chat')
async def ai_chat(user_input: str = Body(...)):
    generated_chat = chat_model(user_input)
    return {'reply': generated_chat}

@router.post("/ai_chat/reset")
async def reset_chat():
    chat_model.context = [
        {'role': 'system', 'content': instructions},
        ]
    return {"status": "reset"}