import requests

class ChatModel:
    def __init__(self, instruction):
        self.model = "http://host.docker.internal:11434/api/chat"
        self.context =[
        {'role': 'system', 'content': f'{instruction}'},
        ]

    def __call__(self, user_input):
        self.context.append({'role': 'user', 'content': f'{user_input}'})
        payload = {
            "model": "mistral",
            "messages": self.context,
            "stream": False
        }
        response = requests.post(self.model, json=payload)
        response.raise_for_status()
        data = response.json()
        reply = data["message"]["content"]
        self.context.append({"role": "assistant", "content": reply})
        return reply