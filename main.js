// Main Variables

let theInput = document.querySelector(".get-repos input");
let getButton = document.querySelector(".get-button");
let reposData = document.querySelector(".show-data");

getButton.onclick = function () {
  getRepos();
};

// Get Repos Function
function getRepos() {
  if (theInput.value == "") {
    // if value is empty

    reposData.innerHTML = "<span>Please Write Github Username</span>";
  } else {
    fetch(`https://api.github.com/users/${theInput.value}/repos`) // // to make the searching dynamic
      .then((respose) => respose.json())
      .then((repositories) => {
        // Empty The Container
        reposData.innerHTML = `<h2 class="warning">${repositories.length > 0 ? repositories.length: "Not Found"} Repo(s)</h2>`;

        // Loop On Repositories
        repositories.forEach((repo) => {
          // Create The Main Div Element Which Hold Each One Of Repo Name
          let mainDiv = document.createElement("div");

          // Create Repo Name Text
          let repoName = document.createTextNode(repo.name);

          // -----------------------------------------------

          // Convert reposData To An Array
          let reposArray = Array.from(repositories);

          // If The Length of Array is 0 Write On Container
          if (repositories.length === "undefined") {
            // Create Element
            let emptyRepos = document.createElement("span");

            // Add Text To The Element
            let emptyReposText = document.createTextNode(
              `The Repos Are ${reposArray.length}`
            );

            // Append Text To Element
            emptyRepos.appendChild(emptyReposText);

            // Append To Main Div
            reposData.appendChild(emptyRepos);
          }

          // Append The Text To Main Div
          mainDiv.appendChild(repoName);

          // Create Repo Url Anchor
          let theUrl = document.createElement("a");

          // Create Repo Url Text
          let theUrlText = document.createTextNode("Visit");

          // Append The Repo Url Text To Anchor Tag
          theUrl.appendChild(theUrlText);

          // Add The Hypertext Reference "href"
          theUrl.href = `https://github.com/${theInput.value}/${repo.name}`; // to make the searching dynamic

          // Set Attribute Blank
          theUrl.setAttribute("target", "_blank"); // to make the tab open in new tab

          // Append Url Anchor To Main Div
          mainDiv.appendChild(theUrl);

          // Create Stars Count Span
          let starsSpan = document.createElement("span");

          // Create The Stars Count Text
          let starsText = document.createTextNode(
            `Stars ${repo.stargazers_count}`
          );

          // Add Stars Count To Stars Span
          starsSpan.appendChild(starsText);

          // Append Stars Count Span To Main Div
          mainDiv.appendChild(starsSpan);

          // Add Class On Main Div
          mainDiv.className = "repo-box";

          // Append The Main Div To Container
          reposData.appendChild(mainDiv);
        });
      });
  }
}
