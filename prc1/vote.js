let votes = {
    Python: 0,
    JavaScript: 0,
    Java: 0,
    "C++": 0
};

if (localStorage.getItem("votes")) {
    votes = JSON.parse(localStorage.getItem("votes"));
}

showResults();

function autoAddVotes() {
    for (let lang in votes) {
        const voteValue = lang.length * Math.random();
        votes[lang] = (votes[lang] || 0) + voteValue;
    }
    localStorage.setItem("votes", JSON.stringify(votes));
    showResults();

    setTimeout(autoAddVotes, 5000);
}

autoAddVotes();

function showResults() {
    const storedVotes = localStorage.getItem("votes");
    if (storedVotes) {
        votes = JSON.parse(storedVotes);
    }

    const resultsList = document.getElementById("results-list");
    resultsList.innerHTML = "";

    for (let lang in votes) {
        const li = document.createElement("li");
        li.textContent = `${lang}: ${votes[lang].toFixed(2)} vote${votes[lang] !== 1 ? 's' : ''}`;
        resultsList.appendChild(li);
    }
}

function vote(language) {
    const voteValue = 1;
    votes[language] = (votes[language] || 0) + voteValue;
    localStorage.setItem("votes", JSON.stringify(votes));
    showResults();
}
