async function askAI() {

    const question = document.getElementById("question").value.trim();
    const answerBox = document.getElementById("answer");
    const button = document.querySelector(".search-box button");

    if (!question) {
        answerBox.innerHTML = "⚠️ Please enter your question.";
        return;
    }

    button.disabled = true;
    button.innerHTML = "Thinking...";

    answerBox.innerHTML = `
        <div class="loading">
            🤖 <b>GovAssist AI</b> is analyzing your question...
        </div>
    `;

    try {

        const response = await fetch("https://api.dify.ai/v1/workflows/run", {
            method: "POST",
            headers: {
                "Authorization": "Bearer app-PmfhNAkTQPTuPx354L3yreYZ",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                inputs: {
                    Question: question
                },
                response_mode: "blocking",
                user: "website-user"
            })
        });

        const data = await response.json();

        console.log(data);

        if (data.data?.outputs?.text) {

            answerBox.innerHTML = marked.parse(data.data.outputs.text);

        } else {

            answerBox.innerHTML = `
                <div class="error">
                    ❌ No response received.
                </div>
            `;

            console.log(data);
        }

    } catch (error) {

        console.error(error);

        answerBox.innerHTML = `
            <div class="error">
                ❌ ${error.message}
            </div>
        `;

    } finally {

        button.disabled = false;
        button.innerHTML = "Ask AI";

        answerBox.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }
}


