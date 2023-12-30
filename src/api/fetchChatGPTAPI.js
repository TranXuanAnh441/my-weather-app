const prompt = `
    I will give you data on the weather and the user, your work is to provide a short summary of the weather condition
    and provide users with some advices / things they should pay attention to on this weather based on their personal data
    the advices can be about transportation, health, clothes, food, suitable activities and so forth
    `;
const API_KEY = '';

export async function processMessageToChatGPT(userProfile, todayWeather) {
    const apiRequestBody = {
        "model": "gpt-3.5-turbo",
        "messages": [
            {
                role: "system",
                content: prompt + `UserProfile: ${userProfile}. TodayWeather: ${todayWeather}`
            }
        ]
    };
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": "Bearer " + API_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(apiRequestBody),
      });
      return response.json();
}