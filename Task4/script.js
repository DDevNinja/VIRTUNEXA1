function addProject() {
    let title = document.getElementById("project-title").value.trim();
    let description = document.getElementById("project-description").value.trim();
    let imageUrl = document.getElementById("project-image").value.trim();
    let errorMessage = document.getElementById("error-message");

    if (title === "" || description === "" || imageUrl === "") {
        errorMessage.textContent = "Please fill out all fields.";
        return;
    }
    errorMessage.textContent = "";

    let projectList = document.getElementById("project-list");
    let projectCard = document.createElement("div");
    projectCard.classList.add("project-card");
    
    projectCard.innerHTML = `
        <h3>${title}</h3>
        <p>${description}</p>
        <img src="${imageUrl}" alt="Project Image">
    `;
    projectList.appendChild(projectCard);
    
    document.getElementById("project-title").value = "";
    document.getElementById("project-description").value = "";
    document.getElementById("project-image").value = "";
}